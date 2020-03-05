<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>상품 진열순서를 설정하실 수 있습니다.</li>
            <li>순서를 변경하신 후에는 반드시 "<strong class="red">저장</strong>"버튼을 누르셔야만 설정하신 순서가 실제 반영됩니다.</li>
        </ul>

        <form name="sFrm">
            <!-- 검색 폼 : 시작 ###################################################################### -->
            <div class="box">
                <table class="t_form">
                    <caption>검색 폼</caption>
                    <tbody>
                        <tr>
                            <th>상품분류</th>
                            <td>
                                <select id="cate_1" name="cate_1" size="4" style="height: auto;" onchange="sc.get(this)">
                                    <option value="">:: 1차 분류 ::</option>
                                    <option value="2">OUTER</option>
                                </select>
                                <select id="cate_2" name="cate_2" size="4" style="height: auto;" onchange="sc.get(this)">
                                    <option value="">:: 2차 분류 ::</option>
                                </select>
                                <select id="cate_3" name="cate_3" size="4" style="height: auto;" onchange="sc.get(this)">
                                    <option value="">:: 3차 분류 ::</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>제외필터</th>
                            <td>
                                <label for="filter_no_display"><input type="checkbox" id="filter_no_display" name="filterNoDisplay"> 미진열 상품 제외</label>
                                <label for="filter_soldout" class="mgl20"><input type="checkbox" id="filter_soldout" name="filterSoldOut"> 품절 상품 제외</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn_center">
                    <button type="submit" class="btn btn-secondary">검색</button>
                </div>

            </div>

            <!-- 검색 폼 : 끝 ###################################################################### -->

        </form>

        <form name="Frm">
            <div class="sortable_wrap">
                <h3 class="ir_pm"><strong>상단의 상품분류를 선택해 주세요.</strong></h3>
                <div class="sortable_wrap">

                    <div class="sortable_list">
                        <table class="t_list mgb5">
                            <colgroup>
                                <col width="51">
                                <col width="30">
                                <col width="100">
                                <col width="*">
                                <col width="13%">
                                <col width="40">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th><input type="checkbox" name="cbListAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
                                    <th>상품코드</th>
                                    <th>상품명</th>
                                    <th>가격</th>
                                    <th>이동</th>
                                </tr>
                            </thead>
                        </table>

                        <ul id="sortable_container">
                            <li>
                                <table>
                                    <colgroup>
                                        <col width="50">
                                        <col width="30">
                                        <col width="100">
                                        <col width="">
                                        <col width="13%">
                                        <col width="40">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td class="no">1</td>
                                            <th>
                                                <input type="checkbox" name="cbList" class="mgl5" value="243" onclick="checkCb(this)">
                                                <input type="hidden" name="gno" value="243">
                                            </th>
                                            <td class="font11">G0000000243</td>
                                            <td class="title">
                                                <img src="http://mimd.mallstore.co.kr/data/base/goods/small/201721660706400_1_1_1_1.jpg" width="40" height="40">
                                                <p><a href="/goods/detail">SUN_추가상품_개별_선불12000원이상 무료</a></p>
                                            </td>
                                            <td class="price">10,000 원</td>
                                            <td class="mover"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>

                    <div class="sortable_control" style="margin-left: 10px; visibility: visible;">
                        <div class="control_box">
                            <ul>
                                <li class="mover">
                                    <h5><i class="xi-arrows"></i><strong>상품 일괄 이동</strong></h5>
                                    선택 상품<br>
                                    <input type="text" name="batchNo" style="width:30px" class="text_input" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)"> 번
                                    <select name="batchDirection" class="text_input">
                                        <option value="-1">위</option>
                                        <option value="1">아래</option>
                                    </select>
                                    <div class="mgt5"><button type="button" class="btn btn-sm btn-default" onclick="moveRow()">이동</button></div>
                                </li>
                            </ul>
                            <ul>
                                <li><button type="button" class="btn btn-sm btn-info" onclick="validSubmit()">저장</button></li>
                                <li><button type="button" class="btn btn-sm btn-default" onclick="cancel()">취소</button></li>
                            </ul>
                        </div>
                        <ul class="go">
                            <li><button type="button" class="top">▲</button></li>
                            <li><button type="button" class="bottom">▼</button></li>
                        </ul>
                    </div>

                </div>

            </div>

        </form>
    </div>
</template>
<script>
export default {}
</script>
