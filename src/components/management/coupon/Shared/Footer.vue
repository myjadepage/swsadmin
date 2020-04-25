<template>
  <div class="selectPrdtFooter row mt-3 mb-3">
    <div class="col">
      <button v-if="routeName" @click="reset" class="ml-3 btn btn-success">초기화</button>
    </div>
    <div class="col">
      <b-pagination 
      class="justify-content-center"
        v-model="currentPage"
        :total-rows="totalCnt"
        :per-page="perPage"
        @change="paging"
      ></b-pagination>
    </div>
    <div class="col text-right">
        <button @click="selectAll" class="btn btn-outline-info mr-3">일괄선택</button><button @click="close" class="btn btn-outline-danger mr-3">닫기</button>
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
    },
    close(){
      this.$emit('close')
    },
    reset(){
      this.$emit('reset')
    }
  },
  computed:{
    routeName(){
      return this.$route.name==='상품선택하기'
    }
  }
}
</script>

<style>

</style>