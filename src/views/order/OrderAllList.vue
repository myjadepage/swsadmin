<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>주문/매출관리</li>
            <li>전체주문</li>
            <li class="on">{{$route.name}}</li>
        </ul>   
        <ul class="helpbox">
            <li>전체 주문목록을 보실 수 있습니다.</li>
        </ul>
        <!--검색 필터  -->
        <Order-filter-board
            :isProgress="true"
            @search="loadData"
        >
        </Order-filter-board>
        <!-- 조회 테이블 -->
        <Order-all-table></Order-all-table>
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
import OrderAllTable from '@/components/order/OrderAllTable'
export default {
    data: () =>({
        
    }),
    components: {
        OrderFilterBoard,
        OrderAllTable
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