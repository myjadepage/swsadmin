<template>
  <div class="pt-5 col col-7 text-center text-light">
        <h3 class="text-left text-light">
        Shallwe Shop<br>
        Admin Platform
        </h3>
        <br><br>
      Copyright ⓒ {{year}} EPIENS. All rights reserved
    </div>
</template>

<script>
export default {
  computed:{
    year(){
      return new Date().getFullYear()
    }
  }
}
</script>

<style>

</style>