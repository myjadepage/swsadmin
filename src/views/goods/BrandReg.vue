<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>각 디렉토리별로 브랜드별 정리를 하실 수 있는 곳입니다.</li>
            <li>브랜드명을 적으시고 추가 해 주시면 상품등록에서 브랜드를 선택해 주시면 됩니다.</li>
        </ul>
        <form name="Frm">

            <div class="section_head">
                <h4><i class="xi-check-circle"></i> 브랜드 추가하기</h4>
            </div>

            <table class="t_form">
                <caption>배너 등록 폼</caption>
                <tbody>
                    <tr>
                        <th>브랜드명</th>
                        <td>
                            <input type="text" name="name" class="text_input" maxlength="100" style="width:98%">
                        </td>
                    </tr>
                    <tr>
                        <th>이미지</th>
                        <td>

                            <div class="adjust_image_container fclear mgb5">
                                <!-- <img src="/img/brand_logo1.jpg"> -->
                                <div class="fr mgt5">
                                    <label><input type="checkbox" name="isDelBrand" value="T" onclick="checkFileDisabled(this, this.form.imgBrand)"> 이미지 삭제</label>
                                </div>
                            </div>

                            <div>
                                <input type="file" name="imgBrand" onkeypress="blockKey(event)" onkeydown="blockKey(event)">
                            </div>
                            <div class="mgt3 blue">※ 이미지파일은 GIF, JPG로 올려주시기 바랍니다.</div>
                        </td>
                    </tr>
                    <tr>
                        <th rowspan="2">상단 디자인</th>
                        <td style="padding: 0px">
                            <quill-editor
                                ref="editorOptionRef"
                                class="quill-editor" 
                                :options="editorOption"
                                id="brandRegHtml" 
                                name="brandRegHtml" 
                            ></quill-editor>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_center">
                <button type="button" class="btn btn-info" onclick="validSubmit()">확인</button>
                <button type="button" class="btn btn-default" onclick="cancel()">취소</button>
            </div>
        </form>
    </div>
</template>
<script>
import Quill from 'quill'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { ImageUpload } from 'quill-image-upload'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import commonJs from '@/assets/js/common.js'
// 이미지 업로드 등록시 함수 
import ImagesUploader from '@/assets/js/ImagesUploader.js'

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register('modules/imageUpload', ImageUpload)
export default {
  mixins: [commonJs, ImagesUploader],
  data: () => ({
    editorOption: {
        modules: {
            toolbar: {
                container:[
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image']
                ],
                handlers: {
                    'image': function () {
                        document.getElementById('categorCommentHtmlImage').click()
                    }
                }
            }
            ,
            imageDropAndPaste: {
                handler: this.categorCommentHtmlimageHandler
            }
        },
        placeholder: '내용을 입력해주세요...'
    },
  }),
    components: {
        quillEditor
    }

}
</script>
