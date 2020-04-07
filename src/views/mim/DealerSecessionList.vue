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
                        <form name="sFrm" method="get">
                            <input type="hidden" name="psort" value="regdate_desc">

                            <strong>SEARCH</strong>
                            <select id="skey" name="skey"><option value="">전체</option><option value="id">아이디</option><option value="name">회사명</option><option value="charger">담당자</option><option value="bizno">사업자등록번호</option><option value="tel">전화번호</option><option value="mobile">핸드폰번호</option><option value="email">이메일</option></select>

                            <input type="text" name="sword" value="" class="text_input" style="width:150px">
                            <span class="button small black"><button type="submit">검색</button></span>

                        </form>
                    </div>
                </div>


                <form name="Frm" method="post">
                    <input type="hidden" name="menu" value="secession">
                    <input type="hidden" name="mode">
                    <input type="hidden" name="no">
                    <input type="hidden" name="params" value="skey=^sword=^psort=regdate_desc^page=">

                    <table class="t_list">
                        <caption>탈퇴 신청 판매자 목록</caption>
                        <colgroup>
                            <col width="17%">
                            <col width="*">
                            <col width="13%">
                            <col width="13%">
                            <col width="13%">
                            <col width="10%">
                            <col width="80">
                            <col width="30">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><span onclick="setSort('id_asc')" style="font-size:11px; cursor:pointer;">▲</span>아이디<span onclick="setSort('id_desc')" style="font-size:11px; cursor:pointer;">▼</span></th>
                                <th><span onclick="setSort('name_asc')" style="font-size:11px; cursor:pointer;">▲</span>업체명<span onclick="setSort('name_desc')" style="font-size:11px; cursor:pointer;">▼</span></th>
                                <th><span onclick="setSort('charger_asc')" style="font-size:11px; cursor:pointer;">▲</span>담당자<span onclick="setSort('charger_desc')" style="font-size:11px; cursor:pointer;">▼</span></th>
                                <th>전화번호</th>
                                <th>휴대폰번호</th>
                                <th><span onclick="setSort('regdate_asc')" style="font-size:11px; cursor:pointer;">▲</span>입점일<span onclick="setSort('regdate_desc')" style="font-size:11px; cursor:pointer;">▼</span></th>
                                <th>상세정보</th>
                                <th><input type="checkbox" name="cbListAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
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
                        <span class="button large black"><button type="button" onclick="delList()">선택삭제</button></span>
                        <span class="button large black"><button type="button" onclick="setConfirm()">탈퇴승인</button></span>
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