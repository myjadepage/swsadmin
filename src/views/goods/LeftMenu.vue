<template>
    <div id="aside" style="z-index: 1">
        <h2>상품관리</h2>
        <dl>
            <dt>카테고리관리</dt>
            <dd class="side_small_menu">
                <router-link to="/goods/category" class=""> 카테고리관리</router-link>
            </dd>
            <dt>상품관리</dt>
            <dd class="side_small_menu">
                <router-link to="/goods/goods_reg" class="">상품등록</router-link>
                <router-link to="/goods/goods_list" class="">상품목록</router-link>
                <router-link to="/goods/brand_list" class="">브랜드관리</router-link>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {}
</script>
