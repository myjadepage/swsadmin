<template>
 <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 판매자신청목록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자관리</li>
                    <li class="on">판매자신청목록</li>
                </ul>
                <ul class="helpbox">
                    <li>쇼핑몰에 판매자 신청하신 목록을 관리하는 곳 입니다.</li>
                    <li>판매자의 상세내역을 잘 검토하시여 판매자 승인을 해 주시면 됩니다.</li>
                    <li>판매자 신청 목록에서 승인을 하시면 판매자목록으로 자동 등록됩니다.</li>
                </ul>


                <form name="Frm">
                    <table class="t_form">
                        <caption>판매자 정보</caption>
                        <colgroup>
                            <col width="130">
                            <col width="*">
                            <col width="130">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>아이디<span class="red">*</span></th>
                                <td>
                                    <div><strong>awesomeshop</strong></div>
                                </td>
                                <th>비밀번호</th>
                                <td>
                                    <span class="button small"><button type="button" onclick="initPw()">비밀번호 초기화</button></span>
                                </td>
                            </tr>
                            <tr>
                                <th>업체명<span class="red">*</span></th>
                                <td>
                                    <input type="text" name="dealerName" value="어썸몰" class="text_input" style="width:98%" maxlength="50">
                                </td>
                                <th>대표자명<span class="red">*</span></th>
                                <td>
                                    <input type="text" name="ceoName" value="김나나" class="text_input" style="width:150px" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <th>사업자등록번호<span class="red">*</span></th>
                                <td colspan="3">
                                    <input type="text" name="bizNo" class="text_input" style="width:150px" value="119-02-29983" maxlength="12">
                                    <span class="light_gray">(예: 119-02-29983)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>업태<span class="red">*</span></th>
                                <td>
                                    <input type="text" name="bizCondition" class="text_input" style="width:97%" value="서비스" maxlength="50">
                                </td>
                                <th>종목<span class="red">*</span></th>
                                <td>
                                    <input type="text" name="bizItem" class="text_input" style="width:97%" value="서비스" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <th>결제계좌명의<span class="red">*</span></th>
                                <td colspan="3">
                                    <input type="text" name="remitDepositor" class="text_input" style="width:150px" value="김나나" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <th>결제은행<span class="red">*</span></th>
                                <td colspan="3">
                                    <select id="remitBank" name="remitBank"><option value="">:: 은행 선택 ::</option><option value="경남은행" selected="">경남은행</option><option value="기업은행">기업은행</option><option value="부산은행">부산은행</option><option value="수협중앙회">수협중앙회</option><option value="신용협동조합">신용협동조합</option><option value="우체국">우체국</option><option value="SC제일은행">SC제일은행</option><option value="주택은행">주택은행</option><option value="하나은행">하나은행</option><option value="광주은행">광주은행</option><option value="농협중앙회">농협중앙회</option><option value="한국산업은행">한국산업은행</option><option value="한국씨티은행">한국씨티은행</option><option value="외환은행">외환은행</option><option value="장기신용">장기신용</option><option value="제주은행">제주은행</option><option value="축협중앙회">축협중앙회</option><option value="한미은행">한미은행</option><option value="KB국민은행">KB국민은행</option><option value="대구은행">대구은행</option><option value="서울은행">서울은행</option><option value="신한은행">신한은행</option><option value="우리은행">우리은행</option><option value="전북은행">전북은행</option><option value="조흥은행">조흥은행</option><option value="평화은행">평화은행</option><option value="새마을금고">새마을금고</option><option value="HSBC">HSBC</option><option value="스탠다드차타드은행">스탠다드차타드은행</option><option value="한국수출입은행">한국수출입은행</option></select>
                                </td>
                            </tr>
                            <tr>
                                <th>은행계좌번호<span class="red">*</span></th>
                                <td colspan="3">
                                    <input type="text" name="remitAccount" class="text_input" style="width:150px" value="111222333344" maxlength="30" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)">
                                    <span class="light_gray">"-" 없이 입력해주세요 (예: 11232112333)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>담당자명<span class="red">*</span></th>
                                <td>
                                    <input type="text" name="chargeName" class="text_input" style="width:97%" value="김다다" maxlength="15">
                                </td>
                                <th>담당자 직위</th>
                                <td>
                                    <input type="text" name="chargePosition" class="text_input" style="width:97%" value="부장" maxlength="15">
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호<span class="red">*</span></th>
                                <td colspan="3">
                                    <input type="text" name="tel" class="text_input" style="width:100px" value="01-888-9999" maxlength="20">
                                    <span class="light_gray">(예: 02-1234-1234)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>휴대폰번호</th>
                                <td>
                                    <input type="text" name="mobile" class="text_input" style="width:100px" value="010-6666-8888" maxlength="20">
                                    <span class="light_gray">(예: 010-1234-1234)</span>
                                </td>
                                <th>팩스번호</th>
                                <td>
                                    <input type="text" name="fax" class="text_input" style="width:100px" value="" maxlength="20">
                                    <span class="light_gray">(예: 02-1234-1234)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일<span class="red">*</span></th>
                                <td colspan="3">
                                    <input type="text" name="email" class="text_input" style="width:98%" value="shlee@awesomebly.com" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <th>홈페이지</th>
                                <td colspan="3">
                                    http://<input type="text" name="homepage" class="text_input" style="width:300px;" value="" maxlength="150">
                                    <span class="light_gray">(예: www.sitename.co.kr)</span>
                                </td>
                            </tr>
                            <tr>
                                <th>주소<span class="red">*</span></th>
                                <td colspan="3">
                                <input type="text" placeholder="우편번호" v-model="form.zoneCode" maxlength="7" class="text_input" disabled required>&emsp;
                                <b-button size="sm" variant="outline-secondary" @click="$refs.addressModal.show()">우편번호 찾기</b-button>
                                <div class="mgt3">
                                    <input type="text" v-model="form.roadAddress" placeholder="도로명주소" maxlength="50" class="text_input" style="width: 50%" readonly required>
                                </div>
                                <div class="mgt3">
                                    <input type="text" v-model="form.detailAddress" placeholder="상세주소" maxlength="50" class="text_input" style="width: 50%"  required>
                                </div>
                            </td>
                            </tr>
                            <tr>
                                <th>기타사항</th>
                                <td colspan="3">
                                    <textarea name="memo" class="text_input" style="height:80px;width:98%"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>관리자메모</th>
                                <td colspan="3">
                                    <textarea name="note" class="text_input" style="height:80px;width:98%"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>정산주기<span class="red">*</span></th>
                                <td colspan="3">
                                    <select id="accountCycle" name="accountCycle"><option value="1">일정산</option><option value="7">주정산</option><option value="15">15일정산</option><option value="30" selected="">월정산</option></select>
                                </td>
                            </tr>
                            <tr>
                                <th>수수료<span class="red">*</span></th>
                                <td colspan="3">
                                    <input type="radio" name="cmsType" value="CTG" style="vertical-align:top" onclick="checkCmsType()" checked=""> 카테고리당 수수료
                                    <input type="radio" name="cmsType" value="MIM" style="vertical-align:top" onclick="checkCmsType()"> 판매자당 수수료
                                    <input type="text" name="cmsRate" class="text_input" style="width: 50px; background: silver;" value="" maxlength="5" onkeyup="onlyFloat(this)" disabled=""> %
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="secondary" size="lg" style="margin-right:5px">목록</b-button>
                        <b-button variant="primary" size="lg">입점승인</b-button>
                    </div>
                </form>

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