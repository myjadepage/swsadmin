<template>
    <div id="contents">
        <h3>{{ $route.name }}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top"><i class="xi-home"></i></a></li>
            <li>환경설정</li>
            <li class="on">
                {{ $route.name }}
            </li>
        </ul>
        <ul class="helpbox">
            <li>관리자정보는 관리자사이트 접속시 적용됩니다. 보안을 위해 아이디와 패스워드는 자주 바꿔주시는게 좋습니다.</li>
            <li>관리자명에 입력한 이름은 게시판 관리시에 글쓴이로 등록됩니다.</li>
            <li>사업자 정보에 입력하신 정보는 기본적으로 쇼핑몰 하단 카피라이트부분에 보여집니다.</li>
            <li>변동사항이 있을시에는 반드시 변경해주시기 바랍니다.</li>
        </ul>
        <b-form @submit.prevent="submitConfigManager">
            <!-- 관리자정보 -->
            <div class="box">
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> 관리자정보</h4>
                </div>

                <table class="t_form">
                    <col width="200">
                    <col width="*">
                    <tbody>
                        <tr>
                            <th>관리자 아이디<strong class="red">&nbsp;*</strong></th>
                            <td>
                                <input type="search" v-model="form.admin" placeholder="admin" class="text_input" maxlength="20" required>
                                <span class="square_blue"><i class="xi-error"></i>영문 또는 숫자 4~20자.</span>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type="checkbox" id="isPassword" v-model="form.isChangePw" /><label for="isPassword">비밀번호 수정</label>
                            </td>
                        </tr>
                        <template v-if="form.isChangePw">
                            <tr>
                                <th>관리자 비밀번호</th>
                                <td>
                                    <div>
                                        <input type="password" v-model="form.adminPw" class="text_input" style="width:150px" maxlength="20">
                                        <span class="square_blue"><i class="xi-error"></i>영문, 숫자 조합 6~20자.</span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <tr>
                            <th>관리자명<strong class="red">&nbsp;*</strong></th>
                            <td><input type="search" v-model="form.adminName" placeholder="관리자" class="text_input" maxlength="15" required></td>
                        </tr>
                        <tr>
                            <th>관리자 메일<strong class="red">&nbsp;*</strong></th>
                            <td>
                                <input type="email" v-model="form.adminEmail" class="text_input" style="width:300px" maxlength="100" required>
                                <span class="square_blue"><i class="xi-error"></i>Contact us, 고객의 소리, 제휴문의 등을 고객이 이용시 본 이메일로 받아볼 수 있습니다.</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 관리자정보 -->

            <!-- 사업자정보 -->
            <div class="box">
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> 사업자정보</h4>
                </div>

                <table class="t_form">
                    <col width="200">
                    <col width="*">
                    <col width="200">
                    <col width="*">
                    <tbody>
                        <tr>
                            <th>상점명(사이트명)<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="text" v-model="form.siteName" placeholder="쉘위샵" class="text_input" maxlength="50" required>
                                <span class="square_blue"><i class="xi-error"></i>사이트명은 문장속에서 많이 쓰이입니다. 간단하고 짧게 써 주시기 바랍니다.</span>
                            </td>
                        </tr>
                        <tr>
                            <th>대표자명<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3"><input type="text" v-model="form.ceoName" class="text_input" maxlength="10" required></td>
                        </tr>
                        <tr>
                            <th>개인정보 관리자</th>
                            <td colspan="3">
                                <input type="text" v-model="form.securityName" class="text_input" maxlength="10"> ( <input type="text" value="" v-model="form.securityEmail" class="text_input" maxlength="100"> )
                                <span class="square_blue"><i class="xi-error"></i>개인정보관리자를 임명하시어 임명자의 성명과 이메일 주소를 적어주세요.</span>
                            </td>
                        </tr>
                        <tr>
                            <th>입점업체 담당자</th>
                            <td colspan="3">
                                <input type="text" v-model="form.mdName" class="text_input" maxlength="10"> ( <input type="text" value="" v-model="form.mdEmail" class="text_input" maxlength="100"> )
                                <span class="square_blue"><i class="xi-error"></i>입점업체 담당자(MD)를 임명하시어 임명자의 성명과 이메일 주소를 적어주세요.</span>
                            </td>
                        </tr>
                        <tr>
                            <th>회사명<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3"><input type="text" v-model="form.comName" class="text_input" style="width:300px" maxlength="50" required></td>
                        </tr>
                        <tr>
                            <th>회사 주소<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="text" placeholder="우편번호" v-model="form.zoneCode" maxlength="7" class="text_input" disabled  required>&emsp;
                                <b-button size="sm" variant="secondary" @click="$refs.addressModal.show()">우편번호 찾기</b-button>
                                <div class="mgt3">
                                    <input type="text" v-model="form.roadAddress" placeholder="도로명주소" maxlength="50" class="text_input" style="width: 50%" readonly  required>
                                </div>
                                <div class="mgt3">
                                    <input type="text" v-model="form.detailAddress" placeholder="상세주소" maxlength="50" class="text_input" style="width: 50%"  required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>대표전화</th>
                            <td><input type="text" v-model="form.comTel" class="text_input" maxlength="20"></td>
                            <th>Fax</th>
                            <td><input type="text" v-model="form.comFax" class="text_input" maxlength="20"></td>
                        </tr>
                        <tr>
                            <th>사업자등록번호</th>
                            <td><input type="text" v-model="form.bizNo" class="text_input" maxlength="12"></td>
                            <th>통신판매업신고번호</th>
                            <td><input type="text" v-model="form.tongsinNo" class="text_input" maxlength="20"></td>
                        </tr>
                        <tr>
                            <th>업태</th>
                            <td><input type="text" v-model="form.bizCondition" class="text_input" maxlength="20"></td>
                            <th>종목</th>
                            <td><input type="text" v-model="form.bizItem" class="text_input" maxlength="20"></td>
                        </tr>
                        <tr>
                            <th>호스팅서비스 업체명</th>
                            <td colspan="3">
                                <input type="text" v-model="form.hostingService" class="text_input" style="width:25%" maxlength="50">
                                <span class="square_blue"><i class="xi-error"></i>호스팅서비스 업체명을 입력해주세요.</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 사업자정보 -->

            <!-- 설명 -->
            <div class="mgt20"><img src="@/assets/img/icon_tip.gif" alt="TIP"></div>
            <div class="tip_box2">
                <span>사업자등록 정보는 세금계산서 발급시에 이용되므로 정확하게 입력해주셔야 합니다.</span>
            </div>
            <!-- 설명 -->

            <div class="btn_center">
                <b-button type="submit" variant="info">확인</b-button>
                <b-button type="reset" variant="secondary">취소</b-button>
            </div>
        </b-form>
        <b-modal ref="addressModal">
            <template v-slot:modal-title>
            <font-awesome-icon icon="search" /> 사업자정보 - 사업지 주소 찾기
            </template>
            <vue-daum-postcode 
                :animation="true"
                @complete="searchAddress"
            />
        </b-modal>
    </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'
import { VueDaumPostcode } from 'vue-daum-postcode'
export default {
    mixins: [commonJs],
    data: () => ({
        form: {
            admin: '',
            adminName: '',
            isChangePw: false,
            adminPw: '',
            adminEmail: '',
            siteName: '',
            ceoName: '',
            securityName: '',
            securityEmail: '',
            mdName: '',
            mdEmail: '',
            comName: '',
            zoneCode: '',
            roadAddress: '',
            detailAddress: '',
            comTel: '',
            comFax: '',
            bizNo: '',
            tongsinNo: '',
            bizCondition: '',
            bizItem: '',
            hostingService: ''
        }
    }),
    components: {
        VueDaumPostcode
    },
    methods: {
        searchAddress: function (event) {
            console.log(event)
            this.form.zoneCode = event.zonecode
            this.form.roadAddress = event.address
            this.$refs.addressModal.hide()
        },
        submitConfigManager: function () {
            this.axiosPostRequest('', {jsonData: this.form}, function (res) {
                const result =res.data.jsonData
                if (result.resultCode === '0001') {
                    alert('환경설정이 완료되었습니다.')
                }
            }.bind(this))
            return false
        }
    }
}
</script>

<style>

</style>