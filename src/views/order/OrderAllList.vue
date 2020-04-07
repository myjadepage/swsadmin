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
        <Order-filter-board :isProgress="true" :orderList="orderStatusList" @search="initialloadData"/>
        <!-- 조회 테이블 -->
        <Order-all-table :items.sync="items" :totalRow.sync="totalRow" :isbusy="isbusy" @changePage="changePage"></Order-all-table>
    </div>
</template>

<script>
import OrderFilterBoard from '@/components/order/OrderFilterBoard'
import OrderAllTable from '@/components/order/OrderAllTable'
import commonJs from '@/assets/js/common.js'
import { setOrderItem } from '@/components/order/codeMapping.js'
export default {
    data: () =>({
        orderStatusList: [1,2,3,4,5,100,101,102,103,104,105],
        items: [],
        totalRow: 0,
        rowPackage: 200,
        req: {},
        isbusy: false
    }),
    components: {
        OrderFilterBoard,
        OrderAllTable
    },
    mixins: [commonJs],
    methods: {
        initialloadData: function (req) {
            this.req = req
            this.isbusy = true
            req.startIndex = 0
            req.rowCount = 10
            this.axiosGetRequest('/api/v1/orders', req, function (res){
                this.items.splice(0)
                if (this.isEmpty(res.data.jsonData['orders'])) { this.isbusy = false; return false }
                res.data.jsonData.orders.forEach(item => {
                    this.items.push(setOrderItem(item))
                })
                this.totalRow = res.data.jsonData.orders.length
                this.isbusy = false
            }.bind(this))
        },
        changePage : function (currentPage) {
            if(currentPage/this.totalRow > 0.5) {
                this.req.startIndex = this.totalRow+1 
                this.axiosGetRequest('/api/v1/orders', this.req, function (res) {
                    this.totalRow = (this.totalRow + res.data.jsonData.orders.length)
                    if (!this.isEmpty(res.data.jsonData['orders'])) {
                        const data = res.data.jsonData.orders
                        data.forEach(item => {
                            this.items.push(setOrderItem(item))
                        }) 
                    }
                }.bind(this))
            }



            // if (currentPage/this.totalRow > 0.5) {
            //     this.axiosGetRequest('/api/v1/orders', this.req, function (res) {
            //         this.totalRow = res.data.jsonData.orders.length
            //         if (!this.isEmpty(res.data.jsonData['orders'])) {
            //             const data = res.data.jsonData.orders
            //             data.forEach(item => {
            //                 this.items.push(setOrderItem(item))
            //             }) 
            //         }
            //     }.bind(this))
            // }
        }
    }
}
</script>

<style>

</style>