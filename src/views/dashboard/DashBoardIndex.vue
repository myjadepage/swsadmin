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
import commonJs from '@/assets/js/common.js'

export default {
mixins: [ commonJs ],
components:{
    Count,CountHeader,LineChart,Complains,Notices,QnA,BroadCasts,Products,BrandChannels
},
created(){
window.scrollTo(0,0)

for (let i = 23; i >= 0; i--) {
    let now = new Date(new Date()-(86400000 * i))
    this.chartData.labels.push(`${now.getFullYear()}-${now.getMonth()+1<10?'0'+(now.getMonth()+1):now.getMonth()+1}-${now.getDate()}`)
    
}


this.axiosGetRequest('api/v1/operations/notices/list?startIndex=0&rowCount=3',{},
(res)=>{
    this.notices = res.data.jsonData.notices
})


this.axiosGetRequest('api/v1/operations/questions/list?startIndex=0&rowCount=3&questionTypeCode={questionTypeCode}',    // URL
{}, // param
(res)=>{
    this.qnaList = res.data.jsonData.siteQuestions      // callback
},
()=>{
this.axiosPostRequest('api/v1/auth/admins/accesstoken',{},(res)=>{
    sessionStorage.setItem('accessToken',res.data.jsonData.accessToken)     // errback
},(err)=>{
    console.log(err);
    
    // this.$router.push('/')
})

},sessionStorage.getItem('accessToken'))        //token

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
        notices:[],
        qnaList:[],
        chartData:{
          labels: [],
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