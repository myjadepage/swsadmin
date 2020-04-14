<template>
  <div class="dash-Products">
    <header>
      <h3>상품</h3><span class="headerInfo">최근 4주 동안의 상품 수를 표시합니다.</span><router-link to="">상품 위젯 관리하기</router-link>
    </header>
    <div class="row">
      <div class="graph-box col">
        <div class="graph-info">8%<font-awesome-icon class="ml-2" icon="arrow-down" size="sm" /></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData1" :options="options" :style="{height:'200px'}" />
        </div>
      <div class="graph-box col">
        <div class="graph-info">8%<font-awesome-icon class="ml-2" icon="arrow-up" size="sm" /></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData2" :options="options" :style="{height:'200px'}" />
        </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/dashboard/LineChart"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
 
library.add(faArrowUp, faArrowDown)

export default {
 components:{
    LineChart
  },
  data(){
    return{
      chartData1:{
          //Data to be represented on x-axis
         labels: ['1주차','2주차','3주차','4주차'],
          datasets: [
            {
              label: '등록상품',
              fill:true,
              backgroundColor:'#ede5ff',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#b796fb',
              borderWidth: 3,
            //   pointBorderColor: '#111',
              //Data to be represented on y-axis
              data: [4,6,9,8],
              lineTension:0.1
            }
          ]
        },
      chartData2:{
          //Data to be represented on x-axis
          labels: ['1주차','2주차','3주차','4주차'],
          datasets: [
            {
              label: '판매',
              fill:true,
              backgroundColor:'#ede5ff',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#b796fb',
              borderWidth: 3,
            //   pointBorderColor: '#111',
              //Data to be represented on y-axis
              data: [206,512,1024,2024],
              lineTension:0.1
            }
          ]
        },
        options:{
          scales: {
            yAxes: [{
              ticks: {
                  display:false
                // beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              },
              ticks:{
                display:false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips:{
              backgroundColor:'rgba(0,0,0,0.8)',
              displayColors:false,
              borderWidth:1,
              borderColor:'rgba(0,0,0)'
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