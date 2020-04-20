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
                show-empty
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
                                        <tr>
                                            <th class="font-weight-bold text-center">수령인</th>
                                            <td>{{ items.item.receiverAddress }}&emsp;{{ items.item.receiverName }}&emsp;<span class="font-italic">[{{ items.item.receiverMobile }}]</span></td>
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
                                    </template>delivery
                                    <template v-slot:cell(delivery)="product">
                                        <p>
                                            <Sws-delivery-corp :deliveryCorp="deliveryCorp" :order="product.item" />&emsp;
                                            <b-button variant="outline-secondary" size="sm" class="w-20"  :disabled="product.item.statusCode !== 3" @click="$refs.orderStatusInfo.changeStatusCodeFn(product, {statusObj:{statusCode: 4}, statusTxt: '발송완료'})">확인</b-button>
                                        </p>
                                        <p class="mt-1">
                                            <input type="search" v-model="product.item.invoiceNumber" :disabled="product.item.statusCode !== 3" class="text_input" style="width: 100%" />
                                        </p>
                                    </template>
                                    <template v-slot:cell(statusCode)="product">
                                        <p v-html="setTranslatCode({type: 'statusCode', value: product.item.statusCode})"></p>
                                        <order-status-info ref="orderStatusInfo" :order="product"/>
                                        <template v-if="product.item.statusCode < 3">
                                            <p><b-link class="text-danger" @click="loadCancelOrderFn(items.item, product.item)">주문취소 신청</b-link></p>
                                        </template>
                                    </template>
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
        
        <order-detail-modal ref="orderDetailModal" @cancelMoal="loadCancelOrderFn" :selectedItem="detailItem" :deliveryCorp="deliveryCorp"/>
        <order-cancel-modal ref="orderCancelModal" @orderCancel="loadCancelOrderFn" :selectedItem.sync="cancelItem" :selectedProduct.sync="cancelItemProduct"/>
    </b-row>
</template>

<script>
import commonJs from '@/assets/js/common.js'
import { codeMapper } from '@/components/order/CodeMapping.js'
import SwsDeliveryCorp from '@/components/common/SwsDeliveryCorp.vue'
import orderStatusInfo from '@/components/order/OrderStatusInfo.vue'
import orderDetailModal from '@/components/order/orderModal/OrderDetailModal.vue'
import orderCancelModal from '@/components/order/orderModal/OrderCancelModal.vue'
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
            {key: 'debitInfo', label: '배송구분', class: 'align-middle text-center', thStyle: 'width: 100px'},
            {key: 'delivery', label: '배송정보', class: 'align-middle text-center', thStyle: 'width: 175px'},
            {key: 'statusCode', label: '진행상태', class: 'align-middle text-center', thStyle: 'width: 180px'},
            {key: 'update', label: '변경이력', class: ' align-middle  text-center', thStyle: 'width: 80px'}
        ],
        detailItem: {},
        cancelItem: {},
        cancelItemProduct: {},
        deliveryCorp: []
    }),
    components: {
        SwsDeliveryCorp,
        orderStatusInfo,
        orderDetailModal,
        orderCancelModal
    },
    mounted () {
        this.axiosGetRequest('/api/v1/preferences/deliveryCompanys', '' ,function (res) {
            this.deliveryCorp = res.data.jsonData.deliveryCompanys
        }.bind(this))
    },
    methods: {
        loadDetailOrderFn: function (event, item) {
            this.detailItem = item
            this.$refs.orderDetailModal.$bvModal.show('detailOrder')  
        },
        loadCancelOrderFn: function (item, product) {
            this.cancelItem = item
            this.cancelItemProduct = product
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