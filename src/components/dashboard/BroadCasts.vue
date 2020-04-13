<template>
  <div class="dash-BroadCasts">
    <header>
      <h3>방송/영상</h3><span class="headerInfo">최근 4주 동안의 방송 수를 표시합니다.</span><router-link to="">방송/영상 위젯 관리하기</router-link>
    </header>
    <div class="row">
      <div class="graph-box col">
        <div class="graph-info">8%<span class="graph-up"></span></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
       <LineChart :chartData="chartData1" :options="options" :style="{height:'200px'}"/>
      </div>
      <div class="graph-box col">
        <div class="graph-info">8%<span class="graph-up"></span></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData2" :options="options" :style="{height:'200px'}"/>
      </div>
      <div class="graph-box col">
        <div class="graph-info">8%<span class="graph-up"></span></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData3" :options="options" :style="{height:'200px'}"/>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/dashboard/LineChart"
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
        }
    }
  }
}
</script>

<style>

</style>