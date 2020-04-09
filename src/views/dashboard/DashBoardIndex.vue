<template>
<div id="contents">
    
    
    <div class="counts">
        <div class="row">
                <h3>대시보드</h3>
                <CountHeader />
        </div>
        <div class="row">
            <div class="col col-3"><Count :imgType="'ico_won'" :data="payments" /></div>
            <div class="col col-3"><Count :imgType="'ico_truck'" :data="deliveries" /></div>
            <div class="col col-3"><Count :imgType="'ico_calc'" :data="orders" /></div>
            <div class="col col-3"><Count :imgType="'ico_boxes'" :data="sellings" /></div>
        </div>
    </div>


    <div class="row">
        <div class="salesGraph col col-6">
            <h3>매출 그래프</h3>
            <LineChart :style="{width:'700px',height:'300px',border:'1px solid #C4C4C4'}" />
        </div>

        <div class="complainSection col col-6">
            <h3>컴플레인 현황</h3>
            <Complains />
        </div>
    </div>

    <div class="row">
        <div class="noticeSection col col-6">
            <Notices :notices="notices" />
        </div>

        <div class="qnaSection col col-6">
            <QnA :qnaList="qnaList" />
        </div>
    </div>


    <div class="broadcastSection row">
        <h3>방송/영상</h3>
        <BroadCasts/>
    </div>

    <div class="products row">
        <h3>상품</h3>
        <Products/>
    </div>

    <div class="brandChannel row">
        <h3>브랜드 채널</h3>
        <BrandChannels/>
    </div>
    

    

</div>
</template>

<script>
import CountHeader from "@/components/dashboard/CountsHeader"
import Count from "@/components/dashboard/DashBoardCount"
import LineChart from '@/components/dashboard/LineChart'
import Complains from '@/components/dashboard/Complains'
import Notices from '@/components/dashboard/Notices'
import QnA from '@/components/dashboard/QnA'
import BroadCasts from '@/components/dashboard/BroadCasts'
import Products from '@/components/dashboard/Products'
import BrandChannels from '@/components/dashboard/BrandChannels'

export default {
components:{
    Count,CountHeader,LineChart,Complains,Notices,QnA,BroadCasts,Products,BrandChannels
},
data(){
    return{
        payments:{
            '결제 대기':0,
            '결제 완료':0,
            '상품 준비':0
        },
        deliveries:{
            '배송 중':0,
            '배송 완료':0,
            '구매 확정':0
        },
        orders:{
            '주문 금액':0,
            '컴플레인(환불)':0,
            '구매 확정':0
        },
        sellings:{
            '금일판매량':0,
            '금주판매량':0,
            '금월판매량':0
        },
        notices:[
            {
                title:'[고정] 추석 연휴 배송 지연 안내',
                date:'2019.09.06'
            },
            {
                title:'[가이드 변경] 신규 브랜드 등록 가이드 변경',
                date:'2019.09.06'
            },
            {
                title:'[배송 지연] 09.01 이벤트 진행 일부 상품 당첨자 오류 지연 배송',
                date:'2019.09.06'
            }
        ],
        qnaList:[
            {
                title:'홀리데이 한정판 상품 수량 수정 안됨',
                status:1,
                date:'2019.09.06'
            },
            {
                title:'홀리데이 한정판 상품 수량 수정 안됨',
                status:0,
                date:'2019.09.06'
            },
            {
                title:'홀리데이 한정판 상품 수량 수정 안됨',
                status:1,
                date:'2019.09.06'
            }
        ]
    }
}
}
</script>

<style>

</style>