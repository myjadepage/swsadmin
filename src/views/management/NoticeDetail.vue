<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 공지사항</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">공지사항</li>
                </ul>
                <ul class="helpbox">
                    <li>공지사항을 관리하실 수 있습니다.</li>
                </ul>

                <form name="Frm">
                    <table class="t_form">
                        <caption>공지사항</caption>
                        <tbody> 
                            <template v-if="mode === 0">                          
                            <tr>
                                <th>제목</th>
                                <td> <input name="title" class="text_input" maxlength="50" style="width:98%" 
                                      v-model="noticeData.title" disabled></td>
                                <th>표시여부</th>
                                <td>
                                    <label style="margin-right:30px">
                                        <input type="radio" value="0" v-model.number="noticeData.isDisplay" disabled>미표시</label>
                                    <label>
                                        <input type="radio" value="1" v-model.number="noticeData.isDisplay" disabled>표시</label>
                                </td>        
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="3">
                                    <quill-editor class="quill-editor" name="noticeContent" 
                                      v-model="noticeData.content"
                                      :options="editorOption" disabled>
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
                            </template>  

                            <template v-if="mode === 1">                          
                            <tr>
                                <th>제목</th>
                                <td> <input ref="title" name="title" class="text_input" maxlength="50" style="width:98%" 
                                      v-model="noticeData.title"></td>
                                <th>표시여부</th>
                                <td>
                                    <label style="margin-right:30px">
                                        <input type="radio" value="0" v-model.number="noticeData.isDisplay">미표시</label>
                                    <label>
                                        <input type="radio" value="1" v-model.number="noticeData.isDisplay">표시</label>
                                </td>        
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="3">
                                    <quill-editor class="quill-editor" name="noticeContent" v-model="noticeData.content"
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
                            </template>                        
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="outline-info" size="lg" style="margin-right:5px" @click="editNoticeDetail" v-if="mode === 0">수정</b-button>
                        <b-button variant="outline-info" size="lg" style="margin-right:5px" @click="submitNoticeDetail" v-if="mode === 1">확인</b-button>
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
        mode:0,
        noticeSysId : this.$route.params.noticeSysId,
        noticeData: {},
        editorOption: {
          modules: {
              toolbar: '#toolbar'
          }
        }
      }
  },
  mounted () {
      this.axiosGetRequest('/api/v1/operations/notices/' + this.noticeSysId,'', this.loadNoticeDetail)
  },
  methods: {
      loadNoticeDetail(res) {
           console.log(this.noticeSysId)
           console.log(res)
           this.noticeData = res.data.jsonData
      },
      editNoticeDetail() {
          this.mode =1
          this.$nextTick(() => this.$refs.title.focus())
      },
      submitNoticeDetail() {
           var vm = this
           let CallbackFn = function (res) {
              console.log(res)
              vm.$router.replace('/management/notice_list')
              alert('공지사항을 수정하였습니다.')
          }
          this.axiosPutRequest('/api/v1/operations/notices/' + this.noticeSysId, {jsonData : this.noticeData}, CallbackFn)
      }
  }
}
</script>

<style>

</style>