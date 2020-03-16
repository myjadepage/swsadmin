/* eslint-disable no-unused-vars */
import Axios from 'axios'
import $ from 'jquery'
const clickEvent = {
  data () {
    return {
      categoryRow: [],
      category2: [{id: '', value: '', title: '2차카테고리 필수', parentSysId: ''}],
      category3: [{id: '', value: '', title: '3차카테고리 선택', parentSysId: ''}],
      category4: [{id: '', value: '', title: '4차카테고리 선택', parentSysId: ''}],
      category5: [{id: '', value: '', title: '5차카테고리 선택', parentSysId: ''}],
      brands: [{id: '', title: '::브랜드를 선택하십시오::'}]
    }
  },
  methods: {
    checkDeliveryMethod: function (id) {
      //   var obj = $('#' + id)
      if (id === 'deliveryPriceTypeCode1') {
        $('.delivery_method .text_input').attr('disabled', true)
      } else if (id === 'deliveryPriceTypeCode2') {
        $('.delivery_method .text_input').attr('disabled', true)
        $('.debit').attr('disabled', false)
      } else if (id === 'deliveryPriceTypeCode3') {
        $('.delivery_method .text_input').attr('disabled', true)
        $('.prepay').attr('disabled', false)
      } else if (id === 'deliveryPriceTypeCode4') {
        $('.delivery_method .text_input').attr('disabled', true)
      } else if (id === 'deliveryPriceTypeCode5') {
        $('.delivery_method .text_input').attr('disabled', true)
      }
    },
    checkOptionKind: function (id) {
      if (id !== 'option_kind_1') {
        $('.option_tab').css('display', 'none')
        $('.' + id + '_tab').css('display', 'block')
      } else {
        $('.option_tab').css('display', 'none')
      }
    },
    checkUseAddition: function (tgl) {
      if (tgl > 0) {
        $('.addition_container').css('display', 'block')
      } else {
        $('.addition_container').css('display', 'none')
      }
    },
    changeImgRegAuto: function () {
      $('.imgManuals').toggle()
    },
    checkStock: function (id) {
      var obj = $('#' + id)
      if (obj.data('bool')) {
        $('input[name=stockQty]').attr('disabled', false)
      } else {
        $('input[name=stockQty]').attr('disabled', true)
      }
    },
    // ------------- 가격 Event 시작 -------------
    // 수수료 설정 Event
    onFeeTypeCodeEvent: function (event) {
      // var obj = document.Frm.feeTypeCode
      // if (obj.value === '1') { // 기본 수수료 설정
      //   // document.getElementById('priceTypeCode2').disabled = true
      //   // document.getElementById('priceTypeCode1').checked = true
      //   document.Frm.feeRate.value = 10 // 수수료율 설정하는부분에서 임의로 넣어줌
      //   this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate)
      // } else if (obj.value === '2') { // 개별 수수료 설정
      //   document.getElementById('priceTypeCode2').disabled = false
      // }

      var obj = event.target.value
      if (obj === '1') {
        var cnt = 0
        this.feeRateObject.defaultFeeRate ? cnt++ : ''
        this.feeRateObject.makeVideoFeeRate ? cnt++ : ''
        this.feeRateObject.influencerFeeRate ? cnt++ : ''
        this.productData.feeRate = 9*cnt
        this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate)
        document.getElementById('priceTypeCode2').disabled = true
        document.getElementById('priceTypeCode1').checked = true
      } else if(obj === '2') {
        this.productData.feeRate = 0
        this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate)
          document.getElementById('priceTypeCode2').disabled = false
      }
    },
    defaultFeeRate(bool) {
      var obj = this.$data.feeRateObject[bool]
      !obj ? this.productData.feeRate += 9 : this.productData.feeRate -= 9
      this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate)
       
    },
    // 공급가, 기준가 관련 Event
    onPriceTypeCode: function () {
      var obj = document.Frm.priceTypeCode
      if (obj.value === '1') {
        document.Frm.feeRate.disabled = true
        document.Frm.supplyPrice.disabled = false
      } else if (obj.value === '2') {
        document.Frm.feeRate.disabled = false
        document.Frm.supplyPrice.disabled = true
      }
    },
    onPriceEvnet: function () {
      var priceObj = document.Frm.price
      var feeRate = document.Frm.feeRate
      var supplyPrice = document.Frm.supplyPrice
      if (document.Frm.feeTypeCode.value === '1') {
        this.priceToSupplyPrice(priceObj, feeRate)
      } else if (document.Frm.feeTypeCode.value === '2') {
        if (document.Frm.priceTypeCode.value === '1') {
          this.priceToFeeRate(priceObj, supplyPrice)
        } else if (document.Frm.priceTypeCode.value === '2') {
          this.priceToSupplyPrice(priceObj, feeRate)
        }
      }
      return true
    },
    onFeeRate: function () {
      var priceObj = document.Frm.price
      var feeRate = document.Frm.feeRate
      this.priceToSupplyPrice(priceObj, feeRate)
      return true
    },
    onSupplyPrice: function () {
      var priceObj = document.Frm.price
      var supplyPrice = document.Frm.supplyPrice
      this.priceToFeeRate(priceObj, supplyPrice)
      return true
    },
    // 판매가 -> 공급가
    priceToSupplyPrice: function (priceObj, feeRateObj) {
      var priceValue = priceObj.value.toString().replace(/,/g, '')
      var feeRateValue = this.productData.feeRate
      if ((feeRateValue === '') || (feeRateValue === 0)) {
        document.Frm.supplyPrice.value = this.numberWithCommas(priceValue)
      } else {
        document.Frm.supplyPrice.value = this.numberWithCommas(Math.floor(priceValue - (priceValue * (feeRateValue / 100))))
      }
      return true
    },
    // 판매가 -> 수수료율
    priceToFeeRate: function (priceObj, supplyPriceObj) {
      var priceValue = priceObj.value.toString().replace(/,/g, '')
      var supplyPriceValue = supplyPriceObj.value.toString().replace(/,/g, '')
      document.Frm.feeRate.value = Math.floor((priceValue - supplyPriceValue) / priceValue * 100)
      return true
    },
    // ------------- 가격 Event 끝 -------------
    // ------------- 카테고리 Event -------------
    inInitCategory: function (obj) {
      var selectIndex = event.target.dataset.index
      switch (selectIndex) {
        case '1':
          this.category2.splice(1)
          this.category3.splice(1)
          this.category4.splice(1)
          this.category5.splice(1)
          break
        case '2':
          this.category3.splice(1)
          this.category4.splice(1)
          this.category5.splice(1)
          break
        case '3':
          this.category4.splice(1)
          this.category5.splice(1)
          break
        case '4':
          this.category5.splice(1)
          break
      }
    },
    onCategorySelector: function (event) {
      var param = {
        categoryLevel: parseInt(event.target.dataset.index) + 1,
        parentSysId: event.target[event.target.selectedIndex].value
      }
      this.axiosGetRequest('/api/v1/categories',param,this.onCategorySelectorResult,this.inInitCategory(event.target))
    },
    onCategorySelectorResult: function (response) {
      var categories = response.data.jsonData.categories
      if (categories === '') return false
      var categoryLevel = response.data.jsonData.categoryLevel
      this.CategorySelectorSetting(categories, categoryLevel)
    },
    CategorySelectorSetting: function (categories, level) {
      var obj = ''
      var selectTitle= ''
      switch (level) {
        case 2:
          obj = this.category2
          selectTitle = '필수'
          break
        case 3:
          obj = this.category3
          selectTitle = '선택'
          break
        case 4:
          obj = this.category4
          selectTitle = '선택'
          break
        case 5:
          obj = this.category5
          selectTitle = '선택'
          break
      }
      obj.length = 0
      obj.push({value: '', title: level + '차카테고리 '+selectTitle, parentId: '', feeRate: ''})
      for (var i = 0; i < categories.length; i++) {
        obj.push({value: categories[i].categorySysId, title: categories[i].name + '[' + (categories[i].feeRate * 100) + '%]', parentId: categories[i].parentSysId, feeRate: categories[i].feeRate})
      }
    },
    addCate: function (event) {
      var catetitle = new Array()
      var _id = ''
      var param = {
        checkName: 'check_category'
      }
      for (var i = 0; i < 5; i++) {
        var category = $('#category' + (i + 1))
        // 카테고리 1차 2차 널 방지
        if (category.data('required') && category.find('option:selected').val() === '') {
          alert('1, 2차 카테고리는 필수 입니다.')
          return false
        }
        var selectedOption = $('#category' + (i + 1)).find('option:selected')
        param['categorySysId' + (i + 1)] = selectedOption.val()
        if (!this.isEmpty(selectedOption.val())) {
          _id += '' + selectedOption.val()
          catetitle[i] = selectedOption.text()
          param.feeRate = (selectedOption.data('feerate') * 100)
        }
      }
      param.id = _id
      param.title = catetitle.join(' > ')
      if (this.categoryRow.length > 0) {
        var addCateFlag = true
        this.categoryRow.filter(function (item) {
          if (item.id === _id) {
            alert('중복된 카테고리를 추가할수 없습니다.')
            addCateFlag = false
            return false
          }
        })
        if (addCateFlag) { this.addCategoryFn(param) }
      } else {
        this.addCategoryFn(param)
        setTimeout(function () { document.getElementsByName('check_category')[0].checked = true }, 10)
        document.Frm.feeRate.value = param.feeRate
      }
    },
    addCategoryFn: function (param) {
      this.categoryRow.push(param)
      return true
    },
    onSelectCate: function (event) {
      document.Frm.feeRate.value = event.target.dataset.feerate
      this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate)
    },
    // ------------- 카테고리 Event 끝 -------------
    changeSellerFn: function (event) {
      if (event.target.value !== '') {
        this.axiosGetRequest('/api/v1/sellers/' + event.target.value + '/brands','',this.onSellerToBrandFn)
      }
    },
    onSellerToBrandFn: function (res) {
      var data = res.data.jsonData.brands
      this.brands.splice(1)
      for (var i = 0; i < data.length; i++) {
        this.brands.push({id: data[i].brandCode, title: data[i].name})
      }
    }
  }
}

export default clickEvent
