<template>
    <select id="sellers" name="sellers" v-model="parentData.sellerSysId" @change="$emit('changeFn', parentData.sellerSysId)">
        <option v-for="(item, index) in sellers" :key="index" :value="item.value">{{ item.text }}</option>
    </select>
</template>

<script>
import commonJs from '@/assets/js/common.js'
export default {
  props: ['parentData'],
  data:() => ({
      sellers: []
  }),
  mixins: [commonJs],
  mounted () {
    this.axiosGetRequest('/api/v1/sellers/bases', "", this.resultSellersFn);
  },
  methods: {
    resultSellersFn: function(res) {
      var selleries = res.data.jsonData.sellers
      this.sellers.push({ value: 0, text: "::판매자를 선택해주십시오::" })
      selleries.forEach(item => [
        this.sellers.push({ value: item.sellerSysId, text: item.name })
      ])
    }
  }
}
</script>

<style>

</style>