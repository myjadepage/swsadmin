<template>
  <div class="selectPrdtTree">
      <table class="table" :style="{border:'1px solid #dee2e6'}">
          <tr v-for="(c,idx) in cats" :key="idx">
              <th>{{idx+1}}차 카테고리</th>
                <td>
                    <button @click="$emit('catSelect',[cc.categorySysId, cc.categoryLevel])" v-for="cc in c" :key="cc.categorySysId" class="btn btn-primary ml-2 mb-1" >{{cc.name}}</button>
                </td>
          </tr>
      </table>
  </div>
</template>



<script>


export default {
    props:['cats'],
}
</script>

<style>
</style>