<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 공지사항 등록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">공지사항 등록</li>
                </ul>
                <ul class="helpbox">
                    <li>공지사항을 관리하실 수 있습니다.</li>
                </ul>

                <form name="Frm">
                    <table class="t_form">
                        <caption>공지사항 등록 폼</caption>
                        <tbody>                           
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
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="outline-info" size="lg" style="margin-right:5px" @click="submitNotice">확인</b-button>
                        <b-button variant="outline-danger" size="lg">취소</b-button>
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
      submitNotice() {
           var vm = this
          if(this.jsonData.title === null) {
            alert('공지사항 제목을 입력해 주세요')
            return false
          }
          if(this.jsonData.content === null) {
            alert('공지사항 내용을 입력해 주세요')
            return false
          }
          console.log(this.jsonData)
          let CallbackFn = function (res) {
              console.log(res)
              vm.$router.replace('/management/notice_list')
              alert('공지사항이 완료 되었습니다.')
          }         
          this.axiosPostRequest('/api/v1/operations/notices', {jsonData : this.jsonData}, CallbackFn)
      }
  }
}
</script>

<style>

</style>