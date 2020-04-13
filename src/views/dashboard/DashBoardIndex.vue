<template>
<div id="contents" class="dash">
    <div class="dash">
    
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
        <div class="col"><h3>매출 그래프</h3></div>
        <div class="col"><h3>컴플레인 현황</h3></div>
    </div>
    <div class="row">
        <div class="salesGraph col col-6">
                <LineChart  :chartData="chartData" :options="options" :style="{height:'300px',backgroundColor:'#fff',border:'1px solid #E5E5E5'}" />
        </div>

        <div class="complainSection col col-6">
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


    <div class="broadcastSection">
        <BroadCasts/>
    </div>

    <div class="products">
        <Products/>
    </div>

    <div class="brandChannel">
        <BrandChannels/>
    </div>
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
        ],
        chartData:{
          labels: [
              '2020-03-20',
              '2020-03-21',
              '2020-03-22',
              '2020-03-23',
              '2020-03-24',
              '2020-03-25',
              '2020-03-26',
              '2020-03-27',
              '2020-03-28',
              '2020-03-29',
              '2020-03-30',
              '2020-03-31',
              '2020-04-01',
              '2020-04-01',
              '2020-04-03',
              '2020-04-04',
              '2020-04-05',
              '2020-04-06',
              '2020-04-07',
              '2020-04-08',
              '2020-04-09',
              '2020-04-10',
              '2020-04-11',
              '2020-04-12',
          ],
          datasets: [
            {
              fill:false,
              pointBackgroundColor: '#03bcd8',
              borderColor:'#03bcd8',
              borderWidth: 3,
              lineBorderColor:'#03bcd8',
              lineTension:0.2,
              label:'매출',
              data:[5000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }
          ]
        },
        options:{
          scales: {
            yAxes: [{
              ticks: {
                  display:false
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              },
              ticks:{
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips:{
              backgroundColor:'#fff',
              titleFontColor:'#000000',
              bodyFontColor:'#000000',
              displayColors:false,
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.5)'
          },
          layout: {
          padding: {
              left: 0,
              right: 10,
              top: 10,
              bottom: 0
          }
         }
        }
    }
}
}
</script>

<style>

</style>