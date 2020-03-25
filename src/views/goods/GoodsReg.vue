<template>
  <div id="contents">
    <h3>{{$route.name}}</h3>
    <ul class="navi">
      <li class="home">
        <a href="/" target="_top">홈</a>
      </li>
      <li>상품관리</li>
      <li class="on">{{$route.name}}</li>
    </ul>
    <ul class="helpbox">
      <li>가격과 상품이미지 설정하여 상품등록합니다.</li>
      <li>
        <strong class="red">*</strong>로 설정된 부분은 필수 입력하셔야 합니다.
      </li>
      <li>시중가를 적으면 세일이 적용됩니다. (필요할 경우에만 입력하세요.)</li>
    </ul>
    <form name="Frm" enctype="multipart/form-data" onsubmit="return false">
      <div class="box">
        <table name="categories" class="t_form">
          <!-- <caption>상품기본정보 등록 폼</caption> -->
          <colgroup>
            <col width="170" />
            <col width="*" />
            <col width="140" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                상품판매 분류
                <strong class="red">*</strong>
              </th>
              <td colspan="3">
                <b-row cols="14">
                  <b-col cols="2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="prdtTypeCode"
                        id="productSellingType1"
                        value="1"
                        v-model.number="productData.prdtTypeCode"
                      />
                      <label class="form-check-label" for="productSellingType1">일반</label>
                    </div>
                  </b-col>
                  <b-col cols="2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="prdtTypeCode"
                        id="productSellingType2"
                        value="2"
                        v-model.number="productData.prdtTypeCode"
                      />
                      <label class="form-check-label" for="productSellingType2">공동구매</label>
                    </div>
                  </b-col>
                  <b-col cols="2">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="prdtTypeCode"
                        id="productSellingType3"
                        value="3"
                        v-model.number="productData.prdtTypeCode"
                      />
                      <label class="form-check-label" for="productSellingType3">라이브</label>
                    </div>
                  </b-col>
                </b-row>
              </td>
            </tr>
            <!-- 상품분류(카테고리) -->
            <tr>
              <th rowspan="2">
                상품분류(카테고리)
                <strong class="red">*</strong>
              </th>
              <td colspan="3">
                <select
                  id="category1"
                  name="category1"
                  @change="onCategorySelector($event, 1)"
                  v-model="selectedCategoryRow[0]"
                  class="text-danger"
                >
                  <option
                    v-for="(option, inx) in category1"
                    :key="inx"
                    :value="option"
                  >{{ option.text }}</option>
                </select>
                <select
                  id="category2"
                  name="category2"
                  @change="onCategorySelector($event, 2)"
                  v-model="selectedCategoryRow[1]"
                  class="text-danger"
                >
                  <option
                    v-for="(option, inx) in category2"
                    :key="inx"
                    :value="option"
                  >{{ option.text }}</option>
                </select>
                <select
                  id="category3"
                  name="category3"
                  @change="onCategorySelector($event, 3)"
                  v-model="selectedCategoryRow[2]"
                >
                  <option
                    v-for="(option, inx) in category3"
                    :key="inx"
                    :value="option"
                  >{{ option.text }}</option>
                </select>
                <select
                  id="category4"
                  name="category4"
                  @change="onCategorySelector($event, 4)"
                  v-model="selectedCategoryRow[3]"
                >
                  <option
                    v-for="(option, inx) in category4"
                    :key="inx"
                    :value="option"
                  >{{ option.text }}</option>
                </select>
                <select
                  id="category5"
                  name="category5"
                  data-required="false"
                  v-model="selectedCategoryRow[4]"
                >
                  <option
                    v-for="(option, inx) in category5"
                    :key="inx"
                    :value="option"
                  >{{ option.text }}</option>
                </select>
                <button type="button" class="btn btn-sm btn-secondary" v-on:click="addCate">추가</button>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="category">
                <category-component
                  :productData="productData"
                  :selectedCategoryTable="selectedCategoryTable"
                  :categoryTable="categoryTable"
                  @addSelect="onSelectCate"
                ></category-component>
                <dl class="explain blue">
                  <dt>
                    <strong>※ 다중 분류로 선택할 경우</strong>
                  </dt>
                  <dd>기본으로 선택된 분류가 해당 상품의 대표 분류입니다. 검색 결과에서는 기본 분류를 기준으로 출력됩니다.</dd>
                  <dd>각각 다른상품으로 인식되기 때문에 상품 목록에 해당 상품이 중복 노출될 수 있습니다.</dd>
                  <dd class="red">다중 카테고리 선택 후 수수료율을 다르게 추가 할 경우 기본 카테고리 수수료율로 설정됩니다.</dd>
                </dl>
              </td>
            </tr>
            <tr>
              <th>
                간략한 설명
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3">
                <input
                  type="text"
                  name="briefComment"
                  class="text_input"
                  style="width:100%"
                  value
                  maxlength="20"
                  v-model="productData.briefComment"
                />
              </td>
            </tr>
            <tr>
              <th>
                상세 설명
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3">
                <input
                  type="text"
                  name="briefDescription"
                  class="text_input"
                  style="width:100%"
                  value
                  maxlength="50"
                  v-model="productData.briefDescription"
                />
              </td>
            </tr>
            <!-- 상품명 -->
            <tr>
              <th>
                상품명
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3">
                <input type="text" name="name" class="text_input" style="width:99%" maxlength="100" v-model="productData.name" />
              </td>
            </tr>
            <tr>
              <th>
                판매자
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3">
                <select id="sellers" class="text_input" name="sellers" @change="changeSellerFn" v-model="productData.sellerSysId">
                  <option
                    v-for="(item, index) in sellers"
                    :key="index"
                    :value="item.value"
                  >{{ item.text }}</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>
                브랜드
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3">
                <select class="text_input" id="brandSysId" name="brandSysId" v-model="productData.brandSysId">
                  <option v-for="(item, index) in brands" :key="index" :value="item.value">{{ item.text }}</option>
                </select>
              </td>
            </tr>

            <!-- 상품아이콘 -->
            <tr>
              <th>
                상품 아이콘
                <strong class="red">&nbsp;*</strong>
                <br />
                <b-button variant="outline-danger" size="sm" style="height: 20px;">아이콘관리</b-button>
              </th>
              <td colspan="3" class="icons">
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      id="cb_icon_1"
                      name="iconList"
                      value="1"
                      v-model.number="productData.iconList"
                    />
                    <div>
                      <label for="cb_icon_1">
                        <img src="@/assets/img/ico_pro_sale.gif" />
                      </label>
                    </div>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="cb_icon_2"
                      name="iconList"
                      value="2"
                      v-model.number="productData.iconList"
                    />
                    <div>
                      <label for="cb_icon_2">
                        <img src="@/assets/img/ico_pro_sale.gif" />
                      </label>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>

            <!-- 상품 이미지 : 시작 -->
            <tr>
              <th>
                큰이미지
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3">
                <input
                  type="file"
                  name="bigImageUrl"
                  id="bigImageUrl"
                  @change.prevent="validateImageRatioFn($event, {width: 1080, height: 1080})"
                  data-valid="false"
                  accept="image/*"
                  :data-imageurl="productData.bigImageUrl"
                />
                <template v-if="productData.bigImageUrl !== ''">
                  <p>
                    <b>이미지 존재함 :</b>
                    {{productData.bigImageUrl}}
                  </p>
                </template>
                <br />
                <span class="light_gray">(1080px * 1080px)</span>
                <label for="img_auto">
                  <input type="checkbox" id="img_auto" name="isImgAuto" checked disabled />
                  자동등록
                </label>
                <dl class="explain blue mgt5">
                  <dt>
                    <strong>※ 자동등록이란?</strong>
                  </dt>
                  <dd>큰이미지만 올리시면 사이트 정보에서 지정해 놓은 사이즈로 중간이미지, 작은이미지가 자동 생성되어 저장됩니다.</dd>
                  <dd>각각 올리기를 원하실 경우 자동등록의 체크를 해제하시면 됩니다.</dd>
                </dl>
              </td>
            </tr>
            <template v-if="!productData.isAutoImageUpload">
              <tr class="imgManuals">
                <th>
                  중간이미지
                  <strong class="red">&nbsp;*</strong>
                </th>
                <td colspan="3">
                  <input
                    type="file"
                    name="middleImageUrl"
                    id="middleImageUrl"
                    @change.prevent="validateImageRatioFn($event, {width: 360, height: 340})"
                    data-valid="false"
                    accept="image/*"
                    :data-imageurl="productData.middleImageUrl"
                  />
                  <br />
                  <span class="light_gray">(540px * 540px)</span>
                  <template v-if="productData.middleImageUrl !== ''">
                    <p>
                      <b>이미지 존재함 :</b>
                      {{productData.middleImageUrl}}
                    </p>
                  </template>
                  <br />
                </td>
              </tr>

              <tr class="imgManuals">
                <th>
                  작은이미지
                  <strong class="red">&nbsp;*</strong>
                </th>
                <td colspan="3">
                  <input
                    type="file"
                    name="smallImageUrl"
                    id="smallImageUrl"
                    @change.prevent="validateImageRatioFn($event, {width: 100, height: 100})"
                    data-valid="false"
                    accept="image/*"
                    :data-imageurl="productData.smallImageUrl"
                  />
                  <br />
                  <span class="light_gray">(280px * 280px)</span>
                  <template v-if="productData.smallImageUrl !== ''">
                    <p>
                      <b>이미지 존재함 :</b>
                      {{productData.bigImageUrl}}
                    </p>
                  </template>
                  <br />
                </td>
              </tr>
            </template>
            <template v-else>
              <input
                type="file"
                name="middleImageUrl"
                id="middleImageUrl"
                :data-imageurl="productData.middleImageUrl"
                style="display:none"
              />
              <input
                type="file"
                name="smallImageUrl"
                id="smallImageUrl"
                :data-imageurl="productData.smallImageUrl"
                style="display:none"
              />
            </template>
            <tr>
              <th>다른이미지</th>
              <td colspan="3" class="img_etc">
                <Image-uploader
                  :productData="productData"
                  :images="images"
                  @imageUploader="onNewSingleImageUploadEvent"
                ></Image-uploader>
              </td>
            </tr>
            <!-- 상품 이미지 : 끝 -->
            <!-- 영상 업로더 : 시작 -->
            <tr>
              <th>
                영상 업로드
                <strong class="red">&nbsp;*</strong>
                <span class="light_gray">1개 이상 업로드</span>
              </th>
              <td colspan="3" class="img_etc">
                <Video-uploader
                  ref="videoRef"
                  :productData="productData"
                  :videos="videos"
                  @imageUploader="onNewSingleImageUploadEvent"
                ></Video-uploader>
              </td>
            </tr>
            <!-- 영상 업로더 : 끝 -->

            <!-- 재고설정/진열설정 -->
            <tr>
              <th>
                재고설정
                <strong class="red">&nbsp;*</strong>
              </th>
              <td>
                <!-- 무제한 -->
                <span>
                  <input
                    type="radio"
                    id="stockTypeCode1"
                    name="stockTypeCode"
                    value="1"
                    v-model.number="productData.stockTypeCode"
                  />
                  <label for="stockTypeCode1">무제한</label>
                </span>

                <!-- 수량설정 -->
                <span class="mgl20">
                  <input
                    type="radio"
                    id="stockTypeCode2"
                    name="stockTypeCode"
                    value="2"
                    v-model.number="productData.stockTypeCode"
                  />
                  <label for="stockTypeCode2">수량</label>
                </span>
                <span>
                  <input
                    type="text"
                    name="stockQty"
                    maxlength="7"
                    class="text_input number_input"
                    style="width: 60px;"
                    v-model="productData.stockQty"
                    :disabled="productData.stockTypeCode === 1"
                  />
                </span>

                <!-- 품절여부 -->
                <span class="mgl20">
                  <input
                    type="checkbox"
                    id="isSoldout"
                    name="isSoldout"
                    v-model.number="productData.isSoldout"
                  />
                  <label for="isSoldout" class="red">일시품절</label>
                </span>
              </td>
              <th>진열설정</th>
              <td>
                <input
                  type="radio"
                  id="isDisplay_F"
                  name="isDisplay"
                  value="0"
                  v-model.number="productData.isDisplay"
                />
                <label for="isDisplay_F">미진열</label>&nbsp;
                <input
                  type="radio"
                  id="isDisplay_T"
                  name="isDisplay"
                  value="1"
                  v-model.number="productData.isDisplay"
                  class="mgl20"
                />
                <label for="isDisplay_T">진열</label>
              </td>
            </tr>

            <template v-if="productData.prdtTypeCode === 1">
              <tr>
                <th>
                  네이버가격
                  <strong class="red">*</strong>
                </th>
                <td colspan="3">
                  <input type="text" name="marketPrice" v-model="productData.marketPrice" class="text_input number_input"/> 원
                </td>
              </tr>
            </template>
            <template v-else-if="productData.prdtTypeCode === 2">
              <tr>
                <th>
                  공구가격설정
                  <strong class="red">*</strong>
                </th>
                <td colspan="3">
                  <b-row>
                    <b-col cols="3">
                      <input
                        type="text"
                        name="marketPrice"
                        v-model="productData.marketPrice"
                        class="text_input number_input"
                        style="width:90%"
                        maxlength="9"
                      /> 원
                    </b-col>
                    <b-col cols="4">
                      <b-row class="d-flex flex-row">
                        <b-col>
                          <b-form-datepicker
                            id="startDate"
                            placeholder="시작일자 선택"
                            size="sm"
                            today-button
                            reset-button
                            close-button
                            v-model="DateObject.startDate"
                            @click="convertDateFormat('startDate')"
                          ></b-form-datepicker>
                        </b-col>
                        <b-col>
                          <b-form-timepicker
                            id="startTime"
                            placeholder="시작시간 선택"
                            now-button
                            reset-button
                            show-seconds
                            size="sm"
                            v-model="DateObject.startTime"
                            @change="convertDateFormat('startTime')"
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col style="text-align:center">~</b-col>
                    <b-col cols="4">
                      <b-row class="d-flex flex-row">
                        <b-col>
                          <b-form-datepicker
                            id="endDate"
                            placeholder="종료일자 선택"
                            size="sm"
                            today-button
                            reset-button
                            close-button
                            v-model="DateObject.endDate"
                            @change="convertDateFormat('endDate')"
                          ></b-form-datepicker>
                        </b-col>
                        <b-col>
                          <b-form-timepicker
                            id="endTime"
                            placeholder="종료시간 선택"
                            local="en"
                            now-button
                            reset-button
                            show-seconds
                            size="sm"
                            v-model="DateObject.endTime"
                            @change="convertDateFormat('endTime')"
                          ></b-form-timepicker>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </td>
              </tr>
              <tr>
                <th>공구가격 할인인원</th>
                <td colspan="3">
                  <Common-sellers
                    :productData="productData"
                    :commonSellers="commonSellers"
                    @keyup="numberWithCommasObj"
                  ></Common-sellers>
                </td>
              </tr>
            </template>
            <template v-else-if="productData.prdtTypeCode === 3">
              <tr>
                <th>
                  라이브가격
                  <strong class="red">*</strong>
                </th>
                <td colspan="3">
                  <input
                    type="text"
                    name="marketPrice"
                    v-model="productData.marketPrice"
                    class="text_input number_input"
                  /> 원
                </td>
              </tr>
            </template>
            <!-- 수수료설정 -->
            <tr>
              <th>
                수수료 설정
                <strong class="red">*</strong>
              </th>
              <td>
                <input
                  type="radio"
                  id="feeTypeCode1"
                  ref="feeTypeCode"
                  value="1"
                  v-model.number="productData.feeTypeCode"
                  @click="onFeeTypeCodeEvent"
                />
                <label for="feeTypeCode1" class="pad_right10">기본 수수료설정 (입점업체 또는 카테고리)</label>

                <input
                  type="radio"
                  id="feeTypeCode2"
                  ref="feeTypeCode"
                  value="2"
                  class="mgl20"
                  v-model.number="productData.feeTypeCode"
                  @click="onFeeTypeCodeEvent"
                />
                <label for="feeTypeCode2">개별 수수료 설정(상품별)</label>
              </td>
              <th>부가가치세 설정</th>
              <td>
                <input
                  type="radio"
                  id="isVat_T"
                  name="isVat"
                  value="0"
                  v-model.number="productData.isVat"
                />
                <label for="isVat_T">과세상품</label>
                <input
                  type="radio"
                  id="isVat_F"
                  name="isVat"
                  value="1"
                  v-model.number="productData.isVat"
                  class="mgl20"
                />
                <label for="isVat_F">면세상품</label>
              </td>
            </tr>

            <tr>
              <th>
                가격
                <strong class="red">*</strong>
              </th>
              <td colspan="3" class="price">
                <div class="d-flex" style="width:100%">
                  <template v-if="productData.feeTypeCode === 1">
                    <div style="width: 200px">
                      <input
                        type="checkbox"
                        id="feeRateBase"
                        v-model="productData.feeRateBase"
                        @click="calculFeeRateFn({type: '1'})"
                      />&emsp;
                      <label for="feeRateBase">
                        기본
                        <b>[9%]</b>
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="feeRateMedia"
                        v-model="productData.feeRateMedia"
                        @click="calculFeeRateFn({type: '1'})"
                      />&emsp;
                      <label for="feeRateMedia">
                        영상제작
                        <b>[9%]</b>
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        id="feeRateInfluencer"
                        v-model="productData.feeRateInfluencer"
                        @click="calculFeeRateFn({type: '1'})"
                      />&emsp;
                      <label for="feeRateInfluencer">
                        인플루언서
                        <b>[9%]</b>
                      </label>
                    </div>
                  </template>
                  <template v-if="productData.feeTypeCode === 2">
                    <div style="width: 200px">
                      <input
                        type="radio"
                        id="priceTypeCode1"
                        ref="priceTypeCode"
                        @click="onPriceTypeCode"
                        v-model.number="productData.priceTypeCode"
                        value="1"
                      />
                      <label for="priceTypeCode1">
                        공급가기준
                        <span>(수수료 자동입력)</span>
                      </label>
                      <br />
                      <input
                        type="radio"
                        id="priceTypeCode2"
                        ref="priceTypeCode"
                        @click="onPriceTypeCode"
                        v-model.number="productData.priceTypeCode"
                        value="2"
                      />
                      <label for="priceTypeCode2">
                        수수료기준
                        <span>(공급가 자동입력)</span>
                      </label>
                    </div>
                  </template>
                  <ul style="margin-left:10px">
                    <li>
                      판매가
                      <br />
                      <input type="text" ref="price" name="price" id="price" class="text_input" style="width:130px" v-model="productData.price" @keyup="priceToSupplyPrice" /> 원
                    </li>
                    <li>
                      수수료율
                      <br />
                      <input type="text" ref="feeRate" name="feeRate" id="feeRate" maxlength="5" value="0" class="text_input" style="width:80px" v-model.number="productData.feeRate" @keyup="onFeeRate()" disabled /> %
                    </li>
                    <li>
                      공급가
                      <br />
                      <input type="text" ref="supplyPrice" name="supplyPrice" id="supplyPrice" class="text_input" style="width:130px" v-model="productData.supplyPrice" @keyup="onSupplyPrice"
                      /> 원
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                적립금
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3" class="cmoney">
                <ul>
                  <li>
                    <input type="radio" id="pointTypeCode1" name="pointTypeCode" value="1" v-model.number="productData.pointTypeCode" />
                    <label for="pointTypeCode1">적립금 지급 안함</label>
                  </li>
                  <li>
                    <input type="radio" id="pointTypeCode2" name="pointTypeCode" value="2" v-model.number="productData.pointTypeCode" checked />
                    <label for="pointTypeCode2">기본 정책</label>
                  </li>
                  <li>
                    <input type="radio" id="pointTypeCode3" name="pointTypeCode" value="3" v-model.number="productData.pointTypeCode" disabled />
                    <label for="pointTypeCode3">판매자 정책</label>
                  </li>
                  <li>
                    <input type="radio" id="pointTypeCode4" name="pointTypeCode" value="4" v-model.number="productData.pointTypeCode" />
                    <label for="pointTypeCode4">
                      <select name="pointTypeCodeSelect" style="width: 150px;">
                        <option value="4">판매가</option>
                        <option value="5">결제가</option>
                      </select> 의
                      <input
                        type="text"
                        name="pointRate"
                        maxlength="5"
                        class="text_input number_input"
                        style="width:70px"
                      /> % 지급
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="pointTypeCode6" name="pointTypeCode" value="6" v-model.number="productData.pointTypeCode" />
                    <label for="pointTypeCode6">
                      구매 상품(개수) 당
                      <input
                        type="text"
                        name="point"
                        class="text_input number_input"
                        style="width:70px"
                      /> 원 지급
                    </label>
                  </li>
                </ul>

                <dl class="explain blue" style="clear:both">
                  <dt>
                    <strong>※ 적립금 부담</strong>
                  </dt>
                  <dd>
                    "
                    <strong>기본 정책</strong>" 이외 설정으로 적립금 지급시, 적립금 설정과 관계없이
                    <strong>판매자에게 부담</strong>됩니다.
                  </dd>
                </dl>
              </td>
            </tr>

            <tr>
              <th>
                제조사
                <strong class="red">&nbsp;*</strong>
              </th>
              <td>
                <input
                  type="text"
                  name="manufacturer"
                  class="text_input"
                  style="width:97%"
                  v-model="productData.manufacturer"
                  maxlength="50"
                />
              </td>
              <th>
                원산지
                <strong class="red">&nbsp;*</strong>
              </th>
              <td>
                <input
                  type="text"
                  name="origin"
                  class="text_input"
                  style="width:97%"
                  v-model="productData.origin"
                  maxlength="50"
                />
              </td>
            </tr>

            <tr>
              <th colspan="4">
                상품정보고시
                <strong class="red">&nbsp;*</strong>
              </th>
            </tr>
            <tr>
              <td colspan="4">
                <dl class="explain fl">
                  <dt>
                    <a
                      href="http://www.ftc.go.kr/www/FtcRelLawUList.do?key=290&law_div_cd=07"
                      target="blank"
                    >
                      <strong class="red">※ 공정거래 위원회에서 공고한 전자상거래법 상품정보제공 고시에 관한 내용을 필독해 주세요!</strong>
                    </a>
                  </dt>
                  <dd>전자상거래법에 의거하여 판매상품의 필수(상세)정보 등록이 필요합니다.</dd>
                  <dd>등록된 정보는 쇼핑몰 상품상세페이지에 상품기본정보 아래에 표형태로 출력되어 보여집니다.</dd>
                </dl>
                <span class="fr">
                  <a
                    class="btn btn-primary"
                    href="http://www.mallstore.co.kr/data/base/DownLoad/information/commodity_guide.zip"
                  >품목별 상품고시</a>
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="notify">
                <Product-notics :productData="productData" :notify="notify"></Product-notics>
              </td>
            </tr>

            <tr>
              <th>
                상품설명
                <strong class="red">&nbsp;*</strong>
              </th>
              <td colspan="3" style="padding: 0px">
                <quill-editor
                  ref="detailDescriptionRef"
                  class="quill-editor"
                  :options="detailDescriptionOption"
                  id="detailDescription"
                  name="detailDescription"
                  v-model="productData.detailDescription"
                ></quill-editor>
                <input
                  type="file"
                  id="detailDescriptionImage"
                  accept="image/*"
                  style="display:none"
                  @change="detailDescriptionImage"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box">
        <div class="section_head">
          <h4>
            <font-awesome-icon icon="info-circle" />배송비 옵션
            <em>(선택하지 않을시 기본설정에 따릅니다.)</em>
          </h4>
        </div>
        <table class="table t_form">
          <tbody>
            <tr>
              <th>배송비 구분</th>
              <td>
                <dl class="delivery_method">
                  <dt>
                    <input
                      type="radio"
                      id="deliveryPriceTypeCode1"
                      name="deliveryPriceTypeCode"
                      v-model.number="productData.deliveryPriceTypeCode"
                      value="1"
                    />
                    <label for="deliveryPriceTypeCode1">무료배송</label>
                  </dt>
                  <dd>해당상품을 무료배송합니다.</dd>

                  <dt>
                    <input
                      type="radio"
                      id="deliveryPriceTypeCode2"
                      name="deliveryPriceTypeCode"
                      v-model.number="productData.deliveryPriceTypeCode"
                      value="2"
                    />
                    <label for="deliveryPriceTypeCode2">착불</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      name="debitAmount"
                      class="text_input number_input debit"
                      style="width: 70px"
                      maxlength="10"
                      v-model.number="productData.debitAmount"
                      :disabled="productData.deliveryPriceTypeCode !== 2"
                    /> 원 (무료배송 :
                    <input
                      type="text"
                      name="debitfreeMinAmount"
                      class="text_input number_input debit"
                      style="width: 70px"
                      maxlength="10"
                      v-model.number="productData.debitfreeMinAmount"
                      :disabled="productData.deliveryPriceTypeCode !== 2"
                    /> 원 이상 주문시 무료)
                  </dd>
                  <dt>
                    <input
                      type="radio"
                      id="deliveryPriceTypeCode3"
                      name="deliveryPriceTypeCode"
                      v-model.number="productData.deliveryPriceTypeCode"
                      value="3"
                    />
                    <label for="deliveryPriceTypeCode3">선불</label>
                  </dt>
                  <dd>
                    <input
                      type="text"
                      name="prepaymentAmount"
                      class="text_input prepay number_input"
                      style="width: 70px"
                      maxlength="10"
                      v-model.number="productData.prepaymentAmount"
                      :disabled="productData.deliveryPriceTypeCode !== 3"
                    /> 원 (무료배송 :
                    <input
                      type="text"
                      name="prepayfreeMinAmount"
                      class="text_input prepay number_input"
                      style="width: 70px"
                      maxlength="10"
                      v-model.number="productData.prepayfreeMinAmount"
                      :disabled="productData.deliveryPriceTypeCode !== 3"
                    /> 원 이상 주문시 무료)
                  </dd>
                  <dt>
                    <input
                      type="radio"
                      id="deliveryPriceTypeCode4"
                      name="deliveryPriceTypeCode"
                      v-model.number="productData.deliveryPriceTypeCode"
                      value="4"
                    />
                    <label for="deliveryPriceTypeCode4">판매자정책</label>
                  </dt>
                  <dd>판매자의 기본정책을 따릅니다.</dd>

                  <dt>
                    <input
                      type="radio"
                      id="deliveryPriceTypeCode5"
                      name="deliveryPriceTypeCode"
                      v-model.number="productData.deliveryPriceTypeCode"
                      value="5"
                    />
                    <label for="deliveryPriceTypeCode5">기본정책</label>
                  </dt>
                  <dd>쇼핑몰의 기본정책을 따릅니다.</dd>
                </dl>

                <dl class="explain blue mgt5">
                  <dt>
                    <strong>※ 착불, 선불 배송비</strong>
                  </dt>
                  <dd>무료배송 기준금액을 "공백" 또는 "0"으로 입력할 경우 주문금액과 관계없이 무조건 배송비를 부과합니다.</dd>
                </dl>
              </td>
            </tr>
            <tr>
              <th colspan="2">배송정책 (설정시 기본 배송정책보다 우선으로 표시 됩니다.)</th>
            </tr>
            <tr>
              <td colspan="2" style="padding: 0px">
                <quill-editor
                  ref="deliveryCommentHtmlRef"
                  class="quill-editor"
                  :options="deliveryCommentHtmlOption"
                  id="deliveryCommentHtml"
                  name="deliveryCommentHtml"
                  v-model="productData.deliveryCommentHtml"
                ></quill-editor>
                <input
                  type="file"
                  id="deliveryCommentHtmlImage"
                  accept="image/*"
                  style="display:none"
                  @change="deliveryCommentHtmlImage"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box">
        <div class="section_head">
          <h4>
            <font-awesome-icon icon="info-circle" />상품옵션
          </h4>
        </div>
        <table class="table t_form">
          <tbody>
            <tr>
              <th>옵션구분</th>
              <td class="option_kind">
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="option_kind_1"
                      name="optionTypeCode"
                      value="1"
                      v-model.number="productData.optionTypeCode"
                    />
                    <label for="option_kind_1">옵션없음</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="option_kind_2"
                      name="optionTypeCode"
                      value="2"
                      v-model.number="productData.optionTypeCode"
                    />
                    <label for="option_kind_2">일반옵션</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="option_kind_3"
                      name="optionTypeCode"
                      value="5"
                      v-model.number="productData.optionTypeCode"
                    />
                    <label for="option_kind_3">서술형옵션</label>
                  </li>
                </ul>
                <ul class="option_explain blue mgt5">
                  <li>
                    상품 등록시 한가지 옵션만 선택이 가능하고, 등록 후 수정시에는 변경할 수 없습니다.
                    <br />(단, "옵션없음" 상태에서 변경은 가능)
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <template v-if="productData.optionTypeCode === 2">
                  <Nomal-options :productData="productData" :nomarlOptions="nomarlOptions"></Nomal-options>
                </template>
                <template v-else-if="productData.optionTypeCode === 5">
                  <div class="option_tab option_kind_3_tab">
                    <ul class="option_explain">
                      <li>
                        일반옵션, 재고옵션을 사용하시기 어려운 경우, 서술형 옵션을 선택하시면 아래 입력한 내용이 구매자에게 안내되고,
                        <br />상품구매옵션을 서술형으로 입력할 수 있습니다.
                      </li>
                    </ul>
                    <dl class="option_exam mgt10">
                      <dt>
                        <strong>입력 예)</strong>
                      </dt>
                      <dd>넥타이타입은 A~J, 셔츠타입은 A~J, 사이즈는 95,100,105입니다. 원하는 색상 및 사이즈를 적어주세요.</dd>
                    </dl>
                    <div class="option_text">
                      <textarea
                        name="optionDescription"
                        rows="3"
                        class="text_input"
                        maxlength="200"
                      ></textarea>
                    </div>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box">
        <div class="section_head">
          <h4>
            <font-awesome-icon icon="info-circle" />추가구성
          </h4>
        </div>
        <table summary="추가 구성 등록 폼 입니다." class="t_form">
          <tbody>
            <tr>
              <th>추가구성</th>
              <td class="addition_usable">
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="use_addition_0"
                      name="isAddingProduct"
                      v-model.number="productData.isAddingProduct"
                      value="0"
                    />
                    <label for="use_addition_0">미사용</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="use_addition_1"
                      name="isAddingProduct"
                      v-model.number="productData.isAddingProduct"
                      value="1"
                    />
                    <label for="use_addition_1">사용</label>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <template v-if="productData.isAddingProduct === 1">
                  <Addition-container
                    :productData="productData"
                    :additionOptions="additionOptions"
                    @keyup="numberWithCommasObj"
                  ></Addition-container>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn_center">
        <template v-if="productData.productSysId === ''">
          <b-button variant="secondary" @click="SubmitAddProduct()" style="margin-right: 5px">등록</b-button>
        </template>
        <template v-else>
          <b-button variant="success" @click="SubmitUpdateProduct()" style="margin-right: 5px">수정</b-button>
        </template>
        <b-button variant="danger">취소</b-button>
      </div>
    </form>
  </div>
</template>
<script>
import Quill from "quill";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import { ImageUpload } from "quill-image-upload";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";
import commonJs from "@/assets/js/common.js";
import CategoryComponent from "@/components/goodsReg/CategoryComponent";
import ImagesUploader from "@/assets/js/ImagesUploader.js";
import GoodsRegComponent from "@/components/goodsReg/GoodsRegComponent.js";
import GoodsUpdate from "@/components/goodsReg/GoodsUpdate.js";
import ClickEventMixin from "@/components/goodsReg/ClickEventMixin.js";
import ImageUploader from "@/components/goodsReg/ImageUploader";
import VideoUploader from "@/components/goodsReg/VideoUploader";
import AdditionContainer from "@/components/goodsReg/AdditionContainer";
import CommonSellers from "@/components/goodsReg/CommonSellers";
import NomalOptions from "@/components/goodsReg/NomalOptions";
import ProductNotics from "@/components/goodsReg/ProductNotics";

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register("modules/imageUpload", ImageUpload);
export default {
  name: "GoodsReg",
  mixins: [
    commonJs,
    ImagesUploader,
    ClickEventMixin,
    GoodsRegComponent,
    GoodsUpdate
  ],
  components: {
    quillEditor,
    CategoryComponent,
    ImageUploader,
    VideoUploader,
    AdditionContainer,
    CommonSellers,
    NomalOptions,
    ProductNotics
  },
  data() {
    return {
      selectedCategoryRow: [
        { value: 0, text: "1차카테고리 필수", parentSysId: "", feeRate: "" },
        { value: 0, text: "2차카테고리 필수", parentSysId: "", feeRate: "" },
        { value: 0, text: "3차카테고리 선택", parentSysId: "", feeRate: "" },
        { value: 0, text: "4차카테고리 선택", parentSysId: "", feeRate: "" },
        { value: 0, text: "5차카테고리 선택", parentSysId: "", feeRate: "" }
      ],
      categoryTable: [],
      selectedCategoryTable: "",
      category1: [
        { value: 0, text: "1차카테고리 필수", parentSysId: "", feeRate: "" }
      ],
      category2: [
        { value: 0, text: "2차카테고리 필수", parentSysId: "", feeRate: "" }
      ],
      category3: [
        { value: 0, text: "3차카테고리 선택", parentSysId: "", feeRate: "" }
      ],
      category4: [
        { value: 0, text: "4차카테고리 선택", parentSysId: "", feeRate: "" }
      ],
      category5: [
        { value: 0, text: "5차카테고리 선택", parentSysId: "", feeRate: "" }
      ],
      // 큰 이미지 업로드시에 로딩바
      images: [{ imageurl: "" }],
      videos: [
        {mediaTypeCode: 1, title: "", videoTitle: "", progressValue: 0, progressMax: 0, mediaId: "", thumnailUrl: "", procTypeCode: 2},
        {mediaTypeCode: 1, title: "", videoTitle: "", progressValue: 0, progressMax: 0, mediaId: "", thumnailUrl: "", procTypeCode: 2}
      ],
      additionOptions: [
        {itemGroup: "", subAdditionOptions: [ { item: "", price: "", stockQty: "", isSoldout: false, isHide: false, procTypeCode: 2 }], procTypeCode: 2}
      ],
      commonSellers: [
        {id:1, peopleObjName: "peopleObjectName1", discountObjName: "discountObjName1" }
      ],
      nomarlOptions: [{ name: "", content: "", procTypeCode: 2 }],
      notify: [{ item: "", content: "", procTypeCode: 2 }],
      sellers: [],
      brands: [{ value: 0, text: "::브랜드를 선택해주세요::" }],
      DateObject: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
      }
    };
  },
  mounted() {
    if (!this.isEmpty(this.$route.params.productSysId)) {
      this.productData.productSysId = this.$route.params.productSysId;
      this.updateProductData.prdtSysId = this.$route.params.productSysId
      this.axiosGetRequest('/api/v1/products/' + this.$route.params.productSysId,"",this.getProductData);
    }
    this.axiosGetRequest('/api/v1/sellers/bases', "", this.resultSellersFn);
    this.axiosGetRequest('/api/v1/categories',
      { categoryLevel: 1 },
      this.resultCategoryFn
    );
    this.calculFeeRateFn({ type: "1" });
    this.getImageUrl('/product/image/0/'+this.productData.sellerSysId)
  },
  methods: {
    SubmitAddProduct: function() {
      let object = this.insertSubmitValidate(document.Frm);
      let CallbackFn = function (res) {
        console.log(res)
        if (!res.data.jsonData.resultCode==='0001') {
            alert('상품등록이 완료 되었습니다.')
            window.location.href='/goods/goods_list'
        }else {
            alert('등록에 실패하였습니다.')
        }
      }
      this.axiosPostRequest('/api/v1/products', {jsonData: object}, CallbackFn)
    },
    SubmitUpdateProduct: function () {
      this.updateProductData.productSysId = this.productData.productSysId;
      let object = this.updateSubmitValidate(document.Frm);
      let CallbackFn = function (res) {
          console.log(res)
      }
      this.axiosPutRequest('/api/v1/products/' + this.productData.productSysId, {jsonData: object}, CallbackFn)
    },
    resultSellersFn: function(res) {
      var selleries = res.data.jsonData.sellers;
      this.sellers.push({ value: 0, text: "::판매자를 선택해주십시오::" });
      selleries.forEach(item => [
        this.sellers.push({ value: item.sellerSysId, text: item.name })
      ]);
      this.changeSellerFn();
    },
    resultCategoryFn: function(res) {
      let data = res.data.jsonData.categories;
      data.forEach(_item => {
        this.category1.push({
          value: _item.categorySysId,
          parentId: _item.parentSysId,
          feeRate: _item.feeRate,
          text: _item.name + "[" + _item.feeRate * 100 + "%]"
        });
      });
    }
  }
};
</script>
<style>
.quill-editor {
  width: 100%;
  height: 100%;
}
.ql-editor {
  min-height: 350px;
}
.progress-bar span {
  color: white;
}
</style>
