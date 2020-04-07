<template>
  <div id="aside">
                <h2><i class="xi-cog"></i>환경설정</h2>
                <dl>
                    <dt><font-awesome-icon icon="minus" /> 상점기본정보관리</dt>
                    <dd class="side_small_menu">
                        <a href="/setup/config_manager">
                            <i class="xi-minus-min"></i>상점환경설정
                        </a>
                    </dd>

                    <!-- 2차추진 -->
                    <!-- <dt><font-awesome-icon icon="minus" /> 사이트정보관리</dt>
                    <dd class="side_small_menu">
                        <a href="/setup/config_site">
                            <i class="xi-minus-min"></i>사이트환경설정
                        </a>
                    </dd> -->

                    <!-- <dt><font-awesome-icon icon="minus" /> 판매자 승인관리</dt>
                    <dd class="side_small_menu">
                        <a href="/setup/config_dealer">
                            <i class="xi-minus-min"></i>판매자 승인환경설정
                        </a>
                    </dd> -->

                    <dt><font-awesome-icon icon="minus" /> 전체운영설정</dt>
                    <dd class="side_small_menu">
                        <!-- <a href="/setup/config_vocab"><i class="xi-minus-min"></i>어휘설정</a> -->
                        <a href="/setup/config_delivery"><i class="xi-minus-min"></i>배송설정</a>
                        <a href="/setup/config_discount"><i class="xi-minus-min"></i>할인액부담설정</a>
                        <a href="/setup/member_level"><i class="xi-minus-min"></i>회원등급관리</a>
                        <a href="/setup/config_cmoney"><i class="xi-minus-min"></i>적립금설정</a>
                        <a href="/setup/notify_tpl"><i class="xi-minus-min"></i>상품정보고시관리</a>
                    </dd>

                    <dt><font-awesome-icon icon="minus" /> 관리자설정</dt>
                    <dd class="side_small_menu">
                        <a href="/setup/manager_list">
                            <i class="xi-minus-min"></i>부운영자관리
                        </a>
                    </dd>

                    <dt><font-awesome-icon icon="minus" /> 상점운영정책</dt>
                    <dd class="side_small_menu">
                        <a href="/setup/config_policy"><i class="xi-minus-min"></i>상점운영정책</a>
                        <a href="/setup/config_terms_history/101"><i class="xi-minus-min"></i>회원 이용약관</a>
                        <a href="/setup/config_terms_history/102"><i class="xi-minus-min"></i>회원 개인정보취급방침</a>
                        <a href="/setup/config_terms_history/103"><i class="xi-minus-min"></i>회원 제3자정보제공동의</a>
                        <a href="/setup/config_terms_history/202"><i class="xi-minus-min"></i>비회원 개인정보취급방침</a>
                        <a href="/setup/config_terms_history/203"><i class="xi-minus-min"></i>비회원 제3자정보제공동의</a>
                        <a href="/setup/config_terms_history/301"><i class="xi-minus-min"></i>입점사 이용약관</a>
                        <a href="/setup/config_terms_history/302"><i class="xi-minus-min"></i>입점사 개인정보취급방침</a>
                        <a href="/setup/config_terms_history/401"><i class="xi-minus-min"></i>마케팅정보수집및이용동의</a>
                    </dd>

                    <dt><font-awesome-icon icon="minus" /> 결제정보관리</dt>
                    <dd class="side_small_menu">
                        <a href="/setup/config_pay"><i class="xi-minus-min"></i>결제정보설정</a>
                        <a href="/setup/config_pay_online"><i class="xi-minus-min"></i>온라인입금계좌</a>
                        <!-- <a href="/setup/config_kakaopay"><i class="xi-minus-min"></i>카카오페이결제정보설정</a>                      -->
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