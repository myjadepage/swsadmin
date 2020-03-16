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

        <form name="sFrm" onsubmit="return false">
            <div class="box">
                <table class="t_form">
                    <colgroup>
                        <col width="170">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>상품분류</th>
                            <td>
                                <div class="fl mgr5">
                                    <select id="selectedCategory1" name="selectedCategory" v-model="FilterFields.selectedCategory1" data-level="1" @change="changeSelectBox">
                                        <option v-for="(item, index) in selectbox1" :key="index" :value="item.value">{{item.text}}</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select id="selectedCategory2" name="selectedCategory" v-model="FilterFields.selectedCategory2" data-level="2" @change="changeSelectBox">
                                        <option v-for="(item, index) in selectbox2" :key="index" :data-level="item.level" :value="item.value">{{item.text}}</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select id="selectedCategory3" name="selectedCategory" v-model="FilterFields.selectedCategory3" data-level="3" @change="changeSelectBox">
                                        <option v-for="(item, index) in selectbox3" :key="index" :data-level="item.level" :value="item.value">{{item.text}}</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select id="selectedCategory4" name="selectedCategory" v-model="FilterFields.selectedCategory4" data-level="4" @change="changeSelectBox">
                                        <option v-for="(item, index) in selectbox4" :key="index" :data-level="item.level" :value="item.value">{{item.text}}</option>
                                    </select>
                                </div>
                                <div class="fl mgr5">
                                    <select id="selectedCategory5" name="selectedCategory" v-model="FilterFields.selectedCategory5">
                                        <option v-for="(item, index) in selectbox5" :key="index" :data-level="item.level" :value="item.value">{{item.text}}</option>
                                    </select>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <th>그룹별</th>
                            <td>
                                <select id="sbrand" name="sbrand" v-model="FilterFields.selectedBrand">
                                    <option value="">브랜드</option>
                                    <option v-for="(item, index) in brands" :key="index" :value="item.value">{{item.text}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>상품등록일</th>
                            <td>
                                <b-row>
                                    <b-col cols="2">
                                        <b-form-datepicker id="startDate" placeholder="시작일자 선택" ></b-form-datepicker>
                                    </b-col>
                                    <b-col cols="2">
                                        <b-form-datepicker id="endDate" placeholder="종료일자 선택" ></b-form-datepicker>
                                    </b-col>
                                </b-row>
                            </td>
                        </tr>
                        <tr>
                            <th>상품판매자</th>
                            <td>
                                <select id="sdealer" name="sdealer" class="text_input" v-model="FilterFields.selectedSeller">
                                    <option value="">선택하세요</option>
                                    <option v-for="(item, index) in sellers" :key="index" :value="item.value">{{ item.text }}</option>
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
                                <input type="text" name="ssprice" class="text_input number_input" v-model="FilterFields.minPrice"> 원 ~
                                <input type="text" name="seprice" class="text_input number_input" v-model="FilterFields.maxPrice"> 원
                            </td>
                        </tr>
                        <tr>
                            <th>직접검색</th>
                            <td>
                                <select id="skey" name="skey" class="text_input" style="width: 150px;">
                                    <option value="name">상품명</option>
                                    <option value="code">상품코드</option>
                                </select>
                                <input type="text" name="sword" class="text_input" v-model="FilterFields.FieldText">
                                <button class="btn btn-sm btn-secondary" type="submit">검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
        <Goods-list-table :FilterFields="FilterFields"></Goods-list-table>
    </div>
</template>
<script>
import commonJs from '@/assets/js/common.js'
import GoodsListTable from './GoodsList/GoodsListTable'
export default {
  data () {
      return {
        selectbox1: [
            {value:'', text: '::1차 카테고리::'}
        ],
        selectbox2: [
            {value:'', text: '::2차 카테고리::'}
        ],
        selectbox3: [
            {value:'', text: '::3차 카테고리::'}
        ],
        selectbox4: [
            {value:'', text: '::4차 카테고리::'}
        ],
        selectbox5: [
            {value:'', text: '::5차 카테고리::'}
        ],
        brands: [],
        sellers: [],
        FilterFields: {
            selectedCategory1: '',
            selectedCategory2: '',
            selectedCategory3: '',
            selectedCategory4: '',
            selectedCategory5: '',
            selectedBrand: '',
            selectedSeller: '',
            minPrice: 0,
            maxPrice: 0,
            FieldText: ''
        }
      }
  },
  mixins: [commonJs],
  components: {
      GoodsListTable
  },
  mounted () {  
    this.axiosGetRequest('/api/v1/categories', {categoryLevel: 1}, this.initialSelectbox)
    this.axiosGetRequest('/api/v1/brands','',this.initialBrands)
    this.axiosGetRequest('/api/v1/sellers/bases', '', this.initialSellers)
  },
  methods: { 
      initialSelectbox: function (res) {
          var data = res.data.jsonData.categories
          data.forEach(item => {
              this.selectbox1.push({value: item.categorySysId, text: item.name})
          })
      },
      initialBrands: function (res) {
          var data = res.data.jsonData.brands
          data.forEach(item => {
              this.brands.push({value: item.brandSysId, text: item.name})
          })
      },
      initialSellers: function (res) {
          var data = res.data.jsonData.sellers
          data.forEach(item => {
              this.sellers.push({value: item.sellerSysId, text: item.name})
          })
      },
      changeSelectBox: function (event) {
            var eventTarget = event.target
            var targetObject = eventTarget.dataset
            this.axiosGetRequest(
                '/api/v1/categories', 
                {categoryLevel: (parseInt(targetObject.level) + 1), parentSysId: this['selectedCategory' + targetObject.level]}, 
                this.loadSelectBox
            )
            this.InitialSelectBox(parseInt(targetObject.level) + 1)
      },
      loadSelectBox: function (res) {
          let getData = res.data.jsonData.categories
          const level = res.data.jsonData.categoryLevel
          this['selectbox'+level].splice(1)
          getData.forEach(item => {
              this['selectbox'+level].push({value:item.categorySysId, text: item.name})
          })
          setTimeout(function () {
              document.getElementById('selectedCategory'+level)[0].selected = true
          }, 30)
      },
      InitialSelectBox: function (level) {
          switch(parseInt(level)){
            case 2:
                this.selectbox2.splice(1)
                this.selectbox3.splice(1)
                this.selectbox4.splice(1)
                this.selectbox5.splice(1)

                break
            case 3:
                this.selectbox3.splice(1)
                this.selectbox4.splice(1)
                this.selectbox5.splice(1)
                break
            case 4:
                this.selectbox4.splice(1)
                this.selectbox5.splice(1)
                break
          }
      }
  }
}
</script>
