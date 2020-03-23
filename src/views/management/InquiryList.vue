<template>
  <div id="contents">
                <h3>{{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>1:1문의를 관리하실 수 있습니다.</li>
                </ul>

                <form name="sFrm">
                    <div class="section_head">
                        <h4>
                            <select id="sconsult" name="sconsult" class="text_input" onchange="change()">
                                <option value="">전체</option>
                                <option value="01">아이디/비밀번호찾기</option>
                                <option value="02">회원정보</option>
                                <option value="03">배송관련</option>
                                <option value="04">상품문의</option>
                                <option value="05">반품/교환/취소/환불</option>
                                <option value="06">주문결제</option>
                                <option value="07">적립금/쿠폰</option>
                                <option value="0">기타</option>
                            </select>
                        </h4>
                        <div class="mgb5">
                            <select id="skey" name="skey" class="text_input">
                                <option value="subject">제목</option>
                                <option value="content">내용</option>
                                <option value="id">아이디</option>
                            </select>

                            <input type="text" name="sword" value="" maxlength="50" class="text_input" style="width:150px; margin: 0 5px">
                            <b-button variant="secondary">검색</b-button>
                        </div>
                    </div>

                </form>

                <table class="t_list">
                    <caption>등록된 질문 리스트</caption>
                    <colgroup>
                        <col width="50">
                        <col width="150">
                        <col width="*">
                        <col width="100">
                        <col width="80">
                        <col width="80">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>분류</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>등록일</th>
                            <th>답변여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>배송관련</td>
                            <td class="left"><a href="/inquiry_detail">배송문의</a></td>
                            <td>mallstore</td>
                            <td>2019-06-18</td>
                            <td><span style="color:red">미답변</span></td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>상품문의</td>
                            <td class="left"><a href="/inquiry_detail">상품정보</a></td>
                            <td>mallstore</td>
                            <td>2019-06-18</td>
                            <td><span style="color:red">미답변</span></td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>회원정보</td>
                            <td class="left"><a href="/inquiry_detail">일대일 문의</a></td>
                            <td>wonej999</td>
                            <td>2019-05-03</td>
                            <td><span style="color:red">미답변</span></td>
                        </tr>

                    </tbody>
                </table>

                <div class="paging" style="margin-top:20px">
                    <span><a href="/"><strong>1</strong></a></span>
                </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>