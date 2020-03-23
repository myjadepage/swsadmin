<template>
   <div id="contents">
                <h3>{{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>1:1문의를 관리하실 수 있습니다.</li>
                </ul>
              
                    <div class="section_head"><h4><i class="xi-check-circle"></i> 질문</h4></div>

                    <table class="t_form">
                        <caption>등록된 질문 내역</caption>
                         <colgroup>
                            <col width="200">
                            <col width="*">
                            <col width="200">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>분류</th><td colspan="3">{{ question.categorize }}</td>
                            </tr>
                            <tr>
                                <th>제목</th><td colspan="3">{{ question.title}}</td>
                            </tr>
                            <tr>
                                <th>작성자</th><td>{{ question.userId }}</td>
                                <th>등록일</th><td>{{ question.created }}</td>
                            </tr>
                            <tr>
                                <th>이메일</th><td colspan="3">{{ question.email }}</td>
                            </tr>
                            <tr>
                                <th>휴대폰</th><td colspan="3">{{ question.mobile }}</td>
                            </tr>
                            <tr>
                                <th>내용</th><td colspan="3">{{ question.content }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="over_h mgt5">
                        <div class="fl">
                            <b-button variant="secondary">목록으로</b-button>
                        </div>
                        <div class="fr">
                            <b-button variant="danger">삭제하기</b-button>
                        </div>
                    </div>

                    <div class="section_head"><h4>답변</h4></div>

                <form name="Frm">
                    <table class="t_form">
                        <caption>답변 내용</caption>
                        <tbody>
                            <tr>
                                <th>답변제목</th>
                                <td>
                                    <input name="subject" v-model="subject" class="text_input" style="width:98%" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <th>답변내용</th>
                                <td>
                                    <textarea name="content" v-model="content" class="text_input" style="height:200px;width:98%"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <button type="button" class="btn btn-info" @click="submitAnswer">확인</button>
                    </div>
                </form>
   </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [commonJs],
    data() {
        return {
            question : {
                'categorize': '배송관련',
                'title': '배송문의',
                'userId': 'ajskdkf',
                'created' : '2019-10-10',
                'email' : 'joonh0911@ncgn.co.kr',
                'mobile': '010-0000-0000',
                'content' : '언제 배송됩니까?'
            },
            subject: null,
            content: null
        }
    },
    methods: {       
        submitAnswer: function () {
            var vm = this
            if(this.subject === null) {
                alert('답변제목을 입력해 주세요')
                return false
            }
            if(this.content === null) {
                alert('답변내용을 입력해 주세요')
                return false
            }
            let siteQuestionsSysId = '2' // 임시param this.$route.params.sysId
            let jsonData = {
                'replyTitle': this.subject,
                'replyContent': this.content,
                'replyStatusCode': 2
            }            
            let CallbackFn = function (res) {
              console.log(res)
              vm.$router.replace('/inquiry_list')
              alert('답변등록이 완료 되었습니다.')
            }
            this.axiosPatchRequest('/api/v1/operations/questions/' + siteQuestionsSysId + '/replies' , {jsonData : jsonData}, CallbackFn)
        }
    }
}
</script>

<style>

</style>