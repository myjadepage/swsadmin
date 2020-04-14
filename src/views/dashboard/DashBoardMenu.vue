<template>
  <div id="aside">
    <h3 class="mb-2">Shallwe SHOP</h3>
    <!-- <h5 class="mb-2">권한 : 채널 관리자</h5> -->
    <h5>{{name?name:'관리자'}}</h5>
  </div>
</template>

<script>
export default {
  computed:{
    name(){
      return sessionStorage.getItem('userName')
    }
  }
}
</script>

<style>

</style>