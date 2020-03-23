<template>
  <div id="contents">
                <h3>회원목록</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>회원관리</li>
                    <li>회원관리</li>
                    <li class="on">회원목록</li>
                </ul>
                <ul class="helpbox">
                    <li>다음은 사이트에 가입한 회원목록 입니다.</li>
                    <li><strong>총구매금액</strong> 산출 = (판매가 + 옵션가) × 수량</li>
                    <li>배송비 및 적립금, 쿠폰 등의 할인내역은 금액에 포함되지 않습니다.</li>
                </ul>


                <form name="sFrm">

                    <table class="t_form">
                        <caption>회원 검색 폼</caption>
                        <tbody>
                            <tr>
                                <th>가입일</th>
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
                                <th>최근접속일</th>
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
                                <th>그룹별</th>
                                <td>
                                    <select id="slevel" name="slevel" class="text_input" onchange="change();">
                                        <option value="">회원등급</option>
                                        <option value="1">일반회원</option>
                                        <option value="4">코알라회원</option>
                                    </select>
                                    <select id="sgender" name="sgender" class="text_input" onchange="change();">
                                        <option value="">성별</option>
                                        <option value="100">남자</option>
                                        <option value="200">여자</option>
                                    </select>

                                </td>
                            </tr>
                            <tr>
                                <th>회원상태</th>
                                <td>
                                    <label><input type="radio" name="ssleep" value="0" checked>전체</label>
                                    <label><input type="radio" name="ssleep" value="1">일반</label>
                                    <label><input type="radio" name="ssleep" value="2">휴면</label>
                                </td>
                            </tr>
                            <tr>
                                <th>총구매금액</th>
                                <td>
                                    <input type="text" name="sbuyprice" value="" class="text_input" style="width:100px" onkeyup="toCurrency(this)"> 원 ~
                                    <input type="text" name="ebuyprice" value="" class="text_input" style="width:100px" onkeyup="toCurrency(this)"> 원
                                </td>
                            </tr>
                            <tr>
                                <th>보유적립금</th>
                                <td>
                                    <input type="text" name="scmoney" value="" class="text_input" style="width:100px" onkeyup="toCurrency(this)"> 원 ~
                                    <input type="text" name="ecmoney" value="" class="text_input" style="width:100px" onkeyup="toCurrency(this)"> 원
                                </td>
                            </tr>
                            <tr>
                                <th>직접검색</th>
                                <td>
                                    <select id="skey" name="skey" class="text_input">
                                        <option value="">전체</option>
                                        <option value="id">회원아이디</option>
                                        <option value="name">회원명</option>
                                        <option value="tel">전화번호</option>
                                        <option value="mobile">휴대폰번호</option>
                                        <option value="email">이메일</option>
                                    </select>

                                    <input type="text" name="sword" class="text_input" style="width:300px">
                                    <button type="submit" class="btn btn-sm btn-default">검색</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="section_head">
                        <h4>총 <strong class="red">16</strong> 명의 회원이 조회 되었으며, 오늘 가입한 회원은 <strong class="red">0</strong> 명입니다.</h4>
                        <div class="mgb5">
                            <select id="psize" name="psize" class="text_input" onchange="change()">
                                <option value="10" selected>10줄씩보기</option>
                                <option value="20">20줄씩보기</option>
                                <option value="30">30줄씩보기</option>
                                <option value="50">50줄씩보기</option>
                                <option value="100">100줄씩보기</option>
                            </select>
                            <select id="psort" name="psort" class="text_input" onchange="change()">
                                <option value="regdt" selected>회원가입일</option>
                                <option value="visitdt">최근접속일</option>
                                <option value="buyprice">총구매금액</option>
                                <option value="visitcnt">접속수</option>
                                <option value="age">나이순</option>
                                <option value="name">이름순</option>
                                <option value="cmoney">적립금순</option>
                            </select>

                        </div>
                    </div>
                </form>


                <form name="Frm">

                    <table class="t_list">
                        <caption>가입한 회원 목록</caption>
                        <colgroup>
                            <col width="30">
                            <col width="7%">
                            <col width="*">
                            <col width="10%">
                            <col width="12%">
                            <col width="35">
                            <col width="35">
                            <col width="12%">
                            <col width="7%">
                            <col width="9%">
                            <col width="12%">
                            <col width="9%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="cbListAll" onclick="checkCbAll(this.form.cbList, this.checked)"></th>
                                <th>상태</th>
                                <th>아이디</th>
                                <th>회원등급</th>
                                <th>성명</th>
                                <th>성별</th>
                                <th>나이</th>
                                <th>적립금</th>
                                <th>접속수</th>
                                <th>최근<br>접속일</th>
                                <th>총구매금액</th>
                                <th>가입일</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td><input type="checkbox" name="cbList" value="75"></td>
                                <td>일반</td>
                                <td><a href="javascript:;" ezi="75" onclick="ezpop.member.open(event)">whtjsgks</a></td>
                                <td>일반회원</td>
                                <td>조선한</td>
                                <td><img src=" /img/icon_man.gif" alt=""></td>
                                <td>29</td>
                                <td>3,000</td>
                                <td>2</td>
                                <td>2019-12-23<br>16:41:54</td>
                                <td>0</td>
                                <td>2019-12-23</td>
                            </tr>

                            <tr style="background-color:#f2efe6">
                                <td><input type="checkbox" name="cbList" value="68"></td>
                                <td>휴면</td>
                                <td><a href="javascript:;" ezi="68" onclick="ezpop.member.open(event)">mallmaster</a></td>
                                <td>일반회원</td>
                                <td>alf</td>
                                <td>-</td>
                                <td>48</td>
                                <td>3,000</td>
                                <td>1</td>
                                <td>2018-12-03<br>19:46:43</td>
                                <td>0</td>
                                <td>2018-12-03</td>
                            </tr>



                        </tbody>
                    </table>

                    <div class="paging">
                        <span><a href="">1</a></span>
                    </div>

                    <div class="section_head">
                        <h4><i class="xi-check-circle"></i> 회원상태변경</h4>
                    </div>
                    <table class="t_form">
                        <caption>회원상태변경 폼</caption>
                        <tbody>
                            <tr>
                                <th>일괄변경</th>
                                <td>
                                    선택한 회원을 일반회원으로 <button type="button" class="btn btn-sm btn-default" onclick="setBatchMember()">전환하기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="btn_right">
                        <button type="button" class="btn btn-default" onclick="delList()">선택삭제</button>
                        <a href="" class="btn btn-default">엑셀로 받기</a>
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