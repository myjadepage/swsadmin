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
                    <li>FAQ를 관리하실 수 있습니다.</li>
                </ul>

                <form name="Frm">

                    <div class="section_head">
                        <h4>
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
                        </h4>
                        <div class="mgb5">
                            <select id="skey" name="skey" class="text_input" @change="loadSearchFaq">
                                <option value="1">제목</option>
                                <option value="2">내용</option>
                            </select>
                            <input type="text" name="keyword" v-model="keyword" class="text_input" style="width:150px; margin:0 5px" maxlength="50">
                            <b-button variant="outline-secondary" size="sm" @click="searchButton">검색</b-button>
                        </div>
                    </div>

                    <table class="t_list">
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
                        </tbody>
                    </table>

                    <div class="paging" style="margin-top:20px">
                        <span><router-link to="/"><strong>1</strong></router-link></span>
                    </div>

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
            faqData: [],
            mode: null,
            keyword: null

        }
    },
    mounted () {     
      this.axiosGetRequest('/api/v1/operations/faqs','',this.loadFaqList)  
    },
    methods: {
        //  검색
        loadSearchFaq(e) {
          this.mode  =  Number(e.target.value)
        },
        loadFaqList(res) {
           console.log(res)
           this.faqData = res.data.jsonData.siteFaqs
        },
        searchFaqList(res) {
            this.faqData = res.data.jsonData.siteFaqs
        },
        searchButton() {
            this.axiosGetRequest('/api/v1/operations/faqs', {'keywordCode':this.mode, 'keyword': this.keyword},this.searchFaqList) 
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
            this.axiosDeleteRequest('/api/v1/operations/faqs/' + siteFaqSysId,'',this.deleteFaqStatus)  
        },
        deleteFaqStatus(res) {
            console.log(res)
            window.location.reload()
            alert('삭제하였습니다.')
        }
    }
}
</script>

<style>

</style>