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
            <li>주문된 상품에 대한 배송 전 목록을 보실 수 있습니다.</li>
        </ul>
        <!--검색 필터  -->
        <Order-filter-board
            :isProgress="false"
            @search="loadData"
        >
        </Order-filter-board>
        <!-- 조회 테이블 -->
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
export default {
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