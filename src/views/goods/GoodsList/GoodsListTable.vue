<template>
    <div>
        <div class="float-right mt-1 mb-1">
            <select v-model="perPage">
                <option value="10" selected>10개 보기</option>
                <option value="50">50개 보기</option>
                <option value="100">100개 보기</option>
            </select>
        </div>
        <b-table 
            :items="products" 
            :busy="isBusy" 
            :fields="fields" 
            selectable
            head-variant="light"
            :select-mode="'single'"
            :filter="FilterFields"
            :filter-function="filtering"
            :current-page="currentPage"
            :per-page="perPage"
            @filtered="resultFilter"
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
            <template v-slot:cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>
            <template v-slot:cell(productCode)="code">
                {{code.value.code}}
                <div>
                    <b-button class="float-left mb-1" variant="light" size="sm">상품진열 안하기</b-button>
                    <template v-if="code.value.salesQty === 0 && code.value.stockQty === 0">
                        <b-button class="float-left" variant="light" size="sm">진열하기</b-button>
                    </template>
                    <template v-else>
                        <b-button class="float-left" variant="danger" size="sm">품절로 표시</b-button>
                    </template>
                </div>
            </template>
            <template v-slot:cell(title)="title">
                <div class="align-middle">
                    <div class="media">
                        <img :src="title.value.image" class="mr-3" style="width: 80px">
                        <div class="media-body">
                            <h5 class="mt-3"><b>{{ title.value.productName }}</b></h5>
                            <p class="mt-1" style="color: #FF9900">{{ title.value.category }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:cell(price)="price">
                <p class="mt-1">
                    <label>판매가</label>&emsp;
                    <input type="text" class="text_input number_input" :value="price.value.price" style="width: 70px"/>
                </p>
                <p class="mt-1">
                    <label>시중가</label>&emsp;
                    <input type="text" class="text_input number_input" :value="price.value.marketPrice" style="width: 70px"/>
                </p>
                <p class="mt-1">
                    <label>공급가</label>&emsp;
                    <input type="text" class="text_input number_input" :value="price.value.supplyPrice" style="width: 70px"/>
                </p>
            </template>
            <template v-slot:cell(view)="view">
                <p>{{view.value.viewCount}} 회</p>
                <p>{{view.value.salesQty}} 개</p>
                <template v-if="view.value.stockQty > 0">
                    <p><input type="text" class="text_input number_input" :value="view.value.stockQty" style="width: 70px"> 개</p>
                </template>
                <template v-else>
                    <p>무제한</p>
                </template>
            </template>
            <template v-slot:cell(setting)>
                <b-button-group vertical size="sm">
                    <b-button variant="light">이력</b-button>
                    <b-button variant="success">저장</b-button>
                    <b-button variant="light">복사</b-button>
                    <b-button variant="primary">수정</b-button>
                    <b-button>삭제</b-button>
                </b-button-group>
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
      products: [],
      isBusy: true,
      currentPage: 1,   // 현재 페이지
      perPage: 10,      // 페이지당 표현수
      totalPage: 0,
      fields: [
          {key : 'selected', label: '', class: 'text-center align-middle'},
          {key : 'productCode', label: '고유번호', class: 'text-center align-middle'},
          {key : 'title', label: '상품명 / 카테고리 / 공급업체', class: 'align-middle'},
          {key : 'price', label: '판매가 / 시중가 / 공급가', class: 'text-right align-middle'},
          {key : 'view', label: '조회수 / 판매수량 / 재고', class: 'text-right align-middle'},
          {key : 'setting', label: '기능', class: 'align-middle'}
      ]
  }),
  props: ['FilterFields'],
  mixins: [commonJs],
  mounted () {
      this.init()
  },
  methods: {
      init: function () {
        this.axiosGetRequest('/api/v1/products/lists','',this.loadProductsList)
      },
      filtering (row, filter) {
          // 상품명 검색
          if ((row.title.productName).indexOf(filter.FieldText) > -1) {
              return row
          }
      },
      resultFilter(filteredItems) {
          this.totalPage = filteredItems.length
          this.currentPage = 1
      },
      loadProductsList(res) {
        this.isBusy=true
        let result = res.data.jsonData.products
        let categoryTitle = ''
        this.products.splice(0,1)
        for (let i = 0 ; i < result.length ; i++) {
            categoryTitle = this.convertCategoryTitle(result[i].categories[0])
            this.products.push({
                selected: '', 
                productCode: {
                    code: result[i].prdtSysId,
                    salesQty: result[i].salesQty,
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
        return res
      },
      convertCategoryTitle(category) {
          let categoryTitle = ''
          if (typeof category['categoryName1'] !== 'undefined') { categoryTitle = category['categoryName1'] }
          if (typeof category['categoryName2'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName2'] }
          if (typeof category['categoryName3'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName3'] }
          if (typeof category['categoryName4'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName4'] }
          if (typeof category['categoryName5'] !== 'undefined') { categoryTitle += ' > ' + category['categoryName5'] }
          return categoryTitle
      }
  }
}
</script>