<template>
     <div id="contents">
                <h3>
                   적립금설정
                </h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>환경설정</li>
                    <li>전체운영설정</li>
                    <li class="on">
                       적립금설정
                    </li>
                </ul>
                <ul class="helpbox">
                    <li>적립금 사용여부를 선택하고 어떤경우에 적립금을 지급할지를 설정합니다.</li>
                    <li>상품별 적립금 적용은 상품관리의 상품등록 메뉴에서 상품마다 재 설정 하실 수 있습니다.</li>
                </ul>


                <form name="Frm">
                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 기본 적립금 지급 설정</h4>
                        </div>
                        <table class="t_form">
                            <caption>기본 적립금 지급 설정 폼</caption>
                            <tbody>
                                <tr>
                                    <th>회원 가입 적립금</th>
                                    <td>
                                        적립금
                                        <input type="text" name="cmoneySaveJoin" value="5,000" maxlength="10" class="text_input" style="width:100px" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원
                                        <span class="square_blue"><i class="xi-error"></i> 회원 가입시 적립해 줄 적립금액 입니다.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 상품 적립금 지급 설정</h4>
                        </div>
                        <table class="t_form">
                            <caption>상품 적립금 지급 설정 폼</caption>
                            <tbody>
                                <tr>
                                    <th>적립금 기본정책</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <input type="radio" name="cmoneySavePolicy" value="0"> 적립금 지급 안함
                                            </li>
                                            <li class="mgt20">
                                                <input type="radio" name="cmoneySavePolicy" value="1"> 회원등급 적립금 설정에 따라 지급
                                            </li>
                                            <li class="mgt20">
                                                <input type="radio" name="cmoneySavePolicy" value="6" class="text_input" checked>
                                                <select id="cmoneySavePolicyPrice" name="cmoneySavePolicyPrice" class="text_input" style="width: 86px;">
                                                    <option value="2">판매가</option>
                                                    <option value="4" selected>결제가</option>
                                                </select> 의
                                                <input type="text" name="cmoneySavePercent" value="5" maxlength="5" class="text_input" style="width:70px"> % 지급
                                            </li>
                                            <li class="mgt10">
                                                <input type="radio" name="cmoneySavePolicy" value="8" class="text_input"> 구매 상품(개수) 당
                                                <input type="text" name="cmoneySaveMoney" value="0" class="text_input" style="width:70px" disabled> 원 지급
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>상품평 적립금</th>
                                    <td>
                                        <ul class="arrange">
                                            <li><strong>텍스트</strong> <input type="text" name="cmoneyReview" value="1000" maxlength="10" class="text_input" style="width:80px;"> 원</li>
                                            <li class="clear"><strong>텍스트 + 이미지</strong> <input type="text" name="cmoneyReviewimg" value="2000" maxlength="10" class="text_input" style="width:80px;"> 원</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>적립금 설정 권한</th>
                                    <td>
                                        <ul class="arrange">
                                            <li><input type="radio" name="permDealerCmoney" value="0"> 마스터만 설정</li>
                                            <li class="mgl20"><input type="radio" name="permDealerCmoney" value="1" checked> 판매자 설정 가능</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>적립금 부담 설정</th>
                                    <td>
                                        <ul class="arrange">
                                            <li><input type="radio" name="shareDealerCmoney" value="0" checked> 마스터가 부담</li>
                                            <li class="mgl20"><input type="radio" name="shareDealerCmoney" value="1"> 판매자가 부담</li>
                                            <span class="square_blue"><i class="xi-error"></i> 상품에서 "<strong>기본 정책</strong>" 이외 설정으로 적립금 지급시, 위 설정과 관계없이 <strong>판매자에게 부담</strong>됩니다.</span>
                                        </ul>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="box">
                        <div class="section_head">
                            <h4><i class="xi-check-circle"></i> 적립금 사용 설정</h4>
                        </div>
                        <table class="t_form">
                            <caption>적립금 지급 설정 폼</caption>

                            <tbody>
                                <tr>
                                    <th>사용가능 보유적립금</th>
                                    <td>
                                        <strong>적립금</strong>
                                        <input type="text" name="cmoneyUseLimit" value="1" maxlength="10" class="text_input" style="width:100px"> 원 이상 보유시 사용 가능.
                                        <span class="square_blue"><i class="xi-error"></i> 적립금이 얼마이상이어야 사용가능한지 금액을 적어주세요.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>결제시 사용가능 최소적립금</th>
                                    <td>
                                        <strong>적립금</strong>
                                        <input type="text" name="cmoneyUseMin" value="1" maxlength="10" class="text_input" style="width:100px"> 원 이상 사용 가능.
                                        <span class="square_blue"><i class="xi-error"></i> 한번의 구매 결제시 사용할 수 있는 최소금액을 적어주세요.</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>결제시 사용가능 최대적립금</th>
                                    <td>
                                        <strong>적립금</strong>
                                        <input type="text" name="cmoneyUseMax" value="500,000" maxlength="10" class="text_input" style="width:100px"> 원 이하 사용 가능.
                                        <span class="square_blue"><i class="xi-error"></i> 한번의 구매 결제시 사용할 수 있는 최대금액을 적어주세요.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="btn_center">
                        <button type="button" class="btn btn-info">확인</button>
                        <button type="button" class="btn btn-secondary" onclick="cancel()">취소</button>
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