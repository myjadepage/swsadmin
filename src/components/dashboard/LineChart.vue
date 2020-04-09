<script>
import { Line } from 'vue-chartjs'

export default {
 extends: Line,
    data(){
        return{
            chartData: {
          //Data to be represented on x-axis
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: '매출',
              fill:false,
              pointBackgroundColor: '#03bcd8',
              borderColor:'#03bcd8',
              borderWidth: 3,
            //   pointBorderColor: '#111',
              //Data to be represented on y-axis
              lineBorderColor:'#03bcd8',
              data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                  display:false
                // beginAtZero: true
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
          maintainAspectRatio: false
        }
      }
    },

  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>

</style>