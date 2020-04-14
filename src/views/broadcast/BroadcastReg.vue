<template>
  <div id="contents">
       <h3><font-awesome-icon icon="play-circle" /> {{ $route.name }}</h3>
    <ul class="navi">
      <li class="home">
        <a href="/" target="_top">홈</a>
      </li>
      <li>방송관리</li>
      <li class="on">{{ $route.name }}</li>
    </ul>

    <form name="Frm" enctype="multipart/form-data" onsubmit="return false">
      <div class="box">
        <table name="categories" class="t_form">         
          <colgroup>
            <col width="170" />
            <col width="*" />
            <col width="140" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>방송 분류 <strong class="red">*</strong></th>
              <td colspan="3">
                <b-row cols="14">
                  <b-col cols="1">
                    <div class="form-check">
                      <input class="form-check-input" type="radio"  value="1" name="broadType1" id="broadType1"
                        v-model.number="broadcastData.broadType"/>
                      <label class="form-check-label" for="broadType1">라이브</label>
                    </div>
                  </b-col>
                  <b-col cols="2">
                    <div class="form-check">
                      <input class="form-check-input" type="radio"  value="2" name="broadType2" id="broadType2"
                        v-model.number="broadcastData.broadType"/>
                      <label class="form-check-label" for="broadType2">동영상 방송</label>
                    </div>
                  </b-col>
                </b-row>
              </td>
            </tr>
            <tr>
              <th>방송명 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="text" name="briefComment" class="text_input" style="width:98%" value maxlength="20" v-model="broadcastData.broadname" />
              </td>
            </tr>

            <tr>
              <th>공지사항 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="text" name="briefDescription" class="text_input" style="width:98%" value maxlength="50" v-model="broadcastData.broadnotice"/>
              </td>
            </tr>
            <tr>
              <th>태그 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="text" name="name" class="text_input" style="width:98%" maxlength="100" v-model="broadcastData.tag" />
              </td>
            </tr>

             <!-- 상품 이미지 : 시작 -->
            <tr>
              <th>커버 이미지 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="file" name="coverImageUrl" id="coverImageUrl" @change.prevent="validateImageRatioFn($event, {width: 1080, height: 1080})" data-valid="false" accept="image/*" :data-imageurl="broadcastData.coverImageUrl"/>
              </td>
            </tr>

            <tr>
              <th>라이브 판매가 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="text" name="price" class="text_input" style="width:98%" v-model="broadcastData.price"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

       <div class="box">
        <table name="categories" class="t_form">         
          <colgroup>
            <col width="170" />
            <col width="*" />
            <col width="140" />
            <col width="*" />
          </colgroup>
          <tbody>
            <!-- 상품분류(카테고리) -->
            <tr>
              <th rowspan="2">상품분류(카테고리) <strong class="red">*</strong></th>
              <td colspan="3">
                <select id="category1" name="category1" @change="onCategorySelector($event, 1)" v-model="selectedCategoryRow[0]" class="text-danger" >
                  <option v-for="(option, inx) in category1" :key="inx" :value="option">{{ option.text }}</option>
                </select>
                <select id="category2" name="category2" @change="onCategorySelector($event, 2)" v-model="selectedCategoryRow[1]" class="text-danger">
                  <option v-for="(option, inx) in category2" :key="inx" :value="option">{{ option.text }}</option>
                </select>
                <select id="category3" name="category3" @change="onCategorySelector($event, 3)" v-model="selectedCategoryRow[2]">
                  <option v-for="(option, inx) in category3" :key="inx" :value="option">{{ option.text }}</option>
                </select>
                <select id="category4" name="category4" @change="onCategorySelector($event, 4)" v-model="selectedCategoryRow[3]">
                  <option v-for="(option, inx) in category4" :key="inx" :value="option">{{ option.text }}</option>
                </select>
                <select id="category5" name="category5" data-required="false" v-model="selectedCategoryRow[4]">
                  <option v-for="(option, inx) in category5" :key="inx" :value="option">{{ option.text }}</option>
                </select>
                <button type="button" class="btn btn-sm btn-secondary" v-on:click="addCate">추가</button>
              </td>
            </tr>

            <tr>
              <td colspan="3" class="category">
                <category-component :productData="broadcastData" :selectedCategoryTable="selectedCategoryTable" :categoryTable="categoryTable" @addSelect="onSelectCate" ></category-component>
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
              <th>간략한 설명 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="text" name="briefComment" class="text_input" style="width:98%" value maxlength="20" v-model="broadcastData.briefComment" />
              </td>
            </tr>

            <tr>
              <th>방송시간 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <b-row>
                    <b-col cols="2">
                        <b-input-group>
                            <b-form-input size="sm" id="startDate" v-model="DateObject.startDate" type="text" placeholder="방송일자"></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker button-variant="outline-secondary" size="sm" v-model="DateObject.startDate"
                                 @click="convertDateFormat('startDate')" button-only right>
                                </b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col cols="2">
                        <b-input-group>
                            <b-form-input size="sm" id="startTime" v-model="DateObject.startTime" type="text" placeholder="방송시간"></b-form-input>
                            <b-input-group-append>
                                <b-form-timepicker button-variant="outline-secondary" size="sm" v-model="DateObject.startTime"
                                 @change="convertDateFormat('startTime')" button-only right>
                                </b-form-timepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col> 
                </b-row>
              </td>
            </tr>

            <tr>
              <th>상품명 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <input type="text" name="prdname" class="text_input" style="width:98%" maxlength="100" v-model="broadcastData.prdname" />
              </td>
            </tr>
            
            <tr>
              <th>판매자 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <Sws-seller
                  :parentData="broadcastData"
                  @changeFn="resultSeller"
                ></Sws-seller>
              </td>
            </tr>

            <tr>
              <th>브랜드 <strong class="red">&nbsp;*</strong></th>
              <td colspan="3">
                <Sws-brand ref="brand"
                  :parentData="broadcastData"
                >
                </Sws-brand>
              </td>
            </tr>
          </tbody>
        </table>
       </div>
       <div class="box">
           <AddProduct></AddProduct>
       </div>
    </form>
  </div>
</template>

<script>
import commonJs from "@/assets/js/common.js"
import SwsBrand from '@/components/common/SwsBrand'
import CategoryComponent from "@/components/goodsReg/CategoryComponent"
import ClickEventMixin from "@/components/goodsReg/ClickEventMixin.js"
import ImagesUploader from "@/assets/js/ImagesUploader.js"
import SwsSeller from '@/components/common/SwsSeller'
import AddProduct from '@/components/broadcast/AddProduct'

export default {
  mixins: [
    commonJs,
    ImagesUploader,
    ClickEventMixin,
  ],
  components: {
    SwsBrand,
    CategoryComponent,
    SwsSeller,
    AddProduct
  },
  data() {
    return {
      broadcastData:{
          broadType:1
      },
      DateObject: {
        startDate: '',
        startTime: ''
      },
      brands: [{ value: 0, text: "::브랜드를 선택해주세요::" }],
      videos: [
        {mediaTypeCode: 1, title: '', videoTitle: '', progressValue: 0, progressMax: 0, mediaId: '', thumnailUrl: '', procTypeCode: 2}
      ],
      selectedCategoryRow: [
        { value: 0, text: "1차카테고리 필수", parentSysId: '', feeRate: '' },
        { value: 0, text: "2차카테고리 필수", parentSysId: '', feeRate: '' },
        { value: 0, text: "3차카테고리 선택", parentSysId: '', feeRate: '' },
        { value: 0, text: "4차카테고리 선택", parentSysId: '', feeRate: '' },
        { value: 0, text: "5차카테고리 선택", parentSysId: '', feeRate: '' }
      ],
      categoryTable: [],
      selectedCategoryTable: '',
      category1: [
        { value: 0, text: "1차카테고리 필수", parentSysId: '', feeRate: '' }
      ],
      category2: [
        { value: 0, text: "2차카테고리 필수", parentSysId: '', feeRate: '' }
      ],
      category3: [
        { value: 0, text: "3차카테고리 선택", parentSysId: '', feeRate: '' }
      ],
      category4: [
        { value: 0, text: "4차카테고리 선택", parentSysId: '', feeRate: '' }
      ],
      category5: [
        { value: 0, text: "5차카테고리 선택", parentSysId: '', feeRate: '' }
      ]
    }
  },
  methods: {
    resultSeller: function (val) {
      this.$refs.brand.changeSellerFn(val)
    }
  }
}
</script>

<style scope>
.b-form-date-calendar header,
.b-form-date-calendar footer,
.b-time header {
    display: none;
}

</style>
