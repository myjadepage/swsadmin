<template>
  <div class="dash-Products">
    <header>
      <h3>상품</h3><span>최근 4주 동안의 상품 수를 표시합니다.</span><router-link to="">상품 위젯 관리하기</router-link>
    </header>
    <div class="row">
      <div class="col col-6"><LineChart :style="{width:'300px', height:'200px'}" /></div>
      <div class="col col-6"><LineChart :style="{width:'300px', height:'200px'}" /></div>
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