<template>
   <div id="contents">
                <h3>운영관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li class="on">운영관리</li>
                </ul>
                <ul class="helpbox">
                    <li>쇼핑몰을 운영하시는데 필요한 요소들을 모았습니다.</li>
                    <li>수시로 관리를 하셔야 보다 나은 쇼핑몰을 운영하실 수 있습니다.</li>
                </ul>
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> 고객운영관리</h4>
                </div>
                <dl class="menu_list"> 
                    <dt><a href="/management/review_list">상품평관리</a></dt>
                    <dd><a href="/management/review_list">상품에 대한 고객평들을 한곳에 모았습니다.</a></dd>
                    <dt><a href="/management/qna_list">상품Q&amp;A관리</a></dt>
                    <dd><a href="/management/qna_list">상품에 대한 고객들의 Q&amp;A를 관리합니다.</a></dd>
                    <dt><a href="/management/faq_list">FAQ관리</a></dt>
                    <dd><a href="/management/faq_list">FAQ를 관리하실 수 있습니다.</a></dd>
                    <dt><a href="/management/inquiry_list">1:1문의관리</a></dt>
                    <dd><a href="/management/inquiry_list">1:1문의를 관리하실 수 있습니다.</a></dd>
                </dl>
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> 게시판관리</h4>
                </div>
                <dl class="menu_list">
                    <dt><a href="/management/board_manage">게시판통합관리</a></dt>
                    <dd><a href="/management/board_manage">게시판을 관리하실 수 있습니다.</a></dd>
                </dl>
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> 쿠폰관리</h4>
                </div>
                <dl class="menu_list">
                    <dt><a href="/management/coupon_list?kind=100">상품쿠폰관리</a></dt>
                    <dd><a href="/management/coupon_list?kind=100">상품쿠폰을 관리합니다.</a></dd>
                </dl>
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> SMS관리</h4>
                </div>
                <dl class="menu_list">
                    <dt><a href="/sms/config">환경설정</a></dt>
                    <dd><a href="/sms/config">SMS 환경설정을 하실 수 있습니다.</a></dd>
                    <dt><a href="/sms/ment_manage">문구관리</a></dt>
                    <dd><a href="/sms/ment_manage">SMS발송문구를 일괄 관리 하실 수 있습니다.</a></dd>
                    <dt><a href="/sms/emoticon_manage">이모티콘 관리</a></dt>
                    <dd><a href="/sms/emoticon_manage">SMS발송시 특수문자 및 이모티콘을 넣으실 수 있습니다.</a></dd>
                    <dt><a href="/sms/send_msg">SMS발송</a></dt>
                    <dd><a href="/sms/send_msg">자동발송 외에 메세지를 추가로 보내실 수 있습니다.</a></dd>
                    <dt><a href="/sms/msbridge?mode=sendlist" target="_blank">발송내역</a></dt>
                    <dd><a href="/sms/msbridge?mode=sendlist" target="_blank">발송내역을 확인 하실 수 있습니다.</a></dd>
                    <dt><a href="/sms/msbridge?mode=reservelist" target="_blank">예약발송내역</a></dt>
                    <dd><a href="/sms/msbridge?mode=reservelist" target="_blank">예약 발송내역을 확인 하실 수 있습니다.</a></dd>
                    <dt><a href="/sms/msbridge?mode=charge" target="_blank">SMS충전하기</a></dt>
                    <dd><a href="/sms/msbridge?mode=charge" target="_blank">SMS 발송건수를 충전할 수 있습니다.</a></dd>
                </dl>
   </div>
</template>

<script>
export default {

}
</script>

<style>

</style>