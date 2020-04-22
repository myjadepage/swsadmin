<template>
  <div class="selectPrdtTree">
      <table>
          <tr v-for="(c,idx) in cats" :key="idx">
              <th>{{idx+1}}차 카테고리</th>
              <td><button @click="$emit('catSelect',[cc.categorySysId, cc.categoryLevel])" class="btn btn-primary" v-for="cc in c" :key="cc.categorySysId">{{cc.name}}</button></td>
          </tr>
      </table>
  </div>
</template>



<script>


export default {
    props:['cats']
}
</script>

<style>
</style>