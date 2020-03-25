<template>
  <div id="contents">
                <h3>FAQ관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">FAQ관리</li>
                </ul>
                <ul class="helpbox">
                    <li>FAQ를 관리하실 수 있습니다.</li>
                </ul>

                <form name="Frm">
                    <table class="t_form">
                        <caption>FAQ 등록 폼</caption>
                        <tbody>
                            <tr>
                                <th>분류</th>
                                <td>
                                    <select name="faqTypeCode" class="text_input" @change="onChange" :value="faqTypeCode">
                                        <option value="">선택</option>
                                        <option value="1">아이디/비밀번호찾기</option>
                                        <option value="2">회원정보</option>
                                        <option value="3">배송관련</option>
                                        <option value="4">상품문의</option>
                                        <option value="5">반품/교환/취소/환불</option>
                                        <option value="6">주문결제</option>
                                        <option value="7">적립금/쿠폰</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input name="title" class="text_input" maxlength="50" style="width:98%" 
                                      v-model="title">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <quill-editor class="quill-editor" name="faqContent" v-model="content"></quill-editor>
                                </td>
                            </tr>
                            <tr>
                                <th>TOP10</th>
                                <td>
                                    <input type="checkbox" name="isTop10" v-model="isTop10"> TOP10 FAQ로 설정
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="secondary" style="margin-right:5px" @click="submitFaq">확인</b-button>
                        <b-button variant="danger">취소</b-button>
                    </div>
                </form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import commonJs from '@/assets/js/common.js'

export default {
    mixins: [
    commonJs
  ],
  components: {
      quillEditor    
  },
  data() {
      return {
          jsonData: {},      
          title: null,
          content: null,
          faqTypeCode: null,
          isTop10:false,
          siteFaqSysId: this.$route.params.siteFaqSysId
      }
  },
  mounted() {
      // 1. faq 정보 불러오기
      this.axiosGetRequest('/api/v1/operations/faqs/' + this.siteFaqSysId,'',this.loadFaqDetail)  
  },
  methods: {
      loadFaqDetail(res) {       
        this.faqTypeCode = res.data.jsonData.faqTypeCode
        this.title = res.data.jsonData.title
        this.content = res.data.jsonData.content
        this.isTop10 = res.data.jsonData.isTop10       
      },
      onChange(e) {
          this.faqTypeCode = Number(e.target.value)
      },
      // 2. faq 정보수정 
      submitFaq() {
          var vm = this
          if(this.faqTypeCode === null) {
            alert('FAQ 분류를 선택해 주세요')
            return false
          }
          if(this.title === null) {
            alert('FAQ 제목을 입력해 주세요')
            return false
          }
          if(this.content === null) {
            alert('FAQ 내용을 입력해 주세요')
            return false
          }          
          this.isTop10 = this.isTop10 ? 1 : 0
          let CallbackFn = function (res) {
              console.log(res)
              alert('FAQ수정이 완료 되었습니다.')
              vm.$router.replace('/management/faq_list')
          }
          let jsonData = {
              "faqTypeCode" : this.faqTypeCode,
              "title": this.title,
              "content": this.content,
              "isTop10":  this.isTop10
          }
          console.log('jsonData', jsonData)
          this.axiosPatchRequest('/api/v1/operations/faqs/'+ this.siteFaqSysId, {jsonData : jsonData}, CallbackFn)
      }
  }
}
</script>

<style>

</style>