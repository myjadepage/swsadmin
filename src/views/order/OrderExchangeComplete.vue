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
        <Order-filter-board :isProgress="false" :orderList="orderStatusList" @search="initialloadData"/>
        <!-- 조회 테이블 -->
        <Order-all-table 
            :items="items" 
            :totalRow="totalRow"
            :perPage="perPage"
            :isbusy="isbusy" 
            @changePage="changePage"
        />
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
import OrderAllTable from '@/components/order/OrderAllTable'
import commonJs from '@/assets/js/common.js'
import orderCommon from '@/components/order/orderCommon.js'
export default {
    data: () =>({
        orderStatusList: [103]
    }),
    components: {
        OrderFilterBoard,
        OrderAllTable
    },
    mixins: [commonJs, orderCommon],
    methods: {
    }
}
</script>

<style>

</style>