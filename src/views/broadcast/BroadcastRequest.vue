<template>
    <div id="contents">
        <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>방송관리</li>
            <li class="on">{{ $route.name }}</li>
        </ul>
        <ul class="helpbox">
            <li>판매자들이 방송을 신청한 목록입니다.</li>
            <li>초기 페이지는 이달을 기준으로 합니다.</li>           
            <li>인플루언서 라이브 방송일 경우 방송 승인 이후에 라이브 방송 진행이 가능합니다.</li>
        </ul>

        <form name="sFrm">
            <div class="box">
                <table class="t_form">
                    <colgroup>
                        <col width="170">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>방송자</th>
                            <td>
                                <Sws-seller :parentData="BroadcastFilterFields"  @changeFn="changeBrand"></Sws-seller>
                            </td>
                        </tr>                       
                        <tr>
                            <th>기간</th>
                            <td>
                                <sws-date :parentData="BroadcastFilterFields"></sws-date>
                            </td>
                        </tr>  
                        <tr>
                            <th>카테고리별</th>
                            <td>
                                <sws-category :selectedCategory="BroadcastFilterFields.categoryList"></sws-category>
                            </td>
                        </tr>
                        <tr>
                            <th>키워드검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;" v-model="BroadcastFilterFields.prdtCode">
                                    <option value="name">상품명</option>
                                    <option value="prdtCode">상품코드</option>
                                </select>
                                <input type="text" name="sword" class="text_input" v-model="BroadcastFilterFields.FieldText" @keyup.enter="searchFilteringFn">                               
                                <b-button variant="secondary" size="sm" @click="searchFilteringFn">검색</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <BroadcastRequesTable 
            :BroadcastFilterFields="BroadcastFilterFields"
            :broadcast="broadcast" 
            :isBusy="isBusy"   
            :totalPage="totalPage"
            :currentPage="currentPage"
            @refresh="searchFilteringFn"
        >
        </BroadcastRequesTable>
       
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import BroadcastRequesTable from '@/components/broadcast/BroadcastRequestList'
import SwsCategory from '@/components/common/SwsCategory.vue'
import SwsSeller from '@/components/common/SwsSeller'
import SwsDate from '@/components/common/SwsDate'

export default {
    mixins: [commonJs],
    components: {     
        BroadcastRequesTable,
        SwsCategory,
        SwsDate,
        SwsSeller
    },
    data () {
        return {           
            BroadcastFilterFields: {
                categoryList: [],
                sellerSysId: 0,                       
                startDate: '',
                endDate: '',
                prdtCode: 'name',
                FieldText: '',
                valuable: 'all'
            },
            broadcast: [],
            isBusy: true,
            totalPage: 0,
            currentPage: 1,
        }
    },
    mounted () { 
        this.axiosGetRequest('/api/v1/broadcasts/schedules/list','',this.loadBroadcastRequestList)
    },
    methods: {
        searchFilteringFn: function () {
            let params = {}
            for(let _k in this.BroadcastFilterFields) {
               if (_k === 'prdtCode'){
                    params[this.BroadcastFilterFields.prdtCode] = this.BroadcastFilterFields.FieldText
                } else if(_k === 'categoryList') {
                    for (const cate of this.BroadcastFilterFields[_k]){
                        if (!cate.value <= 0) {
                            params['categorySysId' + cate.level] = cate.value
                        }
                    }
                } else {
                    if(!this.isEmpty(this.BroadcastFilterFields[_k]) && this.BroadcastFilterFields[_k] !== 0){
                        params[_k] = this.BroadcastFilterFields[_k]
                    }
                }
            }
            this.isBusy=true
            this.axiosGetRequest('/api/v1/broadcasts/schedules/list', params, this.loadBroadcastRequestList)
            this.broadcast.splice(0)
        },
        loadBroadcastRequestList(res) {
            console.log(res)
            let result = res.data.jsonData.broadcasts
            let broadcastPrdts = result.broadcastPrdts
            let categoryTitle = ''
            this.broadcast.splice(0)
            if(this.isEmpty(result)){
                this.isBusy=false
                return false
            }
            for (let i = 0 ; i < result.length ; i++) {
                for(let j = 0 ; j < broadcastPrdts.length; i++) {
                    categoryTitle = ''
                    if (!this.isEmpty(result[i].categories)) { categoryTitle = this.convertCategoryTitle(result[i].categories[0]) }
                    this.broadcast.push({
                        selected: '',
                        id: result[i].broadcastSysId, 
                        productCode: {
                            code: result[i].prdtSysId               
                        },
                        dateBj: {
                            bj: result[i].name,
                            date : result[i].startDate
                        },
                        bjImage: {
                            smallImageUrl : result[i].broadcastPrdts[j].smallImageUrl
                        },
                        title: {                           
                            productName: result[i].name,
                            category: categoryTitle,
                            tag: result[i].broadcastPrdts[j].tag
                        },
                        subTitle: result[i].broadcastPrdts[j].name,
                        type: "라이브방송 / (방송중)",
                        price: {
                            price: result[i].price,
                            marketPrice: result[i].marketPrice,
                            supplyPrice: result[i].supplyPrice
                        },
                        view: {
                            viewCount: result[i].viewCount,
                            salesQty: result[i].salesQty,
                            stockQty: result[i].stockQty
                        },
                        setting: ''
                    })
                }
                this.totalPage = result.length
                this.isBusy=false
                this.currentPage = 1
            }
        },
        convertCategoryTitle(category) {
            let categoryTitle = ''
            if (typeof category['categoryName1'] !== 'undefined') { categoryTitle = category['categoryName1'] }
            if (typeof category['categoryName2'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName2'] }
            if (typeof category['categoryName3'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName3'] }
            if (typeof category['categoryName4'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName4'] }
            if (typeof category['categoryName5'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName5'] }
            return categoryTitle
        },
        changeBrand: function (item) {
            this.$refs.brand.changeSellerFn(item)
        }
    }
}
</script>

<style scoped>


</style>
