<template>
    <div id="contents">
        <h3>{{ $route.name }}</h3>
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
                                <select name="" id="">
                                    <option value="">선택하세요</option>
                                </select>
                            </td>
                        </tr>                       
                        <tr>
                            <th>기간</th>
                            <td>
                                <sws-date :parentData="FilterFields"></sws-date>
                            </td>
                        </tr>  
                        <tr>
                            <th>카테고리별</th>
                            <td>
                                <select name="" id="">
                                    <option value="">선택하세요</option>
                                </select>

                                <select name="" id="">
                                    <option value="">선택하세요</option>
                                </select>

                                <select name="" id="">
                                    <option value="">선택하세요</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>키워드검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;" v-model="FilterFields.prdtCode">
                                    <option value="name">상품명</option>
                                    <option value="prdtCode">상품코드</option>
                                </select>
                                <input type="text" name="sword" class="text_input" v-model="FilterFields.FieldText" @keyup.enter="searchFilteringFn">                               
                                <b-button variant="secondary" size="sm" @click="searchFilteringFn">검색</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <BroadcastRequesTable 
            :FilterFields="FilterFields"
            :products="products" 
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
import SwsDate from '@/components/common/SwsDate'
export default {
    data () {
        return {           
            FilterFields: {
                categoryList: [],
                brandSysId: 0,
                sellerSysId: 0,
                minPrice: 0,
                maxPrice: 0,
                isDisplay: 2,
                startDate: '',
                endDate: '',
                prdtCode: 'name',
                FieldText: '',
                valuable: 'all'
            },
            products: [],
            isBusy: true,
            totalPage: 0,
            currentPage: 1,
        }
    },
    mixins: [commonJs],
    components: {     
        BroadcastRequesTable,      
        SwsDate
    },
    mounted () { 
        this.axiosGetRequest('/api/v1/products/lists','',this.loadProductsList)
    },
    methods: {
        searchFilteringFn: function () {
            let params = {}
            for(let _k in this.FilterFields) {
                if (_k === 'isDisplay') {
                    if (this.FilterFields[_k] !== 2) {
                        params[_k] = this.FilterFields[_k]
                    }
                } else if (_k === 'valuable'){
                    if (this.FilterFields[_k] === 'unlimit') {
                        params.stockTypeCode = 1
                    } else if (this.FilterFields[_k] === 'limit') {
                        params.stockTypeCode = 2
                    } else if (this.FilterFields[_k] === 'not_soldout') {
                        params.stockTypeCode = 2
                        params.stockQty = 0
                    } else if (this.FilterFields[_k] === 'soldout') {
                        params.isSoldout = 1
                    }
                } else if (_k === 'prdtCode'){
                    params[this.FilterFields.prdtCode] = this.FilterFields.FieldText
                } else if(_k === 'categoryList') {
                    for (const cate of this.FilterFields[_k]){
                        if (!cate.value <= 0) {
                            params['categorySysId' + cate.level] = cate.value
                        }
                    }
                } else {
                    if(!this.isEmpty(this.FilterFields[_k]) && this.FilterFields[_k] !== 0){
                        params[_k] = this.FilterFields[_k]
                    }
                }
            }
            this.isBusy=true
            console.log(params)
            this.axiosGetRequest('/api/v1/products/lists', params, this.loadProductsList)
            this.products.splice(0)
        },
        loadProductsList(res) {
            let result = res.data.jsonData.products
            let categoryTitle = ''
            this.products.splice(0)
            if(this.isEmpty(result)){
                this.isBusy=false
                return false
            }
            for (let i = 0 ; i < result.length ; i++) {
                categoryTitle = ''
                if (!this.isEmpty(result[i].categories)) { categoryTitle = this.convertCategoryTitle(result[i].categories[0]) }
                this.products.push({
                    selected: '',
                    id: result[i].prdtSysId, 
                    productCode: {
                        code: result[i].prdtSysId,
                        isDisplay: result[i].isDisplay,
                        isSoldout: result[i].isSoldout,
                        stockQty: result[i].stockQty
                    },
                    date: "나는방송자다/2020-10-20",
                    bjImage: "",
                    title: {
                        image: result[i].smallImageUrl,
                        productName: result[i].name,
                        category: categoryTitle,
                    },
                    subTitle: "품절대란견미리팩트 솔직후기방송",
                    type: "라이브방송 /(방송중)",
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
