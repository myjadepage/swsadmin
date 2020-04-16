<template>
  <div class="dash-Notices">
    <header>
      <h3>공지사항</h3><router-link to="">공지사항 보기</router-link>
    </header>
    <ul>
      <li v-for="(n,idx) in notices" :key="idx">{{n.title}}<div class="date">{{date(n.createdAt)}}</div></li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['notices'],
  methods:{
    date(d){
      return `${d.substr(0,4)}.${d.substr(4,2)}.${d.substr(6,2)}`
    }
  }
}
</script>

<style>

</style>