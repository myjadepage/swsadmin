<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> 상품Q＆A관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">상품Q＆A관리</li>
                </ul>
                <ul class="helpbox">
                    <li>상품의 Q＆A를 관리합니다.</li>
                </ul>

                <form name="Frm">
                    <div class="section_head">
                        <h4>오늘 등록된 Q＆A는 총 <strong>0</strong>개입니다.</h4>
                        <div class="mgb5">
                            <select id="skey" name="skey" class="text_input">
                                <option value="">전체</option>
                                <option value="goods">상품명</option>
                                <option value="subject">제목</option>
                                <option value="content">내용</option>
                                <option value="answer">답변</option>
                                <option value="user">질문자</option>
                                <option value="dealer">답변자</option>
                            </select>

                            <input type="text" name="sword" maxlength="50" class="text_input" style="width:150px; margin:0 5px">
                            <b-button variant="outline-secondary" size="sm">검색</b-button>
                        </div>
                    </div>

                    <table class="t_list">
                        <caption>등록된 Q＆A 리스트</caption>
                        <colgroup>
                            <col width="50">
                            <col width="*">
                            <col width="100">
                            <col width="100">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>제목</th>
                                <th>고객명</th>
                                <th>등록일</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr style="background-color:#ffffe3">
                                <td>1</td>
                                <td class="left">
                                    상품 문의
                                    <font color="blue">(비밀글)</font>
                                </td>
                                <td><a href="javascript:;" onclick="ezpop.member.open(event)">wonej999</a></td>
                                <td>2019-05-03</td>
                            </tr>
                            <tr>
                                <td colspan="4" style="padding:10px">
                                    <div style="width:70px;text-align:left" class="fl"><img src="/img/201324253665762.jpg" width="50" height="50"></div>
                                    <div class="fl" style="margin:5px 0 0 0;width:80%;text-align:left"><a href="/goods/detail?gno=75" target="_blank">버든배낭</a></div>
                                </td>
                            </tr>
                            <tr style="background-color:#F8F8F8">
                                <td colspan="2" class="left">상품 문의 합니다.</td>
                                <td colspan="2">
                                    <!-- 수정/삭제/답글버튼 -->
                                    <b-button variant="outline-secondary" size="sm" id="btnQna" @click="$refs.editQnaModal.show()">수정</b-button>
                                    <b-button variant="outline-danger" size="sm" style="margin:0 5px">삭제</b-button>
                                    <b-button variant="outline-secondary" size="sm" id="btnAnswer" @click="$refs.answerQnaModal.show()">답변</b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="paging" style="margin-top:20px">
                        <span><a href=""><strong>1</strong></a></span>
                    </div>
                </form>

                <!-- qna수정 모달 -->
                <b-modal ref="editQnaModal">
                    <template v-slot:modal-title>
                        <font-awesome-icon icon="info-circle" /> Q＆A 수정
                    </template>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mform">
                        <caption>답변 수정/등록 폼</caption>
                        <colgroup><col width="100"><col width="*"></colgroup>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input type="text" name="subject" value="상품 문의" style="width:98%" class="text_input" maxlength="100">
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <textarea name="content" rows="5" style="width:98%" class="text_input">상품 문의 합니다.</textarea>
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>
                                    <input type="text" name="writer" value="wonej999" class="text_input" style="width:130px" maxlength="20">
                                </td>
                            </tr>
                        </tbody>
                        </table>
                </b-modal>

                <!-- qna답변 모달-->
                <b-modal ref="answerQnaModal">
                    <template v-slot:modal-title>
                        <font-awesome-icon icon="info-circle" /> Q＆A 답변
                    </template>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mform">
                        <caption>답변 수정&amp;등록 폼</caption>
                        <colgroup><col width="100"><col width="*"></colgroup>

                        <tbody><tr>
                            <th>내용</th>
                            <td>
                                <textarea name="content" rows="5" style="width:98%" class="text_input"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type="text" name="writer" value="몰인몰" class="text_input" style="width:130px" maxlength="20" readonly="">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </b-modal>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>