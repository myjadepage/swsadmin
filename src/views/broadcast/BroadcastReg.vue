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
              <th>상품분류(카테고리) <strong class="red">*</strong></th>
              <td colspan="3">
                <sws-category :selectedCategory="categoryList"></sws-category>               
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
import SwsCategory from '@/components/common/SwsCategory.vue'
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
    SwsCategory,
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
      categoryList: []
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
