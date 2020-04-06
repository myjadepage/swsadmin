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
                                    <select name="faqTypeCode" class="text_input" @change="onChange">
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
                                    <input name="title" class="text_input" maxlength="50" style="width:98%" v-model="jsonData.title">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <quill-editor class="quill-editor" name="faqContent" v-model="jsonData.content"></quill-editor>
                                </td>
                            </tr>
                            <tr>
                                <th>TOP10</th>
                                <td>
                                    <input type="checkbox" name="isTop10" v-model="jsonData.isTop10"> TOP10 FAQ로 설정
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="outline-info" size="lg" style="margin-right:5px" @click="submitFaq">확인</b-button>
                        <b-button variant="outline-danger" size="lg"  @click="$router.go(-1)">취소</b-button>
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
          jsonData: {}
      }
  },
  methods: {
      onChange(e) {
          this.jsonData.faqTypeCode = Number(e.target.value)
      },      
      submitFaq() {
          var vm = this
          if(this.jsonData.faqTypeCode === null || this.jsonData.faqTypeCode === undefined) {
            alert('FAQ 분류를 선택해 주세요')
            return false
          }
          if(this.jsonData.title === null || this.jsonData.title === undefined) {
            alert('FAQ 제목을 입력해 주세요')
            return false
          }
          if(this.jsonData.content === null || this.jsonData.content === undefined) {
            alert('FAQ 내용을 입력해 주세요')
            return false
          }
          this.jsonData.isTop10 = this.jsonData.isTop10 ? 1 : 0         
          let CallbackFn = function (res) {
              console.log(res)
              vm.$router.replace('/management/faq_list')
              alert('FAQ등록이 완료 되었습니다.')
          }         
          this.axiosPostRequest('/api/v1/operations/faqs', {jsonData : this.jsonData}, CallbackFn)
      }
  }
}
</script>

<style>

</style>