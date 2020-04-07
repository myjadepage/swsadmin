<template>
 <div id="contents">
                <h3>판매자 신청목록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자관리</li>
                    <li class="on">판매자 신청목록</li>
                </ul>
                <ul class="helpbox">
                    <li>쇼핑몰에 판매자 신청하신 목록을 관리하는 곳 입니다.</li>
                    <li>판매자의 상세내역을 잘 검토하시여 판매자 승인을 해 주시면 됩니다.</li>
                    <li>판매자 신청 목록에서 승인을 하시면 판매자목록으로 자동 등록됩니다.</li>
                </ul>

                <div class="section_head">
                    <h4>총 <strong class="red">2</strong>건의 판매자 신청이 있으며, 오늘 신청된 판매자는 <strong class="red">0</strong>건입니다.</h4>
                    <div>
                        <form name="sFrm" method="get">
                            <input type="hidden" name="psort" value="regdate_desc">
                            <strong>SEARCH</strong>
                            <select id="skey" name="skey"><option value="">전체</option><option value="id">아이디</option><option value="name">업체명</option><option value="charger">담당자</option><option value="bizno">사업자등록번호</option><option value="tel">전화번호</option><option value="mobile">핸드폰번호</option><option value="email">이메일</option></select>

                            <input type="text" name="sword" value="" class="text_input" style="width:150px">
                            <span class="button small black"><button type="submit">검색</button></span>
                        </form>
                    </div>
                </div>

                <form name="Frm" method="post">
                    <input type="hidden" name="menu" value="regist">
                    <input type="hidden" name="mode">
                    <input type="hidden" name="no">
                    <input type="hidden" name="params" value="skey=^sword=^psort=regdate_desc^page=">

                    <table class="t_list">
                        <caption>승인 대기 판매자 목록</caption>
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
                                <th><span onclick="setSort('regdate_asc')" style="font-size:11px; cursor:pointer;">▲</span>신청일<span onclick="setSort('regdate_desc')" style="font-size:11px; cursor:pointer;">▼</span></th>
                                <th>상세정보</th>
                                <th><input type="checkbox" name="cbListAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr onmouseover="this.style.backgroundColor='#FDFAE8'" onmouseout="this.style.backgroundColor='#FFFFFF'">
                                <td>awesomeshop</td>
                                <td>어썸몰</td>
                                <td><a href="mailto:shlee@awesomebly.com">김다다</a></td>
                                <td>01-888-9999</td>
                                <td>010-6666-8888</td>
                                <td>2019-03-11</td>
                                <td><span class="button small"><button type="button" onclick="detail(69)">상세정보</button></span></td>
                                <td><input type="checkbox" name="cbList" value="69"></td>
                            </tr>

                            <tr onmouseover="this.style.backgroundColor='#FDFAE8'" onmouseout="this.style.backgroundColor='#FFFFFF'">
                                <td>phika777</td>
                                <td>테스트업체</td>
                                <td><a href="mailto:phika@naver.com">담당자</a></td>
                                <td>02-123-1234</td>
                                <td>011-123-1234</td>
                                <td>2018-03-24</td>
                                <td><span class="button small"><button type="button" onclick="detail(62)">상세정보</button></span></td>
                                <td><input type="checkbox" name="cbList" value="62"></td>
                            </tr>

                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href="/mim/dealer_regist_list?page=1&skey=&sword=&psort=regdate_desc"><strong>1</strong></a></span>
                    </div>

                    <div class="btn_right">
                        <span class="button large black"><button type="button" onclick="delList()">선택삭제</button></span>
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