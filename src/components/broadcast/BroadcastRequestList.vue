<template>
    <div>
        <div class="float-left mt-1 mb-1">
            <b>총 {{totalPage}} 건의 주문이 조회되었습니다.</b>
        </div>
        <div class="float-right mt-1 mb-1">
            <select v-model="perPage">
                <option value="10">10개 보기</option>
                <option value="30">30개 보기</option>
                <option value="50">50개 보기</option>
            </select>
        </div>    
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
                <col width="50px"/>
                <col width="150px"/>
                <col width="150px" />
                <col width="*" />
                <col width="250px"/>
                <col width="90px" />
                <col width="200px" />
                <col width="170px" />
                <col width="60px" />
            </template>
            <template v-slot:cell(selected)>
                <template>
                   <input type="checkbox"/>
                </template>               
            </template>
            <template v-slot:cell(productCode)="code">
                {{code.value.code}}                
            </template>
            <template v-slot:cell(date)>
                <p>나는 방송자다</p>
                <p>2020-10-20</p>               
            </template>
            <template v-slot:cell(title)="title">
                <div class="align-middle">
                    <div class="media">
                        <img :src="title.value.image" class="mr-3" style="width: 80px">
                        <div class="media-body">
                            <h5 class="mt-3"><b>{{ title.value.productName }}</b></h5>
                            <p class="mt-1" style="color: #FF9900">{{ title.value.category }}</p>
                        </div>
                        <p></p>
                    </div>
                </div>
            </template>
            <template v-slot:cell(price)="price">
                <p class="mt-1">
                    <label>판매가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`price_` + price.item.id" :value="price.value.price" style="width: 100px"/>
                </p>
                <p class="mt-1">
                    <label>시중가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`marketPrice_` + price.item.id" :value="price.value.marketPrice" style="width: 100px"/>
                </p>
                <p class="mt-1">
                    <label>공급가</label>&emsp;
                    <input type="text" class="text_input number_input" :ref="`supplyPrice_` + price.item.id" :value="price.value.supplyPrice" style="width: 100px"/>
                </p>
            </template>
            <template v-slot:cell(view)="view">
                <p>{{view.value.viewCount}} 회</p>
                <p>{{view.value.salesQty}} 개</p>
                <template v-if="view.value.stockQty > 0">
                    <p><input type="text" class="text_input number_input" :ref="`stockQty_` + view.item.id" :value="view.value.stockQty" style="width: 100px"> 개</p>
                </template>
                <template v-else>
                    <p>무제한</p>
                </template>
            </template>
            <template v-slot:cell(setting)="setting">
                <b-button-group vertical size="sm">                   
                    <b-button variant="secondary">취소</b-button>
                    <b-button variant="success" @click="admitLiveData(setting.item.id)">승인</b-button>
                    <b-button variant="danger" @click="deleteProductData(setting.item.id)">삭제</b-button>
                </b-button-group>
            </template>
            <template v-slot:empty>
                <p class="text-center">죄송합니다. 데이터를 찾을수 없습니다.</p>
            </template>
        </b-table>
        <div class="float-right">
            <b-pagination 
                v-model="currentPage" 
                :total-rows="totalPage"
                :per-page="perPage"
            >
            </b-pagination>
        </div>

         <div class="btn_center">
            <b-button variant="primary" size="lg">라이브 등록</b-button>
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
      defaultImage: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Noimage.svg',
      perPage: 10,      // 페이지당 표현수
      fields: [
          {key : 'selected', label: '', class: 'text-center align-middle'},
          {key : 'productCode', label: '고유번호', class: 'text-center align-middle'},
          {key : 'date', label: '방송자/방송날짜', class: 'text-center align-middle'},
          {key : 'bjImage', label: '방송자커버사진', class: 'text-center align-middle'},
          {key : 'title', label: '상품명 / 카테고리 / 태그', class: 'align-middle'},
          {key : 'subTitle', label: '방송명', class: 'align-middle'},
          {key : 'type', label: '방송타입', class: 'align-middle'},
          {key : 'price', label: '판매가 / 시중가 / 공급가', class: 'text-right align-middle'},
          {key : 'view', label: '조회수 / 판매수량 / 재고', class: 'text-right align-middle'},
          {key : 'setting', label: '기능', class: 'align-middle'}
      ],
  }),
  props: ['FilterFields','products','isBusy','totalPage','currentPage'],
  mixins: [commonJs],
  methods: {
        resultFilter: function (filteredItems) {
            this.totalPage = filteredItems.length
            this.currentPage = 1
        },  
        admitLiveData: function (id) {
            if (confirm('해당 방송을 승인하시겠습니까?')){
                let params = {
                    price: parseInt(this.$refs['price_' + id].value),
                    marketPrice: parseInt(this.$refs['marketPrice_' + id].value),
                    supplyPrice: parseInt(this.$refs['supplyPrice_' + id].value),
                    stockQty: parseInt(this.$refs['stockQty_' + id].value)
                }
                let resultLiveUpdateFn = function (res) {
                    if(res.data.jsonData.code === 200) {
                        alert('승인완료!')
                    }
                }
                this.axiosPatchRequest('/api/v1/products/' + id + '/listsave', {jsonData: params}, resultLiveUpdateFn)
            }
        },
        deleteProductData: function (id) {
            if (confirm('해당방송을 휴지통으로 이동하시겠습니까?')) {
                let params = {isDelete : 1}
                this.axiosPatchRequest('/api/v1/products/' + id + '/isdelete', {jsonData: params}, this.resultProductDeleteFn)
            }
        }, 
        resultProductDeleteFn: function (res) {
            if(res.data.jsonData.code === 200) {
                alert('방송이 휴지통으로 이동하였습니다.')
                this.$emit('refresh')
            }
        }
  }
}
</script>