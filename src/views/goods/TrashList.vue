<template>
    <div id="contents">
        <h3>상품휴지통</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li>상품관리</li>
            <li class="on">상품휴지통</li>
        </ul>
        <ul class="helpbox">
            <li>전체 상품리스트에서 삭제된 상품의 리스트입니다.</li>
            <li>이곳에서 삭제하시면 영구 삭제되며 복원을 하시면 다시 해당카테고리로 복원됩니다.</li>
        </ul>

        <!-- 검색 폼 : 시작 ###################################################################### -->
        <form name="sFrm">
            <table class="t_form">
                <caption>상품 검색 폼</caption>

                <tbody>
                    <tr>
                        <th>상품분류</th>
                        <td>
                            <div class="fl mgl5">
                                <select id="scate_1" name="scate_1" class="text_input" style="width:150px" onchange="sc.get(this)">
                                <option value="">선택</option>
                            </select>
                            </div>
                            <div class="fl mgl5">
                                <select id="scate_2" name="scate_2" class="text_input" style="width:150px" onchange="sc.get(this)">
                                    <option value="">선택</option>
                                </select>
                            </div>
                            <div class="fl mgl5">
                                <select id="scate_3" name="scate_3" class="text_input" style="width:150px" onchange="sc.get(this)">
                                    <option value="">선택</option>
                                </select>
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <th>브랜드</th>
                        <td>
                            <select id="sbrand" name="sbrand" class="text_input" onchange="change();">
                                <option value="">선택하세요</option>
                                </select>
                        </td>
                    </tr>
                    <tr>
                        <th>상품삭제일</th>
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
                        <th>상품입점업체</th>
                        <td>
                            <select id="sdealer" name="sdealer" class="text_input" onchange="change();">
                                <option value="">선택하세요</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>상품가격</th>
                        <td>
                            <input type="text" name="ssprice" class="text_input" style="width:100px" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원 ~
                            <input type="text" name="seprice" class="text_input" style="width:100px" onkeyup="toCurrency(this)" onblur="toCurrency(this)"> 원
                        </td>
                    </tr>
                    <tr>
                        <th>직접검색</th>
                        <td>
                            <select id="skey" name="skey" class="text_input">
                                <option value="name">상품명</option>
                                <option value="code">상품코드</option>
                            </select>

                            <input type="text" name="sword" value="" class="text_input" style="width:300px">
                            <button type="button" class="btn btn-sm btn-default" onclick="change()">검색</button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </form>
        <!-- 검색 폼 : 끝 ###################################################################### -->

        <form name="Frm" method="post">
            <div class="section_head">
                <h4><i class="xi-check-circle"></i> 상품 휴지통<span style="padding-left:10px">총 <strong>95</strong>개의 상품이 휴지통에 존재합니다.</span></h4>
                <div class="mgb5">
                    <select id="psize" name="psize" class="text_input" onchange="changeList();">
                        <option value="10" selected="">10줄씩보기</option>
                        <option value="20">20줄씩보기</option>
                        <option value="30">30줄씩보기</option>
                        <option value="50">50줄씩보기</option>
                        <option value="100">100줄씩보기</option>
                    </select>
                </div>
            </div>

            <table class="t_list">
                <caption>상품 휴지통 리스트</caption>
                <colgroup>
                    <col width="70">
                    <col width="150">
                    <col width="100">
                    <col width="*">
                    <col width="100">
                    <col width="300">
                    <col width="150">
                    <col width="100">
                </colgroup>
                <thead>
                    <tr>
                        <th>고유번호</th>
                        <th>업체명</th>
                        <th colspan="2">상품</th>
                        <th>재고</th>
                        <th>카테고리</th>
                        <th>관리</th>
                        <th><input type="checkbox" name="cbListAll" onclick="checkCbListAll()"></th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>181</td>
                        <td>dealers<br>(내친구몰)</td>
                        <td><img src="@/assets/img/62.jpg" width="50" height="50"></td>
                        <td class="left">
                            <div><a href="/goods/detail?gno=181" target="_blank"><strong>[NCGN] MICROFIBRE HOODED WINDBOMBER</strong></a></div>
                            <div class="blk font11 mgt5">
                                공급가 : <span class="blue">42,500</span><br> 판매가 :
                                <span class="blue">50,000</span>

                            </div>
                        </td>
                        <td>17</td>
                        <td class="left">
                            <div><a href="/goods/list?scate=24">OUTER > 가디건   >  라운드가디건</a></div>
                            <div><a href="/goods/list?scate=6">OUTER > 코트  > 트렌치코트</a></div>
                        </td>
                        <td>
                            <div>
                                <button type="button" class="btn btn-sm btn-default" onclick="openGoodsHistory('181')">이력</button>
                                <button type="button" class="btn btn-sm btn-danger" onclick="del('181')">삭제</button>
                            </div>
                            <div class="mgt3"><button type="button" class="btn btn-sm btn-info" style="width:95px" onclick="restore('181')">복원</button>
                            </div>
                        </td>
                        <td><input type="checkbox" name="cbList" value="181"></td>
                        </tr>

                </tbody>
            </table>

            <div class="paging" style="margin-top:20px">
                <span><a href=""><strong>1</strong></a></span>
            </div>

            <div class="btn_right">
                <button type="button" class="btn btn-default" onclick="checkCbListAll()">전체선택</button>
                <button type="button" class="btn btn-danger" onclick="delList()">일괄삭제</button>
                <button type="button" class="btn btn-default" onclick="downExcel()">엑셀로받기</button>
            </div>

        </form>
    </div>
</template>
<script>
export default {}
</script>
