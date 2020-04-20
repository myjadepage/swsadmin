<template>
<<<<<<< HEAD
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
                        <div><strong>{{ form.sellerId }}</strong></div>
                    </td>
                    <th>비밀번호</th>
                    <td>
                        <b-button variant="outline-secondary" size="sm">비밀번호 초기화</b-button>
                    </td>
                </tr>
                <tr>
                    <th>업체명<span class="red">*</span></th>
                    <td>
                        <input type="text" name="name" class="text_input" style="width:98%" maxlength="50"
                          v-model="form.name">
                    </td>
                    <th>대표자명<span class="red">*</span></th>
                    <td>
                        <input type="text" name="managerName" class="text_input" style="width:150px" maxlength="50"
                          v-model="form.managerName">
                    </td>
                </tr>
                <tr>
                    <th>사업자등록번호<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="text" name="businessRegNumber" class="text_input" style="width:150px" maxlength="12"
                          v-model="form.businessRegNumber">
                    </td>
                </tr>
                <tr>
                    <th>업태<span class="red">*</span></th>
                    <td>
                        <input type="text" name="businessType" class="text_input" style="width:97%" maxlength="50"
                          v-model="form.businessType">
                    </td>
                    <th>업종<span class="red">*</span></th>
                    <td>
                        <input type="text" name="businessItem" class="text_input" style="width:97%" maxlength="50"
                          v-model="form.businessItem">
                    </td>
                </tr>
                <tr>
                    <th>결제계좌명의<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="text" name="billingAccountName" class="text_input" style="width:150px" maxlength="50"
                          v-model="form.billingAccountName">
                    </td>
                </tr>
                <tr>
                    <th>결제은행<span class="red">*</span></th>
                    <td colspan="3">
                        <select id="remitBank" name="remitBank" class="text_input">
                            <option value="">:: 은행 선택 ::</option>
                            <option value="경남은행" selected="">경남은행</option>
                            <option value="기업은행">기업은행</option>
                            <option value="부산은행">부산은행</option>
                            <option value="수협중앙회">수협중앙회</option>
                            <option value="신용협동조합">신용협동조합</option>
                            <option value="우체국">우체국</option>
                            <option value="SC제일은행">SC제일은행</option>
                            <option value="주택은행">주택은행</option>
                            <option value="하나은행">하나은행</option>
                            <option value="광주은행">광주은행</option>
                            <option value="농협중앙회">농협중앙회</option>
                            <option value="한국산업은행">한국산업은행</option>
                            <option value="한국씨티은행">한국씨티은행</option>
                            <option value="외환은행">외환은행</option>
                            <option value="장기신용">장기신용</option>
                            <option value="제주은행">제주은행</option>
                            <option value="축협중앙회">축협중앙회</option>
                            <option value="한미은행">한미은행</option>
                            <option value="KB국민은행">KB국민은행</option>
                            <option value="대구은행">대구은행</option>
                            <option value="서울은행">서울은행</option>
                            <option value="신한은행">신한은행</option>
                            <option value="우리은행">우리은행</option>
                            <option value="전북은행">전북은행</option>
                            <option value="조흥은행">조흥은행</option>
                            <option value="평화은행">평화은행</option>
                            <option value="새마을금고">새마을금고</option>
                            <option value="HSBC">HSBC</option>
                            <option value="스탠다드차타드은행">스탠다드차타드은행</option>
                            <option value="한국수출입은행">한국수출입은행</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>은행계좌번호<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="text" name="bankAccount" class="text_input" style="width:150px" maxlength="30"
                          v-model="form.bankAccount">
                    </td>
                </tr>
                <tr>
                    <th>담당자명<span class="red">*</span></th>
                    <td>
                        <input type="text" name="managerName" class="text_input" style="width:97%" maxlength="15"
                          v-model="form.managerName">
                    </td>
                    <th>담당자 직위</th>
                    <td>
                        <input type="text" name="managerRank" class="text_input" style="width:97%" maxlength="15"
                          v-model="form.managerRank">
                    </td>
                </tr>
                <tr>
                    <th>전화번호<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="text" name="tel" class="text_input" style="width:150px" maxlength="20"
                         v-model="form.tel">
                    </td>
                </tr>
                <tr>
                    <th>휴대폰번호</th>
                    <td>
                        <input type="text" name="mobile" class="text_input" style="width:150px" maxlength="20"
                          v-model="form.mobile">
                    </td>
                    <th>팩스번호</th>
                    <td>
                        <input type="text" name="fax" class="text_input" style="width:150px" value="" maxlength="20" v-model="form.fax">
                       
                    </td>
                </tr>
                <tr>
                    <th>이메일<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="text" name="email" class="text_input" style="width:98%" maxlength="100"
                         v-model="form.email">
                    </td>
                </tr>
                <tr>
                    <th>홈페이지</th>
                    <td colspan="3">
                        <input type="text" name="homepage" class="text_input" style="width:300px;" maxlength="150"
                          v-model="form.homepage">                      
                    </td>
                </tr>
                <tr>
                    <th>주소<span class="red">*</span></th>
                    <td colspan="3">
                    <input type="text" placeholder="우편번호"  maxlength="7" class="text_input" disabled required
                      v-model="form.postNumber">&emsp;
                    <b-button size="sm" variant="outline-secondary">우편번호 찾기</b-button>
                    <div class="mgt3">
                        <input type="text" placeholder="도로명주소" maxlength="50" class="text_input" style="width: 50%" readonly required
                          v-model="form.address1">
                    </div>
                    <div class="mgt3">
                        <input type="text" placeholder="상세주소" maxlength="50" class="text_input" style="width: 50%"  required
                           v-model="form.address2">
                    </div>
                </td>
                </tr>
                <tr>
                    <th>기타사항</th>
                    <td colspan="3">
                        <textarea name="memo" class="text_input" style="height:80px;width:98%" v-model="form.comment"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>관리자메모</th>
                    <td colspan="3">
                        <textarea name="note" class="text_input" style="height:80px;width:98%" v-model="form.adminMemo"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>정산주기<span class="red">*</span></th>
                    <td colspan="3">
                        <select id="accountCycle" name="accountCycle">
                            <option value="1">일정산</option>
                            <option value="7">주정산</option>
                            <option value="15">15일정산</option>
                            <option value="30" selected="">월정산</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>수수료<span class="red">*</span></th>
                    <td colspan="3">
                        <input type="radio" name="feeTypeCode" id="feeTypeCode1" v-model.number="form.feeTypeCode" value="1"> <label for="feeTypeCode1" class="mr-2">카테고리당 수수료</label>
                        <input type="radio" name="feeTypeCode" id="feeTypeCode2" v-model.number="form.feeTypeCode" value="2"> <label for="feeTypeCode2">판매자당 수수료</label>&emsp;
                        <input type="text" class="text_input font-weight-bold text-right" v-model.number="form.fee" style="width: 50px" maxlength="5" :disabled="form.feeTypeCode === 1"> %
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="btn_center">
            <b-button variant="outline-secondary" size="lg" style="margin-right:5px" @click="$router.push('/mim/dealer_list')">목록</b-button>
            <b-button variant="outline-primary" size="lg">입점승인</b-button>
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

  
=======
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
                            <div><strong>{{ mimRegObject.sellerId }}</strong></div>
                        </td>
                        <th>비밀번호</th>
                        <td>
                            <b-button variant="outline-secondary" size="sm">비밀번호 초기화</b-button>
                        </td>
                    </tr>
                    <tr>
                        <th>업체명<span class="red">*</span></th>
                        <td>
                            <input type="search" name="dealerName" class="text_input" v-model="mimRegObject.name" maxlength="50" required />
                        </td>
                        <th>대표자명<span class="red">*</span></th>
                        <td>
                            <input type="search" class="text_input" v-model="mimRegObject.ownerName" required />
                        </td>
                    </tr>
                    <tr>
                        <th>사업자등록번호<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="search" class="text_input" maxlength="12" v-model="mimRegObject.businessRegNumber" required />
                            <span class="light_gray ml-2">(예: 119-02-29983)</span>
                        </td>
                    </tr>
                    <tr>
                        <th>업태<span class="red">*</span></th>
                        <td>
                            <input type="search" class="text_input" maxlength="50" v-model="mimRegObject.businessType" required />
                        </td>
                        <th>종목<span class="red">*</span></th>
                        <td>
                            <input type="search" class="text_input" maxlength="50" v-model="mimRegObject.businessItem"  required />
                        </td>
                    </tr>
                    <tr>
                        <th>결제계좌명의<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="search" class="text_input" maxlength="50" v-model="mimRegObject.billingAccountName" required />
                        </td>
                    </tr>
                    <tr>
                        <th>결제은행<span class="red">*</span></th>
                        <td colspan="3">
                            <select class="text_input" v-model.number="mimRegObject.billingBankCode" required>
                                <option v-for="(item, index) in billingBankCodeList" :key="index" :value="item.value">{{item.text}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>은행계좌번호<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="search" class="text_input" maxlength="30" v-model="mimRegObject.bankAccount" required/>
                            <span class="light_gray ml-2">"-" 없이 입력해주세요 (예: 11232112333)</span>
                        </td>
                    </tr>
                    <tr>
                        <th>담당자명<span class="red">*</span></th>
                        <td>
                            <input type="search" class="text_input" maxlength="15" v-model="mimRegObject.managerName" required>
                        </td>
                        <th>담당자 직위</th>
                        <td>
                            <input type="search" class="text_input" maxlength="15" v-model="mimRegObject.managerRank">
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="search" class="text_input" maxlength="20" v-model="mimRegObject.tel" required>
                            <span class="light_gray ml-2">(예: 02-1234-1234)</span>
                        </td>
                    </tr>
                    <tr>
                        <th>휴대폰번호</th>
                        <td>
                            <input type="search" class="text_input"  maxlength="20" v-model="mimRegObject.mobile" />
                            <span class="light_gray ml-2">(예: 010-1234-1234)</span>
                        </td>
                        <th>팩스번호</th>
                        <td>
                            <input type="search" class="text_input" maxlength="20" v-model="mimRegObject.fax" />
                            <span class="light_gray ml-2">(예: 02-1234-1234)</span>
                        </td>
                    </tr>
                    <tr>
                        <th>이메일<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="search" class="text_input w-25" maxlength="100" v-model="mimRegObject.email" required />
                        </td>
                    </tr>
                    <tr>
                        <th>홈페이지</th>
                        <td colspan="3">
                            <input type="search" class="text_input w-25" maxlength="150" v-model="mimRegObject.homepage" />
                            <span class="light_gray ml-2">(예: www.sitename.co.kr)</span>
                        </td>
                    </tr>
                    <tr>
                        <th>회사인감이미지</th>
                        <td colspan="3">
                            <input type="file" ref="stampImgUrl" name="stampImgUrl" accept="image/*"/>
                        </td>
                    </tr>
                    <tr>
                        <th>주소<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="search" placeholder="우편번호" maxlength="7" class="text_input" v-model.number="mimRegObject.postNumber" disabled required />&emsp;
                            <b-button size="sm" variant="outline-secondary" v-b-modal.addressModal>우편번호 찾기</b-button>
                            <div class="mgt3">
                                <input type="search" placeholder="도로명주소" maxlength="50" class="text_input w-100" v-model="mimRegObject.address1" disabled required />
                            </div>
                            <div class="mgt3">
                                <input type="search" placeholder="상세주소" maxlength="50" class="text_input w-100" v-model="mimRegObject.address2" required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>기타사항</th>
                        <td colspan="3">
                            <textarea class="text_input w-100" style="height:80px" v-model="mimRegObject.comment"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>관리자메모</th>
                        <td colspan="3">
                            <textarea class="text_input w-100" style="height:80px" v-model="mimRegObject.adminMemo"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>정산주기<span class="red">*</span></th>
                        <td colspan="3">
                            <select class="text_input" v-model="mimRegObject.calcCycleCode" required>
                                <option v-for="(item, index) in calcCycleCodeList" :key="index" :value="item.value">{{item.text}}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>수수료<span class="red">*</span></th>
                        <td colspan="3">
                            <input type="radio" name="feeTypeCode" id="feeTypeCode1" v-model.number="mimRegObject.feeTypeCode" value="1"> <label for="feeTypeCode1" class="mr-2">카테고리당 수수료</label>
                            <input type="radio" name="feeTypeCode" id="feeTypeCode2" v-model.number="mimRegObject.feeTypeCode" value="2"> <label for="feeTypeCode2">판매자당 수수료</label>&emsp;
                            <input type="text" class="text_input font-weight-bold text-right" v-model.number="mimRegObject.fee" style="width: 50px" maxlength="5" :disabled="mimRegObject.feeTypeCode === 1"> %
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn_center">
                <b-button variant="secondary" class="mr-2">목록</b-button>
                <b-button type="submit" variant="primary">입점승인</b-button>
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
>>>>>>> 02adcbb5fd4eb1d59875b5f529b128c41f2bd376
</template>

<script>
import { VueDaumPostcode } from 'vue-daum-postcode'
import commonJs from '@/assets/js/common.js'
import imageUploader from '@/assets/js/ImagesUploader.js'
export default {
    data: () => ({
        mimRegObject: {
            sellerSysId: '',
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
            fax: '',
            email: '',
            homepage: 'http://',
            postNumber: '',
            address1: '',
            address2: '',
            stampImgUrl: '',
            comment: '',
            adminMemo: '',
            calcCycleCode: 1,
            feeTypeCode: 1,
            fee: 0,
            proposalStatusCode: 1
        },
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
    }),
    components: {
        VueDaumPostcode
    },
    mounted () {
        if (!this.isEmpty(this.$route.params['sellerSysId'])) {
            this.mimRegObject.sellerSysId = this.$route.params.sellerSysId
            this.axiosGetRequest(`/api/v1/sellers/${this.mimRegObject.sellerSysId}`,'',function (res) {
                let result = res.data.jsonData
                for(let _k in result) {
                    if (_k === 'fee') {
                        this.mimRegObject[_k] = result[_k] * 100
                    } else {
                        this.mimRegObject[_k] = result[_k]
                    }   
                }
            }.bind(this))
        }
    
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
        resultPostCode: function (e) {
            this.mimRegObject.postNumber = e.zonecode
            this.mimRegObject.address1 = e.address
            this.$bvModal.hide('addressModal')
        },
        onSubmit: function () {

            if (this.mimRegObject.fee > 0 ) {
                this.mimRegObject.fee = this.mimRegObject.fee/100 
            }

            this.axiosPatchRequest(`/api/v1/sellers/${this.mimRegObject.sellerSysId}`,{jsonData: this.mimRegObject}, (res) => {
                console.log(res.data.jsonData.resultCode)
                if (res.data.jsonData.resultCode === '0001') {
                    alert('판매수정이 완료되었습니다.')
                    window.location.href='/mim/dealer_regist_list'
                    return false
                } else {
                    alert('알수없는 이유로 에러가 발생했습니다. \n관리자에게 문의하세요.')
                    return false
                }
            })
        }
    }
}
</script>