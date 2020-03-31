<template>
  <div id="contents">
                <h3>{{ this.$route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>상점운영관리</li>
                    <li class="on">{{ this.$route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>쿠폰을 발행하고 쿠폰지급 내역을 확인할 수 있습니다.</li>
                    <li>회원별, 상품별로 쿠폰을 부여하여 쇼핑몰이 활성화 하는데 도움을 줍니다.</li>
                </ul>


                <form name="sFrm">

                    <table class="t_form">
                        <caption>쿠폰 종류</caption>
                        <tbody>
                            <tr>
                                <th>쿠폰방식</th>
                                <td>
                                    <select id="smethod" name="smethod" class="text_input" onchange="this.form.submit()">
                                        <option value="">전체</option>
                                        <option value="101">상품 발급</option>
                                        <option value="102">구매보상 발급</option>
                                        <option value="103">회원선택 발급</option>
                                        <option value="201">회원가입 발급</option>
                                    </select>

                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>

                <form name="Frm" method="post">
                    <table class="t_list mgt20">
                        <caption>등록된 쿠폰 내역</caption>
                        <colgroup>
                            <col width="50">
                            <col width="7%">
                            <col width="10%">
                            <col width="*">
                            <col width="10%">
                            <col width="10%">
                            <col width="13%">
                            <col width="10%">
                            <col width="8%">
                            <col width="100">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="cbListAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
                                <th>No</th>
                                <th>종류</th>
                                <th>쿠폰명</th>
                                <th>할인폭</th>
                                <th>진행기간</th>
                                <th>적용대상</th>
                                <th>사용/발행</th>
                                <th>등록일자</th>
                                <th>메뉴</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td><input type="checkbox" name="cbList" value="57"></td>
                                <td>3</td>
                                <td>상품 발급</td>
                                <td class="left">상품 100원 할인 쿠폰</td>

                                <td>100원</td>

                                <td>2017.08.01~<br>2018.08.31</td>
                                <td>일반회원<br>코알라회원</td>

                                <td><a href="javascript:;" onclick="openIssueList(57); return false;">0/0장</a></td>
                                <td>2017.08.31</td>
                                <td><b-button variant="secondary" onclick="reg(57)">수정</b-button></td>
                            </tr>
                         

                        </tbody>
                    </table>

                    <div class="paging" style="margin-top:20px">
                        <span><a href=""><strong>1</strong></a></span>
                    </div>

                    <div class="btn_center">
                        <b-button variant="secondary"  @click="$router.push('/management/coupon_reg')" style="margin-right:5px">쿠폰등록</b-button>
                        <b-button variant="danger" onclick="delList()">선택삭제</b-button>
                    </div>

                </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>