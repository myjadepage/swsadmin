<template>
   <div id="contents">
                <h3>1:1문의관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>고객운영관리</li>
                    <li class="on">1:1문의관리</li>
                </ul>
                <ul class="helpbox">
                    <li>1:1문의를 관리하실 수 있습니다.</li>
                </ul>




                <form name="Frm">
                    <div class="section_head">
                        <h4><i class="xi-check-circle"></i> 질문</h4>
                    </div>

                    <table class="t_form">
                        <caption>등록된 질문 내역</caption>
                        <tbody>
                            <tr>
                                <th>분류</th>
                                <td colspan="3">
                                    배송관련
                                </td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td colspan="3">
                                    배송문의
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>
                                    mallstore
                                </td>
                                <th>등록일</th>
                                <td>
                                    2019-06-18
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td colspan="3">
                                    joonh0911@ncgn.co.kr
                                </td>
                            </tr>
                            <tr>
                                <th>휴대폰</th>
                                <td colspan="3">
                                    010-0000-0000
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colspan="3">
                                    언제배송됩니까
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="over_h mgt5">
                        <div class="fl">
                            <button type="button" class="btn btn-sm btn-default" onclick="list()">목록으로</button>
                        </div>
                        <div class="fr">
                            <button type="button" class="btn btn-sm btn-danger" onclick="del()">삭제하기</button>
                        </div>
                    </div>

                    <div class="section_head">
                        <h4>답변</h4>
                    </div>

                    <table class="t_form">
                        <caption>답변 내용</caption>
                        <tbody>
                            <tr>
                                <th>답변제목</th>
                                <td>
                                    <input name="subject" value="" class="text_input" style="width:98%" maxlength="50">
                                </td>
                            </tr>
                            <tr>
                                <th>답변내용</th>
                                <td>
                                    <textarea name="content" class="text_input" style="height:200px;width:98%"></textarea>
                                </td>
                            </tr>


                        </tbody>
                    </table>

                    <div class="btn_center">
                        <button type="button" class="btn btn-info" onclick="validSubmit()">확인</button>

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