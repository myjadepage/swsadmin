<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>1:1문의를 관리하실 수 있습니다.</li>
                </ul>
               
                <div class="section_head">
                    <h4>                       
                        <!-- <select id="sconsult" name="sconsult" class="text_input">
                            <option value="">전체</option>
                            <option value="01">아이디/비밀번호찾기</option>
                            <option value="02">회원정보</option>
                            <option value="03">배송관련</option>
                            <option value="04">상품문의</option>
                            <option value="05">반품/교환/취소/환불</option>
                            <option value="06">주문결제</option>
                            <option value="07">적립금/쿠폰</option>
                            <option value="0">기타</option>
                        </select> -->
                    </h4>
                    <div class="mgb5">
                        <input type="text" maxlength="50" class="text_input" v-model="searchQuery"  placeholder="검색어" style="width:150px; margin: 0 5px">
                    </div>
                </div>

                <form name="Frm">
                        <b-table
                            ref="inquiryTable"
                            head-variant="light"           
                            :fields="fields"  
                            :items="filteredData"
                            :keyword="searchQuery"
                        >
                            <template v-slot:table-colgroup>
                                <col width="100">
                                <col width="150">
                                <col width="*">
                                <col width="250">
                                <col width="250">
                                <col width="100">
                            </template>
                            <template  v-slot:cell(content) = "content">
                                <router-link :to="'/management/inquiry_detail/'+ content.item.siteQuestionSysId">{{ content.item.title }}</router-link>
                            </template>
                            <template v-slot:cell(createdAt) = "createdAt">
                               {{ changeDate(createdAt.item.createdAt) }}
                            </template>
                            <template v-slot:cell(treatFlag) = "treatFlag">
                                <span style="color:red">{{ changeTreat(treatFlag.item.treatFlag) }}</span>
                            </template>
                        </b-table>

                         <div>
                            <b-button :disabled="pageNumber === 0" @click="prevPage" style="margin-right:5px">이전</b-button>
                            <b-button :disabled="pageNumber >= pageCount" @click="nextPage">다음</b-button>
                        </div>
                </form>
  </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [
      commonJs
    ],
    data() {
        return {
            pageNumber:0,
            perPage: 15,
            fields:[
                {key : 'siteQuestionSysId', label : 'No', sortable: true},
                {key : 'questionTypeCode', label : '분류', sortable: true},
                {key : 'content', label : '제목', sortable: true},
                {key : 'email', label : '글쓴이', sortable: true},
                {key : 'createdAt', label : '등록일', sortable: true},
                {key : 'treatFlag', label : '답변여부', sortable: true}
            ],
            oneQnaData: [],            
            searchQuery:''
        }
    },
    mounted () {
      this.paginatedData
    },
    computed: {
        pageCount() {
            let l = this.oneQnaData.length,
                s = this.perPage
            return Math.ceil(l/s)
        },
        paginatedData() {
            const start = this.pageNumber * this.perPage,
                  end = start + this.perPage
                  this.axiosGetRequest('/api/v1/operations/questions/list',{'startIndex':start, 'rowCount':end},this.oneQnaList,'', sessionStorage.getItem('accessToken'))
            return this.oneQnaData.slice(start, end)
        },
        filteredData() {
            return this.searchQuery ? this.oneQnaData.filter(item =>
                    item.title.includes(this.searchQuery) || item.email.includes(this.searchQuery)) : this.oneQnaData
        }
    },
    methods: {      
        nextPage() {          
            this.pageNumber++            
            this.oneQnaData.splice(0)
            this.paginatedData
        },
        prevPage() {           
            this.pageNumber--  
            this.oneQnaData.splice(0)         
            this.paginatedData        
        },   
        oneQnaList(res){                    
            let result = res.data.jsonData.siteQuestions            
            if(result) {
                for(let i=0 ; i < result.length; i++ ) {
                this.oneQnaData.push({
                    'siteQuestionSysId': result[i].siteQuestionSysId,
                    'questionTypeCode': result[i].questionTypeCode,
                    'title': result[i].content,
                    'email': result[i].email,
                    'createdAt': result[i].createdAt,
                    'treatFlag': result[i].treatFlag
                })
              }
            }else {
                this.oneQnaData=[]
            }
        },    
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        },
        changeTreat(flag) {
            return (flag === 0) ? '답변대기' : '답변완료'
        }
    }
}
</script>

<style>

</style>