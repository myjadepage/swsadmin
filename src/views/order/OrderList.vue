<template>
    <div id="contents">
        <h3>{{$route.name}}</h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>주문/매출관리</li>
            <li>전체주문</li>
            <li class="on">{{$route.name}}</li>
        </ul>
        <ul class="helpbox">
            <li>전체 주문목록을 보실 수 있습니다.</li>
        </ul>
        <table class="t_form">
            <tbody>
                <tr>
                    <th>진행상태</th>
                    <td>
                        <div>
                            <input type="checkbox" id="cb_101" v-model.number="orderFilter.payStep" value="101"><label class="mr-3" for="cb_101">입금확인중</label>
                            <input type="checkbox" id="cb_102" v-model.number="orderFilter.payStep" value="102"><label class="mr-3" for="cb_102">결제완료</label>
                            <input type="checkbox" id="cb_103" v-model.number="orderFilter.payStep" value="103"><label class="mr-3" for="cb_103">상품준비중</label>
                            <input type="checkbox" id="cb_104" v-model.number="orderFilter.payStep" value="104"><label class="mr-3" for="cb_104">발송완료</label>
                            <input type="checkbox" id="cb_105" v-model.number="orderFilter.payStep" value="105"><label class="mr-3" for="cb_105">구매확정</label>
                            <input type="checkbox" id="cb_106" v-model.number="orderFilter.payStep" value="106"><label class="mr-3" for="cb_106">주문취소</label>
                        </div>
                        <div>
                            <input type="checkbox" id="cb_210" v-model.number="orderFilter.payStep" value="210"><label class="mr-3" for="cb_210">주문취소신청</label>
                            <input type="checkbox" id="cb_220" v-model.number="orderFilter.payStep" value="220"><label class="mr-3" for="cb_220">주문교환신청</label>
                            <input type="checkbox" id="cb_221" v-model.number="orderFilter.payStep" value="221"><label class="mr-3" for="cb_221">주문교환완료</label>
                            <input type="checkbox" id="cb_230" v-model.number="orderFilter.payStep" value="230"><label class="mr-3" for="cb_230">주문반품신청</label>
                            <input type="checkbox" id="cb_231" v-model.number="orderFilter.payStep" value="231"><label class="mr-3" for="cb_231">주문반품완료</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>결제수단</th>
                    <td>
                        <input type="radio" id="pay_1" v-model.number="orderFilter.payMethod" value="all"><label class="mr-3" for="pay_1">전체</label>
                        <input type="radio" id="pay_2" v-model.number="orderFilter.payMethod" value="online"><label class="mr-3" for="pay_2">온라인입금</label>
                        <input type="radio" id="pay_3" v-model.number="orderFilter.payMethod" value="card"><label class="mr-3" for="pay_3">신용카드</label>
                        <input type="radio" id="pay_4" v-model.number="orderFilter.payMethod" value="bank"><label class="mr-3" for="pay_4">계좌이체</label>
                        <input type="radio" id="pay_5" v-model.number="orderFilter.payMethod" value="virtual"><label class="mr-3" for="pay_5">가상계좌</label>
                        <input type="radio" id="pay_6" v-model.number="orderFilter.payMethod" value="escrow"><label class="mr-3" for="pay_6">에스크로</label>
                    </td>
                </tr>
                <tr>
                    <th>기간</th>
                    <td>
                        <b-row>
                            <b-col cols="2">
                                <b-form-datepicker id="startDate" placeholder="시작일자 선택" v-model="orderFilter.startDate"></b-form-datepicker>
                            </b-col>
                            <b-col cols="2">
                                <b-form-datepicker id="endDate" placeholder="종료일자 선택" v-model="orderFilter.endDate"></b-form-datepicker>
                            </b-col>
                        </b-row>
                    </td>
                </tr>
                <tr>
                    <th>주문금액</th>
                    <td>
                        <input type="text" class="text_input" v-model="orderFilter.minPrice" style="width:100px"> 원 ~
                        <input type="text" class="text_input" v-model="orderFilter.maxPrice" style="width:100px"> 원
                    </td>
                </tr>
                <tr>
                    <th>상품분류</th>
                    <td>
                        <sws-category></sws-category>
                    </td>
                </tr>
                <tr>
                    <th>그룹별</th>
                    <td>
                        <select id="sdealer" name="sdealer" class="text_input" onchange=" change(); ">
                            <option value=" ">상품입점업체</option>                                     
                        </select>

                    </td>
                </tr>
                <tr>
                    <th>직접검색</th>
                    <td>
                        <select id="skey " name="skey " class="text_input">
                        <option value=" ">전체</option>
                        <option value="ordno ">주문번호</option>
                        <option value="id ">주문자ID</option>
                        <option value="ordname ">주문자명</option>
                        <option value="ordemail ">주문자이메일</option>
                        <option value="ordtel ">주문자연락처</option>
                        <option value="rcvname ">수령인명</option>
                        <option value="rcvtel ">수령인전화번호</option>
                        <option value="remittor ">입금자명</option>
                        <option value="gcode ">상품코드</option>
                        <option value="gname ">상품명</option>
                        </select>

                        <input type="text " name="sword " class="text_input " style="width:300px ">
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="btn_center ">
            <button type="submit" class="btn btn-lg btn-info">검색</button>
        </div>
        <!-- 검색 폼 : 끝 ###################################################################### -->

        <form name="Frm ">
            <div class="section_head ">
                <h4><i class="xi-check-circle"></i> 총 <strong>23</strong>건의 주문이 조회되었습니다.</h4>
                <div class="mgb5 ">
                    <select id="psize" name="psize " class="text_input" onchange="changeList() ">
                        <option value="10" selected>10줄씩보기</option>
                        <option value="20">20줄씩보기</option>
                        <option value="30">30줄씩보기</option><option value="50 ">50줄씩보기</option>
                        <option value="100">100줄씩보기</option>
                    </select>
                    <select id="psort" name="psort" class="text_input" onchange="changeList() ">
                        <option value="orddt " selected>주문일</option>
                        <option value="ordno ">주문번호</option>
                        <option value="ordprice ">주문금액순</option>
                        <option value="id ">주문자아이디순</option>
                        <option value="ordname ">주문자명순</option>
                        <option value="rcvname ">수령인순</option>
                        <option value="claimdt ">취소/반품/교환접수일</option>
                    </select>
                </div>
            </div>

            <table class="t_list">
                <caption>주문 리스트</caption>
                <colgroup>
                    <col width="30">
                    <col width="50">
                    <col width="110">
                    <col width="85">
                    <col width="13%">
                    <col width="10%">
                    <col width="14%">
                    <col width="9%">
                    <col width="*">
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="cbListAll" onclick="checkCbListAll()"></th>
                        <th>NO</th>
                        <th>주문번호</th>
                        <th>주문일시</th>
                        <th>총주문금액</th>
                        <th>배송비</th>
                        <th>주문자</th>
                        <th>결제상태</th>
                        <th>진행상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="background-color:#f9f9f9 ">
                        <td><input type="checkbox" name="cbList" onclick="checkCbList(this) "></td>
                        <td>23</td>
                        <td>
                            <div><u>A1929039662520</u></div>
                            <div class="mgt5"><button type="button" class="btn btn-sm btn-default" onclick="openDetail(284) ">상세정보</button></div>
                        </td>
                        <td>2019-10-17<br>11:01:03</td>
                        <td>50,000원</td>
                        <td>0원</td>
                        <td>
                            <div>김기동</div>
                            <div>(비회원)</div>
                        </td>
                        <td>[입금확인전]<br>처리 전</td>
                        <td>
                            <div>
                                <u>입금확인중</u>
                            </div>
                            <div class="order_step">
                                <a href="javascript:;" onclick="setConfirm(284);return false; ">결제완료로 이동</a>
                            </div>
                            <div class="order_remove"><a href="javascript:;" onclick="openRequestClaim( '100', 284);return false;">주문취소신청</a>
                            </div>
                        </td>
                    </tr>

                    <tr style="background-color:#fffbec">
                        <td colspan="2"><strong>결제</strong></td>
                        <td colspan="7" class="left ">
                            <div>
                                <strong class="blue">온라인입금</strong>
                                <span class="red"><strong>50,000원</strong></span>
                            </div>
                            <div class="mgt5">입금계좌 : 국민은행&nbsp;00000000000000, 입금자명 : 김기동</div>
                        </td>
                    </tr>
                    <tr style="background-color:#fffbec">
                        <td colspan="2 "><strong>수령인</strong></td>
                        <td colspan="7 " class="left">
                            <div>김기동, 서울 서초구 서초동 1376-8 124-1 [010-4200-5322]</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9 " style="padding:0">
                            <table class="t_order_pro">
                                <colgroup>
                                    <col width="*">
                                    <col width="100">
                                    <col width="120">
                                    <col width="120">
                                    <col width="120">
                                    <col width="200">
                                    <col width="150">
                                    <col width="25">
                                    <col width="60">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>주문상품</th>
                                        <th>수량</th>
                                        <th>공급가</th>
                                        <th>판매가</th>
                                        <th>배송비</th>
                                        <th>배송정보</th>
                                        <th>진행상태</th>
                                        <td><input type="checkbox" name="cbGoodsAll"></td>
                                        <th>수량변경<br>변경이력</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="goods tc">
                                            <img src="/img/43.jpg " class="photo">
                                            <div class="info ">
                                                <div><a href="" target="_blank ">[NCGN] Sports Goggle</a></div>
                                                <div class="mgt3 ">
                                                    <span style="color:gray; margin-right:3px; ">판매자:</span>
                                                    <a href="javascript:; " onclick="loginDealer(8) "><strong class="orange ">dealers(내친구몰)</strong></a>
                                                </div>
                                            </div>
                                        </td>
                                        <td>1</td>
                                        <td>42,500</td>
                                        <td>50,000</td>
                                        <td>0</td>
                                        <td class="delivery ">
                                            <div class="mgt5">
                                                <select id="delivery_284_409 " name="delivery_284_409" class="text_input" style="width:105px;background:#f0f0f0;" disabled>
                                                    <option value=" ">배송업체선택</option>
                                                    <optgroup label="----------------"></optgroup>
                                                    <option value="7 ">대한통운</option>
                                <option value="8 ">로젠택배</option></select>
                                                <button type="button" class="btn btn-sm btn-default" disabled="disabled ">확인</button>
                                            </div>
                                            <div class="mgt5 ">
                                                <input name="deliveryNo_284_409" type="text " class="text_input" style="width:155px;background:#f0f0f0;" maxlength="50 " disabled>
                                            </div>

                                        </td>
                                        <td>
                                            <div><span style="text-decoration:underline ">입금확인중</span></div>
                                            <div class="order_step "></div>
                                            <div class="order_remove "></div>
                                        </td>
                                        <td rowspan="2"><input type="checkbox" name="cbGoods" value="409 " onclick="checkCbGoods(this)" disabled></td>
                                    </tr>


                                    <!-- 취소/반품/교환 내역 : 시작 -->
                                    <tr class="mod_history " style="display:none ">
                                        <td colspan="9 "></td>
                                    </tr>
                                    <!-- 취소/반품/교환 내역 : 끝 //-->

                                </tbody>
                            </table>
                        </td>
                    </tr>


                </tbody>
            </table>

            <div class="paging " style="margin-top:10px ">
                <span><a href=""><strong>1</strong></a></span>
            </div>

            <div class="btn_right ">
                <button type="button" class="btn btn-default">전체선택</button>
            </div>

            <ul class="order_list_btn ">
                <li>
                    <strong class="title"><i class="xi-check-circle"></i> 일괄수정 : </strong> 선택한 주문건을
                    <select id="batchOrdStep" name="batchOrdStep" class="text_input">
                        <option value=" ">선택</option>
                        <option value="100">입금확인중</option>
                        <option value="200">결제완료</option>
                    </select> 로(으로)
                    <button type="button" class="btn btn-sm btn-default">수정하기</button>
                </li>

                <li class="title">
                    <strong class="title"><i class="xi-check-circle"></i> 일괄상품수정 :</strong> 선택한 주문 상품을
                    <button type="button" class="btn btn-sm btn-default">상품준비중으로 이동</button>
                </li>

                <li>
                    <strong class="title"><i class="xi-check-circle"></i> 엑셀다운 :</strong> 선택한 주문건을
                    <button type="button" class="btn btn-sm btn-default">엑셀로받기</button> 현재 페이지의 모든 주문건을
                    <button type="button" class="btn btn-sm btn-default">엑셀로받기</button>
                </li>
            </ul>

        </form>
    </div>
</template>

<script>
import SwsCategory from '@/components/order/SwsCategory'
import OrderListAll from "@/components/order/OrderListAll.js";
export default {
    mixins: [OrderListAll],
    components: {
        SwsCategory
    }
}
</script>

<style>

</style>