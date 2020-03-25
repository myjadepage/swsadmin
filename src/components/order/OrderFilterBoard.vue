<template>
    <div>
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
                        <input type="radio" id="pay_1" v-model.number="orderFilter.payMethod" value="all"><label class="mr-3" for="pay_1">전체</label>
                        <input type="radio" id="pay_2" v-model.number="orderFilter.payMethod" value="online"><label class="mr-3" for="pay_2">온라인입금</label>
                        <input type="radio" id="pay_3" v-model.number="orderFilter.payMethod" value="card"><label class="mr-3" for="pay_3">신용카드</label>
                        <input type="radio" id="pay_4" v-model.number="orderFilter.payMethod" value="bank"><label class="mr-3" for="pay_4">계좌이체</label>
                        <input type="radio" id="pay_5" v-model.number="orderFilter.payMethod" value="virtual"><label class="mr-3" for="pay_5">가상계좌</label>
                        <input type="radio" id="pay_6" v-model.number="orderFilter.payMethod" value="escrow"><label class="mr-3" for="pay_6">에스크로</label>
                    </td>
                </tr>
                <tr>
                    <th>기간</th>
                    <td>
                        <b-row>
                            <b-col cols="2">
                                <b-form-datepicker id="startDate" placeholder="시작일자 선택" v-model="orderFilter.startDate"></b-form-datepicker>
                            </b-col>
                            <b-col cols="2">
                                <b-form-datepicker id="endDate" placeholder="종료일자 선택" v-model="orderFilter.endDate"></b-form-datepicker>
                            </b-col>
                        </b-row>
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
                        <select class="text_input" v-model="orderFilter.sellerSysId">
                            <option v-for="(seller, index) in sellers" :key="index" :value="seller.value">{{ seller.text }}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>직접검색</th>
                    <td>
                        <select class="text_input" v-model="orderFilter.searchField">
                            <option v-for="(item, index) in searchFilter" :key="index" :value="item.value">{{ item.text }}</option>
                        </select>
                        <input type="text " name="sword " class="text_input" v-model="orderFilter.searchText" style="width:300px ">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-center mt-2">
            <b-button variant="info" @click="$emit('search', orderFilter)">
                <font-awesome-icon icon="search" size="sm"/>&emsp;검색
            </b-button>
        </div>
    </div>
</template>

<script>
import SwsCategory from '@/components/common/SwsCategory'
import commonJs from '@/assets/js/common.js'
export default {
    data () {
        return {
            sellers: [{value: 0, text: '판매자를 선택하십시오'}],
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
                startDate: '2020-01-01',
                endDate: '2020-03-25',
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
        SwsCategory
    },
    mounted () {
        this.axiosGetRequest('/api/v1/sellers/bases', null, this.loadSeller)
    },
    methods: {
        loadSeller: function (res) {
            const result = res.data.jsonData.sellers
            for(const row of result) {
                this.sellers.push({value: row.sellerSysId, text: row.name})
            }
        },
    }
}
</script>

<style>

</style>