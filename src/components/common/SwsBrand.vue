<template>
<<<<<<< HEAD
    <select class="text_input" id="brandSysId" name="brandSysId" v-model="parentData.brandSysId">
=======
    <select id="brandSysId" class="text_input" name="brandSysId" v-model="parentData.brandSysId">
>>>>>>> dbf964012c95dd05e8649b618b7480dda407e68b
        <option v-for="(item, index) in brands" :key="index" :value="item.value">{{ item.text }}</option>
    </select>
</template>

<script>
import commonJs from '@/assets/js/common.js'
export default {
    props: ['parentData'],
    data: () => ({
        brands: [{ value: 0, text: "::브랜드를 선택해주세요::" }]
    }),
    mixins: [commonJs],
    mounted () {
        this.changeSellerFn()
    }, 
    methods: {
        changeSellerFn: function(val) {
            this.brandSysId = 0
            if (val !== undefined) {
                this.axiosGetRequest("/api/v1/sellers/" + val + "/brands","",this.onSellerToBrandFn);
            } else {
                this.axiosGetRequest("/api/v1/brands/searchlists","",this.onSellerToBrandFn);
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