<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>주문/매출관리</li>
            <li>주문관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>   
        <ul class="helpbox">
            <li>입금이 확인되지 않은 주문을 취소신청한 내역을 보여주는 곳입니다.</li>
        </ul>
        <!--검색 필터  -->
        <Order-filter-board :isProgress="false" :orderList="orderStatusList" @search="loadData"/>
        <!-- 조회 테이블 -->
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
export default {
    data: () => ({
        orderStatusList: [100]
    }),
    components: {
        OrderFilterBoard
    },
    methods: {
        loadData: function (req) {
            console.log(req)
        }
    }
}
</script>

<style>

</style>