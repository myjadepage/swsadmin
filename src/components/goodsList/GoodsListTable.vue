<template>
    <div>
        <div class="float-left mt-1 mb-1">
            <b>총 {{products.length}} 건의 주문이 조회되었습니다.</b>
        </div>
        <div class="float-right mt-1 mb-1">
            <select v-model="perPage">
                <option value="10">10개 보기</option>
                <option value="30">30개 보기</option>
                <option value="50">50개 보기</option>
            </select>
        </div>
        <!-- selectable -->
        <!-- :filter="FilterFields"
        :filter-function="filtering" -->
        <b-table 
            :items="products" 
            :busy="isBusy" 
            :fields="fields" 
            head-variant="light"
            :select-mode="'single'"
            :current-page="currentPage"
            :per-page="perPage"
            @filtered="resultFilter"
            show-empty
            
        >
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>&emsp;&emsp;&emsp;&emsp;
                    <strong>Loading...</strong>
                    </div>
            </template>
            <template v-slot:table-colgroup>
                <col width="50px"/>
                <col width="120px" />
                <col width="*" />
                <col width="180px" />
                <col width="180px" />
                <col width="60px" />
            </template>
            <template v-slot:cell(productCode)="code">
                {{code.item.prdtSysId}}
                <div>
                    <template v-if="code.item.isDisplay === 0">
                        <b-button class="float-left mb-1" variant="light" size="sm" @click="changeDisplayFn(code.item, 1)">진열하기</b-button>
                    </template>
                    <template v-else>
                        <b-button class="float-left mb-1" variant="light" size="sm" @click="changeDisplayFn(code.item, 0)">상품진열 안하기</b-button>
                    </template>
                    <template v-if="code.item.isSoldout === 0">
                        <b-button class="float-left" variant="danger" size="sm" @click="changeSoldoutFn(code.item, 1)">품절로 표시</b-button>
                    </template>
                </div>
            </template>
            <template v-slot:cell(title)="title">
                <div class="align-middle">
                    <div class="media">
                        <img :src="title.item.smallImageUrl" class="mr-3" style="width: 80px">
                        <div class="media-body">
                            <h5 class="mt-3"><b>{{ title.item.name }}</b></h5>
                            <p class="mt-1" style="color: #FF9900">{{ title.item.categoryTitle }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:cell(checkBox)="checkbox">
                <b-form-checkbox size="lg" class="mb-1" :value="1" v-model.number="checkbox.item.isWeekly">위클리 베스트</b-form-checkbox>
                <b-form-checkbox size="lg" class="mb-1" :value="1" v-model.number="checkbox.item.isPlanBrand">브랜드기획전</b-form-checkbox>
                <b-form-checkbox size="lg" class="mb-1" :value="1" v-model.number="checkbox.item.isPlanThema">테마기획전</b-form-checkbox>
                <b-form-checkbox size="lg" class="mb-1" :value="1" v-model.number="checkbox.item.isSale">세일</b-form-checkbox>
            </template>
            <template v-slot:cell(price)="price">
                <p class="mt-1">
                    <label>네이버판매가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`price_${price.item.prdtSysId}`" v-model.number="price.item.naverPrice" style="width: 100px"/>
                </p>
                <p class="mt-1">
                    <label>판매가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`price_${price.item.prdtSysId}`" v-model.number="price.item.price" style="width: 100px"/>
                </p>
                <p class="mt-1">
                    <label>시중가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`marketPrice_${price.item.prdtSysId}`" v-model.number="price.item.marketPrice" style="width: 100px"/>
                </p>
                <p class="mt-1">
                    <label>공급가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`supplyPrice_${price.item.prdtSysId}`" v-model.number="price.item.supplyPrice" style="width: 100px"/>
                </p>
            </template>
            <template v-slot:cell(view)="view">
                <p>{{view.item.viewCount}} 회</p>
                <p>{{view.item.salesQty}} 개</p>
                <template v-if="view.value.stockQty > 0">
                    <p><input type="text" class="text_input number_input" :ref="`stockQty_${view.item.prdtSysId}`" v-model.number="view.item.stockQty" style="width: 100px"> 개</p>
                </template>
                <template v-else>
                    <p>무제한</p>
                </template>
            </template>
            <template v-slot:cell(setting)="setting">
                <b-button-group vertical size="sm">
                    <b-button variant="light">이력</b-button>
                    <b-button variant="success" @click="savePriceData(setting.item)">저장</b-button>
                    <b-button variant="light">복사</b-button>
                    <b-button variant="primary" @click="modifyProductData(setting.item.prdtSysId)">수정</b-button>
                    <b-button @click="deleteProductData(setting.item.prdtSysId)">삭제</b-button>
                </b-button-group>
            </template>
            <template v-slot:empty>
                <p class="text-center">죄송합니다. 데이터를 찾을수 없습니다.</p>
            </template>
        </b-table>
        <div class="float-right">
            <b-pagination  v-model="currentPage"  :total-rows="totalPage" :per-page="perPage"></b-pagination>
        </div>
    </div>
</template>
<style scoped>
    p{
        height: 25px;
    }
</style>
<script>
import commonJs from '@/assets/js/common.js'
export default {
  data: () => ({
      perPage: 10,      // 페이지당 표현수
      fields: [
          {key : 'productCode', label: '고유번호', class: 'text-center align-middle', thStyle: 'width: 9%'},
          {key : 'title', label: '상품명 / 카테고리 / 공급업체', class: 'align-middle'},
          {key : 'checkBox', label: '상품진열', class: 'text-left align-middle pl-4', thStyle: 'width: 9%'},
          {key : 'price', label: '판매가 / 시중가 / 공급가', class: 'text-right align-middle', thStyle: 'width: 15%'},
          {key : 'view', label: '조회수 / 판매수량 / 재고', class: 'text-right align-middle', thStyle: 'width: 10%'},
          {key : 'setting', label: '기능', class: 'align-middle', thStyle: 'width: 4%'}
      ],
  }),
  props: ['FilterFields','products','isBusy','totalPage','currentPage'],
  mixins: [commonJs],
  methods: {
        resultFilter: function (filteredItems) {
            this.totalPage = filteredItems.length
            this.currentPage = 1
        }, 
        changeDisplayFn: function (item, value) {
            if (confirm('상품진열 상태를 변경하시겠습니까?')){    
                this.products.forEach(_item => {
                    if(_item.id === item.code) {
                        _item.productCode.isDisplay=value
                    }
                })
                let param = { isDisplay : value }
                let resultDisplayUpdateFn = function (res) {
                    if(res.data.jsonData.code == 200) {
                        alert('상품진열 상태가 변경되었습니다.')
                        return true
                    }
                }
                this.axiosPatchRequest('/api/v1/products/' + item.code + '/isdisplay',{jsonData : param}, resultDisplayUpdateFn)
            }
        },
        changeSoldoutFn: function (item, value) {
            if (confirm('품절상태로 변경하시겠습니까?')){
                this.products.forEach(_item => {
                    if(_item.id === item.code) {
                        _item.productCode.isSoldout=value
                    }
                })
                let param = { isSoldout : value }
                let resultSoldoutUpdateFn = function (res) {
                    if(res.data.jsonData.code == 200) {
                        alert('품절상태가 변경되었습니다.')
                        return true
                    }
                }
                this.axiosPatchRequest('/api/v1/products/' + item.code + '/issoldout',{jsonData : param}, resultSoldoutUpdateFn)
            }
        },
        savePriceData: function (item) {
            console.log(item)
            if (confirm('가격 및 재고 수량을 수정하시겠습니까?')){
                let params = {
                    naverPrice: item.naverPrice,
                    price: item.price,
                    marketPrice: item.marketPrice,
                    supplyPrice: item.supplyPrice,
                    stockQty: item.stockQty,
                    isWeekly: (item.isWeekly ? 1: 0),
                    isSale: (item.isSale ? 1: 0),
                    isPlanBrand: (item.isPlanBrand ? 1: 0),
                    isPlanThema: (item.isPlanThema ? 1: 0)
                }
                this.axiosPatchRequest(`/api/v1/products/${item.prdtSysId}/listsave`, {jsonData: params}, res => {
                    if(res.data.jsonData.code === 200) {
                        alert('수정완료!')
                    }
                })
            }
        },
        deleteProductData: function (id) {
            if (confirm('상품을 휴지통으로 이동하시겠습니까?')) {
                let params = {isDelete : 1}
                this.axiosPatchRequest('/api/v1/products/' + id + '/isdelete', {jsonData: params}, this.resultProductDeleteFn)
            }
        }, 
        resultProductDeleteFn: function (res) {
            if(res.data.jsonData.code === 200) {
                alert('상품이 휴지통으로 이동하였습니다.')
                this.$emit('refresh')
            }
        },
        modifyProductData: function (id) {
            window.location.href='/goods/goods_reg/'+id
        }
  }
}
</script>