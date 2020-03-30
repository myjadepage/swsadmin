<template>
    <div id="contents">
        <h3>{{ $route.name }}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>정산관리</li>
            <li>결제/정산내역</li>
            <li class="on">{{ $route.name }}</li>
        </ul>
        <ul class="helpbox">
            <li>판매자정산 목록 입니다.</li>
            <li>결제수수료 마스터 부담 / 적립금 지급 마스터 부담 / 회원 할인금 마스터 부담 / 이벤트 할인금 마스터 부담<br>(적립금 "기본 정책"이외 설정으로 적립금 지급시 판매자 부담, 판매자 신청 이벤트 경우 판매자 부담)</li>
            <li>선배송비는 그 업체의 해당주문번호 마지막 구매확정상품에 일괄 표시됩니다.</li>
            <li>정산시작일, 정산마감일을 선택하셔서 검색하시면 됩니다.</li>
        </ul>
        <form name="sFrm" @submit.prevent="onSubmit">
            <table class="t_form">
                <colgroup>
                    <col width="130">
                    <col width="*">
                    <col width="130">
                    <col width="*">
                </colgroup>
                <tbody>
                    <tr>
                        <th>판매자</th>
                        <td>
                            <sws-seller @changeFn="function (val) {SearchForm.sellerSysId = val}"></sws-seller>
                        </td>
                        <th>판매자ID</th>
                        <td>
                            <input type="text" class="text_input" style="width:130px;" v-model="SearchForm.sellerId">
                        </td>
                    </tr>
                    <tr>
                        <th>정산상태</th>
                        <td colspan="3">
                            <select v-model="SearchForm.accountStatus">
                                <option value="">선택하세요</option>
                                <option value="1">미확인</option>
                                <option value="2">대기</option>
                                <option value="3">관리자확인</option>
                                <option value="4">정산요청</option>
                                <option value="5">정산보류</option>
                                <option value="6">정산완료</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>카테고리별</th>
                        <td colspan="3">
                            <sws-category :selectedCategory="SearchForm.category"></sws-category>
                        </td>
                    </tr>
                    <tr>
                        <th>기간별</th>
                        <td colspan="3">
                            <sws-date ref="swsDate"></sws-date>
                            <div class="mt-1">
                                <b-button size="sm" type="submit" variant="outline-secondary"><font-awesome-icon icon="search" /> 검색</b-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>

                <div class="section_head">
                    <h4>2020년 01월 결산정보 (다음은 결산(예정)일이 <u>2020-01-01</u>~<u>2020-01-31</u>인 업체의 목록만 출력됩니다. 이외 결산정보는 위의 정산일자로 검색해 주세요.)</h4>
                    <div class="mgb5"><span class="button black"><a href="/account/dealer_account.excel?sdealer=0&amp;sid=&amp;sstate=&amp;scate=0&amp;sterm=&amp;sdts=&amp;sdte=">출력/엑셀다운</a></span></div>
                </div>

                <table class="t_list">
                    <caption>판매자 정산 내역</caption>
                    <colgroup>
                        <col width="">
                        <col width="70">
                        <col width="70">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="">
                        <col width="67">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>업체</th>
                            <th>정산시작일</th>
                            <th>정산마감일</th>
                            <th>정산주기</th>
                            <th>공급가합</th>
                            <th>판매가합</th>
                            <th>선배송비</th>
                            <th>적립금</th>
                            <th>회원할인금액</th>
                            <th>이벤트할인금액</th>
                            <th>사용적립금</th>
                            <th>쿠폰사용금</th>
                            <th>결제수수료</th>
                            <th>정산금액합계</th>
                            <th>정산현황</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="16" height="50">검색결과가 존재하지 않습니다.</td>
                        </tr>
                        <tr>
                            <th colspan="4">년 월 합계</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4">전체 합계</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
    </div>
</template>

<script>
import SwsSeller from '@/components/common/SwsSeller'
import SwsCategory from '@/components/common/SwsCategory'
import SwsDate from '@/components/common/SwsDate'
export default {
    components: {
        SwsSeller,
        SwsCategory,
        SwsDate
    },
    data () {
        return {
            SearchForm: {
                sellerSysId: 0,
                sellerId: '',
                category: [],
                accountStatus: '',
                startDate: '',
                endDate: ''
            }
        }
    },
    methods: {
        onSubmit: function () {
            this.SearchForm.startDate = this.$refs.swsDate.startDate
            this.SearchForm.endDate = this.$refs.swsDate.endDate
            
            return false
        }
    }

}
</script>

<style>

</style>
