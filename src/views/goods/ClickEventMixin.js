// import $ from 'jquery'
const clickEvent = {
  data () {
    return {
      selectedCategoryRow: [
        {value: 0, text: '1차카테고리 필수', parentSysId: '', feeRate: ''},
        {value: 0, text: '2차카테고리 필수', parentSysId: '', feeRate: ''},
        {value: 0, text: '3차카테고리 선택', parentSysId: '', feeRate: ''},
        {value: 0, text: '4차카테고리 선택', parentSysId: '', feeRate: ''},
        {value: 0, text: '5차카테고리 선택', parentSysId: '', feeRate: ''}
      ],
      categoryTable: [],
      category1: [{value: 0, text: '1차카테고리 필수', parentSysId: '', feeRate: ''}],
      category2: [{value: 0, text: '2차카테고리 필수', parentSysId: '', feeRate: ''}],
      category3: [{value: 0, text: '3차카테고리 선택', parentSysId: '', feeRate: ''}],
      category4: [{value: 0, text: '4차카테고리 선택', parentSysId: '', feeRate: ''}],
      category5: [{value: 0, text: '5차카테고리 선택', parentSysId: '', feeRate: ''}],
      brands: [{id: '', title: '::브랜드를 선택하십시오::'}],
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
  methods: {
    // checkDeliveryMethod: function (id) {
    //   //   var obj = $('#' + id)
    //   if (id === 'deliveryPriceTypeCode1') {
    //     $('.delivery_method .text_input').attr('disabled', true)
    //   } else if (id === 'deliveryPriceTypeCode2') {
    //     $('.delivery_method .text_input').attr('disabled', true)
    //     $('.debit').attr('disabled', false)
    //   } else if (id === 'deliveryPriceTypeCode3') {
    //     $('.delivery_method .text_input').attr('disabled', true)
    //     $('.prepay').attr('disabled', false)
    //   } else if (id === 'deliveryPriceTypeCode4') {
    //     $('.delivery_method .text_input').attr('disabled', true)
    //   } else if (id === 'deliveryPriceTypeCode5') {
    //     $('.delivery_method .text_input').attr('disabled', true)
    //   }
    // },
    // checkOptionKind: function (id) {
    //   if (id !== 'option_kind_1') {
    //     $('.option_tab').css('display', 'none')
    //     $('.' + id + '_tab').css('display', 'block')
    //   } else {
    //     $('.option_tab').css('display', 'none')
    //   }
    // },
    // checkUseAddition: function (tgl) {
    //   if (tgl > 0) {
    //     $('.addition_container').css('display', 'block')
    //   } else {
    //     $('.addition_container').css('display', 'none')
    //   }
    // },
    // changeImgRegAuto: function () {
    //   $('.imgManuals').toggle()
    // },
    // checkStock: function (id) {
    //   var obj = $('#' + id)
    //   if (obj.data('bool')) {
    //     $('input[name=stockQty]').attr('disabled', false)
    //   } else {
    //     $('input[name=stockQty]').attr('disabled', true)
    //   }
    // },
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
        document.getElementById('priceTypeCode1').checked = true
      } else if(obj === '2') {
        this.productData.feeRate = 0
        this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate)
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
    priceToSupplyPrice: function (priceObj) {
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
    onCategorySelector: function (event, myLevel) {
      const mySelected = this.selectedCategoryRow[myLevel - 1]
      var param = {
        categoryLevel: myLevel + 1,
        parentSysId: mySelected.value
      }
      this.axiosGetRequest('/api/v1/categories',param,this.onCategorySelectorResult,this.inInitCategory)
    },
    inInitCategory: function (err) {
      const errParam = err.response.config.params
      switch (errParam.categoryLevel) {
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
    onCategorySelectorResult: function (response) {
      const categories = response.data.jsonData.categories
      if (categories === '') return false
      const categoryLevel = response.data.jsonData.categoryLevel
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
      obj.splice(0)
      this.selectedCategoryRow[level-1] = {value: 0, text: level + '차카테고리 '+selectTitle, parentId: '', feeRate: ''}
      obj.push({value: 0, text: level + '차카테고리 '+selectTitle, parentId: '', feeRate: ''})
      categories.forEach(item => {
        obj.push({value: item.categorySysId, text: item.name + '[' + (item.feeRate * 100) + '%]', parentId: item.parentSysId, feeRate: item.feeRate})
      })
    },
    addCate: function () {
      // 1, 2 카테고리 검증
      for(let i = 0 ; i < 2 ; i++) {
        if (this.selectedCategoryRow[i].value === 0) {
          alert('1, 2차 카테고리는 필수 입니다.')
          return false
        }
      }

      let param = { id: '', text: '', feeRate: '' }
      let titleArray = new Array()
      this.selectedCategoryRow.forEach(item => {
        if(item.value !== 0) {
          param.id += item.id
          param.feeRate = item.feeRate
          titleArray.push(item.text)
        }
      })
      param.text = titleArray.join(' > ')
      this.categoryTable.push(param)
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
    changeSellerFn: function () {
      if (this.productData.sellerSysId !== 0){
        this.axiosGetRequest('/api/v1/sellers/' + this.productData.sellerSysId + '/brands','',this.onSellerToBrandFn)
      }
    },
    onSellerToBrandFn: function (res) { 
      var data = res.data.jsonData.brands
      this.brands.splice(1)
      data.forEach(item => {
        console.log(item)
        this.brands.push({value: item.brandSysId, text: item.name})
      })
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
    }
  }
}

export default clickEvent
