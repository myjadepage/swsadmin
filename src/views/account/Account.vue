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
            <li>정산내역 목록입니다.</li>
            <li>초기 페이지는 현재달을 기준으로 합니다.</li>
            <li>선배송비는 해당 업체의 해당주문번호 마지막 구매확정상품에 일괄 표시됩니다.</li>
        </ul>
        <form @submit.prevent="onSubmit">
            <table class="t_form">
                <colgroup>
                    <col width="130">
                    <col width="">
                </colgroup>
                <tbody>
                    <tr>
                        <th>구매자구분</th>
                        <td>
                            <select v-model="SearchForm.sellerDivid">
                                <option value="">선택하세요</option>
                                <option value="1">회원</option>
                                <option value="2">비회원</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>기간</th>
                        <td>
                            <sws-date ref="swsDate"></sws-date>
                        </td>
                    </tr>
                    <tr>
                        <th>카테고리별</th>
                        <td>
                            <sws-category :selectedCategory="SearchForm.category"></sws-category>
                        </td>
                    </tr>
                    <tr>
                        <th>키워드검색</th>
                        <td>
                            <select id="skey" name="skey" v-model="SearchForm.searchRange">
                                <option value="">::검색영역선택::</option>
                                <option value="ordname">주문자명</option>
                            </select>
                            <input type="text" class="text_input" style="width:300px" v-model="SearchForm.searchText" placeholder="검색어를 입력하여 주십시오..">&emsp;
                            <b-button size="sm" type="submit"  variant="outline-secondary"><font-awesome-icon icon="search" /> 검색</b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <!-- 정산조회 내역은 이후에 데이터가 있는 상태에서 조회가도록 한다. 2020-03-30 : 김도령 -->
        <ul class="account_form mgt10">
            <li>총정산 : 0 개</li>
            <li>판매종류 : 0 개</li>
            <li>판매수 : 0 개</li>
            <li>상품적립금 합계 : 0 원</li>
            <li>선배송 합계 : 0 원</li>
            <li>결제 수수료 : 0 원</li>
            <li>사용 적립금 : 0 원</li>
            <li>회원 할인금 : 0 원</li>
            <li>이벤트 할인금 : 0 원</li>
            <li>쿠폰 사용금 : 0 원</li>
            <li>판매가합 : 0 원</li>
            <li>공급가합계 :0 원</li>
        </ul>
        <div class="btn_right">
            <span class="button black"><a href="/account/account.excel?suser=0&scate=0&sdts=&sdte=&skey=&sword=">출력/엑셀다운</a></span>
        </div>

        <table class="t_list mgt10">
            <caption>본사 정산 내역</caption>
            <colgroup>
                <col width="30">
                <col width="">
                <col width="70">
                <col width="">
                <col width="50">
            </colgroup>
            <thead>
                <tr>
                    <th>No</th>
                    <th>주문번호</th>
                    <th>구매확정일</th>
                    <th>주문자<br>(입금자)</th>
                    <th>부가세</th>
                    <th>주문상품</th>

                    <th>수량</th>
                    <th>공급가합</th>
                    <th>판매가합</th>

                    <th>선배송비</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="10" height="50">저장된내역이 존재하지 않습니다.</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="2">합계</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>

                    <th>0</th>
                    <th>0</th>

                    <th>0</th>

                    <th>0</th>

                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import SwsCategory from '@/components/common/SwsCategory'
import SwsDate from '@/components/common/SwsDate'

export default {
    data: () => ({
        SearchForm: {
            sellerDivid: '',
            category: [],
            searchRange: '',
            searchText: ''
        }
    }),
    components: {
        SwsCategory,
        SwsDate
    },
    methods: {
        onSubmit: function (obj) {
            console.log(obj)
            this.SearchForm.startDate = this.$refs.swsDate.startDate
            this.SearchForm.endDate = this.$refs.swsDate.endDate
            return false
        }
    }
}
</script>

<style>

</style>