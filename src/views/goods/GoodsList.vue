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
            <li>등록하신 상품들을 수정/관리 하실 수 있습니다.</li>
            <li>[상품영역]을 클릭하시면 영역별로 상품들을 보실 수 있습니다.</li>
            <li>서브메인 영역에 상품을 올릴시려면 상품관리에서 제일 마지막 카테고리분류(소분류)를 클릭하시면 됩니다.</li>
            <li>[상품진열]버튼을 클릭하시면 상품을 숨길수 있으며 [진열안함]버튼을 클릭하시면 상품을 전시하실수 있습니다.</li>
            <li>[상품영역]중 서브메인과 중간영역은 카테고리 지정시에만 가능합니다.</li>
        </ul>

        <!-- 검색 폼 : 시작 ###################################################################### -->
        <form name="sFrm">
            <div class="box">
                <table class="t_form">
                    <caption>상품 검색 폼</caption>

                    <tbody>
                        <tr>
                            <th>상품분류</th>
                            <td>
                                <div class="fl mgr5">
                                    <select class="text_input" style="width: 100px;" id="scate_1" name="scate_1" onchange="sc.get(this)">
                                        <option value="">선택</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select class="text_input" style="width: 100px;" id="scate_2" name="scate_2" onchange="sc.get(this)">
                                        <option value="">선택</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select class="text_input" style="width: 100px;" id="scate_3" name="scate_3" onchange="sc.get(this)">
                                    <option value="">선택</option>
                                </select>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <th>상품영역</th>
                            <td style="padding:0;">
                                <table class="t_form" style="border:none 0">
                                    <tbody>
                                        <tr>
                                            <th>메인</th>
                                            <td style="border-top:0;">
                                                <ul class="arrange">
                                                    <li><label><input type="checkbox" name="caream" > md추천</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="caream" > best추천</label></li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style="border:0;border-right:solid 1px #ddd">서브</th>
                                            <td style="border:0 ;">
                                                <ul class="arrange">
                                                    <li><label><input type="checkbox" name="careas" > 대분류 Best Seller</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="careas" > 대분류 New Item</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="careas" > 대분류 MD Choice</label></li>
                                                    <li class="mgl20"><label><input type="checkbox" name="careas" > 중분류 Top Best</label></li>
                                                </ul>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <th>그룹별</th>
                            <td>
                                <select id="sbrand" name="sbrand" class="text_input" onchange="change();">
                                <option value="">브랜드</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>상품등록일</th>
                            <td>
                                <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
                                    <input id="startpicker-input" type="text" aria-label="Date">
                                    <span class="tui-ico-date"></span>
                                    <div id="startpicker-container" style="margin-left: -1px;"></div>
                                </div>
                                <span>~</span>
                                <div class="tui-datepicker-input tui-datetime-input tui-has-focus">
                                    <input id="endpicker-input" type="text" aria-label="Date">
                                    <span class="tui-ico-date"></span>
                                    <div id="endpicker-container" style="margin-left: -1px;"></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>상품판매자</th>
                            <td>
                                <select id="sdealer" name="sdealer" class="text_input" onchange="change();">
                                    <option value="">선택하세요</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>재고여부</th>
                            <td>
                                <label><input type="radio" name="sstock" checked> 전체상품</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 재고 무제한</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 재고있는 상품(무제한 제외)</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 재고가 실제 0인 상품</label>
                                <label><input type="radio" name="sstock" class="mgl20"> 품절로 선택된 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>진열여부</th>
                            <td>
                                <label><input type="radio" name="sdisplay" checked>전체상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20">진열되어 있는 상품</label>
                                <label><input type="radio" name="sdisplay" class="mgl20">진열 안되어 있는 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <th>상품가격</th>
                            <td>
                                <input type="text" name="ssprice" class="text_input" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원 ~
                                <input type="text" name="seprice" class="text_input" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원
                            </td>
                        </tr>
                        <tr>
                            <th>직접검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;">
                                <option value="name">상품명</option>
                                <option value="code">상품코드</option>
                            </select>
                                <input type="text" name="sword" class="text_input">
                                <button class="btn btn-sm btn-secondary" type="submit">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <!-- 검색 폼 : 끝 ###################################################################### -->

        <form name="Frm">
            <div class="box">
                <div class="section_head">
                    <h4><i class="xi-check-circle"></i> 총 <strong class="red">62</strong>개의 상품이 검색되었습니다.</h4>
                    <div>
                        <select id="psize" name="psize" onchange="changeList();" class="text_input">
                            <option value="10" selected="">10줄씩보기</option>
                            <option value="20">20줄씩보기</option>
                            <option value="30">30줄씩보기</option>
                            <option value="50">50줄씩보기</option>
                            <option value="100">100줄씩보기</option>
                        </select>
                        <select id="psort" name="psort" onchange="changeList();" class="text_input">
                            <option value="sort_desc" selected="">기본정렬</option>
                            <option value="name_asc">상품명순</option>
                            <option value="no_desc">신상품순</option>
                            <option value="hits_desc">인기도순</option>
                            <option value="price_desc">고가격순</option>
                            <option value="price_asc">저가격순</option>
                        </select>
                    </div>
                </div>

                <table class="t_list mgt10">
                    <caption>상품 리스트</caption>
                    <colgroup>
                        <col width="30">
                        <col width="100">
                        <col width="*">
                        <col width="150">
                        <col width="150">
                        <col width="150">
                        <col width="100">
                        <col width="100">
                        <col width="100">
                        <col width="150">
                        <col width="160">
                    </colgroup>
                    <thead>
                        <tr>
                            <th><input type="checkbox" name="cbListAll" onclick="sws.common.checkCbAll(this.form.cbList, this.checked)"></th>
                            <th>고유번호</th>
                            <th>상품명 / 카테고리 / 공급업체</th>
                            <th>판매가</th>
                            <th>시중가</th>
                            <th>공급가</th>
                            <th>조회수</th>
                            <th>판매수량</th>
                            <th>재고</th>
                            <th>진열여부</th>
                            <th>기능</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" name="cbList" value="243"></td>
                            <td><strong>243</strong></td>
                            <td class="vm">
                                <div class="gbox tl">
                                    <img src="@/assets/img/201721660706400_1_1_1_1.jpg" class="photo">
                                    <div><a href="" target="_blank"><strong>SUN_추가상품_개별_선불12000원이상 무료</strong></a></div>
                                    <div class="category">OUTER 〉자켓테이러드자켓</div>
                                </div>
                            </td>
                            <td>
                                <input type="text" name="price_243" value="10,000" maxlength="10" class="text_input" style="width:50%" onkeyup="toCurrency(this); calcPrice(243, 'price ');" onblur="checkPriceRound(this, 243, 'price ')"> 원
                            </td>
                            <td>
                                <input type="text" name="marketPrice_243" value="0" maxlength="10" class="text_input" style="width:50%" onkeyup="toCurrency(this)"> 원
                            </td>
                            <td>
                                <input type="text" name="originalPrice_243" value="10,000" maxlength="10" class="text_input" style="width:50%" onkeyup="toCurrency(this); calcPrice(243, this);" onblur="checkPriceRound(this, 243)"> 원
                            </td>
                            <td>270 회</td>
                            <td>0 개</td>
                            <td>무제한</td>
                            <td>
                                <div class="mgt5"><button type="button" class="btn btn-sm btn-default" onclick="changeSoldOut(243)">상품진열 표시</button></div>
                                <div class="mgt5"><button type="button" class="btn btn-sm btn-default" onclick="changeDisplay(243)">상품진열 안함</button></div>
                            </td>
                            <td>
                                <div>
                                    <button type="button" class="btn btn-sm btn-secondary" onclick="validSave(243)">저장</button>
                                    <button type="button" class="btn btn-sm btn-danger" onclick="del(243)">삭제</button>
                                </div>
                                <div class="mgt10">
                                    <button type="button" class="btn btn-sm btn-default" onclick="openGoodsHistory(243)">이력</button>
                                    <button type="button" class="btn btn-sm btn-default" onclick="copy(243)">복사</button>
                                    <button type="button" class="btn btn-sm btn-secondary" onclick="edit(243)">수정</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="paging" style="margin-top:20px">
                <span><a href=""><strong>1</strong></a><a href="">2</a></span>
            </div>

            <div class="btn_right">
                <button type="button" class="btn btn-secondary" onclick="downExcel()">엑셀로받기</button>
                <button type="button" class="btn btn-danger" onclick="delList()">일괄삭제</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {}
</script>
