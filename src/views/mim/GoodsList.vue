<template>

            <div id="contents">
                <h3>판매자상품관리</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>입점업체관리</li>
                    <li>판매자상품관리</li>
                    <li class="on">판매자상품관리</li>
                </ul>
                <ul class="helpbox">
                    <li>판매자의 상품을 관리하는 곳입니다.</li>
                </ul>


                <form name="sFrm">
                    <input type="hidden" name="menu" value="list">
                    <input type="hidden" name="psort" value="no_desc">
                    <input type="hidden" name="psize" value="20">

                    <table class="t_form">
                        <caption>검색 폼</caption>
                        <colgroup>
                            <col width="130">
                            <col width="">
                            <col width="130">
                            <col width="">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>상품검색</th>
                                <td>
                                    <select id="skey" name="skey"><option value="name">상품명</option><option value="code">상품키</option><option value="dealer">판매자ID</option></select>

                                    <input type="text" name="sword" class="text_input" style="width:120px" value="">
                                    <span class="button small black"><button type="submit">검색</button></span>
                                </td>
                                <th>정렬</th>
                                <td>
                                    <a href="/mim/goods_list?menu=list"><strong class="red">전체 </strong></a>
                                    <a href="/mim/goods_list?menu=reg">등록신청 </a>
                                    <a href="/mim/goods_list?menu=edit">수정신청 </a>
                                    <a href="/mim/goods_list?menu=del">삭제신청 </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </form>

                <form name="Frm">
                    <input type="hidden" name="menu" value="list">
                    <input type="hidden" name="gno">
                    <input type="hidden" name="params" value="menu=list^skey=^sword=^psort=no_desc^psize=20^page=">

                    <div class="section_head">
                        <h4>전체상품목록 - 총 27개의 상품이 검색되었습니다.</h4>
                        <div>
                            <select id="psize" name="psize" onchange="changeList();">
                                <option value="10">10줄씩보기</option>
                                <option value="20" selected="">20줄씩보기</option>
                                <option value="30">30줄씩보기</option>
                                <option value="50">50줄씩보기</option>
                                <option value="100">100줄씩보기</option>
                            </select>

                        </div>
                    </div>

                    <table class="t_list">
                        <caption>판매자 상품 목록</caption>
                        <colgroup>
                            <col width="60">
                            <col width="10%">
                            <col width="60">
                            <col width="*">
                            <col width="27%">
                            <col width="80">
                            <col width="50">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><span onclick="setSort('no_asc')" style="font-size:8pt; cursor:pointer;">▲</span>No<span onclick="setSort('no_desc')" style="font-size:8pt; cursor:pointer;">▼</span></th>
                                <th><span onclick="setSort('dealer_asc')" style="font-size:8pt; cursor:pointer;">▲</span>업체명<span onclick="setSort('dealer_desc')" style="font-size:8pt; cursor:pointer;">▼</span></th>
                                <th colspan="2">상품명</th>
                                <th>희망카테고리</th>
                                <th>관리</th>
                                <th><input type="checkbox" name="cbAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr onmouseover="this.style.backgroundColor='#FDFAE8'" onmouseout="this.style.backgroundColor='#FFFFFF'" style="background-color: rgb(255, 255, 255);">
                                <td>27</td>
                                <td>내친구몰<br>(dealers)</td>
                                <td><img src="/img/43.jpg" width="50" height="50"></td>
                                <td class="left">
                                    <a href="http://mimd.mallstore.co.kr/goods/detail.asp?gno=234" target="_blank"><strong>[NCGN] Sports Goggle</strong></a>

                                    <div class="mgt5">
                                        <span>공급가 : </span><span class="red">\42,500</span> &nbsp;(15% 수수료)<br>
                                        <span>판매가 : </span><span class="red">\50,000</span>
                                        <span>시중가 :</span><span class="light_gray">\0</span>
                                    </div>
                                </td>
                                <td class="left">
                                    <ul class="font11">
                                        <li class="mgt3">OUTER&gt;가디건&gt;라운드가디건</li>
                                        <li class="mgt3">OUTER&gt;코트&gt;트렌치코트</li>

                                    </ul>
                                </td>
                                <td>

                                    <span class="button small"><a href="http://mimd.mallstore.co.kr/goods/detail.asp?gno=234" target="_blank">상세정보</a></span>

                                    <div class="mgt5">

                                        <span class="button small"><button type="button" onclick="edit(234)">수정</button></span>

                                        <span class="button small"><button type="button" onclick="del(234)">삭제</button></span>
                                    </div>
                                </td>
                                <td><input type="checkbox" name="cbList" value="234"></td>
                            </tr>


                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href=""><strong>1</strong></a><a href="/mim/goods_list.asp?page=2&menu=list&skey=&sword=&psort=no_desc&psize=20">2</a></span>
                    </div>

                    <div class="btn_right">
                        <span class="button large black"><button type="button" onclick="delList()">선택삭제</button></span>

                    </div>

                </form>
            </div>
  
</template>

<script>
export default {}
</script>

<style>

</style>