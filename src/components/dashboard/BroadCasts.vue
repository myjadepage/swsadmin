<template>
  <div class="dash-BroadCasts">
    <header>
      <h3>방송/영상</h3><span class="headerInfo">최근 4주 동안의 방송 수를 표시합니다.</span><router-link to="">방송/영상 위젯 관리하기</router-link>
    </header>
    <div class="row">
      <div class="graph-box col">
        <div class="graph-info">8%<font-awesome-icon class="ml-2" icon="arrow-up" size="sm" /></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
       <LineChart :chartData="chartData1" :options="options" :style="{height:'200px'}"/>
      </div>
      <div class="graph-box col">
        <div class="graph-info">8%<font-awesome-icon class="ml-2" icon="arrow-up" size="sm" /></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData2" :options="options" :style="{height:'200px'}"/>
      </div>
      <div class="graph-box col">
        <div class="graph-info">8%<font-awesome-icon class="ml-2" icon="arrow-up" size="sm" /></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData3" :options="options" :style="{height:'200px'}"/>
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
              fill:true,
              backgroundColor:'#ffdbe6',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#ff85a9',
              borderWidth: 3,
              lineTension:0.1,
              data:[1,6,7,15],
              label:"라이브 방송 수"
            }
          ]
        },
      chartData2:{
          //Data to be represented on x-axis
          labels: ['1주차','2주차','3주차','4주차'],
          datasets: [
            {
              fill:true,
              backgroundColor:'#ffdbe6',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#ff85a9',
              borderWidth: 3,
              lineTension:0.1,
              data:[995612,1000012,1245679,1402451],
              label:"라이브 조회 수"
            }
          ]
        },
      chartData3:{
          //Data to be represented on x-axis
          labels: ['1주차','2주차','3주차','4주차'],
          datasets: [
            {
              fill:true,
              backgroundColor:'#ffdbe6',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#ff85a9',
              borderWidth: 3,
              lineTension:0.1,
              data:[1543,2670,3533,5000],
              label:"라이브 반응자 수"
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