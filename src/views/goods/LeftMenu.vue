<template>
    <div id="aside" style="z-index: 1">
        <h2>상품관리</h2>
        <dl>
            <dt>카테고리관리</dt>
            <dd class="side_small_menu">
                <a href="/goods/category" class=""><i class="xi-minus-min"></i> 카테고리관리</a>
            </dd>

            <dt>상품관리</dt>
            <dd class="side_small_menu">
                <a href="/goods/goods_reg" class=""><i class="xi-minus-min"></i>상품등록</a>
                <a href="/goods/goods_list" class=""><i class="xi-minus-min"></i>상품목록</a>
                <a href="/goods/goods_sort" class=""><i class="xi-minus-min"></i>상품진열설정</a>
                <a href="/goods/trash_list" class=""><i class="xi-minus-min"></i>상품휴지통</a>
                <a href="/goods/brand_list" class=""><i class="xi-minus-min"></i>브랜드관리</a>
                <a href="/goods/marketing" class=""><i class="xi-minus-min"></i>상품연동관리</a>
            </dd>

            <dt>상품정보 엑셀작업</dt>
            <dd class="side_small_menu">
                <a href="/goods/excel_down" class=""><i class="xi-minus-min"></i>상품정보엑셀다운로드</a>
                <a href="/goods/excel_regist" class=""><i class="xi-minus-min"></i>상품정보엑셀업로드</a>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {}
</script>
