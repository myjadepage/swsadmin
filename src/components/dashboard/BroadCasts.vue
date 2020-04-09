<template>
  <div class="dash-BroadCasts">
    <header>
      <h3>방송/영상</h3><span>최근 4주 동안의 방송 수를 표시합니다.</span><router-link to="">방송/영상 위젯 관리하기</router-link>
    </header>
    <div class="row">
      <div class="col col-4"><LineChart :style="{width:'300px', height:'200px'}" /></div>
      <div class="col col-4"><LineChart :style="{width:'300px', height:'200px'}"/></div>
      <div class="col col-4"><LineChart :style="{width:'300px', height:'200px'}"/></div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/dashboard/LineChart"
export default {
  components:{
    LineChart
  }
}
</script>

<style>

</style>