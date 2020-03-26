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
            <li>주문을 취소한 내역을 보여주는 곳입니다.</li>
        </ul>
        <!--검색 필터  -->
        <Order-filter-board
            :isProgress="false"
            :orderFilter="orderFilter"
            :items="items"
            @search="filterRequest"
        >
        </Order-filter-board>
        <!-- 조회 테이블 -->
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
export default {
    data () {
        return {
            orderFilter: '',
            items: []
        }
    },
    components: {
        OrderFilterBoard
    },
    methods: {
        filterRequest: function (req) {
            console.log(req)
        }
    }
}
</script>

<style>

</style>