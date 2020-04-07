<template>
    <div id="aside" style="z-index: 1">
        <h2>회원관리</h2>
        <dl>
            <!-- <dt><font-awesome-icon icon="minus" /> 회원관련설정</dt>
            <dd class="side_small_menu">
                <router-link to="/member/config_member">회원가입설정</router-link>
            </dd> -->

            <dt><font-awesome-icon icon="minus" /> 회원관리</dt>
            <dd class="side_small_menu">
                <router-link to="/member/member_list">회원목록</router-link>
                <router-link to="/member/member_delete">탈퇴회원목록</router-link>
                <router-link to="/member/member_buy_list">상품구매회원목록</router-link>
            </dd>
            
            <!-- <dt>메일발송관리</dt>
            <dd class="side_small_menu">
                <router-link to="/member/member_mailing">회원메일발송</router-link>
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