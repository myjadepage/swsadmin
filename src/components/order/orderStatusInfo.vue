<template>
    <div>
        <!-- 입금 확인 중 -->
        <div v-if="order.item.statusCode === 1">
            <p><b-link class="text-primary" @click="changeStatusCodeFn(order, {statusObj:{statusCode: 2}, statusTxt: '결재완료'})">결재완료로 이동</b-link></p>
        </div>
        <!-- 결제완료 -->
        <div v-else-if="order.item.statusCode === 2">
            <p><b-link class="text-primary" @click="changeStatusCodeFn(order, {statusObj:{statusCode: 3}, statusTxt: '상품준비중'})">상품준비중으로 이동</b-link></p>
        </div>
        <!-- 상품준비중 -->
        <div v-else-if="order.item.statusCode === 3">
            <p><b-link class="text-primary" @click="changeStatusCodeFn(order, {statusObj:{statusCode: 4}, statusTxt: '발송완료'})">발송완료처리</b-link></p>
            
        </div>
        <!-- 발송완료 -->
        <div v-else-if="order.item.statusCode ===4">
            
        </div>
    </div>
</template>

<script>
import commonJs from '@/assets/js/common.js'
export default {
    props: ['order'],
    data: () =>({

    }),
    mixins: [commonJs],
    methods: {
        // 진행상태변경 이벤트
        changeStatusCodeFn: function (order, obj) {
            if (confirm('해당 상품을 '+ obj.statusTxt +'로 설정 하시겠습니까?')){
                this.axiosPatchRequest('/api/v1/orders/' + order.item.orderSysId + '/products/' + order.item.orderPrdtSysId + '/status', {jsonData: obj.statusObj}, function (res) {
                    if (res.data.jsonData.resultCode === '0001') {
                        alert(obj.statusTxt +'으로 성공적으로 처리되었습니다. ')
                        if (!this.isEmpty(this.order.modal)) {this.$emit('closeModal', this.order.modal)}
                        document.getElementById('fileterBoard').click()
                    } else {
                        alert('상태변경 중 에러가 발생했습니다.')
                    }
                }.bind(this))
            }
        }
    }
}
</script>
