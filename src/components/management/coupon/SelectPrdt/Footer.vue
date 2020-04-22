<template>
  <div class="selectPrdtFooter">
    <div class="col"></div>
    <div class="col">
      <b-pagination 
        v-model="currentPage"
        :total-rows="totalCnt"
        :per-page="perPage"
        @change="paging"
      ></b-pagination>
      </div>
      <div class="col text-center">
      <button @click="selectAll" class="btn btn-light">일괄선택</button><button class="btn btn-light">닫기</button>
      </div>
  </div>
</template>

<script>
export default {
  props:['currentPage', 'perPage','totalCnt'],
  methods:{
    paging(x){
      this.$emit('paging',x)
    },
    selectAll(){
      this.$emit('selectAll')
    }
  }
}
</script>

<style>

</style>