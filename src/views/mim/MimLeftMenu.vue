<template>
   <div id="aside">
        <h2>입점업체관리</h2>
        <dl>
            <dt><font-awesome-icon icon="minus" /> 판매자관리</dt>
            <dd class="side_small_menu">
                <router-link to="/mim/dealer_regist_list">판매자 신청목록</router-link>
                <router-link to="/mim/dealer_list">판매자 목록</router-link>
                <!-- <a href="/mim/dealer_secession_list">판매자 탈퇴목록</a> -->
                <!-- <a href="/mim/dealer_qna_list">판매자 문의하기</a> -->
                <!-- <a href="/board/list?board=mim_notice">판매자 공지사항</a> -->
            </dd>

            <dt><font-awesome-icon icon="minus" /> 판매자상품관리</dt>
            <dd class="side_small_menu">
                <router-link to="/mim/goods_list">판매자 상품관리</router-link>
                <router-link to="/mim/goods_list?menu=reg" >상품신청/수정/삭제</router-link>
                <router-link to="/mim/brand_list">브랜드관리</router-link>
            </dd>

            <!-- <dt>판매자이벤트관리</dt>
            <dd class="side_small_menu">
                <a href="/mim/event_list?method=100">이벤트(일반)관리</a>
                <a href="/mim/event_list?method=400">이벤트(할인)관리</a>
            </dd> -->
        </dl>
   </div>
</template>

<script>
export default {

}
</script>

<style>

</style>