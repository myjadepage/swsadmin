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
                    <li>1:1문의를 관리하실 수 있습니다.</li>
                </ul>
              
                    <div class="section_head"><h4><font-awesome-icon icon="info-circle" /> 질문</h4></div>

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
                                <th>등록일</th>
                                <td>{{ changeDate(question.createdAt) }}</td>
                                <th>이메일</th>
                                <td colspan="3">{{ question.email }}</td>
                            </tr>                         
                            <tr>
                                <th>내용</th>
                                <td colspan="5">{{ question.content }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="over_h mgt5">
                        <!-- <div class="fl">
                            <b-button variant="outline-secondary" @click="$router.push('/management/inquiry_list')">목록으로</b-button>
                        </div> -->
                        <!-- <div class="fr">
                            <b-button variant="outline-danger">삭제하기</b-button>
                        </div> -->
                    </div>

                    <div class="section_head"><h4><font-awesome-icon icon="info-circle" /> 답변</h4></div>

                <form name="Frm">
                    <table class="t_form">
                        <caption>답변 내용</caption>
                        <tbody>   
                            <tr>
                                <th>답변날짜</th>
                                <td> {{ changeDate(question.answerDate) }}</td>
                                </tr>                       
                            <tr>
                                <th>답변내용</th>
                                <td>
                                    
                                    <textarea name="content" v-model="content" v-if="question.treatFlag === 0" class="text_input" style="height:200px;width:98%">
                                    </textarea>

                                    <p v-else class="text_input" style="height:200px;width:98%">
                                        {{ question.answer }}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="outline-secondary" size="lg" @click="$router.push('/management/inquiry_list')" style="margin-right:5px">목록</b-button>
                        <b-button variant="outline-info" size="lg" v-if="question.treatFlag === 0"  @click="submitAnswer">확인</b-button>
                        <b-button variant="outline-info" size="lg" v-else  @click="$router.push('/management/inquiry_list')">확인</b-button>
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
            question : {},                  
            content: null,
            siteQuestionSysId: this.$route.params.siteQuestionSysId
        }
    },
    mounted() {           
        this.axiosGetRequest('/api/v1/operations/questions/'+ this.siteQuestionSysId,'',this.loadInquiryDetail,'', sessionStorage.getItem('accessToken'))        
    },
    methods: {   
        loadInquiryDetail(res) {
            console.log(res)
            this.question = res.data.jsonData
        },
        changeDate(date) {
            var y = date.substr(0, 4)
            var m = date.substr(4, 2)
            var d = date.substr(6, 2)
            return y + '-' + m + '-' + d
        },
        submitAnswer: function () {
            var vm = this           
            if(this.content === null) {
                alert('답변내용을 입력해 주세요')
                return false
            }    
            let jsonData = {
                "answer": this.content
            }               
            let CallbackFn = function (res) {
              console.log(res)
              vm.$router.replace('/management/inquiry_list')
              alert('답변등록이 완료 되었습니다.')
            }
            this.axiosPatchRequest('/api/v1/operations/questions/' + this.siteQuestionSysId + '/answer' ,{jsonData : jsonData}, CallbackFn,'', sessionStorage.getItem('accessToken'))
        }
    }
}
</script>

<style>

</style>