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
            <li>고객이 구매 확정한 목록이 보여집니다.</li>
            <li><font class="text-danger">발송완료로 이동</font>의 경우 사용자가 구매확정을 5일 동안 안눌렀을때 마스터가 강제로 설정하는 기능입니다.</li>
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
        orderStatusList: [5]
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