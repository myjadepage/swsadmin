<template>
    <!-- 주문 상세 내역 -->
    <b-modal size="xl" id="detailOrder" title="쉘위샵 - 주문상세내역" style="min-width: 1000px">
        <!-- 진행 상태 -->
        <!-- {{detailItem}} -->
        <br />
        <!-- selectedOrder -->
        <h5 class="font-weight-bold text-info" v-html="setTranslatCode({type: 'statusCode', value: selectedItem.statusCode})"></h5>
        <div>
            <table class="table table-sm">
                <col width="*" />
                <col width="50px" />
                <col width="80px" />
                <col width="80px" />
                <col width="70px" />
                <col width="200px" />
                <col width="150px" />
                <thead class="bg-light">
                    <tr>
                        <th>주문상품</th>
                        <th class="text-right">수량</th>
                        <th class="text-right">판매가</th>
                        <th class="text-right">주문금액</th>
                        <th class="text-center">배송구분</th>
                        <th class="text-center">배송정보</th>
                        <th class="text-center">진행상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in selectedItem.orderProducts" :key="index">
                        <td class="align-middle">
                            {{item.name}}
                        </td>
                        <td class="align-middle text-right" v-html="new Intl.NumberFormat().format(item.qty)+'개'"></td>
                        <td class="align-middle text-right" v-html="new Intl.NumberFormat().format(item.supplyPrice)+'원'"></td>
                        <td class="align-middle text-right" v-html="new Intl.NumberFormat().format(item.price)+'원'"></td>
                        <td class="align-middle text-center"  v-html="setTranslatCode({type:'deliveryPriceTypeCode', value: item.deliveryPriceTypeCode})">
                        </td>
                        <td>
                            <p>
                                <select class="text_input w-75">
                                    <option value="">배송업체선택</option>
                                </select>&emsp;
                                <b-button variant="outline-secondary" size="sm" class="w-20">확인</b-button>
                            </p>
                            <p class="mt-1">
                                <input type="search" class="text_input" style="width: 100%" />
                            </p>
                        </td>
                        <td class="text-center align-middle">
                            <p v-html="setTranslatCode({type:'statusCode', value: item.statusCode})"></p>
                            <order-status-info @closeModal="closeModal" :order="{item:item, modal: 'detailOrder'}"/>
                            <p><b-link class="text-danger" @click="$emit('cancelMoal', selectedItem, item)">주문취소 신청</b-link></p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- <table class="table">
                <thead>
                    <tr>
                        <th class="bg-light">항목</th>
                        <th class="bg-light">내용</th>
                        <th class="bg-light text-right">금액</th>
                        <th class="bg-light">해당상품명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>회원할인</td>
                        <td></td>
                        <td class="text-right"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table> -->
        </div>
        <div>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>해당상품</th>
                        <th>항목</th>
                        <th>내용</th>
                        <th>금액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
        </div>

        <!-- 주문상품 정보 -->
        <div>
            <table class="table table-bordered">
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
                <col width="30%" />
                <tr>
                    <th class="align-middle pl-2 bg-light">주문금액</th>
                    <td v-html="new Intl.NumberFormat().format(selectedItem.amount)+'원'" colspan="3"></td>
                </tr>
                <tr>
                    <th class="align-middle pl-2 bg-light">쿠폰 사용금액</th>
                    <td v-html="new Intl.NumberFormat().format(selectedItem.couponDiscount)+'원'" ></td>
                    <th class="align-middle pl-2 bg-light">적립금 사용 금액</th>
                    <td>3,000원</td>
                </tr>
                <tr>
                    <th class="align-middle pl-2 bg-light">결재 금액</th>
                    <td>8,000원</td>
                    <th class="align-middle pl-2 bg-light">적립 금액</th>
                    <td>1,700원</td>
                </tr>
            </table>
        </div>
        <!-- 주문자 정보 -->
        <div>
            <h5 class="font-weight-bold mb-1"><font-awesome-icon icon="user" /> 주문 자</h5>
            <table class="table table-bordered table-sm">
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
                <col width="30%" />
                <tr>
                    <th class="align-middle pl-2 bg-light">이름</th>
                    <td><input type="search" class="text_input" :value="selectedItem.orderName" /></td>
                    <th class="align-middle pl-2 bg-light">이동전화</th>
                    <td><input type="search" class="text_input" :value="selectedItem.orderMobile"/></td>
                </tr>
                <tr>
                    <th class="align-middle pl-2 bg-light">주소</th>
                    <td colspan="4">
                        <p class="w-100">
                            <span><input type="search" class="text_input"/></span>&emsp;
                            <span><b-button variant="outline-secondary" size="sm">우편번호찾기</b-button></span>
                        </p>
                        <p class="w-100 mt-1">
                            <input type="search" class="w-100 text_input" :value="selectedItem.orderAddress"/>
                        </p>
                    </td>
                </tr>
            </table>
        </div>

        <!-- 받는 분 정보 -->
        <div>
            <h5 class="font-weight-bold mb-1"><font-awesome-icon icon="user" /> 받는 분</h5>
            <table class="table table-bordered table-sm">
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
                <col width="30%" />
                <tr>
                    <th class="align-middle pl-2 bg-light">이름</th>
                    <td><input type="search" class="text_input" :value="selectedItem.receiverName"/></td>
                    <th class="align-middle pl-2 bg-light">이동전화</th>
                    <td><input type="search" class="text_input" :value="selectedItem.receiverMobile"/></td>
                </tr>
                <tr>
                    <th class="align-middle pl-2 bg-light">주소</th>
                    <td colspan="4">
                        <p class="w-100">
                            <span><input type="search" class="text_input" /></span>&emsp;
                            <span><b-button variant="outline-secondary" size="sm">우편번호찾기</b-button></span>
                        </p>
                        <p class="w-100 mt-1">
                            <input type="search" class="w-100 text_input" :value="selectedItem.receiverAddress"/>
                        </p>
                    </td>
                </tr>
                <tr>
                    <th class="align-middle pl-2 bg-light">요청사항</th>
                    <td colspan="3">
                        <textarea class="form-control"></textarea>
                    </td>
                </tr>
            </table>

        </div>

        <!-- 관리자 메모 정보 -->
        <div>
            <table class="table table-bordered table-sm">
                <col width="20%" />
                <col width="*" />
                <tr>
                    <th class="align-middle pl-2 bg-light">내용</th>
                    <td>
                        <textarea class="form-control"></textarea>
                    </td>
                </tr>
            </table>
        </div>
        
        <template v-slot:modal-footer="{ok}" >
            <b-button variant="outline-secondary" @click="ok()">확인</b-button>
        </template>
    </b-modal>
</template>

<script>
import { codeMapper } from '@/components/order/codeMapping.js'
import orderStatusInfo from '@/components/order/orderStatusInfo.vue'
export default {
    props: ['selectedItem'],
    components: {
        orderStatusInfo,
    },
    methods:{
        setTranslatCode: function (item) {
            let codeMap = codeMapper(item)
            return codeMap.text
        },
        closeModal: function (modal) {
            this.$bvModal.hide(modal)
        }
    }
}
</script>

<style>

</style>