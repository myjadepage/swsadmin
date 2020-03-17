<template>
    <div id="contents">
        <h3>
            {{$route.name}}
        </h3>
        <ul class="navi">
            <li class="home"><a href="/" target="_top">홈</a></li>
            <li>상품관리</li>
            <li class="on">
                {{$route.name}}
            </li>
        </ul>
        <ul class="helpbox">
            <li>가격과 상품이미지 설정하여 상품등록합니다.</li>
            <li><strong class="red">*</strong>로 설정된 부분은 필수 입력하셔야 합니다.</li>
            <li>시중가를 적으면 세일이 적용됩니다. (필요할 경우에만 입력하세요.)</li>
        </ul>

        <form name="Frm" enctype="multipart/form-data">
            <div class="box">
                <table name="categories" class="t_form">
                    <!-- <caption>상품기본정보 등록 폼</caption> -->
                    <colgroup>
                        <col width="170">
                        <col width="*">
                        <col width="140">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>상품판매 분류 <strong class="red">*</strong></th>
                            <td colspan="3">
                                <b-row cols="14">
                                    <b-col cols="2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="prdtTypeCode" id="productSellingType1" value=1 v-model.number="productData.prdtTypeCode">
                                            <label class="form-check-label" for="productSellingType1">
                                                일반
                                            </label>
                                        </div>
                                    </b-col>
                                    <b-col cols="2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="prdtTypeCode" id="productSellingType2" value=2 v-model.number="productData.prdtTypeCode">
                                            <label class="form-check-label" for="productSellingType2">
                                                공동구매
                                            </label>
                                        </div>
                                    </b-col>
                                    <b-col cols="2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="prdtTypeCode" id="productSellingType3" value=3 v-model.number="productData.prdtTypeCode">
                                            <label class="form-check-label" for="productSellingType3">
                                                라이브
                                            </label>
                                        </div>
                                    </b-col>
                                </b-row>
                            </td>
                        </tr>
                        <!-- 상품분류(카테고리) -->
                        <tr>
                            <th rowspan="2">상품분류(카테고리) <strong class="red">*</strong></th>
                            <td colspan="3">
                                <select id="category1" name="category1" v-on:change="onCategorySelector" data-index="1" data-required="true" data-target="category2" class="text-danger">
                                    <option value=''>1차카테고리 필수</option>
                                </select>
                                <select id="category2" name="category2" v-on:change="onCategorySelector" data-index="2" data-required="true" data-target="category3" class="text-danger">
                                    <option v-for="(option, inx) in category2" :key="inx" :value="option.value" :data-parent="option.parentId" :data-feerate="option.feeRate">{{ option.title }}</option>
                                </select>
                                <select id="category3" name="category3" v-on:change="onCategorySelector" data-index="3" data-required="false" data-target="category4">
                                    <option v-for="(option, inx) in category3" :key="inx" :value="option.value" :data-parent="option.parentId" :data-feerate="option.feeRate">{{ option.title }}</option>
                                </select>
                                <select id="category4" name="category4" v-on:change="onCategorySelector" data-index="4" data-required="false" data-target="category5">
                                    <option v-for="(option, inx) in category4" :key="inx" :value="option.value" :data-parent="option.parentId" :data-feerate="option.feeRate">{{ option.title }}</option>
                                </select>
                                <select id="category5" name="category5" data-required="false">
                                    <option v-for="(option, inx) in category5" :key="inx" :value="option.value" :data-parent="option.parentId" :data-feerate="option.feeRate">{{ option.title }}</option>
                                </select>
                                <button type="button" class="btn btn-sm btn-secondary" v-on:click="addCate">추가</button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="category">
                                <table id="tb_category" summary="상품 분류 목록 입니다.">
                                    <caption>상품 분류 목록</caption>
                                    <colgroup>
                                        <col width="20">
                                        <col width="300">
                                        <col width="50">
                                        <col width="*">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>기본</th>
                                            <th>분류</th>
                                            <th>삭제</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, index) in categoryRow" :key="index">
                                            <td><input type="radio" :id="row.checkName" :name="row.checkName" v-on:change="onSelectCate" :data-feerate="row.feeRate"/></td>
                                            <td style="text-align: left" :for="row.checkName" >{{ row.title }}</td>
                                            <td><b-button variant="light" size="sm" style="height: 17px" v-on:click="categoryRow.splice(index, 1)">삭제</b-button></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <dl class="explain blue">
                                    <dt><strong>※ 다중 분류로 선택할 경우</strong></dt>
                                    <dd>기본으로 선택된 분류가 해당 상품의 대표 분류입니다. 검색 결과에서는 기본 분류를 기준으로 출력됩니다.</dd>
                                    <dd>각각 다른상품으로 인식되기 때문에 상품 목록에 해당 상품이 중복 노출될 수 있습니다.</dd>
                                    <dd class="red">다중 카테고리 선택 후 수수료율을 다르게 추가 할 경우 기본 카테고리 수수료율로 설정됩니다.</dd>
                                </dl>
                            </td>
                        </tr>
                        <tr>
                            <th>간략한 설명<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="text" name="briefComment" class="text_input" style="width:100%" value="" maxlength="20" v-model="productData.briefComment">
                            </td>
                        </tr>
                        <tr>
                            <th>상세 설명<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="text" name="briefDescription" class="text_input" style="width:100%" value="" maxlength="50" v-model="productData.briefDescription">
                            </td>
                        </tr>
                        <!-- 상품명 -->
                        <tr>
                            <th>상품명<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="text" name="name" class="text_input" style="width:99%" value="" maxlength="100" v-model="productData.name">
                            </td>
                        </tr>
                        <tr>
                            <th>판매자<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <select id="sellers" name="sellers" v-on:change="changeSellerFn">
                                    <option value=''>::판매자를 선택하십시오::</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>브랜드<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <select id="brandSysId" name="brandSysId">
                                    <option v-for="(item, index) in brands" :key="index" :value="item.id">{{ item.title }}</option>
                                </select>
                            </td>
                        </tr>

                        <!-- 상품아이콘 -->
                        <tr>
                            <th>상품 아이콘<strong class="red">&nbsp;*</strong>
                                <br>
                                <b-button variant="outline-danger" size="sm" style="height: 20px;">아이콘관리</b-button>
                            </th>
                            <td colspan="3" class="icons">
                                <ul>
                                    <li>
                                        <input type="checkbox" id="cb_icon_1" name="iconList" value="1" checked>
                                        <div><label for="cb_icon_1"><img src="@/assets/img/ico_pro_sale.gif" ></label></div>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="cb_icon_2" name="iconList" value="2">
                                        <div><label for="cb_icon_2"><img src="@/assets/img/ico_pro_sale.gif" ></label></div>
                                    </li>
                                </ul>

                            </td>
                        </tr>

                        <!-- 상품 이미지 : 시작 -->
                        <tr>
                            <th>큰이미지<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="file" name="bigImageUrl" id="bigImageUrl" v-on:change="onDirectImageUploader" accept="image/*" data-imageurl=""><br>
                                <span class="light_gray">(1080px * 1080px)</span>, <span class="light_gray">(500px * 500px)</span>
                                <label for="img_auto">
                                    <input type="checkbox" id="img_auto" name="isImgAuto" value="T" v-on:click="changeImgRegAuto" disabled>
                                자동등록</label>

                                <dl class="explain blue mgt5">
                                    <dt><strong>※ 자동등록이란?</strong></dt>
                                    <dd>큰이미지만 올리시면 사이트 정보에서 지정해 놓은 사이즈로 중간이미지, 작은이미지가 자동 생성되어 저장됩니다.</dd>
                                    <dd>각각 올리기를 원하실 경우 자동등록의 체크를 해제하시면 됩니다.</dd>
                                </dl>
                            </td>
                        </tr>

                        <tr class="imgManuals">
                            <th>중간이미지<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="file" name="middleImageUrl" id="middleImageUrl" v-on:change="onDirectImageUploader" accept="image/*"><br>
                                <span class="light_gray">(540px * 540px)</span>
                            </td>
                        </tr>

                        <tr class="imgManuals">
                            <th>작은이미지<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3">
                                <input type="file" name="smallImageUrl" id="smallImageUrl" v-on:change="onDirectImageUploader" accept="image/*"><br>
                                <span class="light_gray">(280px * 280px)</span>
                            </td>
                        </tr>
                        <tr>
                            <th>다른이미지</th>
                            <td colspan="3" class="img_etc">
                                <div class="tr mgt5">
                                    <b-button variant="info" size="sm" v-on:click="addImagesRow">이미지 추가</b-button>
                                    <!-- <b-button variant="danger" size="sm" @click="removeImagesRow">이미지 삭제</b-button> -->
                                </div>
                                <div id="todo-list-example">
                                    <b-row cols="12" class="mb-1" v-for="(item, index) in images" :key="item.id">
                                        <b-col cols="2" style="padding-right:0px">
                                            <span style="width:20px">{{index + 1}}.</span>&emsp;
                                            <span>
                                                <b-input-group size="sm" style="max-width:200px">
                                                    <b-form-input disabled squared placeholder="썸네일 업로드" v-model="item.imageVisibleTitle"></b-form-input>
                                                    <b-input-group-append>
                                                    <b-button size="sm" squared text="Button" v-on:click="onImageObjOpenFn(item.imageObjName)">이미지 업로드</b-button>
                                                    </b-input-group-append>
                                                </b-input-group>
                                            </span>
                                            <input type="file" :id="item.imageObjName" :name="item.imageObjName" accept="image/jpeg,image/png,image/jpg,image/gif" style="display:none" v-on:change="onAlternativeUploader(item)" data-imageurl="">
                                        </b-col>
                                        <b-col class="px-0">
                                            <b-button variant="light" v-on:click="removeImageRow(index)" size="sm" style="height:23px">이미지 삭제</b-button>
                                        </b-col>
                                    </b-row>
                                </div>
                            </td>
                        </tr>
                        <!-- 상품 이미지 : 끝 -->
                        <!-- 영상 업로더 : 시작 -->
                        <tr>
                            <th>
                                영상 업로드<strong class="red">&nbsp;*</strong>
                                <span class="light_gray">1개 이상 업로드</span>
                            </th>
                            <td colspan="3" class="img_etc">
                                <div class="tr mgt5">
                                    <b-button variant="info" size="sm" @click="addVideoRow">영상 추가</b-button>
                                </div>
                                <b-row cols="12" class="mb-1" v-for="(item, index) in videos" :key="item.id">
                                    <b-col cols="3" style="padding-right:0px">
                                        <span style="width:20px">{{index + 1}}.</span>
                                        <select style="width: 120px">
                                            <option>영상구분</option>
                                            <option>인트로</option>
                                            <option>언박싱</option>
                                            <option>메인</option>
                                        </select>
                                        <input type="text" :name="item.videoTitle" class="text_input" placeholder="영상 타이틀" maxlength="50" style="width:100%; max-width:200px">
                                    </b-col>
                                    <b-col cols="2" class="px-1">
                                        <b-input-group size="sm">
                                            <b-form-input disabled squared placeholder="영상 업로드" v-model="item.videoVisibleTitle"></b-form-input>
                                            <b-input-group-append>
                                            <b-button size="sm" squared text="Button" v-on:click="onVideoObjOpenFn(item.videoObjName)">영상 찾기</b-button>
                                            </b-input-group-append>
                                        </b-input-group>
                                        <input type="file" :id="item.videoObjName" name="optionalVideoUrl" style="display: none" accept="video/*" v-on:change="onSingleVideoUploaderEvent(index, item)" data-videourl="">
                                    </b-col>
                                    <b-col cols="3">
                                        <b-input-group size="sm">
                                            <b-form-input disabled squared placeholder="썸네일 업로드" v-model="item.imageVisibleTitle"></b-form-input>
                                            <b-input-group-append>
                                            <b-button size="sm" squared text="Button" v-on:click="onImageObjOpenFn(item.imageObjName)">썸네일 업로드</b-button>
                                            </b-input-group-append>
                                            <input type="file" :id="item.imageObjName" :name="item.imageObjName" style="display: none" accept="image/*" v-on:change="onAlternativeUploader(item)" data-imageurl="">
                                        </b-input-group>
                                    </b-col>
                                    <b-col cols="1" class="px-1">
                                        <b-button variant="light" v-on:click="removeVideoRow(index)" size="sm">영상 삭제</b-button>
                                    </b-col>
                                    <b-col cols="3">
                                        <template v-if="item.progressMax > 0">
                                            <b-progress :max="item.progressMax" class="mt-2">
                                                <b-progress-bar variant="success" class="text-light" :value="item.progressValue" :label="`${((item.progressValue/ item.progressMax) * 100).toFixed(1)}%`"></b-progress-bar>
                                            </b-progress>
                                        </template>
                                    </b-col>
                                </b-row>
                            </td>
                        </tr>
                        <!-- 영상 업로더 : 끝 -->

                        <!-- 재고설정/진열설정 -->
                        <tr>
                            <th>재고설정<strong class="red">&nbsp;*</strong></th>
                            <td>
                                <!-- 무제한 -->
                                <span>
                                    <input type="radio" id="stockTypeCode1" name="stockTypeCode" value="1" data-bool="false" @click="checkStock('stockTypeCode1')" checked>
                                    <label for="stockTypeCode1">무제한</label>
                                </span>

                                <!-- 수량설정 -->
                                <span class="mgl20">
                                    <input type="radio" id="stockTypeCode2" name="stockTypeCode" value="2" data-bool="true" @click="checkStock('stockTypeCode2')">
                                    <label for="stockTypeCode2">수량</label>
                                </span>
                                <span>
                                    <input type="text" name="stockQty"  maxlength="7" class="text_input number_input" style="width: 60px;" v-on:keyup.passive="numberWithCommasObj" disabled>
                                </span>

                                <!-- 품절여부 -->
                                <span class="mgl20">
                                    <input type="checkbox" id="isSoldout" name="isSoldout" v-model.number="productData.isSoldout">
                                    <label for="isSoldout" class="red">일시품절</label>
                                </span>
                            </td>
                            <th>진열설정</th>
                            <td>
                                <input type="radio" id="isDisplay_T" name="isDisplay" value="0" v-model.number="productData.isDisplay"><label for="isDisplay_T">진열</label>&nbsp;
                                <input type="radio" id="isDisplay_F" name="isDisplay" value="1" v-model.number="productData.isDisplay" class="mgl20"><label for="isDisplay_F">미진열</label>
                            </td>
                        </tr>

                        <!-- 시중가격 / 부가가치세설정 -->
                        <template v-if="productData.prdtTypeCode === 1">
                        <tr>
                            <th>네이버가격<strong class="red">*</strong></th>
                            <td colspan="3">
                                <input type="text" name="marketPrice" v-model="productData.marketPrice" class="text_input number_input" v-on:keyup="numberWithCommasObj" /> 원
                            </td>
                        </tr>
                        </template>
                        <template v-else-if="productData.prdtTypeCode === 2">
                        <tr>
                            <th>공구가격설정<strong class="red">*</strong></th>
                            <td colspan="3">
                                <b-row>
                                    <b-col cols="3">
                                        <input type="text" name="marketPrice" v-model="productData.marketPrice" class="text_input number_input" style="width:90%" v-on:keyup="numberWithCommasObj" maxlength="9"/> 원
                                    </b-col>
                                    <b-col cols="4">
                                        <b-row class="d-flex flex-row">
                                            <b-col>
                                                <b-form-datepicker id="startDate" placeholder="시작일자 선택" size="sm" today-button reset-button close-button v-model="DateObject.startDate" @click="convertDateFormat('startDate')"></b-form-datepicker>
                                            </b-col>
                                            <b-col>
                                                <b-form-timepicker id="startTime" placeholder="시작시간 선택" now-button reset-button show-seconds size="sm" v-model="DateObject.startTime" @change="convertDateFormat('startTime')"></b-form-timepicker>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col style="text-align:center">~</b-col>
                                    <b-col cols="4">
                                        <b-row class="d-flex flex-row">
                                            <b-col>
                                                <b-form-datepicker id="endDate" placeholder="종료일자 선택" size="sm" today-button reset-button close-button  v-model="DateObject.endDate" @change="convertDateFormat('endDate')"></b-form-datepicker>
                                            </b-col>
                                            <b-col>
                                                <b-form-timepicker id="endTime" placeholder="종료시간 선택" local="en" now-button reset-button show-seconds size="sm" v-model="DateObject.endTime" @change="convertDateFormat('endTime')"></b-form-timepicker>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </td>
                        </tr>
                        <tr>
                            <th>공구가격 할인인원</th>
                            <td colspan="3">
                                <div class="tr mgt5">
                                    <b-button variant="info" size="sm" @click="discountFn"><font-awesome-icon icon="plus-circle" /> 할인인원 추가</b-button>
                                </div>
                                <ul>
                                    <li v-for="(item, index) in commonSellers" :key="item.id" class="mb-2">
                                        <span style="width: 20px">{{index+1}}.</span>
                                        <input type="text" class="text_input number_input" :id="item.peopleObjName" v-on:keyup="numberWithCommasObj" style="width: 50px" />명 
                                        <input type="text" class="text_input number_input" :id="item.discountObjName" style="width: 150px" v-on:keyup="numberWithCommasObj"/>할인
                                        <b-button variant="light" class="mx-3" size="sm" @click="commonSellers.splice(index, 1)">범위 삭제</b-button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        </template>
                        <template v-else-if="productData.prdtTypeCode === 3">
                        <tr>
                            <th>라이브가격<strong class="red">*</strong></th>
                            <td colspan="3">
                                <input type="text" name="marketPrice" v-model="productData.marketPrice" class="text_input number_input" v-on:keyup="numberWithCommasObj" /> 원
                            </td>
                        </tr>
                        </template>
                        <!-- 수수료설정 -->
                        <tr>
                            <th>수수료 설정 <strong class="red">*</strong></th>
                            <td>
                                <input type="radio" id="feeTypeCode1" name="feeTypeCode" value=1 v-model.number="productData.feeTypeCode" @click.passive="onFeeTypeCodeEvent">
                                <label for="feeTypeCode1" class="pad_right10">기본 수수료설정 (입점업체 또는 카테고리)</label>

                                <input type="radio" id="feeTypeCode2" name="feeTypeCode" value=2 class="mgl20" v-model.number="productData.feeTypeCode" @click.passive="onFeeTypeCodeEvent">
                                <label for="feeTypeCode2">개별 수수료 설정(상품별)</label>
                            </td>
                            <th>부가가치세 설정</th>
                            <td>
                                <input type="radio" id="isVat_T" name="isVat" value="0" v-model.number="productData.isVat"><label for="isVat_T">과세상품</label>
                                <input type="radio" id="isVat_F" name="isVat" value="1" v-model.number="productData.isVat" class="mgl20"><label for="isVat_F">면세상품</label>
                            </td>
                        </tr>

                        <!-- 가격 -->
                        <tr>
                            <th>가격 <strong class="red">*</strong></th>
                            <td colspan="3" class="price">
                                <div class="d-flex" style="width:100%">
                                    <template v-if="productData.feeTypeCode === 1">
                                        <div style="width: 200px">
                                            <input type="checkbox" id="defaultFeeRate" v-model="feeRateObject.defaultFeeRate" @click="defaultFeeRate('defaultFeeRate')"/>&emsp;<label for="defaultFeeRate"> 기본 <b>[9%]</b> </label><br>
                                            <input type="checkbox" id="makeVideoFeeRate" v-model="feeRateObject.makeVideoFeeRate" @click="defaultFeeRate('makeVideoFeeRate')"/>&emsp;<label for="makeVideoFeeRate"> 영상제작 <b>[9%]</b> </label><br>
                                            <input type="checkbox" id="influencerFeeRate" v-model="feeRateObject.influencerFeeRate" @click="defaultFeeRate('influencerFeeRate')"/>&emsp;<label for="influencerFeeRate"> 인플루언서 <b>[9%]</b> </label>
                                        </div>
                                    </template>
                                    <template v-if="productData.feeTypeCode === 2">
                                        <div style="width: 200px">
                                            <input type="radio" id="priceTypeCode1" name="priceTypeCode" v-on:click="onPriceTypeCode" v-model.number="productData.priceTypeCode" value="1" checked>
                                            <label for="priceTypeCode1">
                                                공급가기준
                                                <span>(수수료 자동입력)</span>
                                            </label>
                                            <br>
                                            <input type="radio" id="priceTypeCode2" name="priceTypeCode" v-on:click="onPriceTypeCode" v-model.number="productData.priceTypeCode" value="2">
                                            <label for="priceTypeCode2">
                                                수수료기준
                                                <span>(공급가 자동입력)</span>
                                            </label>
                                        </div>
                                    </template>
                                    <ul style="margin-left:10px">
                                        <li>판매가<br><input type="text" name="price" class="text_input" style="width:130px" v-on:keyup="onPriceEvnet" v-on:keyup.passive="numberWithCommasObj"> 원</li>
                                        <li>수수료율<br><input type="text" name="feeRate" maxlength="5" value="0" class="text_input" style="width:80px" v-model.number="productData.feeRate" v-on:keyup="onFeeRate()" disabled> %</li>
                                        <li>공급가<br><input type="text" name="supplyPrice" class="text_input" style="width:130px" v-on:keyup="onSupplyPrice" v-on:keyup.passive="numberWithCommasObj"> 원</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>

                        <!-- 적립금 -->
                        <tr>
                            <th>적립금<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3" class="cmoney">
                                <ul>
                                    <li>
                                        <input type="radio" id="pointTypeCode1" name="pointTypeCode" value="1">
                                        <label for="pointTypeCode1">적립금 지급 안함</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="pointTypeCode2" name="pointTypeCode" value="2" checked>
                                        <label for="pointTypeCode2">기본 정책</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="pointTypeCode3" name="pointTypeCode" value="3" disabled>
                                        <label for="pointTypeCode3">판매자 정책</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="pointTypeCode4" name="pointTypeCode" value="4">
                                        <label for="pointTypeCode4">
                                            <select name="pointTypeCodeSelect" style="width: 150px;">
                                                <option value="4">판매가</option>
                                                <option value="5">결제가</option>
                                            </select> 의
                                            <input type="text" name="pointRate" maxlength="5" class="text_input number_input" style="width:70px"> % 지급
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="pointTypeCode6" name="pointTypeCode" value="6">
                                        <label for="pointTypeCode6">구매 상품(개수) 당
                                            <input type="text" name="point"  class="text_input number_input" style="width:70px" v-on:keyup.passive="numberWithCommasObj"> 원 지급
                                        </label>
                                    </li>
                                </ul>

                                <dl class="explain blue " style="clear:both">
                                    <dt><strong>※ 적립금 부담</strong></dt>
                                    <dd>"<strong>기본 정책</strong>" 이외 설정으로 적립금 지급시, 적립금 설정과 관계없이 <strong>판매자에게 부담</strong>됩니다.</dd>
                                </dl>
                            </td>
                        </tr>

                        <!-- 제조사/원산지 -->
                        <tr>
                            <th>제조사<strong class="red">&nbsp;*</strong></th>
                            <td>
                                <input type="text" name="manufacturer" class="text_input" style="width:97%" maxlength="50">
                            </td>
                            <th>원산지<strong class="red">&nbsp;*</strong></th>
                            <td>
                                <input type="text" name="origin" class="text_input" style="width:97%" maxlength="50">
                            </td>
                        </tr>

                        <!-- 상품정보고시 -->
                        <tr>
                            <th colspan="4">상품정보고시<strong class="red">&nbsp;*</strong></th>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <dl class="explain fl">
                                    <dt><a href="http://www.ftc.go.kr/www/FtcRelLawUList.do?key=290&law_div_cd=07" target="blank"><strong class="red">※ 공정거래 위원회에서 공고한 전자상거래법 상품정보제공 고시에 관한 내용을 필독해 주세요!</strong></a></dt>
                                    <dd>전자상거래법에 의거하여 판매상품의 필수(상세)정보 등록이 필요합니다.</dd>
                                    <dd>등록된 정보는 쇼핑몰 상품상세페이지에 상품기본정보 아래에 표형태로 출력되어 보여집니다.</dd>
                                </dl>
                                <span class="fr"><a class="btn btn-primary" href="http://www.mallstore.co.kr/data/base/DownLoad/information/commodity_guide.zip">품목별 상품고시</a></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="notify">
                                <select name="productNotice" v-on:change="productNoticesFn">
                                    <option value="">등록할 상품의 상품군을 선택하세요</option>
                                </select>
                                <div class="fr">
                                    <b-button variant="secondary" size="sm" class="m-1" @click="addNotifyRow();">상품 추가</b-button>
                                    <!-- <b-button variant="danger" size="sm" class="m-1" onclick="delRowList('tb_notify');">상품 삭제</b-button> -->
                                </div>

                                <table id="notices" width="100%" summary="상품정보고시 목록 입니다.">
                                    <colgroup>
                                        <col width="20">
                                        <col width="100">
                                        <col width="*">
                                        <col width="20">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>항목</th>
                                            <th>내용</th>
                                            <th class="last"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in notify" :key="item.id">
                                            <td>{{index + 1}}</td>
                                            <td><input type="text" class="text_input" :name="item.itemObjName" :value="item.item" style="width: 90%;" maxlength="100" /></td>
                                            <td><textarea :name="item.contentObjName" rows="2" class="text_input" maxlength="200" v-model="item.content"></textarea></td>
                                            <td class="last"><b-button variant="light" size="sm" style="height: 23px" @click="notifyRemove(index)">항목삭제</b-button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <!-- 상품상세명 -->
                        <tr>
                            <th>상품설명<strong class="red">&nbsp;*</strong></th>
                            <td colspan="3" style="padding: 0px">
                                <quill-editor
                                    ref="detailDescriptionRef"
                                    class="quill-editor"
                                    :options="detailDescriptionOption"
                                    id="detailDescription"
                                    name="detailDescription"
                                    v-model="productData.detailDescription"
                                ></quill-editor>
                                <input type="file" id="detailDescriptionImage" accept="image/*" style="display:none" @change="detailDescriptionImage" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="box">
                <!-- 배송 옵션 -->
                <div class="section_head">
                    <h4><font-awesome-icon icon="info-circle" /> 배송비 옵션 <em>(선택하지 않을시 기본설정에 따릅니다.)</em></h4>
                </div>
                <table class="table t_form">
                    <tbody>
                        <tr>
                            <th>배송비 구분</th>
                            <td>
                                <dl class="delivery_method">
                                    <dt>
                                        <input type="radio" id="deliveryPriceTypeCode1" name="deliveryPriceTypeCode" v-model.number="productData.deliveryPriceTypeCode" value="1" @click="checkDeliveryMethod('deliveryPriceTypeCode1')">
                                        <label for="deliveryPriceTypeCode1">무료배송</label>
                                    </dt>
                                    <dd>해당상품을 무료배송합니다.</dd>

                                    <dt>
                                        <input type="radio" id="deliveryPriceTypeCode2" name="deliveryPriceTypeCode" v-model.number="productData.deliveryPriceTypeCode" value="2" @click="checkDeliveryMethod('deliveryPriceTypeCode2')">
                                        <label for="deliveryPriceTypeCode2">착불</label>
                                    </dt>
                                    <dd>
                                        <input type="text" name="debitAmount" class="text_input number_input debit" style="width: 70px" maxlength="10" v-on:keyup="numberWithCommasObj" disabled> 원 (무료배송 :
                                        <input type="text" name="debitfreeMinAmount" class="text_input number_input debit" style="width: 70px" maxlength="10" v-on:keyup="numberWithCommasObj" disabled> 원 이상 주문시 무료)
                                    </dd>
                                    <dt>
                                        <input type="radio" id="deliveryPriceTypeCode3" name="deliveryPriceTypeCode"  v-model.number="productData.deliveryPriceTypeCode" value="3"  @click="checkDeliveryMethod('deliveryPriceTypeCode3')">
                                        <label for="deliveryPriceTypeCode3">선불</label>
                                    </dt>
                                    <dd>
                                        <input type="text" name="prepaymentAmount" class="text_input prepay number_input" style="width: 70px" maxlength="10" v-on:keyup="numberWithCommasObj" disabled> 원 (무료배송 :
                                        <input type="text" name="prepayfreeMinAmount" class="text_input prepay number_input" style="width: 70px" maxlength="10" v-on:keyup="numberWithCommasObj" disabled> 원 이상 주문시 무료)
                                    </dd>
                                    <dt>
                                        <input type="radio" id="deliveryPriceTypeCode4" name="deliveryPriceTypeCode"  v-model.number="productData.deliveryPriceTypeCode" value="4" @click="checkDeliveryMethod('deliveryPriceTypeCode4')">
                                        <label for="deliveryPriceTypeCode4">판매자정책</label>
                                    </dt>
                                    <dd>판매자의 기본정책을 따릅니다.</dd>

                                    <dt>
                                        <input type="radio" id="deliveryPriceTypeCode5" name="deliveryPriceTypeCode"  v-model.number="productData.deliveryPriceTypeCode" value="5" checked @click="checkDeliveryMethod('deliveryPriceTypeCode5')">
                                        <label for="deliveryPriceTypeCode5">기본정책</label>
                                    </dt>
                                    <dd>쇼핑몰의 기본정책을 따릅니다.</dd>
                                </dl>

                                <dl class="explain blue mgt5">
                                    <dt><strong>※ 착불, 선불 배송비</strong></dt>
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
                                <input type="file" id="deliveryCommentHtmlImage" accept="image/*" style="display:none" @change="deliveryCommentHtmlImage" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 상품 옵션 -->
            <div class="box">
                <div class="section_head">
                    <h4><font-awesome-icon icon="info-circle" /> 상품옵션</h4>
                </div>
                <table class="table t_form">
                    <tbody>
                        <tr>
                            <th>옵션구분</th>
                            <td class="option_kind">
                                <ul>
                                    <li>
                                        <input type="radio" id="option_kind_1" name="optionTypeCode" value="1" @click="checkOptionKind('option_kind_1')" checked>
                                        <label for="option_kind_1">옵션없음</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="option_kind_2" name="optionTypeCode" value="2" @click="checkOptionKind('option_kind_2')">
                                        <label for="option_kind_2">일반옵션</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="option_kind_3" name="optionTypeCode" value="5" @click="checkOptionKind('option_kind_3')">
                                        <label for="option_kind_3">서술형옵션</label>
                                    </li>
                                </ul>
                                <ul class="option_explain blue mgt5">
                                    <li>상품 등록시 한가지 옵션만 선택이 가능하고, 등록 후 수정시에는 변경할 수 없습니다.<br>(단, "옵션없음" 상태에서 변경은 가능)</li>
                                </ul>
                            </td>
                        </tr>

                        <!-- # 일반옵션 ###################################################################### -->
                        <tr>
                            <td colspan="2">
                                <div class="option_tab option_kind_2_tab" style="display:none">
                                    <ul class="option_explain">
                                        <li>재고를 설정할 수 없는 입력방식입니다. (옵션가격 설정가능)</li>
                                        <li>각 옵션항목은 " <strong>;</strong> "로 구분하여 입력하고, 옵션가격이 있는 경우 각 옵션항목내에서 " <strong>^</strong> "로 구분하여 입력합니다.<br>(옵션가격이 없는 경우 제외 가능)</li>
                                        <li><strong class="red">옵션가격은 반드시 ","(콤마) 없이 숫자로만 입력해야 합니다.</strong></li>
                                        <li>품절된 옵션항목은 각 옵션항목의 마지막에 구분자를 삽입하고 <strong class="red">"품절"</strong> 을 입력해 주세요. 예)옵션^0^품절</li>
                                        <li>옵션항목은 최대 <strong class="red">2,000자</strong> 까지 입력할 수 있습니다.</li>
                                    </ul>

                                    <dl class="option_exam mgt10">
                                        <dt><strong>입력 예)</strong></dt>
                                        <dd>
                                            1. 기본입력: 선택안함;옵션 A^1000;옵션 B^-1000^품절;옵션 C^2000<br> 2. 품절입력: 옵션 A^품절;옵션 B^1500^품절;옵션 C^1000<br> 3. 추가구성: 선택안함;A상품^10000;B상품^11000<br>
                                        </dd>
                                    </dl>

                                    <div class="tr mgb5">
                                        <b-button @click="addProductOptionRow()" size="sm">옵션 추가</b-button>
                                    </div>
                                    <table id="tb_option_100" summary="상품 일반옵션 폼 테이블 입니다." class="option_gnenral">
                                        <caption>상품 일반옵션 폼 테이블</caption>
                                        <colgroup>
                                            <col width="10">
                                            <col width="50">
                                            <col width="*">
                                            <col width="10">
                                            <col width="10">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>옵션명</th>
                                                <th colspan="2">옵션항목</th>
                                                <th class="last"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in productsOptions" :key="item.id">
                                                <td>{{ index + 1}}</td>
                                                <td class="txt"><input type="text" :name=item.normalOptionName class="text_input" style="width: 90%;" maxlength="50"></td>
                                                <td><textarea rows="3" :name=item.normalOptionContent class="text_input" maxlength="2000" style="width: 100%" @keyup="setKeyUpCounter(item)"></textarea></td>
                                                <td class="size"><span :name=item.normalWordsize>0</span><span style="color:black">/200</span></td>
                                                <td><b-button variant="light" size="sm" @click="productsOptionRemove(index)">항목 삭제</b-button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="option_tab option_kind_3_tab" style="display:none">
                                    <ul class="option_explain">
                                        <li>일반옵션, 재고옵션을 사용하시기 어려운 경우, 서술형 옵션을 선택하시면 아래 입력한 내용이 구매자에게 안내되고,<br>상품구매옵션을 서술형으로 입력할 수 있습니다.</li>
                                    </ul>
                                    <dl class="option_exam mgt10">
                                        <dt><strong>입력 예)</strong></dt>
                                        <dd>
                                            넥타이타입은 A~J, 셔츠타입은 A~J, 사이즈는 95,100,105입니다. 원하는 색상 및 사이즈를 적어주세요.
                                        </dd>
                                    </dl>
                                    <div class="option_text">
                                        <textarea name="optionDescription" rows="3" class="text_input" maxlength="200"></textarea>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 추가 구성 -->
            <div class="box">
                <div class="section_head">
                    <h4><font-awesome-icon icon="info-circle" /> 추가구성</h4>
                </div>
                <table summary="추가 구성 등록 폼 입니다." class="t_form">
                    <tbody>
                        <tr>
                            <th>추가구성</th>
                            <td class="addition_usable">
                                <ul>
                                    <li><input type="radio" id="use_addition_0" name="isAddingProduct" v-model.number="productData.isAddingProduct" value=0 @click="checkUseAddition(0)" checked><label for="use_addition_0">미사용</label></li>
                                    <li><input type="radio" id="use_addition_1" name="isAddingProduct" v-model.number="productData.isAddingProduct" value=1 @click="checkUseAddition(1)"><label for="use_addition_1">사용</label></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="addition_container" style="display:none; width:100%">
                                    <ul class="over_h mgb10">
                                        <li class="fl">
                                            <b-button variant="secondary" id="allCheck" @click="cbAdtAll()">전체선택</b-button>
                                        </li>
                                        <li class="fr">
                                            <b-button @click="addAdditionOptionRow()">추가구성 추가</b-button>
                                        </li>
                                    </ul>
                                    <div class="addition_unit" v-for="(item, mainIndex) in additionOptions" :key="item.id">
                                        <dl class="addition_unit addition_dl">
                                            <dt>추가구성명</dt>
                                            <dd>
                                                <input type="text" :name="item.itemGroupName" class="text_input" maxlength="50"/>
                                            </dd>
                                        </dl>
                                        <table class="addition_unit addition_table" :name="item.detailsTable">
                                            <col width="*" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="9%" />
                                            <col width="9%" />
                                            <col width="10%" />
                                            <thead>
                                                <tr>
                                                    <th>추가구성항목</th>
                                                    <th>추가금액</th>
                                                    <th>재고수량</th>
                                                    <th>품절여부</th>
                                                    <th>숨김여부</th>
                                                    <th>
                                                        <b-button size="sm" style="height: 18px" @click="addSubAdditionOptionRow(item, mainIndex)">추가</b-button>
                                                        <b-button size="sm" style="height: 18px" variant="danger" @click="removeAdditionOptionRow(mainIndex)">삭제</b-button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(subItem, index) in item.subAdditionOptions" :key="subItem.id">
                                                    <td><input type="text" class="text_input" :name="subItem.item"/></td>
                                                    <td><input type="text" class="text_input number_input" :name="subItem.price" v-on:keyup="numberWithCommasObj"/></td>
                                                    <td><input type="text" class="text_input number_input" :name="subItem.stockQty" v-on:keyup="numberWithCommasObj"/></td>
                                                    <td style="vertical-align:middle">
                                                        <input type="checkbox" :name="subItem.isSoldout"/>
                                                    </td>
                                                    <td><input type="checkbox" :name="subItem.isHide"/></td>
                                                    <td><b-button variant="danger" size="sm" style="height: 17px; margin-left: 37px" @click="removeSubAdditionOptionRow(mainIndex, index)">삭제</b-button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn_center">
                <b-button variant="secondary" @click="SubmitAddProduct()">확인</b-button>&emsp;&emsp;
                <b-button variant="danger" @click="cancle('reload')">취소</b-button>
            </div>
        </form>
    </div>
</template>
<script>
import $ from 'jquery'
import Quill from 'quill'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { ImageUpload } from 'quill-image-upload'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
import commonJs from '@/assets/js/common.js'
// 이미지 업로드 등록시 함수
import ImagesUploader from '@/assets/js/ImagesUploader.js'
// 비디오 업로드 등록시 함수
import VideoUploader from '@/views/goods/GoodsReg/VideoUploader.js'
// 클릭이벤트 Mixins
import ClickEventMixin from '@/views/goods/ClickEventMixin.js'
// 상품등록 이벤트
import GoodsRegComponent from '@/views/goods/GoodsRegComponent.js'
// 이미지 업로드 메뉴
import ImageComponent from '@/views/goods/GoodsReg/ImageComponent.js'
// 영상 업로드 메뉴
import VideoComponent from '@/views/goods/GoodsReg/VideoComponent.js'
// 정보 고시 입력 메뉴
import ProductNoticesComponent from '@/views/goods/GoodsReg/ProductNoticesComponent.js'
// 상품옵션 메뉴
import NormalOptionComponent from '@/views/goods/GoodsReg/NormalOptionComponent.js'
// 추가구성 메뉴
import AdditionOptionComponent from '@/views/goods/GoodsReg/AdditionOptionComponent.js'

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register('modules/imageUpload', ImageUpload)
export default {
  name: 'GoodsReg',
  props: [],
  mixins: [
    commonJs,
    ImagesUploader,
    VideoUploader,
    ImageComponent,
    VideoComponent,
    AdditionOptionComponent,
    ProductNoticesComponent,
    NormalOptionComponent,
    ClickEventMixin,
    GoodsRegComponent
  ],
  components: {
      quillEditor
  },
  data () {
    return {
      commonSellerCounter: 2,
      DateObject: {
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: ''
      },
      feeRateObject: {
          defaultFeeRate: true,
          makeVideoFeeRate: false,
          influencerFeeRate: false,
      },
      commonSellers: [{id: 1, peopleObjName: 'peopleObjectName1', discountObjName: 'discountObjName1'}],
      detailDescriptionOption: {
        modules: {
            toolbar: {
                container:[
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image']
                ],
                handlers: {
                    'image': function () {
                        document.getElementById('detailDescriptionImage').click()
                    }
                }
            },
            imageDropAndPaste: {
                handler: this.detailDescriptionimageHandler
            }
        },
        placeholder: '내용을 입력해주세요...'
      },
      deliveryCommentHtmlOption: {
        modules: {
            toolbar: {
                container:[
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image']
                ],
                handlers: {
                    'image': function () {
                        document.getElementById('deliveryCommentHtmlImage').click()
                    }
                }
            }
            ,
            imageDropAndPaste: {
                handler: this.deliveryCommentHtmlimageHandler
            }
        },
        placeholder: '내용을 입력해주세요...'
      }
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    discountFn: function (){
        if (this.commonSellers.length >=10) {
            alert('더이상 할인범위를 추가할수 없습니다.')
            return false
        }
        var cnt = this.commonSellerCounter++
        this.commonSellers.push({id: cnt, peopleObjName: 'peopleObjName' + cnt, discountObjName: 'discountObjName' + cnt})
    },
    detailDescriptionImage: function (event) {
        var obj = this.$refs.detailDescriptionRef.quill
        var cursorLocation = obj.getSelection(true)
        this.onEditorImagesUploaderEvent(event.target.files[0], obj, cursorLocation.index)
    },
    deliveryCommentHtmlImage: function (event) {
        var obj = this.$refs.deliveryCommentHtmlRef.quill
        var cursorLocation = obj.getSelection(true)
        this.onEditorImagesUploaderEvent(event.target.files[0], obj, cursorLocation.index)
    },
    detailDescriptionimageHandler: function (imageDataUrl, type) {
        var ext = type.split('/')
        var imageExt = ext[1]
        var blob = this.dataURItoBlob(imageDataUrl)
        var file = this.blobToFile(blob, 'temp.'+imageExt)
        var cursorLocation = this.$refs.detailDescriptionRef.quill.getSelection(true)
        this.onEditorImagesUploaderEvent(file, this.$refs.detailDescriptionRef.quill, cursorLocation.index)
    },
    deliveryCommentHtmlimageHandler: function (imageDataUrl, type) {
        var ext = type.split('/')
        var imageExt = ext[1]
        var blob = this.dataURItoBlob(imageDataUrl)
        var file = this.blobToFile(blob, 'temp.'+imageExt)
        var cursorLocation = this.$refs.deliveryCommentHtmlRef.quill.getSelection(true)
        this.onEditorImagesUploaderEvent(file, this.$refs.deliveryCommentHtmlRef.quill, cursorLocation.index)
    },
    SubmitAddProduct: function () {
      this.submitValidate(document.Frm)
    },
    onVideoObjOpenFn: function (id) {
        $('#' + id).click()
        return true
    },
    onImageObjOpenFn: function (id) {
        $('#' + id).click()
        return true
    },
    initial: function () {
      var productNoticesFn = function (res) {
        //   productNotice
        var productNoticeObj = document.Frm.productNotice
        var productNoticeData = res.data.jsonData.productNotices
        for (var i = 0; i < productNoticeData.length; i++) {
          $(productNoticeObj).append('<option value=' + productNoticeData[i].prdtNoticeBaseSysId + '>' + productNoticeData[i].groupName + '</option>')
        }
      }
      this.axiosGetRequest('http://api.shallwe.shop/api/v1/preferences/productNotices', '', productNoticesFn)

      // 판매자 초기 로딩
      var sellerInitFn = function (res) {
        var selleries = res.data.jsonData.sellers
        var sellersObj = document.Frm.sellers
        for (var i = 0; i < selleries.length; i++) {
          $(sellersObj).append('<option value=' + selleries[i].sellerSysId + '>' + selleries[i].name + '</option>')
        }
      }
      this.axiosGetRequest('http://api.shallwe.shop/api/v1/sellers/bases', '', sellerInitFn)

      // 카테고리 초기 로딩
      var categoryInitFn = function (res) {
        var categories = res.data.jsonData.categories
        var categoryObj = document.Frm.category1
        var object
        for (var i = 0; i < categories.length; i++) {
          object = categories[i]
          $(categoryObj).append('<option value=' + object.categorySysId + ' data-parent=' + object.parentSysId + ' data-feerate=' + object.feeRate + '>' + object.name + '[' + (object.feeRate * 100) + '%]' + '</option>')
        }
      }
      this.axiosGetRequest('http://api.shallwe.shop/api/v1/categories', {categoryLevel: 1}, categoryInitFn)
    }
  }
}
</script>
<style>
    .quill-editor{
        width: 100%;
        height: 100%;
    }
    .ql-editor{
        min-height: 350px;
    }
    .progress-bar span{
        color: white;
    }
</style>
