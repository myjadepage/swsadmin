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
                                    <input type="checkbox" id="cb_1" v-model.number="orderFilter.orderStatusList" value="1"><label class="mr-3" for="cb_1">입금확인중</label>
                                    <input type="checkbox" id="cb_2" v-model.number="orderFilter.orderStatusList" value="2"><label class="mr-3" for="cb_2">결제완료</label>
                                    <input type="checkbox" id="cb_3" v-model.number="orderFilter.orderStatusList" value="3"><label class="mr-3" for="cb_3">상품준비중</label>
                                    <input type="checkbox" id="cb_4" v-model.number="orderFilter.orderStatusList" value="4"><label class="mr-3" for="cb_4">발송완료</label>
                                    <input type="checkbox" id="cb_5" v-model.number="orderFilter.orderStatusList" value="5"><label class="mr-3" for="cb_5">구매확정</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="cb_100" v-model.number="orderFilter.orderStatusList" value="100"><label class="mr-3" for="cb_100">주문취소신청</label>
                                    <input type="checkbox" id="cb_101" v-model.number="orderFilter.orderStatusList" value="101"><label class="mr-3" for="cb_101">주문취소신청완료</label>
                                    <input type="checkbox" id="cb_102" v-model.number="orderFilter.orderStatusList" value="102"><label class="mr-3" for="cb_102">주문교환신청</label>
                                    <input type="checkbox" id="cb_103" v-model.number="orderFilter.orderStatusList" value="103"><label class="mr-3" for="cb_103">주문교환신청완료</label>
                                    <input type="checkbox" id="cb_104" v-model.number="orderFilter.orderStatusList" value="104"><label class="mr-3" for="cb_104">주문반품신청</label>
                                    <input type="checkbox" id="cb_105" v-model.number="orderFilter.orderStatusList" value="105"><label class="mr-3" for="cb_105">주문반품신청완료</label>
                                </div>
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <th>결제수단</th>
                        <td>
                            <input type="radio" id="pay_1" v-model.number="orderFilter.payTypeCode" value="0"><label class="mr-3" for="pay_1">전체</label>
                            <input type="radio" id="pay_2" v-model.number="orderFilter.payTypeCode" value="1"><label class="mr-3" for="pay_2">온라인입금</label>
                            <input type="radio" id="pay_3" v-model.number="orderFilter.payTypeCode" value="2"><label class="mr-3" for="pay_3">신용카드</label>
                            <input type="radio" id="pay_4" v-model.number="orderFilter.payTypeCode" value="3"><label class="mr-3" for="pay_4">계좌이체</label>
                            <input type="radio" id="pay_5" v-model.number="orderFilter.payTypeCode" value="4"><label class="mr-3" for="pay_5">가상계좌</label>
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
                            <input type="text" class="text_input" v-model="orderFilter.minOrderAmount" style="width:100px"> 원 ~
                            <input type="text" class="text_input" v-model="orderFilter.maxOrderAmount" style="width:100px"> 원
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
                {value: {code: 1, title: 'orderCode'}, text: '주문번호'},
                {value: {code: 2, title: 'orderUserId'}, text: '주문자ID'},
                {value: {code: 3, title: 'orderUserName'}, text: '주문자명'},
                {value: {code: 4, title: 'orderUserEmail'}, text: '주문자이메일'},
                {value: {code: 5, title: 'orderUserMobile'}, text: '주문자연락처'},
                {value: {code: 6, title: 'receiverName'}, text: '수령인명'},
                {value: {code: 7, title: 'receiverMobile'}, text: '수령인전화번호'},
                {value: {code: 8, title: 'productCode'}, text: '상품코드'},
                {value: {code: 9, title: 'productName'}, text: '상품명'}
            ],
            orderFilter: {
                orderStatusList: this.orderList,
                payTypeCode: 0,
                startDate: '',
                endDate: '',
                minOrderAmount: '',
                maxOrderAmount: '',
                categoryList: [],
                sellerSysId: 0,
                searchField: {code: 1, title: 'orderCode'},
                searchText: ''
            }
        }
    },
    props: ['isProgress', 'orderList'],
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
            // if(this.orderFilter.orderStatusList.length > 0) {
            //     searchParams.orderStatusList = []
            //     for(let i of this.orderFilter.orderStatusList) {
            //         searchParams.orderStatusList.push(i)
            //     }
            // }
            
            searchParams.orderStatusList = this.orderFilter.orderStatusList.join(',')

            // 결재수단 
            searchParams.payTypeCode = this.orderFilter.payTypeCode
            
            // 기간
            searchParams.startDate = this.orderFilter.startDate
            searchParams.endDate = this.orderFilter.endDate

            //주문금액
            if(!this.isEmpty(this.orderFilter.minOrderAmount)) {searchParams.minOrderAmount = this.orderFilter.minOrderAmount}
            if(!this.isEmpty(this.orderFilter.maxOrderAmount)) {searchParams.maxOrderAmount = this.orderFilter.maxOrderAmount}

            //카테고리
            if (this.orderFilter.categoryList[0].value > 0) {searchParams.categorySysId1 = this.orderFilter.categoryList[0].value}
            if (this.orderFilter.categoryList[1].value > 0) {searchParams.categorySysId2 = this.orderFilter.categoryList[1].value}
            if (this.orderFilter.categoryList[2].value > 0) {searchParams.categorySysId3 = this.orderFilter.categoryList[2].value}
            if (this.orderFilter.categoryList[3].value > 0) {searchParams.categorySysId4 = this.orderFilter.categoryList[3].value}
            if (this.orderFilter.categoryList[4].value > 0) {searchParams.categorySysId5 = this.orderFilter.categoryList[4].value}
            
            // 판매자
            if(this.orderFilter.sellerSysId > 0) {searchParams.sellerSysId = this.orderFilter.sellerSysId}

            if(!this.isEmpty(this.orderFilter.searchText) && this.orderFilter.searchText !== ""){
                searchParams.searchTypeCode = this.orderFilter.searchField.code
                searchParams[this.orderFilter.searchField.title] = this.orderFilter.searchText
            }
            
            searchParams.rowCount = 100
            this.$emit('search', searchParams)
            return false
        }
    }
}
</script>

<style>

</style>
