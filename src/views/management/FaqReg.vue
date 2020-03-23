<template>
  <div id="contents">
                <h3>FAQ관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">FAQ관리</li>
                </ul>
                <ul class="helpbox">
                    <li>FAQ를 관리하실 수 있습니다.</li>
                </ul>



                <form name="Frm">
                    <table class="t_form">
                        <caption>FAQ 등록 폼</caption>
                        <tbody>
                            <tr>
                                <th>분류</th>
                                <td>
                                    <select id="consult" name="consult" class="text_input">
                                        <option value="">선택</option>
                                        <option value="01">아이디/비밀번호찾기</option>
                                        <option value="02">회원정보</option>
                                        <option value="03">배송관련</option>
                                        <option value="04">상품문의</option>
                                        <option value="05">반품/교환/취소/환불</option>
                                        <option value="06">주문결제</option>
                                        <option value="07">적립금/쿠폰</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input name="subject" value="" class="text_input" maxlength="50" style="width:98%">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <div class="summernote"></div>

                                </td>
                            </tr>
                            <tr>
                                <th>TOP10</th>
                                <td>
                                    <input type="checkbox" name="top10" value="1"> TOP10 FAQ로 설정
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <button type="button" class="btn btn-info" onclick="validSubmit()">확인</button>
                        <button type="button" class="btn btn-default" onclick="cancel()">취소</button>
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