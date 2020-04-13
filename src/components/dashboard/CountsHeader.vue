<template>
  <div class="btns">
        <button @click="btnClick(0)" class="selected">오늘</button>
        <button @click="btnClick(1)">어제</button>
        <button @click="btnClick(2)">1주일</button>
        <button @click="btnClick(3)">이번달</button>
        <button @click="btnClick(4)">전월</button>
        <button @click="btnClick(5)">3개월</button>
        <button @click="btnClick(6)">6개월</button>
        <button @click="btnClick(7)">1년</button>
    </div>
</template>

<script>
export default {
  data(){
    return{
      selectedBtn:0
    }
  },
methods:{
  btnClick(x){
    this.$el.getElementsByTagName('button')[this.selectedBtn].classList.remove('selected')
    this.$el.getElementsByTagName('button')[x].classList.add('selected')
    this.selectedBtn = x
  }
}
}

</script>

<style>

</style>