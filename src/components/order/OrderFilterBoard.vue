<template>
    <div>
        <b-form @submit.prevent="onSubmit">
            <table class="t_form">
                <tbody>
                    <template v-if="isProgress">
                        <tr>
                            <th>진행상태</th>
                            <td>
                                <div class="mb-1">
                                    <input type="checkbox" id="cb_101" v-model.number="orderFilter.payStep" value="101"><label class="mr-3" for="cb_101">입금확인중</label>
                                    <input type="checkbox" id="cb_102" v-model.number="orderFilter.payStep" value="102"><label class="mr-3" for="cb_102">결제완료</label>
                                    <input type="checkbox" id="cb_103" v-model.number="orderFilter.payStep" value="103"><label class="mr-3" for="cb_103">상품준비중</label>
                                    <input type="checkbox" id="cb_104" v-model.number="orderFilter.payStep" value="104"><label class="mr-3" for="cb_104">발송완료</label>
                                    <input type="checkbox" id="cb_105" v-model.number="orderFilter.payStep" value="105"><label class="mr-3" for="cb_105">구매확정</label>
                                    <input type="checkbox" id="cb_106" v-model.number="orderFilter.payStep" value="106"><label class="mr-3" for="cb_106">주문취소</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="cb_210" v-model.number="orderFilter.payStep" value="210"><label class="mr-3" for="cb_210">주문취소신청</label>
                                    <input type="checkbox" id="cb_220" v-model.number="orderFilter.payStep" value="220"><label class="mr-3" for="cb_220">주문교환신청</label>
                                    <input type="checkbox" id="cb_221" v-model.number="orderFilter.payStep" value="221"><label class="mr-3" for="cb_221">주문교환완료</label>
                                    <input type="checkbox" id="cb_230" v-model.number="orderFilter.payStep" value="230"><label class="mr-3" for="cb_230">주문반품신청</label>
                                    <input type="checkbox" id="cb_231" v-model.number="orderFilter.payStep" value="231"><label class="mr-3" for="cb_231">주문반품완료</label>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <th>결제수단</th>
                        <td>
                            <input type="radio" id="pay_1" v-model.number="orderFilter.payMethod" value="0"><label class="mr-3" for="pay_1">전체</label>
                            <input type="radio" id="pay_2" v-model.number="orderFilter.payMethod" value="1"><label class="mr-3" for="pay_2">온라인입금</label>
                            <input type="radio" id="pay_3" v-model.number="orderFilter.payMethod" value="2"><label class="mr-3" for="pay_3">신용카드</label>
                            <input type="radio" id="pay_4" v-model.number="orderFilter.payMethod" value="3"><label class="mr-3" for="pay_4">계좌이체</label>
                            <input type="radio" id="pay_5" v-model.number="orderFilter.payMethod" value="4"><label class="mr-3" for="pay_5">가상계좌</label>
                            <input type="radio" id="pay_6" v-model.number="orderFilter.payMethod" value="5"><label class="mr-3" for="pay_6">에스크로</label>
                        </td>
                    </tr>
                    <tr>
                        <th>기간</th>
                        <td>
                            <sws-date ref="swsDate" :parentData="orderFilter"></sws-date>
                        </td>
                    </tr>
                    <tr>
                        <th>주문금액</th>
                        <td>
                            <input type="text" class="text_input" v-model="orderFilter.minPrice" style="width:100px"> 원 ~
                            <input type="text" class="text_input" v-model="orderFilter.maxPrice" style="width:100px"> 원
                        </td>
                    </tr>
                    <tr>
                        <th>상품분류</th>
                        <td>
                            <sws-category :selectedCategory="orderFilter.categoryList"></sws-category>
                        </td>
                    </tr>
                    <tr>
                        <th>그룹별</th>
                        <td>
                            <sws-seller :parentData="orderFilter"></sws-seller>
                        </td>
                    </tr>
                    <tr>
                        <th>직접검색</th>
                        <td>
                            <select class="text_input" v-model="orderFilter.searchField">
                                <option v-for="(item, index) in searchFilter" :key="index" :value="item.value">{{ item.text }}</option>
                            </select>
                            <input type="text " name="sword " class="text_input" v-model="orderFilter.searchText" style="width:300px ">&emsp;
                            <b-button type="submit" variant="outline-secondary" size="sm"> <font-awesome-icon icon="search" size="sm"/>&emsp;검색 </b-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-form>
    </div>
</template>

<script>
import SwsSeller from '@/components/common/SwsSeller'
import SwsDate from '@/components/common/SwsDate'
import SwsCategory from '@/components/common/SwsCategory'
import commonJs from '@/assets/js/common.js'
export default {
    data () {
        return {
            searchFilter: [
                {value: '0', text: '전체'},
                {value: 'ordno', text: '주문번호'},
                {value: 'id', text: '주문자ID'},
                {value: 'ordname', text: '주문자명'},
                {value: 'ordemail', text: '주문자이메일'},
                {value: 'ordtel', text: '주문자연락처'},
                {value: 'rcvname', text: '수령인명'},
                {value: 'rcvtel', text: '수령인전화번호'},
                {value: 'remittor', text: '입금자명'},
                {value: 'gcode', text: '상품코드'},
                {value: 'gname', text: '상품명'}
            ],
            orderFilter: {
                payStep: [],
                payMethod: 0,
                startDate: '',
                endDate: '',
                minPrice: '',
                maxPrice: '',
                categoryList: [],
                sellerSysId: 0,
                searchField: 0,
                searchText: ''
            }
        }
    },
    props: ['isProgress'],
    mixins: [commonJs],
    components: {
        SwsSeller,
        SwsDate,
        SwsCategory
    },
    mounted () {
        this.onSubmit()
    },
    methods: {
        onSubmit: function () {
            let searchParams = {}
            //  전체 주문 확인시에만 필요한 항목이므로, 이후에 대한 것들은 제외한다.
            if (this.isProgress) {
                if(this.orderFilter.payStep.length > 0) {
                    searchParams.payStep = []
                    for(let i of this.orderFilter.payStep) {
                        searchParams.payStep.push(i)
                    }
                }
            }

            // 결재수단 
            searchParams.payMethod = this.orderFilter.payMethod
            
            // 기간
            searchParams.startDate = this.orderFilter.startDate
            searchParams.endDate = this.orderFilter.endDate

            //주문금액
            if(!this.isEmpty(this.orderFilter.minPrice)) {searchParams.minPrice = this.orderFilter.minPrice}
            if(!this.isEmpty(this.orderFilter.maxPrice)) {searchParams.maxPrice = this.orderFilter.maxPrice}

            //카테고리
            if (this.orderFilter.categoryList[0].value > 0) {searchParams.categorySysId1 = this.orderFilter.categoryList[0].value}
            if (this.orderFilter.categoryList[1].value > 0) {searchParams.categorySysId2 = this.orderFilter.categoryList[1].value}
            if (this.orderFilter.categoryList[2].value > 0) {searchParams.categorySysId3 = this.orderFilter.categoryList[2].value}
            if (this.orderFilter.categoryList[3].value > 0) {searchParams.categorySysId4 = this.orderFilter.categoryList[3].value}
            if (this.orderFilter.categoryList[4].value > 0) {searchParams.categorySysId5 = this.orderFilter.categoryList[4].value}
            
            // 판매자
            if(this.orderFilter.sellerSysId > 0) {searchParams.sellerSysId = this.orderFilter.sellerSysId}

            if(this.orderFilter.searchField > 0) {searchParams.searchSelecter = this.orderFilter.searchField}
            if(!this.isEmpty(this.orderFilter.searchText)) {searchParams.searchText = this.orderFilter.searchText}

            this.$emit('search', searchParams)
            return false
        }
    }
}
</script>

<style>

</style>