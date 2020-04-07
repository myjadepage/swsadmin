<template>
    <div id="contents">
        <h3><font-awesome-icon icon="play-circle" /> 
            {{ $route.name }}
        </h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li class="on">
            {{ $route.name }}
            </li>
        </ul>
        <ul class="helpbox">
            <li>쇼핑몰의 상품을 올리실 수 있는 곳입니다. 먼저 상품에 맞는 카테고리를 설정해 주세요.</li>
            <li>상품정보를 엑셀로 다운로드 하실 수 있습니다.</li>
        </ul>

        <div class="box">
            <div class="section_head">
                <h4>방성표관리</h4>
            </div>
            <dl class="menu_list">
                <dt><a href="/goods/category">카테고리관리</a></dt>
                <dd><a href="/goods/category">카테고리를 설정합니다.</a></dd>
            </dl>
        </div>

        <div class="box">
            <div class="section_head">
                <h4>편성표관리</h4>
            </div>
            <dl class="menu_list">
                <dt><a href="/goods/goods_reg">상품등록</a></dt>
                <dd><a href="/goods/goods_reg">가격과 상품이미지 설정하여 상품등록합니다.</a></dd>
                <dt><a href="/goods/goods_list">상품목록</a></dt>
                <dd><a href="/goods/goods_list">등록하신 상품들을 수정/관리 하실 수 있습니다</a></dd>
                <dt><a href="/goods/goods_sort">상품진열설정</a></dt>
                <dd><a href="/goods/goods_sort">등록하신 상품의 진열순서를 설정하실 수 있습니다.</a></dd>
                <dt><a href="/goods/trash_list">상품휴지통</a></dt>
                <dd><a href="/goods/trash_list">삭제된 상품들을 모았습니다. 복원 누르면 다시 복구됩니다.</a></dd>
            </dl>
        </div>

        <div class="box">
            <div class="section_head">
                <h4>상품정보관리</h4>
            </div>
            <dl class="menu_list">
                <dt><a href="/goods/excel_down">상품정보다운로드</a></dt>
                <dd><a href="/goods/excel_down">상품정보를 엑셀로 받아 보실 수 있습니다.</a></dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
