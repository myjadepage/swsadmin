<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>게시판운영관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>FAQ를 관리하실 수 있습니다.</li>
                </ul>

                <form name="Frm">

                    <div class="section_head">
                        <!-- <h4>
                            <select name="searchFilter" class="text_input">
                                <option value="0">전체</option>
                                <option value="1">아이디/비밀번호찾기</option>
                                <option value="2">회원정보</option>
                                <option value="3">배송관련</option>
                                <option value="4">상품문의</option>
                                <option value="5">반품/교환/취소/환불</option>
                                <option value="6">주문결제</option>
                                <option value="7">적립금/쿠폰</option>
                            </select>
                        </h4> -->
                        <div class="mgb5">
                            <!-- <select id="skey" name="skey" class="text_input" @change="loadSearchFaq">
                                <option value="1">제목</option>
                                <option value="2">내용</option>
                            </select> -->
                            <input type="text" v-model="searchQuery" placeholder="검색어" class="text_input" style="width:150px; margin:0 5px" maxlength="50">
                            <!-- <b-button variant="outline-secondary" size="sm" @click="searchButton">검색</b-button> -->
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
                                <col width="250">
                                <col width="*">
                                <col width="250">
                                <col width="100">
                                <col width="100">
                            </template>

                            <template v-slot:cell(faqTypeCode) = "row">
                              {{ chanegValue(row.item.faqTypeCode) }}
                            </template>

                            <template  v-slot:cell(title) = "row">
                                <router-link :to="'/management/faq_detail/'+ row.item.siteFaqSysId">{{ row.item.title }}</router-link>
                            </template>

                            <template v-slot:cell(createdAt) = "row">
                               {{ changeDate(row.item.createdAt) }}
                            </template>

                            <template v-slot:cell(setting) = "row">
                                <b-button variant="outline-danger" size="sm"  @click="deleteFaq(row.item.siteFaqSysId)">삭제</b-button>
                            </template>
                        </b-table>

                         <div>
                            <b-button :disabled="pageNumber === 0" @click="prevPage" style="margin-right:5px">이전</b-button>
                            <b-button :disabled="pageNumber >= pageCount" @click="nextPage">다음</b-button>
                        </div>
                     </form>    

                    <!-- <table class="t_list">
                        <caption>FAQ 리스트</caption>
                        <colgroup>
                            <col width="50">
                            <col width="250">
                            <col width="*">
                            <col width="250">
                            <col width="100">
                            <col width="100">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>분류</th>
                                <th>제목</th>
                                <th>등록일</th>
                                <th>조회수</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="faqData === null || faqData === undefinded">
                                <td colspan="6">등록된 데이타가 없습니다.</td>
                            </tr>

                            <tr v-for="item in faqData" :key="item.siteFaqSysId">
                                <td>{{ item.siteFaqSysId }}</td>
                                <td>{{ chanegValue(item.faqTypeCode)}}</td>
                                <td class="left">
                                    <router-link :to="'/management/faq_detail/'+ item.siteFaqSysId">{{ item.title }}</router-link>
                                </td>
                                <td>{{ changeDate(item.createdAt) }}</td>
                                <td>{{ item.viewCount }}</td>
                                <td>
                                    <span class="button small">
                                        <b-button variant="outline-danger" size="sm"  @click="deleteFaq(item.siteFaqSysId)">삭제</b-button>
                                    </span>
                                </td>
                            </tr>

                            <tr v-for="item in searchData" :key="item.siteFaqSysId">
                                <td>{{ item.siteFaqSysId }}</td>
                                <td>{{ chanegValue(item.faqTypeCode)}}</td>
                                <td class="left">
                                    <router-link :to="'/management/faq_detail/'+ item.siteFaqSysId">{{ item.title }}</router-link>
                                </td>
                                <td>{{ changeDate(item.createdAt) }}</td>
                                <td>{{ item.viewCount }}</td>
                                <td>
                                    <span class="button small">
                                        <b-button variant="outline-danger" size="sm"  @click="deleteFaq(item.siteFaqSysId)">삭제</b-button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="paging" style="margin-top:20px">
                         <b-button variant="secondary" style="margin:0 5px"> 1 </b-button>
                    </div> -->

                    <div class="btn_center">
                        <b-button variant="outline-info" size="lg" @click="$router.push('/management/faq_reg')">등록</b-button>
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
                {key : 'siteFaqSysId', label : 'No', sortable: true},
                {key : 'faqTypeCode', label : '분류', sortable: true},
                {key : 'title', label : '제목', sortable: true},               
                {key : 'createdAt', label : '등록일', sortable: true},
                {key : 'viewCount', label : '조회수', sortable: false},
                {key : 'setting', label : '관리', sortable: false}
            ],
            faqData: [],
            searchQuery: ''
        }
    },
    mounted () {     
        this.paginatedData  
    },
    computed: {
        pageCount() {
            let l = this.faqData.length,
                s = this.perPage
            return Math.ceil(l/s)
        },
        paginatedData() {
            const start = this.pageNumber * this.perPage,
                  end = start + this.perPage
                  this.axiosGetRequest('/api/v1/operations/faqs',{'startIndex':start, 'rowCount':end}, this.loadFaqList)
            return this.faqData.slice(start, end)
        },
        filteredData() {
            return this.searchQuery ? this.faqData.filter(item =>
                item.title.includes(this.searchQuery) || this.chanegValue(item.faqTypeCode).includes(this.searchQuery)) : this.faqData
        }
    },
    methods: {
       nextPage() {          
            this.pageNumber++            
            this.faqData.splice(0)
            this.paginatedData
        },
        prevPage() {           
            this.pageNumber--  
            this.faqData.splice(0)         
            this.paginatedData        
        },   
        loadFaqList(res) {           
           let result = res.data.jsonData.siteFaqs
           console.log(result)
            if(result) {
                for(let i=0 ; i < result.length; i++ ) {
                this.faqData.push({
                    'siteFaqSysId': result[i].siteFaqSysId,
                    'faqTypeCode': result[i].faqTypeCode,
                    'title': result[i].title,                   
                    'createdAt': result[i].createdAt,
                    'viewCount': result[i].viewCount
                })
              }
            }else {
                this.faqData=[]
            }
        },
        chanegValue(type) {            
            switch (type) {
                case 1: type = '아이디/비밀번호찾기'; break;
                case 2: type = '회원정보'; break;
                case 3: type = '배송관련'; break;
                case 4: type = '상품문의'; break;
                case 5: type = '반품/교환/취소/환불'; break;
                case 6: type = '주문결제'; break;
                case 7: type = '적립금/쿠폰'; break;
            }
            return type
        },
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        },
        deleteFaq(siteFaqSysId) {                   
           this.axiosDeleteRequest('/api/v1/operations/faqs/' + siteFaqSysId,'',this.deleteFaqStatus, '', sessionStorage.getItem('accessToken')) 
        },
        deleteFaqStatus(res) {
            console.log('삭제성공',res)
            window.location.reload()
            alert('삭제하였습니다.')
        }
    }
}
</script>

<style>

</style>