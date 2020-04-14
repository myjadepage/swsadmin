<template>
  <div id="contents">
    <h3><font-awesome-icon icon="play-circle" /> 신고내역관리</h3>
    <ul class="navi">
        <li class="home"><a href="/" target="_top">홈</a></li>
        <li>운영관리</li>
        <li>게시판운영관리</li>
        <li class="on">신고내역관리</li>
    </ul>
    <ul class="helpbox">
        <li>신고내역을 관리하실 수 있습니다.</li>
    </ul>

    <form name="Frm">
        <table class="t_form">
            <caption>신고내역</caption>
            <tbody>
                <tr>
                    <th>분류</th>
                    <td>
                        <input name="title" class="text_input" value="기타" maxlength="50" style="width:100%" readonly>
                    </td>
                </tr>
                <tr>
                    <th>신고내용</th>
                    <td>
                        <input name="title" class="text_input"  value="상품리뷰에 욕성이 있어요" maxlength="50" style="width:100%" readonly>                    </td>
                </tr>
                <tr>
                    <th>상품리뷰 내용</th>
                    <td>
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
            </tbody>
        </table>
        <div class="btn_center">
            <b-button variant="outline-secondary" size="lg" style="margin-right:5px"  @click="$router.go(-1)">취소</b-button>
            <b-button variant="outline-info" size="lg" style="margin-right:5px">확인</b-button>
            <b-button variant="outline-danger" size="lg" >삭제</b-button>
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
           this.noticeData = res.data.jsonData
      }
  }
}
</script>

<style>

</style>