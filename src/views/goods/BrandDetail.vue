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
        <b-form @submit.prevent="onSubmit">
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
                        <th>브랜드명&emsp;<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="text" class="text_input w-25" v-model="brandReg.name" maxlength="100">
                        </td>
                    </tr>
                    <tr>
                        <th>이미지</th>
                        <td colspan="3">
                            <div>
                                <input type="file" accept="image/jpeg, image/gif" @change="onNewSingleImageUploadEvent($event, {item: brandReg, field: 'imageUrl', imageDir: '/brand/image'})">
                                <img width="50" :src="brandReg.imageUrl" />
                            </div>
                            <div class="mgt3 blue">※ 이미지파일은 GIF, JPG로 올려주시기 바랍니다.</div>
                        </td>
                    </tr>
                    <tr>
                        <th>판매자정보&emsp;<span class="red">*</span></th>
                        <td colspan="3">
                            <sws-seller :parentData="brandReg"></sws-seller>
                        </td>
                    </tr>
                    <tr>
                        <th>담당자명&emsp;<span class="red">*</span></th>
                        <td><input type="text" class="text_input w-50" v-model="brandReg.managerName"/></td>
                        <th>담당자직급</th>
                        <td><input type="text" class="text_input w-50"  v-model="brandReg.managerRank" /> </td>
                    </tr>
                    <tr>
                        <th>일반 전화번호&emsp;<span class="red">*</span></th>
                        <td>
                            <input type="search" class="text_input w-50" placeholder="- 없이 입력해주세요 (예: 01012345678)" v-model="brandReg.tel" />
                        </td>
                        <th>휴대전화번호&emsp;<span class="red">*</span></th>
                        <td>
                            <input type="search" class="text_input w-50" placeholder="- 없이 입력해주세요 (예: 01012345678)" v-model="brandReg.mobile" />
                        </td>
                    </tr>
                    <tr>
                        <th>이메일 주소&emsp;<span class="red">*</span></th>
                        <td colspan="3"><input type="email" class="text_input w-25" v-model="brandReg.email"> </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_center">
                <template v-if="brandReg.brandSysId">
                    <b-button type="submit" variant="info">수정</b-button>
                </template>
                <template v-else>
                    <b-button type="submit" variant="info">저장</b-button>
                </template>
            </div>
        </b-form>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
// 이미지 업로드 등록시 함수 
import ImagesUploader from '@/assets/js/ImagesUploader.js'
import submitReg from '@/components/brands/BrandReg.js'
import SwsSeller from '@/components/common/SwsSeller'

export default {
    mixins: [commonJs, ImagesUploader, submitReg],
    data() {
        return {
            brandReg: {
                name: '',
                sellerSysId: 0,
                managerName: '',
                managerRank: '',
                tel: '',
                mobile: '',
                email: '',
                imageUrl: ''
            }
        }
    },
    mounted() {
        if((!this.isEmpty(this.$route.params.brandSysId))) {
            this.loadBrandData(this.$route.params.brandSysId)
        }
    },
    components: {
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
        popAlert: function (message) {
            alert(`${message}을(를) 확인하여 주시기 바랍니다.`)
            return false
        },
        onSubmit: function () {
            let row = {}
            if (String(this.brandReg.name).trim().length < 1) {
                this.popAlert('브랜드명');
                return false
            } else {
                row.name = String(this.brandReg.name).trim()
            }

            // 브랜드 이미지 추가
            if (this.isEmpty(this.brandReg.imageUrl)){
                this.popAlert('브랜드 이미지')
                return false
            } else {
                row.imageUrl = this.brandReg.imageUrl
            }
            
            // 판매자 등록
            if (this.brandReg.sellerSysId === 0) {
                this.popAlert('판매자')
                return false
            } else {
                row.sellerSysId = this.brandReg.sellerSysId
            }
            
            // 담당자명 등록
            if (String(this.brandReg.managerName).trim().length < 1) {
                this.popAlert('담당자명')
                return false
            } else {
                row.managerName = String(this.brandReg.managerName).trim()
            }

            // 담당자 직급등록
            row.managerRank = String(this.brandReg.managerRank).trim()
            
            // 일반전화번호
            if (String(this.brandReg.tel).trim().length < 1) {
                this.popAlert('일반전화번호')
                return false
            } else {
                row.tel = String(this.brandReg.tel).trim()
            }

            // 휴대폰번호
            if (String(this.brandReg.mobile).trim().length < 1) {
                this.popAlert('휴대전화번호')
                return false
            } else {
                row.mobile = this.makeRsa(this.brandReg.mobile)
            }

            // 이메일 
            if (String(this.brandReg.email).trim().length < 1) {
                this.popAlert('이메일')
                return false
            } else {
                row.email = String(this.brandReg.email).trim()
            }
            
            this.axiosPatchRequest(`/api/v1/brands/${this.$route.params.brandSysId}`, {jsonData: row}, function (res) {
                if (res.data.jsonData.resultCode==='0001'){
                    alert('브랜드 수정이 완료되었습니다.')
                    this.$router.push(`/goods/brand_list`)
                } else {
                    alert('브랜드 수정에 실패하였습니다.')
                    console.log(res.data.jsonData)
                }
            }.bind(this),'',sessionStorage.getItem('accessToken'))

        }
    }
}
</script>
