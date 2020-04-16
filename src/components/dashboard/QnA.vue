<template>
  <div class="dash-qna">
    <header>
      <h3>문의/답변</h3><router-link to="">문의/답변 보기</router-link>
    </header>
    <ul>
       <li v-for="(q,idx) in qnaList" :key="idx">{{q.content}}<span class="status" :class="q.treatFlag?'complete':''">{{q.treatFlag?'답변 완료':'답변 대기'}}</span><div class="date">{{date(q.createdAt)}}</div></li>
    </ul>
  </div>
</template>

<script>
export default {
props:['qnaList'],
methods:{
    date(d){
      return `${d.substr(0,4)}.${d.substr(4,2)}.${d.substr(6,2)}`
    }
  }
}
</script>

<style>

</style>