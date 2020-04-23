<template>
  <div class="selectPrdtSearch">
      <table class="table" :style="{border:'1px solid #dee2e6'}">
          <tr>
              <th>입점업체</th>
              <td>
                  <select v-model="brandSysId" ref="brand" class="form-control">
                      <option value="">전체</option>
                      <option v-for="brand in brands" :key="brand.brandSysId" :value="brand.brandSysId">{{brand.name}}</option>
                  </select>
              </td>
          </tr>
          <tr>
              <th>검색</th>
              <td>
                  <select v-model="searchType" class="form-control">
                      <option value="0">상품명</option>
                      <option value="1">상품코드</option>
                  </select>
                  <div class="input-group mt-3">
                    <input v-model="keyword" @keypress.enter="search" type="text" class="form-control" aria-describedby="searchBtn">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" @click="search" id="searchBtn">검색</button>
                    </div>
                  </div>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
    props:['brands'],
    data(){
        return{
            brandSysId:'',
            searchType:0,
            keyword:''
        }
    },
    methods:{
        search(){
            this.$emit('search', {
            brandSysId:this.brandSysId?this.brandSysId:null,
            searchType:this.searchType,
            keyword:this.keyword
        })
        }
    }
}
</script>

<style>

</style>