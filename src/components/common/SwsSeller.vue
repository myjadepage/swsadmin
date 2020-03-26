<template>
    <select id="sellers" class="text_input" name="sellers" @change="changeSellerFn" v-model="productData.sellerSysId">
        <option v-for="(item, index) in sellers" :key="index" :value="item.value">{{ item.text }}</option>
    </select>
</template>

<script>
import commonJs from '@/assets/js/common.js'
export default {
  data: () => ({
      sellers: []
  }),
  mixins: [commonJs],
  mounted () {
    this.axiosGetRequest('/api/v1/sellers/bases', "", this.resultSellersFn);
  }
}
</script>

<style>

</style>