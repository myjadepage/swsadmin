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

                <form name="sFrm">
                    <div class="section_head">
                        <h4>
                            <select id="sconsult" name="sconsult" class="text_input">
                                <option value="">전체</option>
                                <option value="01">아이디/비밀번호찾기</option>
                                <option value="02">회원정보</option>
                                <option value="03">배송관련</option>
                                <option value="04">상품문의</option>
                                <option value="05">반품/교환/취소/환불</option>
                                <option value="06">주문결제</option>
                                <option value="07">적립금/쿠폰</option>
                                <option value="0">기타</option>
                            </select>
                        </h4>
                        <div class="mgb5">
                            <select id="skey" name="skey" class="text_input">
                                <option value="subject">제목</option>
                                <option value="content">내용</option>
                                <option value="id">아이디</option>
                            </select>

                            <input type="text" name="sword" value="" maxlength="50" class="text_input" style="width:150px; margin: 0 5px">
                            <b-button variant="outline-secondary" size="sm">검색</b-button>
                        </div>
                    </div>

                </form>

                <table class="t_list">
                    <caption>등록된 질문 리스트</caption>
                    <colgroup>
                        <col width="50">
                        <col width="150">
                        <col width="*">
                        <col width="250">
                        <col width="250">
                        <col width="100">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>분류</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>등록일</th>
                            <th>답변여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="oneQnaData === null || oneQnaData === undefined">
                            <td colspan="6"> 등록된 데이타가 없습니다.</td>
                        </tr>
                        <tr v-for="item in oneQnaData" :key="item.questionSysId" >
                            <td>{{ item.questionSysId}}</td>
                            <td>{{ item.treatFlag }}</td>
                            <td class="left">
                                <router-link :to="'/management/inquiry_detail/' + item.questionSysId"> {{ item.content }}</router-link>
                            </td>
                            <td>{{ item.email }}</td>
                            <td>{{ changeDate(item.createdAt) }}</td>
                            <td><span style="color:red">미답변</span></td>
                        </tr>
                    </tbody>
                </table>

                <div class="paging" style="margin-top:20px">
                    <b-button variant="secondary" style="margin:0 5px"> 1 </b-button>
                </div>
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
            oneQnaData: []
        }
    },
    mounted () {            
      this.axiosGetRequest('/api/v1/operations/questions/list','',this.oneQnaList)  
    },
    methods: {
        oneQnaList(res){
            console.log(res)
            this.oneQnaData = res.data.jsonData.siteQuestions
        },
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        }
    }
}
</script>

<style>

</style>