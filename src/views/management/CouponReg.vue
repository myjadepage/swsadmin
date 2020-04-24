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
                                              <input class="form-check-input" type="radio" name="method" id="method_1" value="1" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_1">상품 발급</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_2" value="2" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_2">구매보상 발급</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_3" value="3" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_3">회원선택 발급</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="method" id="method_4" value="4" v-model.number="couponType"/>
                                              <label class="form-check-label" for="method_4">회원가입 발급</label>
                                            </div>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <!-- 공통필드 -->
                            <tr>
                                <th><span class="red">*</span> 쿠폰명</th>
                                <td><input type="text" name="title" class="text_input" style="width:97%" maxlength="50" v-model="name"></td>
                                <th>간략 설명</th>
                                <td><input type="text" name="summary" class="text_input" style="width:97%" maxlength="100" v-model="comment"></td>
                            </tr>

                            <!-- 쿠폰방식101 :  상품발급 -->
                        <template>
                            <tr class="method_goods" style="display:table-row" v-if="couponType===1 || couponType===2">
                                <th><span class="red">*</span> 진행기간</th>
                                <td colspan="3">
                                    <!-- 달력 -->
                                    <b-row>
                                        <b-col cols="2">
                                            <b-input-group>
                                                <b-form-input size="sm" v-model="couponData.startDate" type="text" placeholder="시작일자 (YYYY-MM-DD)"></b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="couponData.startDate" button-only right></b-form-datepicker>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>
                                        <b-col cols="2">
                                            <b-input-group>
                                                <b-form-input size="sm" v-model="couponData.endDate" type="text" placeholder="종료일자 (YYYY-MM-DD)"></b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="couponData.endDate" button-only right></b-form-datepicker>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>                                         
                                    </b-row>
                                    <!-- <sws-date :parentData="couponData"></sws-date>                             -->
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
                                                    <input type="text" id="useLimitDay" name="useLimitDay" min="0" class="text_input" style="width:100px; margin-right:5px; text-align:right" 
                                                      :disabled="isUseLimitDay !== 1" v-model="useLimitDay">
                                                      <b-button-group size="sm">
                                                        <b-button variant="outline-secondary" :disabled="isUseLimitDay !== 1" @click="increment" ><font-awesome-icon icon="angle-up" /></b-button>
                                                        <b-button variant="outline-secondary" :disabled="isUseLimitDay !== 1" @click="decrement" ><font-awesome-icon icon="angle-down" /></b-button>
                                                      </b-button-group> 일간 사용 
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
                                            <b-row>
                                                <b-col cols="2">
                                            <b-input-group>
                                                <b-form-input :disabled="isUseLimitDay === 1" size="sm" v-model="couponData2.startDate" type="text" placeholder="시작일자 (YYYY-MM-DD)"></b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker :disabled="isUseLimitDay === 1" button-variant="outline-secondary" size="sm" v-model="couponData2.startDate" button-only right></b-form-datepicker>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>
                                        <b-col cols="2">
                                            <b-input-group>
                                                <b-form-input :disabled="isUseLimitDay === 1" size="sm" v-model="couponData2.endDate" type="text" placeholder="종료일자 (YYYY-MM-DD)"></b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker :disabled="isUseLimitDay === 1" button-variant="outline-secondary" size="sm" v-model="couponData2.endDate" button-only right></b-form-datepicker>
                                                </b-input-group-append>
                                            </b-input-group>
                                        </b-col>     
                                            </b-row>

                                            <!-- <sws-date :parentData="couponData2"></sws-date>                        -->
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
                                    <input type="text" name="discountValue" class="text_input" style="width:80px;" maxlength="10" v-model="discountWidth">
                                    
                                    <label style="margin-right:20px"><input type="radio" name="discountUnit" value="100" v-model.number="discountUnit"> 원</label>
                                    <label><input type="radio" name="discountUnit" value="200" v-model.number="discountUnit"> %</label>

                                    <strong class="mgl20">최대할인금액 </strong>
                                    <input type="text" name="maxDiscountPrice" class="text_input" style="width:80px;" v-model="maxDiscountPrice"
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
                                            <input type="text" name="useLowPrice" class="text_input" style="width:70px;" v-model="minMax2ndTypeMinPrice"> 원 이상
                                            <input type="text" name="useHighPrice" class="text_input" style="width:70px;" v-model="minMax2ndTypeMaxPrice"> 원 이하
                                        </label>
                                    </div>
                                    <div class="square_blue">"최소, 최대금액중 하나는 0원 이상으로 반드시 입력해야 합니다."</div>
                                </td>
                            </tr>

                            <tr class="method_goods" style="display:table-row" v-if="couponType===1 || couponType===2">
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
                            <tr class="method_goods" style="display:table-row" v-if="couponType===1 || couponType===2">
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
                                    <input type="file" name="couponImageUrl" id="couponImageUrl" ref="couponImg"  data-valid="false" accept="image/*" :data-imageurl="couponImageUrl"/>
                                    <template v-if="couponImageUrl !== ''">
                                    <p v-if="couponImageUrl">
                                        <b>이미지 존재함 :</b>
                                        {{couponImageUrl}}
                                    </p>
                                    </template>
                                </td>
                            </tr>

                            <tr v-if="couponType===2">
                                <th>발급상품</th>
                                <td colspan="3">
                                    <div style="width:100%">
                                            <select id="applyGoods" name="applyGoods" class="text_input" multiple size="5" style="width:100%; height: auto;">
                                                <option class="issueOption" v-for="(id,idx) in issuedPrdtIds" :key="idx" :value="idx">{{issuedPrdtNames[idx]}}</option>
                                            </select>
                                            <div class="mgt5">
                                                <div>
                                                    <b-button @click="prdtDeleteBtnClick('issueGoods')" variant="outline-danger" style="margin-right:5px">삭제</b-button>
                                                    <b-button @click="prdtSelectBtnClick('issueGoods')" variant="outline-secondary" class="fr">상품선택</b-button>
                                                </div>
                                            </div>
                                        </div>
                                </td>
                            </tr>

                            <tr v-if="couponType===3">
                                <th>발급회원</th>
                                <td colspan="3">
                                    <div style="width:100%">
                                            <select id="applyGoods" name="applyGoods" class="text_input" multiple size="5" style="width:100%; height: auto;">
                                                <!-- <option class="issueOption" v-for="(id,idx) in issuedPrdtIds" :key="idx" :value="idx">{{issuedPrdtNames[idx]}}</option> -->
                                            </select>
                                            <div class="mgt5">
                                                <div>
                                                    <b-button @click="memberDeleteBtnClick" variant="outline-danger" style="margin-right:5px">삭제</b-button>
                                                    <b-button @click="memberSelectBtnClick" variant="outline-secondary" class="fr">추가</b-button>
                                                    <select name="" id="" class="member-select fr mt-1" :style="{width:'200px'}" v-model="selectMemberType">
                                                        <optgroup label="회원별 추가">
                                                            <option value="select">회원선택</option>
                                                            <option value="all">전체회원</option>
                                                        </optgroup>
                                                        <optgroup label="등급별 추가">
                                                            <option value="0">일반회원</option>
                                                            <option value="1">코알라회원</option>
                                                        </optgroup>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
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
                                            <select :disabled="applyMode!==2" id="applyGoods" name="applyGoods" class="text_input" multiple size="5" style="width:100%; height: auto;">
                                                <option class="applyOptions" v-for="(id,idx) in appliedPrdtIds" :key="idx" :value="idx">{{appliedPrdtNames[idx]}}</option>
                                            </select>
                                            <div class="mgt5">
                                                <div class="btn_right">
                                                    <b-button :disabled="applyMode!==2" @click="prdtDeleteBtnClick('applyGoods')" variant="outline-danger" style="margin-right:5px">삭제</b-button>
                                                    <b-button :disabled="applyMode!==2" @click="prdtSelectBtnClick('applyGoods')" variant="outline-secondary">상품선택</b-button>
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
                                            <sws-category :disabled="applyMode!==3" :selectedCategory="categoryList"></sws-category>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr v-if="couponType===1 || couponType===2">
                                <th>쿠폰갯수</th>
                                <td colspan="3">
                                    <label>
                                        <input type="text" name="issueLimit" class="text_input" style="width:70px;" maxlength="10" v-model="couponCnt"> 개
                                    </label>
                                    <span class="square_blue">"쿠폰 갯수를 제한하여 선착순으로 발급할 수 있습니다."</span>
                                </td>
                            </tr>
                        </template>
                        
                        
                    <!-- 공통 필드-->
                     <tr>
                        <th>재발급여부</th>
                        <td colspan="3">
                            <ul class="arrange">
                                <li>
                                    <input type="radio" id="reissue_none" name="reissue" value="0" v-model="repubType" />
                                    <label for="reissue_none">재발급 안함</label>
                                </li>
                                <li class="mgl10">
                                    <input type="radio" id="reissue_cancel" name="reissue" value="1" v-model="repubType" />
                                    <label for="reissue_cancel">취소시 재발급</label>
                                </li>
                                <li class="mgl10">
                                    <input type="radio" id="reissue_return" name="reissue" value="2" v-model="repubType" />
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
                                    <input type="radio" id="use_t" name="isUse" value="1"  checked v-model="isUsed" />
                                    <label for="use_t">사용함</label>
                                </li>
                                <li class="mgl10">
                                    <input type="radio" id="use_f" name="isUse" value="0" v-model="isUsed"  />
                                    <label for="use_f">사용하지 않음</label>
                                </li>
                            </ul>
                        </td>
                     </tr>
                        </tbody>
                    </table>

                    <div class="btn_center">
                        <b-button @click="submit" variant="outline-info" size="lg" style="margin-right:5px">확인</b-button>
                        <b-button @click="$router.push('/management/coupon_list')" variant="outline-danger" size="lg">취소</b-button>
                    </div>

                </form>
  </div>
</template>

<script>
import commonJs from "@/assets/js/common.js"
// import SwsDate from '@/components/common/SwsDate'
import SwsCategory from '@/components/common/SwsCategory.vue'
import ImagesUploader from "@/assets/js/ImagesUploader.js"
import moment from 'moment'

export default {
    name: "CouponReg",
    mixins: [
        commonJs,
        ImagesUploader,
    ],
    components: {
        // SwsDate,
        SwsCategory
    },
    data() {
        return {
            couponType:1,
            couponData: {
                startDate: '',
                endDate: '',
            },
            couponData2: {
                startDate: '',
                endDate: '',
            },
            useLimitDay:0,
            isUseLimitDay: 1,
            discountUnit: 100,
            discountWidth:0,
            couponImageUrl:'',
            maxDiscountPrice:0,
            minMax2ndTypeMinPrice:0,
            minMax2ndTypeMaxPrice:0,
            appliedPrdtIds:[],
            appliedPrdtNames:[],
            issuedPrdtIds:[],
            issuedPrdtNames:[],
            useWeekend:0,
            isUseLimitPrice:1,
            memberLevel: [],
            memberLevelList:['1', '4'],
            applyMode:1,
            categoryList: [],
            couponCnt:0 ,
            repubType:0,
            isUsed:1,
            name:'',
            comment:'',
            prdtWIndow:undefined,
            selectMemberType:'select',
            selectedMembers:[]
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
    },
    methods: {
        increment () {
            this.useLimitDay += 1;
        },
        decrement () {
            if(this.useLimitDay === 0 || this.useLimitDay < 0) {
                this.useLimitDay = 0
            } else {
                this.useLimitDay -= 1;
            }
        },
        
        submit(){
            let item = {
                name:this.name,
                comment:this.comment,
                couponType:this.couponType,
                startProcDate:this.couponData2.startDate,
                endProcDate:this.couponData2.endDate,
                procType:this.useWeekend,
                discountWidth:Number(this.discountWidth),
                discountWidthUnit:this.discountUnit,
                maxDiscount:Number(this.maxDiscountPrice),
                minMaxType:Number(this.isUseLimitPrice),
                minMax2ndTypeMinPrice:Number(this.minMax2ndTypeMinPrice),
                minMax2ndTypeMaxPrice:Number(this.minMax2ndTypeMaxPrice),
                userGradeList:this.memberLevel.join(),
                couponImageUrl:'',
                appliedProdcutType:this.applyMode,
                appliedPrdtSysIdList:this.appliedPrdtIds.join(),
                appliedCategorySysId1:this.categoryList[0].value,
                appliedCategorySysId2:null,
                appliedCategorySysId3:null,
                couponCount:this.couponCnt,
                repubType:Number(this.repubType),
                isUsed:Number(this.isUsed)
            }
            

            if(this.categoryList[1].value!==0){
                item.appliedCategorySysId2 = this.categoryList[1].value
            }
            if(this.categoryList[2].value!==0){
                item.appliedCategorySysId3 = this.categoryList[2].value
            }

            if(this.isUseLimitDay===1){
                item.startProcDate = moment(new Date()).format('YYYY-MM-DD')
                item.endProcDate = moment(new Date()).add(this.useLimitDay,'d').format('YYYY-MM-DD')
            }
            
            // this.axiosPostRequest('api/v1/operations/products/coupons',{jsonData:item},
            // (res)=>{
            //     console.log(res);
            // })

            console.log(item);
        },

        prdtSelectBtnClick(target){
                if(typeof(this.prdtWIndow) == 'undefined' || this.prdtWIndow.closed){
                    this.prdtWIndow = window.open(`/management/coupon_reg/selectGoods?target=${target}`, '_blank', 'toolbar=no, menubar=no, scrollbars=yes, resizable=yes width=1280 height=650')
                    this.prdtWIndow.addEventListener('addItem',(e)=>{
                        if(e.detail.selectPrdts){
                            if(target==='issueGoods'){
                                for (const item of e.detail.selectPrdts) {
                                    if(!this.issuedPrdtIds.includes(item[0])){
                                        this.issuedPrdtIds.push(item[0])
                                        this.issuedPrdtNames.push(item[1])
                                    }
                                }
                            }else{
                                for (const item of e.detail.selectPrdts) {
                                    if(!this.appliedPrdtIds.includes(item[0])){
                                        this.appliedPrdtIds.push(item[0])
                                        this.appliedPrdtNames.push(item[1])
                                    }
                                }
                            }
                        }
                })

                } else {
                this.prdtWIndow.location.href = `/management/coupon_reg/selectGoods?target=${target}`;
                this.prdtWIndow.focus();
                }
        },

        prdtDeleteBtnClick(target){
            if(target==='issueGoods'){
                for (let i = this.$el.getElementsByClassName('issueOption').length-1; i >= 0; i--) {
                    const opt = this.$el.getElementsByClassName('issueOption')[i]
                    if(opt.selected){
                        this.issuedPrdtIds.splice(opt.value,1)
                        this.issuedPrdtNames.splice(opt.value,1)
                    }
                }
            }else{
                for (let i = this.$el.getElementsByClassName('applyOptions').length-1; i >= 0; i--) {
                    const opt = this.$el.getElementsByClassName('applyOptions')[i]
                    if(opt.selected){
                        this.appliedPrdtIds.splice(opt.value,1)
                        this.appliedPrdtNames.splice(opt.value,1)
                    }
                }
            }
            this.$forceUpdate()
        },
        memberDeleteBtnClick(){

        },
        memberSelectBtnClick(){
            switch (this.selectMemberType) {
                case 'select':
                    if(typeof(this.prdtWIndow) == 'undefined' || this.prdtWIndow.closed){
                    this.prdtWIndow = window.open(`/management/coupon_reg/selectMember`, '_blank', 'toolbar=no, menubar=no, scrollbars=yes, resizable=yes width=1280 height=650')
                    this.prdtWIndow.addEventListener('addMember',(e)=>{
                        console.log(e);
                      })
                    }else{
                    this.prdtWIndow.location.href = `/management/coupon_reg/selectMember`;
                    this.prdtWIndow.focus();
                    }
                    break;
                case 'all':
                    
                    break;
                default:
                    break;
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