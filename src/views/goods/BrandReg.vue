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
                <col width="150px">
                <col width="*">
                <col width="150px">
                <col width="*">
                <tbody>
                    <tr>
                        <th>브랜드명</th>
                        <td>
                            <input type="text" class="text_input" v-model="brandReg.name" maxlength="100" style="width:98%">
                        </td>
                        <th>무료배송 최소범위</th>
                        <td>
                            <span class="w-10">
                                착불무료배송: 
                            </span>
                            <span class="w-25">
                                <input type="number" class="text_input" v-model="brandReg.debitfreeMinAmount"/>
                            </span>
                            <span class="w-10">
                               &emsp;/&emsp;선불무료배송: 
                            </span>
                            <span class="w-25">
                                <input type="number" class="text_input" v-model="brandReg.prepayfreetMinAmount"/>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>이미지</th>
                        <td colspan="3">
                            <div class="adjust_image_container fclear mgb5">
                                <div class="fr mgt5">
                                    <label><input type="checkbox"> 이미지 삭제</label>
                                </div>
                            </div>
                            <div>
                                <input type="file" accept="image/jpeg, image/gif" @change="onNewSingleImageUploadEvent($event, {item: brandReg, field: 'imageUrl', imageDir: '/brand/image'})">
                                <img width="50" :src="brandReg.imageUrl" />
                            </div>
                            <div class="mgt3 blue">※ 이미지파일은 GIF, JPG로 올려주시기 바랍니다.</div>
                        </td>
                    </tr>
                    <tr>
                        <th>판매자정보</th>
                        <td colspan="3">
                            <sws-seller :parentData="brandReg"></sws-seller>
                        </td>
                    </tr>
                    <tr>
                        <th>담당자명</th>
                        <td><input type="text" class="text_input w-100" placeholder="담당자명을 입력해주세요..." v-model="brandReg.managerName" /></td>
                        <th>담당자직급</th>
                        <td><input type="text" class="text_input w-100" placeholder="직급을 입력해주세요..." v-model="brandReg.managerRank" /> </td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>
                            <p><input type="tel" class="text_input w-100" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" placeholder="일반번호 입력해주세요..." v-model="brandReg.tel" /> </p>
                            <p class="pt-1"><input type="tel" class="text_input w-100" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" placeholder="휴대폰번호를 입력해주세요..." v-model="brandReg.mobile" /> </p>
                        </td>
                        <th>이메일 주소</th>
                        <td><input type="email" class="text_input w-100" placeholder="이메일 주소를 입력해주세요..." v-model="brandReg.email" /> </td>
                    </tr>
                    <tr>
                        <th rowspan="2">상단 디자인</th>
                        <td colspan="3" style="padding: 0px">
                            <quill-editor
                                ref="editorOptionRef"
                                class="quill-editor" 
                                :options="editorOption"
                                v-model="brandReg.topDesignHTML"
                            ></quill-editor>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_center">
                <template v-if="brandReg.brandSysId">
                    <button type="button" class="btn btn-info" @click="updateBrand">수정</button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-info" @click="registBrand">저장</button>
                </template>
                <button type="button" class="btn btn-default">취소</button>
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
import submitReg from '@/components/brands/BrandReg.js'
import SwsSeller from '@/components/common/SwsSeller'

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register('modules/imageUpload', ImageUpload)

export default {
    mixins: [commonJs, ImagesUploader, submitReg],
    data() {
        return {
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
        }
    },
    mounted() {
        if((!this.isEmpty(this.$route.params.brandSysId))) {
            this.loadBrandData(this.$route.params.brandSysId)
        }
        // this.getImageUrl('/brand/image')
    },
    components: {
        quillEditor,
        SwsSeller
    },
    methods: {
        loadBrandData (SysId){
            this.axiosGetRequest('/api/v1/brands/'+SysId, '', function (res) {
                let loadData = res.data.jsonData
                for(let _k in loadData) {
                    this.brandReg[_k] = loadData[_k]
                }
            }.bind(this))
        },
        // 이미지 에디터에서 올림
        categorCommentHtmlimageHandler: function (imageDataUrl, type){
            var ext = type.split('/')
            var imageExt = ext[1]
            var blob = this.dataURItoBlob(imageDataUrl)
            var file = this.blobToFile(blob, 'temp.'+imageExt)
            var cursorLocation = this.$refs.editorOptionRef.quill.getSelection(true) 
            this.onEditorImagesUploaderEvent(file, this.$refs.editorOptionRef.quill, cursorLocation.index, '/brand/image')
        },
        registBrand: function () {
            this.axiosPostRequest('/api/v1/brands', {jsonData: this.brandReg}, (res) => {
                if (res.data.jsonData.resultCode==='0001'){
                    alert('브랜드 등록이 완료되었습니다.')
                    window.location.href="/goods/brand_list"
                } else {
                    alert('브랜드 등록에 실패하였습니다.')
                    console.log(res.data.jsonData)
                }
            })
        },
        updateBrand: function (){
            let key = this.brandReg.brandSysId
            this.axiosPatchRequest('/api/v1/brands/'+key, {jsonData: this.brandReg}, (res) => {
                if (res.data.jsonData.resultCode==='0001'){
                    alert('브랜드 수정이 완료되었습니다.')
                    window.location.href="/goods/brand_list"
                } else {
                    alert('브랜드 등록에 실패하였습니다.')
                    console.log(res.data.jsonData)
                }
            })
        }
    }
}
</script>
