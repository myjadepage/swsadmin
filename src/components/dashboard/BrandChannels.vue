<template>
  <div class="dash-BrandChannels">
      <header>
      <h3>브랜드 채널</h3><span class="headerInfo">최근 4주 동안의 방송 수를 표시합니다.</span><router-link to="">브랜드 채널 위젯 관리하기</router-link>
    </header>
    <div class="row">
      <div class="graph-box col col-7">
        <div class="graph-info">8%<span class="graph-up"></span></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData1" :options="options" :style="{height:'200px'}" />
        </div>
      <div class="graph-box col col-4">
        <div class="graph-info">8%<span class="graph-up"></span></div>
        <div class="graph-count"><span class="ico_graph"></span>라이브 방송 수 : 6</div>
        <LineChart :chartData="chartData2" :options="options" :style="{height:'200px'}"/>
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
              label: '브랜드 팔로워',
              fill:true,
              backgroundColor:'#dbedfc',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#9abcfc',
              borderWidth: 3,
            //   pointBorderColor: '#111',
              //Data to be represented on y-axis
              data: [10,20,40,102],
              lineTension:0.1
            }
          ]
        },
      chartData2:{
          //Data to be represented on x-axis
          labels: ['1주차','2주차','3주차','4주차'],
          datasets: [
            {
              label: '브랜드 채널 방문자',
              fill:true,
              backgroundColor:'#dbedfc',
              pointBackgroundColor: '#fff',
              pointRadius:0,
              pointHitRadius:5,
              borderColor:'#9abcfc',
              borderWidth: 3,
            //   pointBorderColor: '#111',
              //Data to be represented on y-axis
              data: [523,701,763,1021],
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
        }
    }
  }
}
</script>

<style>

</style>