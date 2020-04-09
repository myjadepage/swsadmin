<template>
  <div class="dash-Notices">
    <header>
      <h3>공지사항</h3><router-link to="">공지사항 보기</router-link>
    </header>
    <ul>
      <li>{{notices[0].title}}<div>{{notices[0].date}}</div></li>
      <li>{{notices[1].title}}<div>{{notices[1].date}}</div></li>
      <li>{{notices[2].title}}<div>{{notices[2].date}}</div></li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['notices']
}
</script>

<style>

</style>