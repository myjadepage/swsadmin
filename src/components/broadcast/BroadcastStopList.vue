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
                <col width="200px"/>                
                <col width="*" />
                <col width="200px"/>
                <col width="200px"/>
                <col width="450px" />             
            </template> 

            <template  v-slot:cell(name)>
                <div class="media">
                    <img src="https://lh3.googleusercontent.com/-96yTqHCnHdc/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJM2TCVotley-jVL14PBdK2hby4PsQ/s48-c/photo.jpg" class="gb_4b gb_kb">
                    <div class="media-body">
                        <h5>abv1121</h5>
                        <p class="mt-1">라이혼 어흥</p>
                    </div>                  
                </div>
            </template>
            <template v-slot:cell(title)="title">
                <div class="align-middle">
                    <div class="media">
                        <div class="media-body">
                            <h5><b>{{ title.value.productName }}</b></h5>                           
                        </div>
                        <p></p>
                    </div>
                </div>
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
    </div>
</template>
<style scoped>
    p{height: 25px;}
</style>
<script>
import commonJs from '@/assets/js/common.js'
export default {
  data: () => ({
      defaultImage: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Noimage.svg',
      perPage: 10,      // 페이지당 표현수
      fields: [         
          {key : 'name', label: '유저 아이디/닉네임', class: 'text-center align-middle'},         
          {key : 'title', label: '방송제목', class: 'align-middle'},
          {key : 'startDate', label: '방송시작일', class: 'align-middle'},
          {key : 'stopDate', label: '중지일시', class: 'align-middle'},
          {key : 'stopStory', label: '중지사유', class: 'align-middle'}
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
        }
  }
}
</script>
<style scoped>
.gb_4b {
    border: none;
    vertical-align: top;
    height: 32px;
    width: 32px;
}
.gb_kb {
    -webkit-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
}
</style>