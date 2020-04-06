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
                                <th>표시여부</th>
                                <td>
                                    <label style="margin-right:30px">
                                        <input type="radio" value="0" v-model.number="jsonData.isDisplay">미표시</label>
                                    <label>
                                        <input type="radio" value="1" v-model.number="jsonData.isDisplay">표시</label>
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="3">
                                    <quill-editor class="quill-editor" name="noticeContent" v-model="jsonData.content"
                                      :options="editorOption">
                                      <div id="toolbar" slot="toolbar">
                                        <!-- Add a bold button -->
                                        <button class="ql-bold">Bold</button>
                                        <button class="ql-italic">Italic</button>
                                        <!-- Add font size dropdown -->
                                        <select class="ql-size">
                                            <option value="small"></option>
                                            <option selected></option>
                                            <option value="large"></option>
                                            <option value="huge"></option>
                                        </select>
                                        <select class="ql-font">
                                            <option selected="selected"></option>
                                            <option value="serif"></option>
                                            <option value="monospace"></option>
                                        </select>                                       
                                      </div>
                                    </quill-editor>
                                </td>
                            </tr>                           
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="outline-info" size="lg" style="margin-right:5px" @click="submitNotice">확인</b-button>
                        <b-button variant="outline-danger" size="lg" @click="$router.go(-1)">취소</b-button>
                    </div>
                </form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import commonJs from '@/assets/js/common.js'

export default {
  mixins: [commonJs],
  components: {
      quillEditor    
  },
  data() {
      return {       
        jsonData: {
            isDisplay:0
        },
        editorOption: {
          modules: {
              toolbar: '#toolbar'
          }
        }
      }
  },
  methods: {
      submitNotice() {
          var vm = this
          if(this.jsonData.title === null || this.jsonData.title === undefined) {
            alert('공지사항 제목을 입력해 주세요')
            return false
          }
          if(this.jsonData.content === null || this.jsonData.content === undefined) {
            alert('공지사항 내용을 입력해 주세요')
            return false
          }          
          let CallbackFn = function (res) {
              console.log(res)
              vm.$router.replace('/management/notice_list')
              alert('공지사항을 등록하였습니다.')
          }         
          this.axiosPostRequest('/api/v1/operations/notices', {jsonData : this.jsonData}, CallbackFn)
      }
  }
}
</script>

<style>

</style>