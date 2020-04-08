<template>
    <!-- 주문취소 -->
    <b-modal size="lg" hide-footer id="cancelModal" title="쉘위샵 - 주문취소신청">
        <!-- 주문정보 -->
        <div>
            <h4>주문정보</h4>
            <table class="table table-bordered">
                <col width="20%"/>
                <col width="30%"/>
                <col width="20%"/>
                <col width="30%"/>
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
                        <th class="bg-light">상품정보</th>
                        <th class="bg-light text-right">상품금액</th>
                        <th class="bg-light text-right">주문수량</th>
                        <th class="bg-light">신청수량</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in selectedItem.orderProducts" :key="index">
                        <td v-html="item.name"></td>
                        <td class="text-right" v-html="new Intl.NumberFormat().format(item.price)+'원'"></td>
                        <td class="text-right" v-html="new Intl.NumberFormat().format(item.qty)+'개'"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 취소 사유 -->
        <div>
            <table class="table table-bordered table-sm">
                <col width="20%"/>
                <col width="*"/>
                <tr>
                    <td rowspan="3" class="bg-light align-middle p-3">
                        사유입력
                    </td>
                </tr>
                <tr>
                    <td>
                        <select>
                            <option value="1">취소 사유</option>
                            <option value="2">사용자 변심</option>
                            <option value="3">재고 부족</option>
                            <option value="4">타 몰이유</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea class="form-control"></textarea>
                    </td>
                </tr>
            </table>
            <div class="mt-2 text-right">
                <b-button block variant="outline-danger" @click="submitOrderClose">&times; 주문취소</b-button>&emsp;
                <!-- <b-button variant="outline-secondary" @click="$bvModal.hide('cancelModal')">닫기</b-button> -->
            </div>
        </div>
    </b-modal>
</template>

<script>
import { codeMapper } from '@/components/order/codeMapping.js'
export default {
    props: ['selectedItem'],
    methods: {
        setTranslatCode: function (item) {
            let codeMap = codeMapper(item)
            return codeMap.text
        },
        submitOrderClose: function (event){
            console.log(event)
        }
    },
}
</script>

<style>

</style>