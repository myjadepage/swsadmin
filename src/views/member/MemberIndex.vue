<template>
  <div id="contents">
    <h3>회원관리</h3>
    <ul class="navi">
        <li class="home"><router-link to="/" target="_top">홈</router-link></li>
        <li class="on">회원관리</li>
    </ul>
    <ul class="helpbox">
        <li>사이트에 가입한 회원들의 정보를 보실 수 있습니다.</li>
        <li>회원등급 및 메일발송등 사이트 회원에 대해 일괄 관리합니다.</li>
    </ul>
    <div class="section_head">
        <h4><i class="xi-check-circle"></i> 회원관련설정</h4>
    </div>
    <dl class="menu_list">
        <dt><router-link to="/member/config_member">회원가입설정</router-link></dt>
        <dd><router-link to="/member/config_member">회원가입에 필요한 항목을 관리합니다.</router-link></dd>
    </dl>
    <div class="section_head">
        <h4><i class="xi-check-circle"></i> 회원관리</h4>
    </div>
    <dl class="menu_list">
        <dt><router-link to="/member/member_list">회원목록</router-link></dt>
        <dd><router-link to="/member/member_list">사이트에 가입한 회원들을 일괄 관리합니다.</router-link></dd>
        <dt><router-link to="/member/member_delete">탈퇴회원목록</router-link></dt>
        <dd><router-link to="/member/member_delete">탈퇴된 회원들을 일괄 관리합니다.</router-link></dd>
        <dt><router-link to="/member/member_buy_list">상품구매회원목록</router-link></dt>
        <dd><router-link to="/member/member_buy_list">상품을 구매한 회원들을 관리합니다.</router-link></dd>
    </dl>
    <div class="section_head">
        <h4><i class="xi-check-circle"></i> 메일발송관리</h4>
    </div>
    <dl class="menu_list">
        <dt><router-link to="/member/member_mailing">회원메일발송</router-link></dt>
        <dd><router-link to="/member/member_mailing">회원들에게 메일을 일괄 발송합니다.</router-link></dd>
    </dl>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>