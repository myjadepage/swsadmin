<template>
    <b-modal ref="addressModal">
        <vue-daum-postcode />
    </b-modal>
</template>

<script>
import { VueDaumPostcode } from 'vue-daum-postcode'
export default {
    data: () =>({
        
    }),
    components: {
        VueDaumPostcode
    },
    mounted() {
        this.$refs.addressModal.show()
    }
}
</script>

<style>

</style>