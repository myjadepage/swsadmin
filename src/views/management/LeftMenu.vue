<template>
  <div id="aside">
    <h2>운영관리</h2>
    <dl>
        <dt><font-awesome-icon icon="minus" /> 게시판운영관리</dt>
        <dd class="side_small_menu">
            <router-link to="/management/notice_list">공지사항</router-link>
            <router-link to="/management/faq_list">자주묻는질문(FAQ)</router-link>
            <router-link to="/management/review_list">상품평(리뷰)</router-link>
            <router-link to="/management/qna_list">상품Q＆A</router-link>
            <router-link to="/management/inquiry_list">1:1문의</router-link>
            <router-link to="/management/complain_list">신고내역 관리</router-link>
            <router-link to="/management/block_list">차단내역 관리</router-link>
            <router-link to="/management/punish_list">제재내역 관리</router-link>
        </dd>

        <!-- <dt>게시판관리</dt>
        <dd class="side_small_menu">
            <router-link to="/board_manage">게시판통합관리</router-link>
        </dd> -->
        
        <dt><font-awesome-icon icon="minus" /> 쿠폰관리</dt>
        <dd class="side_small_menu">
            <router-link to="/management/coupon_list">상품쿠폰</router-link>
        </dd>
        <!-- <dt>SMS관리</dt>
        <dd class="side_small_menu">
            <a href="/sms/config">환경설정</a>
            <a href="/sms/ment_manage">문구관리</a>
            <a href="/sms/emoticon_manage">이모티콘 관리</a>
            <a href="/sms/send_msg" >SMS발송</a>
            <a href="/sms/msbridge?mode=sendlist">발송내역</a>
            <a href="/sms/msbridge?mode=reservelist">예약발송내역</a>
            <a href="/sms/msbridge?mode=charge">SMS충전하기</a>
        </dd> -->
    </dl>
  </div>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>

<style>

</style>