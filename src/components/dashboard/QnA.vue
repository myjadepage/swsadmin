<template>
  <div class="dash-qna">
    <header>
      <h3>문의/답변</h3><router-link to="">문의/답변 보기</router-link>
    </header>
    <ul>
      <li>{{qnaList[0].title}}<span class="status" :class="qnaList[0].status?'complete':''">{{qnaList[0].status?'답변 완료':'답변 대기'}}</span><div class="date">{{qnaList[0].date}}</div></li>
      <li>{{qnaList[1].title}}<span class="status" :class="qnaList[1].status?'complete':''">{{qnaList[1].status?'답변 완료':'답변 대기'}}</span><div class="date">{{qnaList[1].date}}</div></li>
      <li>{{qnaList[2].title}}<span class="status" :class="qnaList[2].status?'complete':''">{{qnaList[2].status?'답변 완료':'답변 대기'}}</span><div class="date">{{qnaList[2].date}}</div></li>
    </ul>
  </div>
</template>

<script>
export default {
props:['qnaList']
}
</script>

<style>

</style>