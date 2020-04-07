<template>
    <div id="aside">
        <h2>정산관리</h2>
        <dl>
            <dt><font-awesome-icon icon="minus" /> 정산관리</dt>
            <dd class="side_small_menu">
                <router-link to="/account/account" >본사정산</router-link>
                <router-link to="/account/dealer_account" >판매자정산</router-link>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
