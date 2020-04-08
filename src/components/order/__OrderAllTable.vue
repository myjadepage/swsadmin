<template>
    <b-row>
        <b-col cols="12" class="mb-2 mt-2">
            <div class="float-left">
                <b>총 {{items.length}} 건의 주문이 조회되었습니다.</b>
            </div>
            <div class="float-right">
                <!-- <select class="text_input mr-2" v-model="perPage">
                    <option value="5">5줄씩 보기</option>
                    <option value="10">10줄씩 보기</option>
                    <option value="20">20줄씩 보기</option>
                </select> -->
            </div>
        </b-col>
        <b-col cols="12">
            <b-table 
                :fields="fields" 
                :items="items"
                :busy="isbusy"
                :current-page="currentPage"
                :per-page="perPage"
                head-variant="light"
                small
            >   
                <!-- <template v-slot:cell(chk)="items">
                    <input type="checkbox" :value="items.item.orderSysId"/>
                </template> -->
                <template v-slot:cell(no)="items">
                    {{items.index + 1}}
                </template>
                <template v-slot:cell(orderCode)="orderCode">
                    <p><b-link class="text-weight-underline" @click="loadDetailOrderFn($event, orderCode.item)">{{ orderCode.item.orderCode }}</b-link></p>
                </template>
                <template v-slot:cell(orderedAt)="items">
                    <p>{{items.item.orderedAt}}</p>
                </template>
                <template v-slot:cell(amount)="items">
                    <p v-html="new Intl.NumberFormat().format(items.item.amount)+'원'"></p>
                </template>
                <template v-slot:cell(deliveryAmount)="items">
                    <p v-html="new Intl.NumberFormat().format((items.item.deliveryAmount || 0))+'원'"></p>
                </template>
                <template v-slot:cell(statusCode)="order">
                    <p v-html="setTranslatCode({type: 'statusCode', value: order.item.statusCode})"></p>
                </template>
                <template v-slot:row-details="items">
                    <div style="margin-left:70px">
                        <div>
                            <!-- 결제정보-->
                            <div class="mt-1">
                                <table class="table table-sm" style="background: #fffbec; margin: 0px">
                                    <col width="70px"/>
                                    <col width="*"/>
                                    <tbody>
                                        <tr>
                                            <th class="font-weight-bold align-middle text-center">결제</th>
                                            <td>
                                                <span class="font-weight-bold text-info" v-html="setTranslatCode({type: 'payTypeCode', value: items.item.orderPay.payTypeCode})"></span>&emsp;
                                                <span class="text-danger font-weight-bold" v-html="new Intl.NumberFormat().format(items.item.amount)+'원'"></span>&emsp;
                                                <span class="align-bottom" style="font-size:11px">
                                                    (<span style="font-size:11px">쿠폰할인금액: <span style="font-size:11px" v-html="new Intl.NumberFormat().format(items.item.couponDiscount)+'원'"></span></span> 
                                                    <span style="font-size:11px" v-if="items.item.usedPoint">, 적립금사용금액: <span v-html="new Intl.NumberFormat().format(items.item.usedPoint)"></span></span>)
                                                </span>
                                                <div>
                                                    <span class="badge badge-secondary">입금계좌</span>&emsp;
                                                    <span>
                                                        <span class="badge badge-info">{{items.item.iniPay.vbank_name}}</span>&emsp;
                                                        <span>{{items.item.iniPay.vbank_num}}</span>
                                                    </span>&emsp;
                                                    <span class="badge badge-secondary">입금자명</span>&emsp;
                                                    <span>{{items.item.iniPay.vbank_holder}}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <!--  환불 tr -->
                                        <!-- <tr>
                                            <th class="font-weight-bold text-center">환불</th>
                                            <td>
                                                <p>
                                                    <span>현재 1건의 클레임이 처리 완료 / 환불 승인취소 오류 0건 / 환불 총액 {{items.item.amount}} (현금: {{items.item.amount}}, 쿠폰할인금: {{ items.item.couponDiscount }})</span>
                                                    <span class="float-right">
                                                        <a class="btn btn-sm btn-outline-secondary">상세내역</a>
                                                    </span>
                                                </p>
                                                <div class="mt-3" style="border: 1px solid #dc354538 ">
                                                    <table class="table mb-0">
                                                        <col width="8%" />
                                                        <col width="8%" />
                                                        <col width="8%" />
                                                        <col width="8%" />
                                                        <col width="8%" />
                                                        <col width="*" />
                                                        <tr>
                                                            <td colspan="6" class="bg-light font-weight-bold text-danger" style="border-top: 0px solid">
                                                                취소완료
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th class="text-danger bg-light font-weight-bold">주문자명</th>
                                                            <td class="text-danger" style="background: #FFF">김도령</td>
                                                            <th class="text-danger bg-light font-weight-bold">아이디</th>
                                                            <td class="text-danger" style="background: #FFF">kimehfud</td>
                                                            <th class="text-danger bg-light font-weight-bold">신청일자</th>
                                                            <td class="text-danger" style="background: #FFF">2020-04-03 00:00:13</td>
                                                        </tr>
                                                        <tr>
                                                            <th class="text-danger bg-light font-weight-bold">환불방식</th>
                                                            <td class="text-danger " style="background: #FFF">계좌송금</td>
                                                            <th class="text-danger bg-light font-weight-bold">환불금액</th>
                                                            <td class="text-danger " colspan="3" style="background: #FFF">2,0000,000</td>
                                                        </tr>
                                                    </table>
                                                    <table class="table mb-0">
                                                        <col width="*" />
                                                        <col width="15%" />
                                                        <col width="15%" />
                                                        <col width="15%" />
                                                        <col width="15%" />
                                                        <tr>
                                                            <td class="bg-light font-weight-bold">상품명</td>
                                                            <td class="bg-light font-weight-bold">가격</td>
                                                            <td class="bg-light font-weight-bold">신청수량</td>
                                                            <td class="bg-light font-weight-bold">승인자</td>
                                                            <td class="bg-light font-weight-bold">승인일시</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr> -->
                                        <tr>
                                            <th class="font-weight-bold text-center">수령인</th>
                                            <td>{{ items.item.receiverAddres }}&emsp;{{ items.item.receiverName }}&emsp;<span class="font-italic">[{{ items.item.receiverMobile }}]</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- 결제정보 끝-->

                            <!-- 상품조회 -->
                            <div class="mt-1">
                                <b-table :fields="subFields" :items="items.item.orderProducts">
                                    <template v-slot:cell(productName)="product">
                                        {{ product.item.name }}
                                    </template>
                                    <template v-slot:cell(qty)="product">
                                        <p v-html="new Intl.NumberFormat().format(product.item.qty) + '개'"></p>
                                    </template>
                                    <template v-slot:cell(supplyPrice)="product">
                                        <p v-html="new Intl.NumberFormat().format(product.item.supplyPrice) + '원'"></p>
                                    </template>
                                    <template v-slot:cell(price)="product">
                                        <p v-html="new Intl.NumberFormat().format(product.item.price) + '원'"></p>
                                    </template>
                                    <template v-slot:cell(debitAmount)="product">
                                        <p v-html="new Intl.NumberFormat().format(product.item.debitAmount) + '원'"></p>
                                    </template>
                                    <template v-slot:cell(debitInfo)="product">
                                        <p v-html="setTranslatCode({type: 'deliveryPriceTypeCode', value: product.item.deliveryPriceTypeCode})"></p>
                                    </template>
                                    <template v-slot:cell(statusCode)="product">
                                        <p v-html="setTranslatCode({type: 'statusCode', value: product.item.statusCode})"></p>
                                        <order-status-info 
                                            :items="items"
                                            :order="product"
                                            @orderCancel="loadCancelOrderFn"
                                        >
                                        </order-status-info>
                                    </template>
                                    <!-- 상품상세 내역 -->
                                    <!-- <template v-slot:row-details>
                                        <div style="margin-left:70px">
                                            <table class="table table-sm">
                                                <col width="70px" />
                                                <col width="130px" />
                                                <col width="90px" />
                                                <col width="90px" />
                                                <col width="*" />
                                                <col width="130px" />
                                                <col width="90px" />
                                                <col width="130px" />
                                                <thead>
                                                    <th class="font-weight-bold">구분</th>
                                                    <th class="font-weight-bold text-center">신청일자</th>
                                                    <th class="font-weight-bold">환불방법</th>
                                                    <th class="font-weight-bold text-right">신청수량</th>
                                                    <th class="font-weight-bold">사유</th>
                                                    <th class="font-weight-bold text-center">환불완료일자</th>
                                                    <th class="font-weight-bold text-center">상태</th>
                                                    <th class="font-weight-bold text-center">처리일자</th>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>취소</td>
                                                        <td class="text-center">2020-04-03 00:00:00</td>
                                                        <td>계좌송금</td>
                                                        <td class="text-right">2개</td>
                                                        <td>단순 변심</td>
                                                        <td class="text-center">2020-04-03 00:00:00</td>
                                                        <td class="text-center">주문취소완료</td>
                                                        <td class="text-center">2020-04-03 00:00:00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </template> -->
                                    <template v-slot:cell(update)>
                                        <b-button variant="outline-secondary" size="sm">변경이력</b-button>
                                    </template>
                                </b-table>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:empty>
                    <p class="text-center">죄송합니다. 데이터를 찾을수 없습니다.</p>
                </template>
                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>&emsp;&emsp;&emsp;&emsp;
                        <strong>Loading...</strong>
                        </div>
                </template>
            </b-table>
            
            <b-pagination 
                v-model="currentPage"
                :total-rows="totalRow"
                :per-page="perPage"
                :limit="5"
                @change="$emit('changePage', $event * perPage)"
                align="center"
            >
            </b-pagination>
        </b-col>
        
        <order-detail-modal ref="orderDetailModal" :selectedItem="selectedOrder" />
        <order-cancel-modal ref="orderCancelModal" @orderCancel="loadCancelOrderFn" :selectedItem="selectedOrder"/>
    </b-row>
</template>

<script>
import commonJs from '@/assets/js/common.js'
import { codeMapper } from '@/components/order/codeMapping.js'
import orderStatusInfo from '@/components/order/orderStatusInfo.vue'
import orderDetailModal from '@/components/order/orderModal/orderDetailModal.vue'
import orderCancelModal from '@/components/order/orderModal/orderCancelModal.vue'
export default {
    props: ['items', 'totalRow', 'isbusy', 'perPage'],
    mixins: [commonJs],
    data: () => ({
        currentPage: 1,
        fields: [
            {key: 'no', label: 'NO', class: 'text-center align-middle', thStyle: 'width: 75px'},
            {key: 'orderCode', label: '주문번호', class: 'text-center align-middle', sortable: true, thStyle: 'width: 200px'},
            {key: 'orderedAt', label: '주문일시', class: 'text-center align-middle', sortable: true, thStyle: 'width: 200px'},
            {key: 'amount', label: '총주문금액', class: 'text-right align-middle', thStyle: 'width: 150px'},
            {key: 'deliveryAmount', label: '배송비', class: 'text-right align-middle', thStyle: 'width: 150px'},
            {key: 'orderName', label: '주문자', class: 'text-center align-middle', thStyle: 'width: 150px'},
            {key: 'statusCode', label: '진행상태', class: 'text-center align-middle'}
        ],
        subFields: [
            {key: 'productName', label: '주문상품', class: 'align-middle'},
            {key: 'qty', label: '수량', class: ' align-middle  text-right', thStyle: 'width: 50px'},
            {key: 'supplyPrice', label: '공급가', class: ' align-middle text-right', thStyle: 'width: 100px' },
            {key: 'price', label: '판매가', class: ' align-middle text-right', thStyle: 'width: 100px'},
            {key: 'debitAmount', label: '배송비', class: ' align-middle text-right', thStyle: 'width: 100px'},
            {key: 'debitInfo', label: '배송정보', class: 'align-middle text-center', thStyle: 'width: 100px'},
            {key: 'statusCode', label: '진행상태', class: 'align-middle text-center', thStyle: 'width: 180px'},
            {key: 'update', label: '변경이력', class: ' align-middle  text-center', thStyle: 'width: 80px'}
        ],
        selectedOrder: {
            statusCode:{},
            orderProducts:[]
        }
    }),
    components: {
        orderStatusInfo,
        orderDetailModal,
        orderCancelModal
    },
    methods: {
        loadDetailOrderFn: function (event, item) {
            this.selectedOrder = item
            this.$refs.orderDetailModal.$bvModal.show('detailOrder')
            
        },
        loadCancelOrderFn: function (info, item) {
            console.log(info)
            console.log(item)
            this.selectedOrder = info
            this.selectedOrder.item = item
            this.$refs.orderCancelModal.$bvModal.show('cancelModal')
        },
        setTranslatCode: function (item) {
            let codeMap = codeMapper(item)
            return codeMap.text
        }

    }
}
</script>

<style>

</style>