<template>
  <div class="dashCount">
      <span :class="'countImg '+imgType"></span>
      <table>
          <tr v-for="(k,idx) in dataKeys" :key="idx">
              <th>{{k}}</th>
              <td>{{data[k]}}건</td>
          </tr>
      </table>
  </div>
</template>
<script>
export default {
    props:['data','imgType'],
    computed:{
        dataKeys(){
            return Object.keys(this.data)
        }
    }
}
</script>

<style>

</style>