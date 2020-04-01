<template>
  <div id="contents">
                <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
                <ul class="navi">
                    <li class="home"><a href="/" target="_top">홈</a></li>
                    <li>운영관리</li>
                    <li>상점운영관리</li>
                    <li class="on">{{ $route.name }}</li>
                </ul>
                <ul class="helpbox">
                    <li>상품쿠폰을 발행하고 쿠폰지급 내역을 확인할 수 있습니다.</li>
                    <li>회원별, 상품별로 쿠폰을 부여하여 쇼핑몰이 활성화 하는데 도움을 줍니다.</li>
                </ul>

                <form name="Frm">
                    <table class="t_form  couponStyle">
                        <caption>쿠폰 등록 폼</caption>
                        <colgroup>
                            <col width="200">
                            <col width="*">
                            <col width="200">
                            <col width="*">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th><span class="red">*</span> 쿠폰방식</th>
                                <td colspan="3">
                                    <ul class="arrange method">
                                        <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_1" value="101" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_1">상품 발급</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_2" value="102" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_2">구매보상 발급</label>
                                            </div>
                                        </li>
                                        <!-- <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_3" value="103" v-model="couponData.couponType"/>
                                              <label class="form-check-label" for="method_3">회원선택 발급</label>
                                            </div>
                                        </li> -->
                                        <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_4" value="104" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_4">회원가입 발급</label>
                                            </div>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <!-- 공통필드 -->
                            <tr>
                                <th><span class="red">*</span> 쿠폰명</th>
                                <td><input type="text" name="title" class="text_input" style="width:97%" maxlength="50"></td>
                                <th>간략 설명</th>
                                <td><input type="text" name="summary" class="text_input" style="width:97%" maxlength="100"></td>
                            </tr>

                            <!-- 쿠폰방식101 :  상품발급 -->
                        <template v-if="couponType === 101">
                            <tr class="method_goods" style="display:table-row">
                                <th><span class="red">*</span> 진행기간</th>
                                <td colspan="3">
                                    <!-- 달력 -->
                                    <sws-date :parentData="couponData"></sws-date>                            
                                    <!-- 달력 -->
                                </td>
                            </tr>

                            <tr>
                                <th><span class="red">*</span> 사용기간</th>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:130px">
                                            <label for="use_limit_day_t">
                                                <input type="radio" id="use_limit_day_t" name="isUseLimitDay" value="1" v-model.number="isUseLimitDay">사용일자 설정 :</label>
                                        </div>
                                        <div class="fl">
                                            <ul class="arrange">
                                                <li>발행 후</li>
                                                <li>
                                                    <input type="text" id="useLimitDay" name="useLimitDay" min="0" class="text_input" 
                                                      :disabled="isUseLimitDay !== 1">
                                                    <button type="button" adjust="+"><i class="xi-plus-square" style="font-size: 20px;"></i></button>
                                                    <button type="button" adjust="-"><i class="xi-minus-square" style="font-size: 20px;"></i></button>
                                                     일간 사용
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="mgt10">
                                        <div class="fl" style="width:130px">
                                            <label for="use_limit_day_f">
                                                <input type="radio" id="use_limit_day_f" name="isUseLimitDay" value="2" v-model.number="isUseLimitDay">사용기간 설정 :</label>
                                        </div>
                                        <div class="fl" style="width:100%">                                            
                                             <!-- 달력 -->
                                            <sws-date :parentData="couponData2"></sws-date>                       
                                            <!-- 달력 -->
                                            <div style="position:relative; top:-20px; left:35%">
                                                <label for="use_weekend_0" style="margin-right:5px"><input type="radio" id="use_weekend_0" name="useWeekend" value="0" v-model.number="useWeekend"
                                                :disabled="isUseLimitDay !==2">고정진행</label>
                                                <label for="use_weekend_1"><input type="radio" id="use_weekend_1" name="useWeekend" value="1" v-model.number="useWeekend"
                                                :disabled="isUseLimitDay !==2">주말만 진행</label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="red">*</span> 할인폭</th>
                                <td colspan="3">
                                    <input type="text" name="discountValue" class="text_input" style="width:80px;" maxlength="10">
                                    
                                    <label style="margin-right:20px"><input type="radio" name="discountUnit" value="100" v-model.number="discountUnit"> 원</label>
                                    <label><input type="radio" name="discountUnit" value="200" v-model.number="discountUnit"> %</label>

                                    <strong class="mgl20">최대할인금액 </strong>
                                    <input type="text" name="maxDiscountPrice" class="text_input" style="width:80px;" 
                                     :disabled="discountUnit !== 200"> 원
                                    <span class="square_blue"> "0 또는 미입력시 할인금액 제한안함."</span>
                                </td>
                            </tr>
                            <tr>
                                <th>쿠폰사용시<br>최저/최대금액</th>
                                <td colspan="3">
                                    <div>
                                        <label for="use_limit_price_f">
                                            <input type="radio" id="use_limit_price_f" name="isUseLimitPrice" value="1" v-model="isUseLimitPrice">제한없음</label>
                                    </div>
                                    <div class="mgt5">
                                        <label for="use_limit_price_t"><input type="radio" id="use_limit_price_t" name="isUseLimitPrice" value="2" v-model="isUseLimitPrice">개별 상품의 주문금액 [ (판매가＋옵션가) × 수량 ] 이
                                            <input type="text" name="useLowPrice" class="text_input" style="width:70px;"> 원 이상
                                            <input type="text" name="useHighPrice" class="text_input" style="width:70px;"> 원 이하
                                        </label>
                                    </div>
                                    <div class="square_blue">"최소, 최대금액중 하나는 0원 이상으로 반드시 입력해야 합니다."</div>
                                </td>
                            </tr>

                            <tr class="method_goods" style="display:table-row">
                                <th rowspan="2"><span class="red">*</span> 적용등급</th>
                                <td colspan="3">
                                    <ul class="arrange">
                                        <li>
                                            <label for="member_level_0">
                                                <input type="checkbox" id="member_level_0" v-model="isCheckedAllLevel"><strong>전체 등급</strong>
                                            </label>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr class="method_goods" style="display:table-row">
                                <td colspan="3">
                                    <ul class="arrange">
                                        <li>
                                            <label for="member_level_1"><input type="checkbox" id="member_level_1" name="memberLevel" 
                                              v-model="memberLevel" value="1">일반회원</label></li>
                                        <li class="mgl20">
                                            <label for="member_level_4"><input type="checkbox" id="member_level_4" name="memberLevel"
                                              v-model="memberLevel" value="4">코알라회원</label></li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <th><span style="color:red;">*</span> 쿠폰이미지</th>
                                <td colspan="3">
                                   
                                </td>
                            </tr>

                            <tr>
                                <th rowspan="3">적용상품</th>
                                <td colspan="3">
                                    <label for="apply_mode_all">
                                        <input type="radio" id="apply_mode_all" name="applyMode" value="1" v-model.number="applyMode">전체 상품</label>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:180px">
                                            <label for="apply_mode_goods">
                                                <input type="radio" id="apply_mode_goods" name="applyMode" value="2" v-model.number="applyMode">해당 상품
                                            </label>
                                        </div>
                                        <div class="fl" style="width:70%">
                                            <select id="applyGoods" name="applyGoods" class="text_input" multiple="" size="5" style="width:100%; height: auto;"></select>
                                            <div class="mgt5">
                                                <div class="btn_right">
                                                    <b-button variant="danger" style="margin-right:5px">삭제</b-button>
                                                    <b-button variant="secondary">상품선택</b-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:180px">
                                            <label for="apply_mode_cate">
                                                <input type="radio" id="apply_mode_cate" name="applyMode" value="3" v-model.number="applyMode">해당 카테고리이하 상품
                                            </label>
                                        </div>

                                        <div class="fl mgr20">
                                            <sws-category :selectedCategory="categoryList"></sws-category>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr class="method_goods">
                                <th>쿠폰갯수</th>
                                <td colspan="3">
                                    <label>
                                        <input type="text" name="issueLimit" class="text_input" style="width:70px;" maxlength="10"> 개
                                    </label>
                                    <span class="square_blue">"쿠폰 갯수를 제한하여 선착순으로 발급할 수 있습니다."</span>
                                </td>
                            </tr>
                        </template>
                        
                        <!-- 쿠폰방식102 : 구매보상발급 -->
                        <template v-if="couponType === 102">
                            <tr class="method_goods">
                                <th><span class="red">*</span> 진행기간</th>
                                <td colspan="3">
                                    <!-- 달력 -->
                                    <sws-date :parentData="couponData"></sws-date>                                
                                    <!-- 달력 -->
                                </td>
                            </tr>
                            <tr>
                                <th><span class="red">*</span> 사용기간</th>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:130px">
                                            <label for="use_limit_day_t"><input type="radio" id="use_limit_day_t" name="isUseLimitDay" value="T" onclick="checkUseLimit()" checked>
                                            사용일자 설정 :</label>
                                        </div>
                                        <div class="fl">
                                            <ul class="arrange">
                                                <li>발행 후</li>
                                                <li><input type="text" id="useLimitDay" name="useLimitDay" min="0" class="text_input" style="width:35px;" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)">
                                                    <button type="button" adjust="+" onclick="controlNum(this, 'useLimitDay');"><i class="xi-plus-square" style="font-size: 20px;"></i></button>
                                                    <button type="button" adjust="-" onclick="controlNum(this, 'useLimitDay');"><i class="xi-minus-square" style="font-size: 20px;"></i></button> 일간 사용</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="over_h mgt10">
                                        <div class="fl" style="width:130px">
                                            <label for="use_limit_day_f"><input type="radio" id="use_limit_day_f" name="isUseLimitDay" value="F" onclick="checkUseLimit()">사용기간 설정 :</label>
                                        </div>
                                        <div class="fl">                                            
                                            <!-- 달력 -->
                                            <sws-date :parentData="couponData"></sws-date>                                 
                                            <!-- 달력 -->                                    

                                            <label for="use_weekend_0"><input type="radio" id="use_weekend_0" name="useWeekend" value="0" checked disabled>고정진행</label>
                                            <label for="use_weekend_1"><input type="radio" id="use_weekend_1" name="useWeekend" value="1" disabled>주말만 진행</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="red">*</span> 할인폭</th>
                                <td colspan="3">
                                    <input type="text" name="discountValue" class="text_input" style="width:80px;" maxlength="10" onkeyup="toNumericData(this)">
                                    <label><input type="radio" name="discountUnit" value="100" checked="" onclick="checkDiscountUnit()"> 원</label>
                                    <label><input type="radio" name="discountUnit" value="200" onclick="checkDiscountUnit()"> %</label>
                                    <strong class="mgl20">최대할인금액</strong>
                                    <input type="text" name="maxDiscountPrice" class="text_input" style="width:80px;" value="" disabled="" onkeyup="toCurrency(this)"> 원
                                    <span class="square_blue">"0 또는 미입력시 할인금액 제한안함."</span>
                                </td>
                            </tr>
                            <tr>
                                <th>쿠폰사용시<br>최저/최대금액</th>
                                <td colspan="3">
                                    <div>
                                        <label for="use_limit_price_f"><input type="radio" id="use_limit_price_f" name="isUseLimitPrice" value="F" checked="">제한없음</label>
                                    </div>
                                    <div class="mgt5">
                                        <label for="use_limit_price_t"><input type="radio" id="use_limit_price_t" name="isUseLimitPrice" value="T">개별 상품의 주문금액 [ (판매가＋옵션가) × 수량 ] 이
                                            <input type="text" name="useLowPrice" class="text_input" style="width:70px;" value="" onkeyup="toCurrency(this)"> 원 이상
                                            <input type="text" name="useHighPrice" class="text_input" style="width:70px;" value="" onkeyup="toCurrency(this)"> 원 이하
                                        </label>
                                    </div>
                                    <div class="square_blue">"최소, 최대금액중 하나는 0원 이상으로 반드시 입력해야 합니다."</div>
                                </td>
                            </tr>

                            <tr class="method_goods">
                                <th rowspan="2"><span class="red">*</span> 적용등급</th>
                                <td colspan="3">
                                    <ul class="arrange">
                                        <li><label for="member_level_0"><input type="checkbox" id="member_level_0" onclick="checkCbAll(this.form.memberLevel, this.checked)"><strong>전체 등급</strong></label></li>

                                    </ul>
                                </td>
                            </tr>
                            <tr class="method_goods">
                                <td colspan="3">
                                    <ul class="arrange">
                                        <li><label for="member_level_1"><input type="checkbox" id="member_level_1" name="memberLevel">일반회원</label></li>
                                        <li class="mgl20"><label for="member_level_4"><input type="checkbox" id="member_level_4" name="memberLevel">코알라회원</label></li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <th><span style="color:red;">*</span> 쿠폰이미지</th>
                                <td colspan="3">
                                    <input type="file" name="imgCoupon" onkeydown="blockKey(event)" onkeypress="blockKey(event)">
                                </td>
                            </tr>

                            <tr class="method_reward" style="display:table-row">
                                <th>발급상품</th>
                                <td colspan="3">
                                    <select id="issueGoods" name="issueGoods" size="5" style="width:100%; height: auto;" disabled></select>
                                    <div class="over_h mgt5">
                                        <div class="fl">
                                            <b-button variant="danger"  onclick="delSelect('issueGoods');">삭제</b-button>
                                        </div>
                                        <div class="fr">
                                            <b-button variant="secondary"  onclick="openSelectGoods('issueGoods');">상품선택</b-button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th rowspan="3">적용상품</th>
                                <td colspan="3"><label for="apply_mode_all"><input type="radio" id="apply_mode_all" name="applyMode" value="100" onclick="checkApply()" checked="">전체 상품</label></td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:180px"><label for="apply_mode_goods"><input type="radio" id="apply_mode_goods" name="applyMode" value="200" onclick="checkApply()">해당 상품</label></div>
                                        <div class="fl" style="width:70%">
                                            <select id="applyGoods" name="applyGoods" class="text_input" multiple="" size="5" style="width:100%; height: auto;" disabled></select>

                                            <div class="over_h mgt5">
                                                <div class="btn_right">
                                                    <b-button variant="danger" onclick="delSelect('applyGoods');" style="margin-right:5px">삭제</b-button>
                                                    <b-button variant="secondary"  onclick="openSelectGoods('applyGoods');">상품선택</b-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:180px"><label for="apply_mode_cate"><input type="radio" id="apply_mode_cate" name="applyMode" value="300" onclick="checkApply()">해당 카테고리이하 상품</label></div>

                                        <div class="fl mgr20">
                                            <select id="applyCate_1" name="applyCate_1" class="text_input" style="width: 150px;" onchange="sc.get(this)" disabled>
                                            <option value="">선택</option>
                                            </select>
                                        </div>
                                        <div class="fl mgr20">
                                            <select id="applyCate_2" class="text_input" style="width: 150px;" name="applyCate_2" onchange="sc.get(this)" disabled>
                                            <option value="">선택</option>
                                        </select>
                                        </div>
                                        <div class="fl mgr20">
                                            <select id="applyCate_3" class="text_input" style="width: 150px;" name="applyCate_3" onchange="sc.get(this)" disabled>
                                                <option value="">선택</option>
                                            </select>
                                        </div>

                                    </div>
                                </td>
                            </tr>

                            <tr class="method_goods">
                                <th>쿠폰갯수</th>
                                <td colspan="3">
                                    <label><input type="text" name="issueLimit" class="text_input" style="width:70px;" maxlength="10" onkeypress="blockNotNumber(event)" onkeyup="onlyInt(this)"> 개</label>

                                    <span class="square_blue">"쿠폰 갯수를 제한하여 선착순으로 발급할 수 있습니다."</span>
                                </td>
                            </tr>                           
                            </template>

                        <!-- 쿠폰방식104 : 회원가입발급 -->
                        <template v-if="couponType === 104">                          
                            <tr>
                                <th><span class="red">*</span> 사용기간</th>
                                <td colspan="3">
                                    <div class="over_h">
                                        <div class="fl" style="width:130px">
                                            <input type="radio" id="use_limit_day_t" name="isUseLimitDay" value="T" onClick="checkUseLimit()"  checked /><label for="use_limit_day_t">사용일자 설정</label>
                                        </div>
                                        <div class="fl">
                                            <ul class="arrange">
                                                <li style="padding-top:3px">발행 후</li>
                                                <li><input type="text" id="useLimitDay" name="useLimitDay" value="" min="0" class="text_input" style="width:35px;" onKeyPress="blockNotNumber(event)" onKeyUp="onlyInt(this)" /></li>
                                                <li>
                                                    <button type="button" adjust="+" onClick="controlNum(this, 'useLimitDay');" class="block"></button>
                                                    <button type="button" adjust="-" onClick="controlNum(this, 'useLimitDay');" class="block"></button>
                                                </li>
                                                <li style="padding-top:3px">일간 사용</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="over_h mgt5">
                                        <div class="fl" style="width:130px">
                                            <input type="radio" id="use_limit_day_f" name="isUseLimitDay" value="F" onClick="checkUseLimit()"  /><label for="use_limit_day_f">사용기간 설정</label>
                                        </div>
                                        <div class="fl">
                                            <!-- 달력 -->
                                            <sws-date :parentData="couponData"></sws-date>                           
                                            <!-- 달력 -->
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><span class="red">*</span> 할인폭</th>
                                <td colspan="3">
                                    <input type="text" name="discountValue" class="text_input" style="width:80px;" maxlength="10" value="" onKeyUp="toNumericData(this)" />
                                    <input type="radio" name="discountUnit" value="100"  checked onClick="checkDiscountUnit()" /> 원
                                    <input type="radio" name="discountUnit" value="200"  onClick="checkDiscountUnit()" /> %
                                    <span style="padding-left:20px">최대할인금액 : </span>
                                    <input type="text" name="maxDiscountPrice" class="text_input" style="width:80px;" value=""  disabled onKeyUp="toCurrency(this)" /> 원
                                    <span class="square_blue">0 또는 미입력시 할인금액 제한안함.</span>
                                </td>
                            </tr>
                            <tr>
                                <th>쿠폰사용시<br />최저/최대금액</th>
                                <td colspan="3">
                                    <div>
                                        <input type="radio" id="use_limit_price_f" name="isUseLimitPrice" value="F"  checked /><label for="use_limit_price_f">제한없음</label>
                                    </div>
                                    <div class="mgt5">
                                        <input type="radio" id="use_limit_price_t" name="isUseLimitPrice" value="T"  /><label for="use_limit_price_t">개별 상품의 주문금액<span class="font11">[(판매가＋옵션가) × 수량]</span>이
                                        <input type="text" name="useLowPrice" class="text_input" style="width:70px;" value="" onKeyUp="toCurrency(this)" /> 원 이상
                                        <input type="text" name="useHighPrice" class="text_input" style="width:70px;" value="" onKeyUp="toCurrency(this)" /> 원 이하
                                        </label>
                                    </div>
                                    <div class="square_blue" style="margin:3px 0 0 17px">최소, 최대금액중 하나는 0원 이상으로 반드시 입력해야 합니다.</div>
                                </td>
                            </tr>                         
                        <tr>
                            <th><span style="color:red;">*</span> 쿠폰이미지</th>
                            <td colspan="3">

                                <input type="file" name="imgCoupon" onKeyDown="blockKey(event)" onKeyPress="blockKey(event)" />
                            </td>
                        </tr>               

                        <tr>
                            <th rowspan="3">적용상품</th>
                            <td colspan="3">
                                <input type="radio" id="apply_mode_all" name="applyMode" value="100" onClick="checkApply()" checked />
                                <label for="apply_mode_all">전체 상품</label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="over_h">
                                    <div class="fl" style="width:180px">
                                        <input type="radio" id="apply_mode_goods" name="applyMode" value="200" onClick="checkApply()"  />
                                        <label for="apply_mode_goods">해당 상품</label>
                                    </div>
                                    <div class="fl" style="width:70%">
                                        <select id='applyGoods' name='applyGoods'   multiple size='5' style='width:100%' disabled></select>
                                        <div class="over_h mgt5">
                                            <div class="fl">
                                                <span class="button small">
                                                    <b-button variant="danger" onClick="delSelect('applyGoods');">삭제</b-button>
                                                </span>
                                            </div>
                                            <div class="fr">
                                                <span class="button small">
                                                    <b-button variant="secondary" onClick="openSelectGoods('applyGoods');">상품선택</b-button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="over_h">
                                    <div class="fl" style="width:180px">
                                        <input type="radio" id="apply_mode_cate" name="applyMode" value="300" onClick="checkApply()"  />
                                        <label for="apply_mode_cate">해당 카테고리이하 상품</label>
                                    </div>
                                    <div class='fl' style='margin-right:5px;'>
                                        <select id='applyCate_1' name='applyCate_1' head='선택' depth='1' onChange='sc.get(this)' disabled ></select>
                                    </div>
                                    <div class='fl' style='margin-right:5px;'>
                                        <select id='applyCate_2' name='applyCate_2' head='선택' depth='2' onChange='sc.get(this)' disabled ></select>
                                    </div>
                                    <div class='fl' style='margin-right:5px;'>
                                        <select id='applyCate_3' name='applyCate_3' head='선택' depth='3' onChange='sc.get(this)' disabled ></select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>

                    <!-- 공통 필드-->
                     <tr>
                        <th>재발급여부</th>
                        <td colspan="3">
                            <ul class="arrange">
                                <li>
                                    <input type="radio" id="reissue_none" name="reissue" value="0" />
                                    <label for="reissue_none">재발급 안함</label>
                                </li>
                                <li class="mgl10">
                                    <input type="radio" id="reissue_cancel" name="reissue" value="1" />
                                    <label for="reissue_cancel">취소시 재발급</label>
                                </li>
                                <li class="mgl10">
                                    <input type="radio" id="reissue_return" name="reissue" value="2" />
                                    <label for="reissue_return">반품시 재발급</label>
                                </li>
                            </ul>
                            <ul class="mgt5">
                                <li class="square_blue">주문시 사용된 쿠폰에 대해서 취소/반품시 재발급 여부를 설정합니다.</li>
                                <li class="square_blue">사용기간이 만료된 쿠폰은 위 설정과 관계없이 재발급되지 않습니다.</li>
                            </ul>
                        </td>
                     </tr>
                     <tr>
                        <th>사용여부</th>
                        <td colspan="3">
                            <ul class="arrange">
                                <li>
                                    <input type="radio" id="use_t" name="isUse" value="T"  checked />
                                    <label for="use_t">사용함</label>
                                </li>
                                <li class="mgl10">
                                    <input type="radio" id="use_f" name="isUse" value="F"  />
                                    <label for="use_f">사용하지 않음</label>
                                </li>
                            </ul>
                        </td>
                     </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button variant="secondary" onclick="validSubmit()" style="margin-right:5px">확인</b-button>
                        <b-button variant="danger"  onclick="cancel()">취소</b-button>
                    </div>

                </form>
  </div>
</template>

<script>
import commonJs from "@/assets/js/common.js"
import SwsDate from '@/components/common/SwsDate'
import SwsCategory from '@/components/common/SwsCategory.vue'

export default {
    name: "CouponReg",
    mixins: [commonJs],
    components: {
        SwsDate,
        SwsCategory
    },
    data() {
        return {
            couponType:101,
            couponData: {
                startDate: '',
                endDate: '',
            },
            couponData2: {
                startDate: '',
                endDate: '',
            },
            isUseLimitDay: 1,
            discountUnit: 100,
            useWeekend:0,
            isUseLimitPrice:1,
            memberLevel: [],
            memberLevelList:['1', '4'],
            applyMode:1,
            categoryList: []     
        }
    },
    computed: {
        isCheckedAllLevel: {           
            get: function () {
                if((this.memberLevel.length !== this.memberLevelList.length) || this.memberLevelList.length === 0) return false
                else return true
            },
            set: function (e) {
                if(e){
					for(var i=0; i<this.memberLevelList.length; i++){                                               
                        this.memberLevel.push(this.memberLevelList[i]);
					}	
				} else {
					this.memberLevel = [];
				}
            }
        },
        isCheckedAllPrd: {
            get: function () {
                if((this.memberLevel.length !== this.memberLevelList.length) || this.memberLevelList.length === 0) return false
                else return true
            },
            set: function (e) {
                if(e){
					for(var i=0; i<this.memberLevelList.length; i++){                                               
                        this.memberLevel.push(this.memberLevelList[i]);
					}	
				} else {
					this.memberLevel = [];
				}
            }
        }
    }
}
</script>

<style>
.couponStyle .dateLimitDisplay {
    display: none;
}
</style>