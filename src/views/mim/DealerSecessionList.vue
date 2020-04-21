<template>
  
            <div id="contents">
                <h3>판매자탈퇴목록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자관리</li>
                    <li class="on">판매자탈퇴목록</li>
                </ul>
                <ul class="helpbox">
                    <li>탈퇴신청을 한 판매자 목록입니다.</li>
                </ul>


                <div class="section_head">
                    <h4>총 0건의 탈퇴신청 판매자가 있습니다.</h4>
                    <div>
                       <select id="skey" name="skey" class="text_input">
                            <option value="">전체</option>
                            <option value="id">아이디</option>
                            <option value="name">업체명</option>
                            <option value="charger">담당자</option>
                            <option value="bizno">사업자등록번호</option>
                            <option value="tel">전화번호</option>
                            <option value="mobile">핸드폰번호</option>
                            <option value="email">이메일</option>
                        </select>
                        <input type="text" name="sword" class="text_input" style="width:150px; margin:0 5px">
                        <b-button variant="secondary" size="sm">검색</b-button>
                    </div>
                </div>


                 <form name="Frm" style="margin-top:10px">
                    <table class="t_list">
                        <caption>탈퇴 신청 판매자 목록</caption>
                       <colgroup>
                            <col width="17%">
                            <col width="*">
                            <col width="13%">
                            <col width="13%">
                            <col width="13%">
                            <col width="10%">
                            <col width="150">
                            <col width="50">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>업체명</th>
                                <th>담당자</th>
                                <th>전화번호</th>
                                <th>휴대폰번호</th>
                                <th>입점일</th>
                                <th>상세정보</th>
                                <th><input type="checkbox" name="cbListAll"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td height="50" colspan="8">탈퇴신청 판매자가 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href=""><strong>1</strong></a></span>
                    </div>

                    <div class="btn_right">
                        <b-button variant="danger" size="lg" style="margin-right:5px">선택삭제</b-button>
                        <b-button variant="primary" size="lg">탈퇴승인</b-button>
                    </div>

                </form>

            </div>
</template>

<script>
export default {}
</script>

<style>

</style>