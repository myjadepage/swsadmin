<template>
  <div id="aside">
    <h2>통계/분석</h2>
    <dl>
        <dt><font-awesome-icon icon="minus" /> 매출관리</dt>
        <dd class="side_small_menu">
            <router-link to="/statistic/sale_total">전체 매출통계</router-link>
            <router-link to="/statistic/sale_goods">상품별 매출통계</router-link>
            <router-link to="/statistic/sale_member">회원별 매출통계</router-link>
        </dd>

        <dt><font-awesome-icon icon="minus" /> 회원통계</dt>
        <dd class="side_small_menu">
            <router-link to="/statistic/member_gender">남여비율 통계</router-link>
            <router-link to="/statistic/member_age">연령대별 통계</router-link>
            <router-link to="/statistic/member_area">거주지별 통계</router-link>
        </dd>

        <dt><font-awesome-icon icon="minus" /> 접속통계</dt>
        <dd class="side_small_menu">
            <router-link to="/statistic/visit_count">방문자 접속통계</router-link>
            <router-link to="/statistic/visit_fromsite">접속방향 통계</router-link>
        </dd>

        <dt><font-awesome-icon icon="minus" /> 상품통계</dt>
        <dd class="side_small_menu">
            <router-link to="/statistic/goods_total">상품별 통계</router-link>
            <router-link to="/statistic/goods_wish">상품보관함 통계</router-link>
            <router-link to="/statistic/goods_marks">고객평점 통계</router-link>
        </dd>

        <dt><font-awesome-icon icon="minus" /> 마케팅통계</dt>
        <dd class="side_small_menu">
            <router-link to="/statistic/marketing_useCmoney">적립금 사용 통계</router-link>
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