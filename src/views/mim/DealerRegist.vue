<template>
    <div id="contents">
        <h3><font-awesome-icon icon="play-circle" /> {{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>입점업체관리</li>
            <li>판매자관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>쇼핑몰에 판매자 신청하신 목록을 관리하는 곳 입니다.</li>
            <li>판매자의 상세내역을 잘 검토하시여 판매자 승인을 해 주시면 됩니다.</li>
            <li>판매자 신청 목록에서 승인을 하시면 판매자목록으로 자동 등록됩니다.</li>
        </ul>
        <b-form @submit.prevent="onSubmit">
            <table class="t_form">
                <col width="150" />
                <col width="*" />
                <col width="150" />
                <col width="*" />
                <tr>
                    <th class="bg-light align-middle font-weight-bold">아이디&emsp;<span class="red">*</span></th>
                    <td colspan="3" class="align-middle">
                        <input type="search" class="text_input" v-model="mimRegObject.sellerId" @keyup="checkValidateId = false"/>&emsp;
                        <b-button variant="outline-secondary" size="sm" @click="checkDuplicateIdFn" :disabled="checkValidateId"><font-awesome-icon icon="check" />중복체크</b-button>
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">패스워드&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="password" class="text_input" id="password" v-model="mimRegObject.password" @focusout="changePassword"/>&emsp;
                        <span class="text-muted ml-2">* 패스워드는 6자이상 영문, 숫자, 특수문자 포함입니다.</span>
                        <label :style="passwordsValidate.style" :class="passwordsValidate.class">{{passwordsValidate.message}}</label>
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">업체명&emsp;<span class="red">*</span></th>
                    <td>
                        <input type="search" name="dealerName" class="text_input w-100" v-model="mimRegObject.name" maxlength="50" />
                    </td>
                    <th class="bg-light align-middle font-weight-bold">대표자명&emsp;<span class="red">*</span></th>
                    <td>
                        <input type="search" class="text_input w-100" v-model="mimRegObject.ownerName" />
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">사업자등록번호&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100" maxlength="12" v-model="mimRegObject.businessRegNumber" placeholder="예: 119-02-29983" />
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">업태&emsp;<span class="red">*</span></th>
                    <td>
                        <input type="search" class="text_input w-100" maxlength="50" v-model="mimRegObject.businessType" />
                    </td>
                    <th class="bg-light align-middle font-weight-bold">종목&emsp;<span class="red">*</span></th>
                    <td>
                        <input type="search" class="text_input w-100" maxlength="50" v-model="mimRegObject.businessItem"  />
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">결제계좌명의&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100" maxlength="50" v-model="mimRegObject.billingAccountName" />
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">결제은행&emsp;<span class="red">*</span></th>
                    <td colspan="3" class="text-left">
                        <select class="text_input" v-model.number="mimRegObject.billingBankCode">
                            <option v-for="(item, index) in billingBankCodeList" :key="index" :value="item.value">{{item.text}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">은행계좌번호&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100" maxlength="30" v-model="mimRegObject.bankAccount"/>
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">담당자명&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100" maxlength="15" v-model="mimRegObject.managerName">
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">회사 전화번호&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100" maxlength="20" v-model="mimRegObject.tel" placeholder="- 없이 입력해주세요 (예: 01012345678)">
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">휴대폰번호&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100"  maxlength="20" v-model="mimRegObject.mobile" placeholder="- 없이 입력해주세요 (예: 01012345678)" />
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">이메일&emsp;<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="search" class="text_input w-100" maxlength="100" v-model="mimRegObject.email" />
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">회사인감이미지</th>
                    <td colspan="3">
                        <input type="file" ref="stampImgUrl" name="stampImgUrl" accept="image/*"/>
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">주소&emsp;<span class="red">*</span></th>
                    <td colspan="3" class="text-left">
                        <input type="search" placeholder="우편번호" maxlength="7" class="text_input" v-model.number="mimRegObject.postNumber" disabled />&emsp;
                        <b-button size="sm" variant="outline-secondary" v-b-modal.addressModal>우편번호 찾기</b-button>
                        <div class="mgt3">
                            <input type="search" placeholder="도로명주소" maxlength="50" class="text_input w-100" v-model="mimRegObject.address1" disabled />
                        </div>
                        <div class="mgt3">
                            <input type="search" placeholder="상세주소" maxlength="50" class="text_input w-100" v-model="mimRegObject.address2" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class="bg-light align-middle font-weight-bold">기타사항</th>
                    <td colspan="3" class="px-0 pt-0 pb-0">
                        <quill-editor
                        class="quill-editor"
                        :options="commentOption"
                        v-model="mimRegObject.comment"
                        ></quill-editor>
                    </td>
                </tr>
            </table>
            <br />
            <table class="t_form">
                <colgroup>
                    <col width="150">
                    <col width="*">
                </colgroup>
                <tr>
                    <th class="p-3">
                        사업자<br />등록증 사본
                    </th>
                    <td>
                        <input type="file" @change="onFileUploader($event, mimRegObject, 'file1Url')"/>
                    </td>
                </tr>
                <tr>
                    <th class="p-3">
                        통신판매업<br />신고증 사본
                    </th>
                    <td>
                        <input type="file" @change="onFileUploader($event, mimRegObject, 'file2Url')"/>
                    </td>
                </tr>
                <tr>
                    <th class="p-3">
                        법인 등기부<br />등본 사본
                    </th>
                    <td>
                        <input type="file" @change="onFileUploader($event, mimRegObject, 'file3Url')"/>
                    </td>
                </tr>
                <tr>
                    <th class="p-3">
                        법인 명의<br /> 
                        통장 사본
                    </th>
                    <td>
                        <input type="file" @change="onFileUploader($event, mimRegObject, 'file4Url')"/>
                    </td>
                </tr>
                <tr>
                    <th class="p-3">
                        건강기능식품<br />판매업 신고증
                    </th>
                    <td>
                        <input type="file" @change="onFileUploader($event, mimRegObject, 'file5Url')"/>
                    </td>
                </tr>
            </table>
            <div class="m-2">
                <b-button type="submit" variant="info">입점신청</b-button>
            </div>
        </b-form>
        <b-modal id="addressModal" hide-footer>
            <template v-slot:modal-title>
                <font-awesome-icon icon="search" /> 사업자정보 - 사업지 주소 찾기
            </template>
            <vue-daum-postcode 
                @complete="resultPostCode"
            />
        </b-modal>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"
import "quill/dist/quill.snow.css"
import { VueDaumPostcode } from 'vue-daum-postcode'
import commonJs from '@/assets/js/common.js'
import imageUploader from '@/assets/js/ImagesUploader.js'
export default {
    data: () => ({
        mimRegObject: {
            sellerId: '',
            password: '',
            name: '',
            ownerName: '',
            businessRegNumber: '',
            businessType: '',
            businessItem: '',
            billingAccountName: '',
            billingBankCode: null,
            bankAccount: '',
            managerName: '',
            managerRank: '',
            tel: '',
            mobile: '',
            // fax: '',
            email: '',
            // homepage: 'http://',
            postNumber: '',
            address1: '',
            address2: '',
            stampImgUrl: '',
            comment: `<p><b>영업 담당자</b></p><p>이름 : </p><p>이메일 : </p><p>휴대폰번호 : </p><br /><p><b>CS 담당자</b></p><p>이름 : </p><p>이메일 : </p><p>휴대폰번호 : </p><br /><p><b>배송 담당자</b></p><p>이름 : </p><p>이메일 : </p><p>휴대폰번호 : </p>`,
            // adminMemo: '',
            calcCycleCode: 3,
            // feeTypeCode: 1,
            // fee: 0.5,
            proposalStatusCode: 1,
            file1Url: '',
            file2Url: '',
            file3Url: '',
            file4Url: '',
            file5Url: ''
        },
        checkValidateId: false,
        checkValidatePassword: false,
        calcCycleCodeList: [
            {value: 1, text: '일정산'},
            {value: 2, text: '주정산'},
            {value: 3, text: '15일정산'},
            {value: 4, text: '월정산'}
        ],
        billingBankCodeList: [
            {value: null, text: '::결재은행선택::'},
            {value: 1, text: '신한은행'},
            {value: 2, text: 'KB국민은행'},
            {value: 3, text: 'NB농협'},
            {value: 4, text: '기업은행'}
        ],
        passwordsValidate: {
            style: {display: 'none'},
            class: 'text-danger',
            message : '1231232'
        },
        commentOption: {
            placeholder: "내용을 입력해주세요..."
        }
    }),
    components: {
        VueDaumPostcode,
        quillEditor,
    },
    mounted () {    
        this.axiosGetRequest('/api/v1/preferences/banks','',function (res) {
            this.billingBankCodeList.splice(0)
            this.billingBankCodeList.push({value: null, text: '::결재은행선택::'})
            for(let item of res.data.jsonData.banks){
                this.billingBankCodeList.push({
                    value: item.bankSysId,
                    text: item.name
                })
            }
        }.bind(this))
    },
    mixins: [commonJs, imageUploader],
    methods: {
        changePassword: function (evt) {
            if (evt.target.value.length < 5) {
                return false
            }
            const passRule = /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            if (passRule.test(evt.target.value)) {
                this.passwordsValidate.class = 'text-primary'
                this.passwordsValidate.message = '사용 가능한 비밀번호입니다.'
                this.passwordsValidate.style = {display: 'block'}
                this.checkValidatePassword = true
            } else {
                this.passwordsValidate.class = 'text-danger'
                this.passwordsValidate.message = '사용할수 없는 비밀번호입니다.'
                this.passwordsValidate.style = {display: 'block'}
                this.checkValidatePassword = false
            }
            return false
        },
        resultPostCode: function (e) {
            this.mimRegObject.postNumber = e.zonecode
            this.mimRegObject.address1 = e.address
            this.$bvModal.hide('addressModal')
        },
        checkDuplicateIdFn: function (){
            const chkId = this.mimRegObject.sellerId
            const engValidate = /^[a-zA-Z0-9]*$/
            if (this.isEmpty(String(chkId).trim())) {
                alert('ID를 확인하여 주시기 바랍니다.')
                return false
            } else if(!engValidate.test(chkId)) {
                alert('ID는 영문 및 숫자만 가능힙니다.')
                return false
            }
            this.axiosGetRequest('/api/v1/sellers/chkdupId', {sellerId: chkId}, function (res) {
                const result = res.data.jsonData
                if (result.resultCode === '0001') {
                    alert('사용할수 있는 ID입니다.')
                    this.checkValidateId = true
                    return false
                } else {
                    alert('사용할수 없는 ID입니다.\n 다시 확인해주시기 바랍니다.')
                    this.checkValidateId = false
                    return false
                }
            }.bind(this))
        },
        onSubmit: function () {
            let sendObject = {}

            if (!this.checkValidateId) {
                alert('아이디 중복체크를 해주시기 바랍니다.')
                return false
            } else {
                sendObject.sellerId = this.mimRegObject.sellerId
            }

            if (!this.checkValidatePassword) {
                alert('패스워드를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.password = this.makeRsa(this.mimRegObject.password)
            }

            if (String(this.mimRegObject.name).trim().length < 1) {
                alert('판매자명을 확인하여 주시기 바랍니다.');
                return false
            } else {
                sendObject.name = this.mimRegObject.name
            }

            if (String(this.mimRegObject.ownerName).trim().length < 1) {
                alert('대표자명을 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.ownerName = this.mimRegObject.ownerName
            }

            if (String(this.mimRegObject.businessRegNumber).trim().length < 1) {
                alert('사업자등록번호를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.businessRegNumber = this.mimRegObject.businessRegNumber
            }

            if (String(this.mimRegObject.businessType).trim().length < 1) {
                alert('업태를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.businessType = this.mimRegObject.businessType
            }

            if (String(this.mimRegObject.businessItem).trim().length < 1) {
                alert('업종를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.businessItem = this.mimRegObject.businessItem
            }

            if (String(this.mimRegObject.billingAccountName).trim().length < 1) {
                alert('결제계좌명의를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.billingAccountName = this.mimRegObject.billingAccountName
            }

            if (this.mimRegObject.billingBankCode === 0) {
                alert('결제은행코드를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.billingBankCode = this.mimRegObject.billingBankCode
            }

            if (String(this.mimRegObject.bankAccount).trim().length < 1) {
                alert('은행계좌번호를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.bankAccount = this.mimRegObject.bankAccount
            }

            if (String(this.mimRegObject.managerName).trim().length < 1) {
                alert('담당자명을 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.managerName = this.mimRegObject.managerName
            }

            if (String(this.mimRegObject.tel).trim().length < 1) {
                alert('일반전화번호를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.tel = this.mimRegObject.tel
            }

            if (String(this.mimRegObject.mobile).trim().length < 1) {
                alert('휴대폰번호를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.mobile = this.makeRsa(this.mimRegObject.mobile)
            }

            if (String(this.mimRegObject.email).trim().length < 1) {
                alert('이메일을 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.email = this.mimRegObject.email
            }

            if (String(this.mimRegObject.postNumber).trim().length < 1) {
                alert('주소를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.postNumber = this.mimRegObject.postNumber
                sendObject.address1 = this.mimRegObject.address1
            }

            if (String(this.mimRegObject.address2).trim().length < 1) {
                alert('상세주소를 확인하여 주시기 바랍니다.')
                return false
            } else {
                sendObject.address2 = this.mimRegObject.address2
            }
            sendObject.calcCycleCode = this.mimRegObject.calcCycleCode

            if (this.mimRegObject.comment.length > 500) {
                alert('기타사항 메세지가 너무 깁니다. [최대 500자 이내]')
                return false
            } else {
                sendObject.comment = this.mimRegObject.comment
            }

            this.axiosPostRequest('/api/v1/sellers',{jsonData: sendObject}, (res) => {
                if (res.data.jsonData.resultCode === '0001') {
                    alert('입점 등록 신청이 완료되었습니다.');
                    window.location.href='/mim/dealer_list';
                    return false
                } else {
                    alert('알수없는 이유로 에러가 발생했습니다. \n관리자에게 문의하세요.')
                    return false
                }
            },'',sessionStorage.getItem('accessToken'))
        }
    }
}
</script>