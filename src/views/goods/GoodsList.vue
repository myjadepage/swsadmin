<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>등록하신 상품들을 수정/관리 하실 수 있습니다.</li>
            <li>[상품영역]을 클릭하시면 영역별로 상품들을 보실 수 있습니다.</li>
            <li>서브메인 영역에 상품을 올릴시려면 상품관리에서 제일 마지막 카테고리분류(소분류)를 클릭하시면 됩니다.</li>
            <li>[상품진열]버튼을 클릭하시면 상품을 숨길수 있으며 [진열안함]버튼을 클릭하시면 상품을 전시하실수 있습니다.</li>
            <li>[상품영역]중 서브메인과 중간영역은 카테고리 지정시에만 가능합니다.</li>
        </ul>

        <form name="sFrm" onsubmit="return false">
            <div class="box">
                <table class="t_form">
                    <colgroup>
                        <col width="170">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>상품분류</th>
                            <td>
                                <sws-category :selectedCategory="FilterFields.categoryList"></sws-category>
                            </td>
                        </tr>
                        <tr>
                            <th>상품판매자</th>
                            <td>
                                <Sws-seller
                                    @changeFn="resultSeller"
                                ></Sws-seller>
                            </td>
                        </tr>
                        <tr>
                            <th>상품등록일</th>
                            <td>
                                <b-row>
                                    <b-col cols="2">
                                        <b-form-datepicker id="startDate" placeholder="시작일자 선택" v-model="FilterFields.startDate"></b-form-datepicker>
                                    </b-col>
                                    <b-col cols="2">
                                        <b-form-datepicker id="endDate" placeholder="종료일자 선택" v-model="FilterFields.endDate"></b-form-datepicker>
                                    </b-col>
                                </b-row>
                            </td>
                        </tr>
                        <tr>
                            <th>그룹별</th>
                            <td>
                                <select id="sbrand" name="sbrand" v-model="FilterFields.brandSysId">
                                    <option v-for="(item, index) in brands" :key="index" :value="item.value">{{item.text}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>재고여부</th>
                            <td>
                                <label><input type="radio" name="sstock" value="all" v-model="FilterFields.valuable" checked> 전체상품</label>
                                <label><input type="radio" name="sstock" value="unlimit" class="mgl20" v-model="FilterFields.valuable"> 재고 무제한</label>
                                <label><input type="radio" name="sstock" value="limit" class="mgl20 " v-model="FilterFields.valuable"> 재고있는 상품(무제한 제외)</label>
                                <label><input type="radio" name="sstock" value="not_soldout" class="mgl20" v-model="FilterFields.valuable"> 재고가 실제 0인 상품</label>
                                <label><input type="radio" name="sstock" value="soldout" class="mgl20" v-model="FilterFields.valuable"> 품절로 선택된 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>진열여부</th>
                            <td>
                                <label><input type="radio" name="sdisplay" value=2 v-model.number="FilterFields.isDisplay">전체상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20" value=1 v-model.number="FilterFields.isDisplay">진열되어 있는 상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20" value=0 v-model.number="FilterFields.isDisplay">진열 안되어 있는 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>상품가격</th>
                            <td>
                                <input type="text" name="ssprice" class="text_input number_input" v-model.number="FilterFields.minPrice"> 원 ~
                                <input type="text" name="seprice" class="text_input number_input" v-model.number="FilterFields.maxPrice"> 원
                            </td>
                        </tr>
                        <tr>
                            <th>직접검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;" v-model="FilterFields.prdtCode">
                                    <option value="name">상품명</option>
                                    <option value="prdtCode">상품코드</option>
                                </select>
                                <input type="text" name="sword" class="text_input" v-model="FilterFields.FieldText" @keyup.enter="searchFilteringFn">
                                &emsp;
                                <b-button variant="secondary" size="sm" @click="searchFilteringFn">검색</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <Goods-list-table 
            :FilterFields="FilterFields"
            :products="products" 
            :isBusy="isBusy"   
            :totalPage="totalPage"
            :currentPage="currentPage"
            @refresh="searchFilteringFn"
        >
        </Goods-list-table>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import GoodsListTable from '@/components/goodsList/GoodsListTable'
import SwsCategory from '@/components/common/SwsCategory.vue'
import SwsSeller from '@/components/common/SwsSeller'
export default {
    data () {
        return {
            brands: [
                {value: 0, text:':: 브랜드를 선택하십시오 ::'}
            ],
            sellers: [
                {value: 0, text:':: 판매자를 선택하십시오 ::'}
            ],
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
        SwsSeller,
        GoodsListTable,
        SwsCategory
    },
    mounted () {  
        this.axiosGetRequest('/api/v1/brands','',this.initialBrands)
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
                    title: {
                        image: result[i].smallImageUrl,
                        productName: result[i].name,
                        category: categoryTitle,
                    },
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
        initialBrands: function (res) {
            var data = res.data.jsonData.brands
            data.forEach(item => {
                this.brands.push({value: item.brandSysId, text: item.name})
            })
        },
        resultSeller: function (val) {
            this.FilterFields.sellerSysId = val
        }
    }
}
</script>
