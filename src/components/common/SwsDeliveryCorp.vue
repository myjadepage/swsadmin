<template>
    <select class="text_input w-75" v-model="order.deliveryCompSysId" :disabled="order.statusCode !== 3">
        <option value=''>::배송업체::</option>
        <option v-for="(item, index) in deliveryCorp" :key="index" :value="item.deliveryCompSysId">{{item.name}}</option>
    </select>
</template>

<script>
export default {
    props: ['deliveryCorp', 'order']
}
</script>

<style>

</style>