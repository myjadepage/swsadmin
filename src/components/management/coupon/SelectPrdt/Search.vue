<template>
  <div class="selectPrdtSearch">
      <table>
          <tr>
              <th>입점업체</th>
              <td>
                  <select v-model="brandSysId" ref="brand">
                      <option value="">전체</option>
                      <option v-for="brand in brands" :key="brand.brandSysId" :value="brand.brandSysId">{{brand.name}}</option>
                  </select>
              </td>
          </tr>
          <tr>
              <th>검색</th>
              <td>
                  <select v-model="searchType">
                      <option value="0">상품명</option>
                      <option value="1">상품코드</option>
                  </select>
                  <input v-model="keyword" @keypress.enter="search" type="text"><button @click="search">검색</button>
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