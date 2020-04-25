<template>
  <div class="selectPrdtTree">
      <table class="table" :style="{borderRight:'1px solid #dee2e6'}">
          <tr v-for="(c,idx) in cats" :key="idx" >
              <th>{{idx+1}}차 카테고리</th>
                <td>
                    <select @change="catSelect" class="form-control">
                        <option value="">{{idx+1}}차 카테고리</option>
                        <option v-for="cc in c" :key="cc.categorySysId" :value="[cc.categorySysId, cc.categoryLevel]">{{cc.name}}</option>
                    </select>
                </td>
          </tr>
      </table>
  </div>
</template>



<script>

export default {
    props:['cats'],
    methods:{
        catSelect(e){
            this.$emit('catSelect',e.target.value.split(',').map(e=>Number(e)))
        }
    }
}
</script>

<style>
</style>