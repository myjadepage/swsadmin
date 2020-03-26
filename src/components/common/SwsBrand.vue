<template>
    <select id="brandSysId" name="brandSysId" @change="$emit('changeFn', brandSysId)" v-model="brandSysId">
        <option v-for="(item, index) in brands" :key="index" :value="item.value">{{ item.text }}</option>
    </select>
</template>

<script>
import commonJs from '@/assets/js/common.js'
export default {
    props: ['selected'],
    data: () => ({
        brands: [{ value: 0, text: "::브랜드를 선택해주세요::" }],
        brandSysId: 0
    }),
    watch: {
        selected: function (val) {
            this.brandSysId = val
        }
    },
    mixins: [commonJs],
    methods: {
        changeSellerFn: function(val) {
            this.brandSysId = 0
            if (val !== 0) {
                this.axiosGetRequest("/api/v1/sellers/" + val + "/brands","",this.onSellerToBrandFn);
            }
        },
        onSellerToBrandFn: function(res) {
        var data = res.data.jsonData.brands;
        this.brands.splice(1);
        data.forEach(item => {
            this.brands.push({ value: item.brandSysId, text: item.name });
        });
        },
    }
}
</script>

<style>

</style>