import $ from 'jquery'

export default {
  data () {
    return {
      productData: {
        name: '',
        briefComment: '',
        briefDescription: '',
        detailDescription: '',
        detailAttachFileUrl: '',
        iconList: '',
        bigImageUrl: '',
        middleImageUrl: '',
        smallImageUrl: '',
        optionalImage1Url: '',
        optionalImage2Url: '',
        optionalImage3Url: '',
        optionalImage4Url: '',
        optionalImage5Url: '',
        optionalImage6Url: '',
        optionalImage7Url: '',
        optionalImage8Url: '',
        optionalImage9Url: '',
        optionalImage10Url: '',
        isUsedOptionalImage1: false,
        isUsedOptionalImage2: false,
        isUsedOptionalImage3: false,
        isUsedOptionalImage4: false,
        isUsedOptionalImage5: false,
        isUsedOptionalImage6: false,
        isUsedOptionalImage7: false,
        isUsedOptionalImage8: false,
        isUsedOptionalImage9: false,
        isUsedOptionalImage10: false,
        media: [],
        price: 0,
        marketPrice: 0,
        supplyPrice: 0,
        discount: 0,
        discountRate: 0,
        manufacturer: '',
        displaySeq: 0,
        debitAmount: 0,
        prepaymentAmount: 0,
        debitfreeMinAmount: 0,
        prepayfreeMinAmount: 0,
        deliveryCommentHtml: '',
        category: {categories: []},
        origin: '',
        point: 0,
        pointRate: 0.0,
        salesQty: 0,
        stockQty: 0,
        feeRate: 0.0,
        brandSysId: 0,
        sellerSysId: 0,
        isDisplay: false,
        isVat: false,
        isSoldout: false,
        isAddingProduct: false,
        isAutoImageUpload: false,
        optionTypeCode: 0,
        stockTypeCode: 0,
        feeTypeCode: 0,
        priceTypeCode: 0,
        pointTypeCode: 0,
        deliveryPriceTypeCode: 0,
        optionDescription: '',
        productNotice: {notices: []},
        addingProducts: [],
        normalOptions: []
      }
    }
  },
  methods: {
    submitValidate (obj) {
      // ------------------- Form Validate 체크 시작 -------------------
      // 카테고리 Validate
      if (this.categoryRow <= 0) {
        return this.onFocusMethod(obj.category1, '카테고리')
      } else {
        for (var i = 0; i < this.categoryRow.length; i++) {
          this.productData.category.categories[i] = {
            categorySysId1: this.categoryRow[i].categorySysId1,
            categorySysId2: this.categoryRow[i].categorySysId2,
            categorySysId3: this.categoryRow[i].categorySysId3,
            categorySysId4: this.categoryRow[i].categorySysId4,
            categorySysId5: this.categoryRow[i].categorySysId5
          }
        }
      }

      // 간략한 설명 Validate
      var BriefCommentObj = obj.briefComment
      if (BriefCommentObj.value.length < 1) {
        return this.onFocusMethod(BriefCommentObj, '간략한 설명')
      } else {
        this.productData.briefComment = BriefCommentObj.value
      }

      // 상세 설명 Validate
      var BriefDescriptionObj = obj.briefDescription
      if (BriefDescriptionObj.value.length < 1) {
        return this.onFocusMethod(BriefDescriptionObj, '상세 설명')
      } else {
        this.productData.briefDescription = BriefDescriptionObj.value
      }

      // 상품명  Validate
      var ProductNameObj = obj.name
      if (ProductNameObj.value.length < 1) {
        return this.onFocusMethod(ProductNameObj, '상품명')
      } else {
        this.productData.name = ProductNameObj.value
      }
      
      // 판매자
      var SellerSysIdObj = obj.sellers
      if (SellerSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(SellerSysIdObj, '판매자')
      } else {
        this.productData.sellerSysId = this.onStringToNumer(SellerSysIdObj[SellerSysIdObj.selectedIndex].value)
      }


      // 브랜드
      var BrandSysIdObj = obj.brandSysId
      if (BrandSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(BrandSysIdObj, '브랜드')
      } else {
        this.productData.brandSysId = this.onStringToNumer(BrandSysIdObj[BrandSysIdObj.selectedIndex].value)
      }

      this.productData.detailDescription = this.detailDescription

      // 상품 아이콘 Validate
      var IconListObj = obj.iconList
      if (IconListObj.length < 1) {
        return this.onFocusMethod(IconListObj, '상품 아이콘')
      } else {
        var IconTempArray = new Array()
        for (var j = 0; j < obj.iconList.length; j++) {
          if ($(obj.iconList[j]).is(':checked')) {
            IconTempArray[j] = obj.iconList[j].value
          }
        }
        this.productData.iconList = IconTempArray.join(';')
      }

      // 큰 이미지 Validate
      var BigimagesObj = obj.bigImageUrl
      if (BigimagesObj.dataset.imageurl === null) {
        return this.onFocusMethod(IconListObj, '큰 이미지')
      } else {
        var imagesCdnUrl = document.Frm.bigImageUrl.dataset.imageurl
        this.productData.bigImageUrl = imagesCdnUrl
      }

      // 다른이미지 Validate
      if(this.imagesCounter > 1) {
        var otherImageObj
        var targetObjName
        for(var othercnt = 0; othercnt < this.images.length; othercnt++) {
          targetObjName = this.images[othercnt].imageObjName
          otherImageObj = $('input[name=' + targetObjName + ']')
          if (otherImageObj.data('imageurl') !== '') {
            this.productData['isUsedOptionalImage' +(othercnt+1)] = true
            this.productData['optionalImage' +(othercnt+1) + 'Url'] = otherImageObj.data('imageurl')
          }
        }
      }
      
      // 동영상 Validate
      if(this.videoCounter <= 0) {
        alert('1개 이상의 영상을 업로드 해야 합니다.')
        return false
      } else {
        var targetObj
        for(var videoCnt = 0; videoCnt < this.videos.length; videoCnt++) {
          targetObj = this.videos[videoCnt]
          if ($('input[name=' + targetObj.videoObjName + ']').data('videourl') !== '') {
            this.productData.media[videoCnt] = {
              'mediaId': $('input[name=' + targetObj.videoObjName + ']').data('videourl'),
              'title': $('input[name=' + targetObj.videoTitle + ']').val(),
              'thumnail': $('input[name=' + targetObj.imageObjName + ']').data('imageurl')
            }
          }
        }
      }

      // 재고설정
      var StockTypeCodeObj = obj.stockTypeCode
      if (StockTypeCodeObj[0].checked) {
        // 무제한
        this.productData.stockTypeCode = 1
        this.productData.stockQty = 0
      } else if (StockTypeCodeObj[1].checked) {
        this.productData.stockTypeCode = 2
        var stockQtyObj = obj.stockQty
        if (stockQtyObj.value.length < 1) {
          return this.onFocusMethod(stockQtyObj, '재고수량')
        } else {
          this.productData.stockQty = this.onStringToNumer(stockQtyObj.value)
        }
      }

      this.productData.feeTypeCode = this.onStringToNumer(obj.feeTypeCode.value)
      this.productData.priceTypeCode = this.onStringToNumer(obj.priceTypeCode.value)
      this.productData.pointTypeCode = this.onStringToNumer(obj.pointTypeCode.value)
      this.productData.isSoldout = (obj.isSoldout.checked ? true : false)

      // 진열설정
      this.productData.isDisplay = (obj.isDisplay.value === 'T' ? true : false)

      // 시중 가격
      var MarketPriceObj = obj.marketPrice
      if (MarketPriceObj.value.length < 1) {
        return this.onFocusMethod(MarketPriceObj, '시중가격')
      } else {
        this.productData.marketPrice = this.onStringToNumer(MarketPriceObj.value)
      }

      // VAT여부
      this.productData.isVat = (obj.isVat.value === 'T' ? true : false)
      
      // 판매가
      var PriceObj = obj.price
      if (PriceObj.value.length < 1) {
        return this.onFocusMethod(PriceObj, '판매가')
      } else {
        this.productData.price = this.onStringToNumer(PriceObj.value)
      }

      // 공급가
      var SupplyPriceObj = obj.supplyPrice
      if (SupplyPriceObj.value.length < 1) {
        return this.onFocusMethod(SupplyPriceObj, '공급가')
      } else {
        this.productData.supplyPrice = this.onStringToNumer(SupplyPriceObj.value)
      }

      // 수수료율
      var FeeRateObj = obj.feeRate
      if (FeeRateObj.value.length < 1) {
        return this.onFocusMethod(FeeRateObj, '수수료율')
      } else {
        var feeRate = parseFloat(this.onStringToNumer(FeeRateObj.value))
        this.productData.feeRate = feeRate
      }

      // 적립금
      var pointObj = obj.pointTypeCode
      if (pointObj.value === '4') {
        this.productData.pointTypeCode = this.onStringToNumer(document.Frm.pointTypeCodeSelect.value)
        this.productData.pointRate = parseFloat(document.Frm.pointRate.value)
      } else if (pointObj.value === '6') {
        this.productData.point = this.onStringToNumer(document.Frm.point.value)
      }
      this.productData.pointTypeCode = this.onStringToNumer(obj.pointTypeCode.value)

      // 제조사
      var ManufacturerObj = obj.manufacturer
      if (ManufacturerObj.value.length < 1) {
        return this.onFocusMethod(ManufacturerObj, '제조사')
      } else {
        this.productData.manufacturer = ManufacturerObj.value
      }

      // 원산지
      var OrigionObj = obj.origin
      if (OrigionObj.value.length < 1) {
        return this.onFocusMethod(OrigionObj, '원산지')
      } else {
        this.productData.origin = OrigionObj.value
      }
      {
      
      // Notify 공지부분
      var NotifyObj = document.Frm.productNotice
      if(NotifyObj.selectedIndex > 0) 
        this.productData.productNotice.prdtNoticeBaseSysId = NotifyObj[NotifyObj.selectedIndex].value
        for (var notifyCnt = 0; notifyCnt < this.notify.length; notifyCnt++) {
          this.productData.productNotice.notices[notifyCnt] = {
            item: $('input[name=' + this.notify[notifyCnt].itemObjName + ']').val(),
            content: $('textarea[name=' + this.notify[notifyCnt].contentObjName + ']').val()
          }
        }
      }
      
      // 배송정책 옵션
      this.productData.deliveryCommentHtml = this.deliveryCommentHtml


      // 배송비 옵션
      this.productData.deliveryPriceTypeCode = this.onStringToNumer(obj.deliveryPriceTypeCode.value)

      var DeliveryPriceTypeCodeObj = obj.deliveryPriceTypeCode
      if (DeliveryPriceTypeCodeObj.value === '2') {
        // 착불비용
        if (obj.debitAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitAmount, '착불비용')
        } else {
          this.productData.debitAmount = this.onStringToNumer(obj.debitAmount.value)
        }
        // 착불시 무료비용
        if (obj.debitfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitfreeMinAmount, '착불비용시 무료배송비')
        } else {
          this.productData.debitfreeMinAmount = this.onStringToNumer(obj.debitfreeMinAmount.value)
        }
      } else if (DeliveryPriceTypeCodeObj.value === '3') {
        // 선불비용
        if (obj.prepaymentAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepaymentAmount, '선불비용')
        } else {
          this.productData.prepaymentAmount = this.onStringToNumer(obj.prepaymentAmount.value)
        }
        // 착불시 무료비용
        if (obj.prepayfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepayfreeMinAmount, '선불비용시 무료배송비')
        } else {
          this.productData.prepayfreeMinAmount = this.onStringToNumer(obj.prepayfreeMinAmount.value)
        }
      }
      //  상품 옵션유형 코드
      this.productData.optionTypeCode = this.onStringToNumer(document.Frm.optionTypeCode.value)

      if (document.Frm.optionTypeCode.value === '2') {
        // 상품옵션
        if (this.normalOptionCounter < 1) {
          return false
        } else {
          for (var optionCnt = 0; optionCnt < this.productsOptions.length; optionCnt++) {
            this.productData.normalOptions[optionCnt] = {
              name: $('input[name=' + this.productsOptions[optionCnt].normalOptionName + ']').val(),
              content: $('textarea[name=' + this.productsOptions[optionCnt].normalOptionContent + ']').val()
            }
          }
        }
      } else if (document.Frm.optionTypeCode.value === '5') {
        this.productData.optionDescription = document.Frm.optionDescription.value
      }

      // 추가 구성 
      var isAddition = (document.Frm.isAddingProduct.value==='0'? false : true)
      this.productData.isAddingProduct = isAddition
      if (isAddition) {
        for (var k = 0 ;k < this.additionOptions.length; k++) {
          var subAdditionArray = this.additionOptions[k].subAdditionOptions
          var details = new Array();
          for(var sub = 0; sub < subAdditionArray.length; sub++) {
            details[sub] = {
              item: $('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].item + ']').val(),
              price: this.onStringToNumer($('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].price + ']').val()),
              stockQty: this.onStringToNumer($('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].stockQty + ']').val()),
              isSoldout: $('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].isSoldout + ']').is(':checked'),
              isHide: $('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].isHide + ']').is(':checked'),
            }
          }
          this.productData.addingProducts[k] = {base: {itemGroup: $('input[name=' + this.additionOptions[k].itemGroupName + ']').val()}, details: details}
        }
      }
      // ------------------- Form Validate 체크 종료 -------------------
      console.log(this.productData)
      var CallbackFn = function (res) {
        console.log(res)
        alert('상품등록이 완료 되었습니다.')
      }
      this.axiosPostRequest('http://192.168.1.20:3000/api/v1/products', {jsonData: this.productData}, CallbackFn)
      return false
    },
    onFocusMethod (object, message) {
      alert(message + '을(를) 확인하여 주시기 바랍니다.')
      object.focus()
      return false
    },
    onStringToNumer(str){
      return parseFloat(str.replace(/[^0-9]/g,''))
    }
  }
}

