<template>
    <!-- 주문취소 -->
    <b-modal size="lg" hide-footer id="cancelModal" title="쉘위샵 - 주문취소신청">
        <!-- 주문정보 -->
        <div>
            <h4>주문정보</h4>
            <table class="table table-bordered">
                <col width="15%"/>
                <col width="*"/>
                <col width="15%"/>
                <col width="*"/>
                <tr>
                    <th class="bg-light">주문번호</th>
                    <td><b v-html="selectedItem.orderCode"></b></td>
                    <th class="bg-light">결재금액</th>
                    <td v-html="new Intl.NumberFormat().format(selectedItem.amount)+'원'"></td>
                </tr>
                <tr>
                    <th class="bg-light">주문상태</th>
                    <td class="align-middle" v-html="setTranslatCode({type: 'statusCode', value: selectedItem.statusCode})"></td>
                    <th class="bg-light">주문일자</th>
                    <td>{{selectedItem.orderedAt}}</td>
                </tr>
            </table>
        </div>
        <!-- 상품 정보 -->
        <div>
            <h4>상품정보</h4>
            <table class="table" style="border:1px solid #dee2e6">
                <thead>
                    <tr>
                        <th class="bg-light"></th>
                        <th class="bg-light">상품정보</th>
                        <th class="bg-light text-right">상품금액</th>
                        <th class="bg-light text-right">주문수량</th>
                        <th class="bg-light text-right">신청수량</th>
                        <th class="bg-light text-center">진행상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in cancelProductList" :key="index">
                        <td><input type="checkbox" :id="'CHECK'+index" :value="item.orderPrdtSysId" v-model="selectedOrderPrdtList"/></td>
                        <td><label :for="'CHECK'+index" v-html="item.name"></label></td>
                        <td class="text-right" v-html="new Intl.NumberFormat().format(item.price)+'원'"></td>
                        <td class="text-right" v-html="new Intl.NumberFormat().format(item.qty)+'개'"></td>
                        <td class="text-right">
                            <template v-if="item.qty > 1">
                                <select style="width:40px" v-model="item.cancelQty" @change="calculFn">
                                    <option v-for="n in item.qty" :key="n" :value="n">{{n}}</option>
                                </select>
                            </template>
                            <template v-else>
                                {{item.cancelQty = item.qty}}
                            </template>
                        </td>
                        <td class="text-center" v-html="setTranslatCode({type:'statusCode', value: item.statusCode})"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 취소 사유 -->
        <div>
            <table class="table table-bordered table-sm">
                <col width="15%"/>
                <col width="*"/>
                <tr>
                    <td rowspan="3" class="bg-light align-middle p-3">
                        사유입력
                    </td>
                </tr>
                <tr>
                    <td>
                        <select v-model="cancelOrder.cancelMemoSelector">
                            <option value="1">취소 사유</option>
                            <option value="2">사용자 변심</option>
                            <option value="3">재고 부족</option>
                            <option value="4">타 몰이유</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea class="form-control" v-model="cancelOrder.cancelMemoText"></textarea>
                    </td>
                </tr>
            </table>
            <template v-if="returnPriceFlag">
                <!-- 환불예정금액 -->
                <table class="table table-sm table-bordered">
                    <col width="15%" />
                    <col width="*" />
                    <col width="15%" />
                    <col width="*" />
                    <tr>
                        <th class="align-middle bg-light">취소상품금액</th>
                        <td><input class="text_input w-100" type="search" readonly v-model="cancelOrder.cancelProductPrice" /></td>
                        <th class="align-middle bg-light">추가 배송비</th>
                        <td><input class="text_input w-100" type="search" readonly v-model="cancelOrder.cancelDeliveryPrice" /></td>
                    </tr>
                    <tr>
                        <th class="align-middle bg-light">총 환불예정금액</th>
                        <td><input class="text_input w-100" type="search" readonly v-model="cancelOrder.cancelExpectPrice" /></td>
                        <th class="align-middle bg-light">반환 적립금</th>
                        <td><input class="text_input w-100" type="search" readonly v-model="cancelOrder.cancelReturnPoint" /></td>
                    </tr>
                    <tr>
                        <th class="align-middle bg-light">환불금액</th>
                        <td><input class="text_input w-100" type="search" readonly v-model="cancelOrder.cancelAllPrice" /></td>
                    </tr>
                </table>

                <!-- 환불 계좌 -->
                <table class="table table-sm table-bordered">
                    <col width="15%" />
                    <col width="*" />
                    <tr>
                        <th class="bg-light align-middle text-center">은행명</th>
                        <td><input type="search" v-model="cancelOrder.bankName" class="text_input w-100" /></td>
                    </tr>
                    <tr>
                        <th class="bg-light align-middle text-center">계좌번호</th>
                        <td><input type="search" v-model="cancelOrder.bankNumber" class="text_input w-100" /></td>
                    </tr>
                    <tr>
                        <th class="bg-light align-middle text-center">예금주</th>
                        <td><input type="search" v-model="cancelOrder.bankUserName" class="text_input w-100" /></td>
                    </tr>
                </table>
            </template>
            <div class="mt-2 text-right">
                <b-button block variant="outline-danger" @click="submitOrderClose">&times; 주문취소</b-button>&emsp;
                <!-- <b-button variant="outline-secondary" @click="$bvModal.hide('cancelModal')">닫기</b-button> -->
            </div>
        </div>
    </b-modal>
</template>

<script>
import { codeMapper } from '@/components/order/codeMapping.js'
import commonJs from '@/assets/js/common.js'
export default {
    props: ['selectedItem', 'selectedProduct'],
    data:() => ({
        returnPriceFlag: false,
        selectedOrderPrdtList: [],
        cancelProductList: [],
        cancelOrder: {
            cancelProductPrice: '',
            cancelDeliveryPrice: '',
            cancelExpectPrice: '',
            cancelReturnPoint: '',
            cancelAllPrice: '',
            bankName: '',
            bankNumber: '',
            bankUserName: '',
            cancelMemoSelector: 1,
            cancelMemoText: ''
        }
    }),
    mixins: [commonJs],
    watch: {
        selectedItem: function (item){
            this.cancelProductList = item.orderProducts
            this.selectedOrderPrdtList.splice(0)
            this.selectedOrderPrdtList.push(this.selectedProduct.orderPrdtSysId)
        },
        selectedOrderPrdtList: function (item) {
            let maxStatusCode = 1
            for (const e of item) {
                if (e.statusCode > maxStatusCode) {
                    maxStatusCode = e.statusCode
                }
            }
            if (maxStatusCode > 1){
                this.returnPriceFlag = true
            }else {
                this.returnPriceFlag = false
            }


            this.calculFn()
        }
    },
    methods: {
        setTranslatCode: function (item) {
            let codeMap = codeMapper(item)
            return codeMap.text
        },
        submitOrderClose: function (){
            // 1. selected된 플래그값만 주문 취소를 한다. 
            // eslint-disable-next-line no-unused-vars
            let selectItem = []
            for (let item of this.cancelProductList){
                if(this.selectedOrderPrdtList.includes(item.orderPrdtSysId)) {
                    if (this.isEmpty(item.cancelQty)) { 
                        alert('취소할 품목수를 선택하여 주십시오'); 
                        return false
                    } else if (this.isEmpty(this.cancelOrder.cancelMemoText)){
                        alert('품목 취소사유를 입력하여 주시기 바랍니다.')
                        return false
                    } else if (item.statusCode !== 1){
                        if (this.isEmpty(this.cancelOrder.bankName)) {
                            alert('은행명을 기입하여 주시기 바랍니다.')
                            return false
                        } else if (this.isEmpty(this.cancelOrder.bankNumber)) {
                            alert('계좌번호를 기입하여 주시기 바랍니다.')
                            return false
                        } else if (this.isEmpty(this.cancelOrder.bankUserName)) {
                            alert('예금주명을 기입하여 주시기 바랍니다.')
                            return false
                        }
                    }
                    selectItem.push({orderPrdtSysId: item.orderPrdtSysId, cancelQty: item.cancelQty})
                }
            }
            // 2. 입금확인중일때는 주문취소요청 외엔 다른 것을 전달하지 않는다.
            // 3. 결재확인, 상품준비중은 환불도착지가 존재해야함
            // 4. 발송완료후부터는 반품이 되어야함
            this.$bvModal.hide('cancelModal')
        },
        calculFn: function (item) {
            let allPrice = 0
            let allDeliveryPrice = 0
            this.cancelProductList.forEach(_k => {
                allPrice += parseInt(_k.price) * parseInt(_k.cancelQty)
                if (_k.deliveryPriceTypeCode === 1) {
                    allDeliveryPrice += _k.debitAmount
                } else if (_k.deliveryPriceTypeCode === 2) {
                    allDeliveryPrice += _k.prepaymentAmount
                }
                
            })
            this.cancelOrder.cancelProductPrice = new Intl.NumberFormat().format(allPrice)
            this.cancelOrder.cancelDeliveryPrice = allDeliveryPrice
            console.log(item)
        }
    },
}
</script>

<style>

</style>