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
            <li>발송이 완료되어 주문이 완료된 상품목록이 보여집니다.</li>
        </ul>
        <!--검색 필터  -->
        <Order-filter-board :isProgress="true" :orderList="orderStatusList" @search="loadData"/>
        <!-- 조회 테이블 -->
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
export default {
    data: () => ({
        orderStatusList: [4]
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