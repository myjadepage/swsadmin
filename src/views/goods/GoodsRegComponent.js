import $ from 'jquery'

export default {
  data: () => ({
      productData: {
        prdtTypeCode: 2,
        name: '',
        briefComment: '',
        briefDescription: '',
        detailDescription: '',
        detailAttachFileUrl: '',
        productGroupBuy: {
          startDate: '',
          endDate: '',
          productGroupBuyDiscount: []
        },
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
        isUsedOptionalImage1: 0,
        isUsedOptionalImage2: 0,
        isUsedOptionalImage3: 0,
        isUsedOptionalImage4: 0,
        isUsedOptionalImage5: 0,
        isUsedOptionalImage6: 0,
        isUsedOptionalImage7: 0,
        isUsedOptionalImage8: 0,
        isUsedOptionalImage9: 0,
        isUsedOptionalImage10: 0,
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
        feeRate: 9,
        brandSysId: 0,
        sellerSysId: 0,
        isDisplay: 0,
        isVat: 0,
        isSoldout: 0,
        isAddingProduct: 0,
        isAutoImageUpload: 0,
        optionTypeCode: 0,
        stockTypeCode: 0,
        feeTypeCode: 1,
        priceTypeCode: 0,
        pointTypeCode: 0,
        deliveryPriceTypeCode: 5,
        optionDescription: '',
        productNotice: {notices: []},
        addingProducts: [],
        normalOptions: []
      }
  }),
  methods: {
    submitValidate (obj) {
      // ------------------- Form Validate 체크 시작 -------------------
      // 카테고리 Validate
      if (this.categoryRow <= 0) {
        // console.log(this.categoryRow)
        return this.onFocusMethod(obj.category1, '카테고리')
      } else {
        for (let i = 0; i < this.categoryRow.length; i++) {
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
      let BriefCommentObj = obj.briefComment
      if (BriefCommentObj.value.length < 1) {
        return this.onFocusMethod(BriefCommentObj, '간략한 설명')
      }
      //  else {
      //   this.productData.briefComment = BriefCommentObj.value
      // }

      // 상세 설명 Validate
      let BriefDescriptionObj = obj.briefDescription
      if (BriefDescriptionObj.value.length < 1) {
        return this.onFocusMethod(BriefDescriptionObj, '상세 설명')
      }
      //  else {
      //   this.productData.briefDescription = BriefDescriptionObj.value
      // }

      // 상품명  Validate
      let ProductNameObj = obj.name
      if (ProductNameObj.value.length < 1) {
        return this.onFocusMethod(ProductNameObj, '상품명')
      } 
      // else {
      //   this.productData.name = ProductNameObj.value
      // }
      
      // 판매자
      let SellerSysIdObj = obj.sellers
      if (SellerSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(SellerSysIdObj, '판매자')
      } else {
        this.productData.sellerSysId = this.toNumber(SellerSysIdObj[SellerSysIdObj.selectedIndex].value)
      }


      // 브랜드
      let BrandSysIdObj = obj.brandSysId
      if (BrandSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(BrandSysIdObj, '브랜드')
      } else {
        this.productData.brandSysId = this.toNumber(BrandSysIdObj[BrandSysIdObj.selectedIndex].value)
      }

      // 상품 아이콘 Validate
      let IconListObj = obj.iconList
      if (IconListObj.length < 1) {
        return this.onFocusMethod(IconListObj, '상품 아이콘')
      } else {
        let IconTempArray = new Array()
        for (let j = 0; j < obj.iconList.length; j++) {
          if ($(obj.iconList[j]).is(':checked')) {
            IconTempArray[j] = obj.iconList[j].value
          }
        }
        this.productData.iconList = IconTempArray.join(';')
      }

      // 큰 이미지 Validate
      let BigimagesObj = obj.bigImageUrl
      if (BigimagesObj.dataset.imageurl === null || BigimagesObj.dataset.imageurl=== "") {
        return this.onFocusMethod(BigimagesObj, '큰 이미지')
      } else {
        var imagesCdnUrl = document.Frm.bigImageUrl.dataset.imageurl
        this.productData.bigImageUrl = imagesCdnUrl
      }

      // 다른이미지 Validate
      if(this.imagesCounter > 1) {
        let otherImageObj
        let targetObjName
        for(let othercnt = 0; othercnt < this.images.length; othercnt++) {
          targetObjName = this.images[othercnt].imageObjName
          otherImageObj = $('input[name=' + targetObjName + ']')
          if (otherImageObj.data('imageurl') !== '') {
            this.productData['isUsedOptionalImage' +(othercnt+1)] = 1
            this.productData['optionalImage' +(othercnt+1) + 'Url'] = otherImageObj.data('imageurl')
          }
        }
      }

      // 영상 업로드
      let videoCount = obj.optionalVideoUrl.length
      let validateCount = 0
      for (let forCnt = 0 ; forCnt < videoCount ; forCnt++) {
        if (obj.optionalVideoUrl[forCnt].files.length > 0) {
          validateCount += 1
        }
      }
      if (validateCount === 0){
        alert('1개 이상의 영상을 업로드 해야 합니다.')
        return false
      } else {
        let targetObj
        for(let videoCnt = 0; videoCnt < this.videos.length; videoCnt++) {
          targetObj = this.videos[videoCnt]
          if ($('#' + targetObj.videoObjName).data('videourl') !== '') {
            this.productData.media[videoCnt] = {
              'mediaId':  document.getElementById(targetObj.videoObjName).dataset.videourl,
              'title': $('input[name=' + targetObj.videoTitle + ']').val(),
              'thumnailUrl': $('input[name=' + targetObj.imageObjName + ']').data('imageurl')
            }
          }
        }
      }

      // 재고설정
      let StockTypeCodeObj = obj.stockTypeCode
      if (StockTypeCodeObj[0].checked) {
        // 무제한
        this.productData.stockTypeCode = 1
        this.productData.stockQty = 0
      } else if (StockTypeCodeObj[1].checked) {
        this.productData.stockTypeCode = 2
        let stockQtyObj = obj.stockQty
        if (stockQtyObj.value.length < 1) {
          return this.onFocusMethod(stockQtyObj, '재고수량')
        } else {
          this.productData.stockQty = this.toNumber(stockQtyObj.value)
        }
      }

      this.productData.feeTypeCode = this.toNumber(obj.feeTypeCode.value) 
      this.productData.pointTypeCode = this.toNumber(obj.pointTypeCode.value)

      // 

      // 시중 가격
      let marketPrice = this.toNumber(String(this.productData.marketPrice))
      if (marketPrice === 0) {
        alert('시중가격을 확인해주세요')
        return false
      } else {
        this.productData.marketPrice = this.toNumber(String(this.productData.marketPrice))
      }
     
      // 공구가격에 관련한 데이터 처리
      if (this.productData.prdtTypeCode === 2) {
        for(let _k in this.DateObject) {
          if (this.DateObject[_k] === '') {
            alert('공구가격의 할인일자 범위를 확인해주시기 바랍니다.')
            return false
          } 
        }

        this.productData.productGroupBuy.startDate = ((this.DateObject.startDate).replace(/-/g,''))+(this.DateObject.startTime).replace(/:/g,'')
        this.productData.productGroupBuy.endDate = ((this.DateObject.endDate).replace(/-/g,''))+(this.DateObject.endTime).replace(/:/g,'')
        console.log(this.productData.productGroupBuy)
      }

      // 할인인원 범위 Validate
      if (this.commonSellers.length < 1) {
        alert('최소 1개의 할인인원 범위가 존재해야 합니다.')
        return false
      } else {
        let firstObject = this.commonSellers[0]
        let peopleObject = document.getElementById(firstObject.peopleObjName)
        let discountObject = document.getElementById(firstObject.discountObjName)
        if (this.isEmpty(peopleObject.value) || this.isEmpty(discountObject.value)) {
          alert('할인인원 범위 정책을 확인하여 주시기바랍니다.')
          return false
        } else {
          for (let i = 0 ; i < this.commonSellers.length ; i++) {
            peopleObject = document.getElementById(this.commonSellers[i].peopleObjName)
            discountObject = document.getElementById(this.commonSellers[i].discountObjName)
            this.productData.productGroupBuy.productGroupBuyDiscount[i] = {
              peopleQty: this.toNumber(peopleObject.value),
              discount: this.toNumber(discountObject.value),
              isUse: 1
            }
          }
        }
      }
      
      // 판매가
      let PriceObj = obj.price
      if (PriceObj.value.length < 1) {
        return this.onFocusMethod(PriceObj, '판매가')
      } else {
        this.productData.price = this.toNumber(String(PriceObj.value))
      }

      // 공급가
      let SupplyPriceObj = obj.supplyPrice
      if (SupplyPriceObj.value.length < 1) {
        return this.onFocusMethod(SupplyPriceObj, '공급가')
      } else {
        this.productData.supplyPrice = this.toNumber(String(SupplyPriceObj.value))
      }

      // 수수료율
      let feeRate = this.toNumber(String(this.productData.feeRate))
      if (this.isEmpty(feeRate)) {
        alert('수수료율을 확인해주시기 바랍니다.')
        return false
      } else {
        this.productData.feeRate = parseFloat(feeRate / 100)
      }
      // let FeeRateObj = obj.feeRate
      // if (FeeRateObj.value.length < 1) {
      //   return this.onFocusMethod(FeeRateObj, '수수료율')
      // } else {
      //   var feeRate = parseFloat(this.toNumber(FeeRateObj.value))
      //   this.productData.feeRate = feeRate
      // }

      // 적립금
      let pointObj = obj.pointTypeCode
      if (pointObj.value === '4') {
        this.productData.pointTypeCode = this.toNumber(document.Frm.pointTypeCodeSelect.value)
        this.productData.pointRate = parseFloat(document.Frm.pointRate.value)
      } else if (pointObj.value === '6') {
        this.productData.point = this.toNumber(document.Frm.point.value)
      }
      this.productData.pointTypeCode = this.toNumber(obj.pointTypeCode.value)

      // 제조사
      let ManufacturerObj = obj.manufacturer
      if (ManufacturerObj.value.length < 1) {
        return this.onFocusMethod(ManufacturerObj, '제조사')
      } else {
        this.productData.manufacturer = ManufacturerObj.value
      }

      // 원산지
      let OrigionObj = obj.origin
      if (OrigionObj.value.length < 1) {
        return this.onFocusMethod(OrigionObj, '원산지')
      } else {
        this.productData.origin = OrigionObj.value
      }
      {
      
      // Notify 공지부분
      let NotifyObj = document.Frm.productNotice
      if(NotifyObj.selectedIndex > 0) 
        this.productData.productNotice.prdtNoticeBaseSysId = NotifyObj[NotifyObj.selectedIndex].value
        for (let notifyCnt = 0; notifyCnt < this.notify.length; notifyCnt++) {
          this.productData.productNotice.notices[notifyCnt] = {
            item: $('input[name=' + this.notify[notifyCnt].itemObjName + ']').val(),
            content: $('textarea[name=' + this.notify[notifyCnt].contentObjName + ']').val()
          }
        }
      }
      
      // 배송정책 옵션
      this.productData.deliveryCommentHtml = this.deliveryCommentHtml


      // 배송비 옵션
      // this.productData.deliveryPriceTypeCode = this.toNumber(obj.deliveryPriceTypeCode.value)

      let DeliveryPriceTypeCodeObj = this.productData.deliveryPriceTypeCode
      if (DeliveryPriceTypeCodeObj.value === '2') {
        // 착불비용
        if (obj.debitAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitAmount, '착불비용')
        } else {
          this.productData.debitAmount = this.toNumber(obj.debitAmount.value)
        }
        // 착불시 무료비용
        if (obj.debitfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitfreeMinAmount, '착불비용시 무료배송비')
        } else {
          this.productData.debitfreeMinAmount = this.toNumber(obj.debitfreeMinAmount.value)
        }
      } else if (DeliveryPriceTypeCodeObj.value === '3') {
        // 선불비용
        if (obj.prepaymentAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepaymentAmount, '선불비용')
        } else {
          this.productData.prepaymentAmount = this.toNumber(obj.prepaymentAmount.value)
        }
        // 착불시 무료비용
        if (obj.prepayfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepayfreeMinAmount, '선불비용시 무료배송비')
        } else {
          this.productData.prepayfreeMinAmount = this.toNumber(obj.prepayfreeMinAmount.value)
        }
      }
      //  상품 옵션유형 코드
      this.productData.optionTypeCode = this.toNumber(document.Frm.optionTypeCode.value)

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
      let isAddition = (document.Frm.isAddingProduct.value==='0'? false : true)
      if (isAddition) {
        for (let k = 0 ;k < this.additionOptions.length; k++) {
          let subAdditionArray = this.additionOptions[k].subAdditionOptions
          let details = new Array();
          for(let sub = 0; sub < subAdditionArray.length; sub++) {
            details[sub] = {
              item: $('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].item + ']').val(),
              price: this.toNumber($('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].price + ']').val()),
              stockQty: this.toNumber($('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].stockQty + ']').val()),
              isSoldout: $('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].isSoldout + ']').is(':checked'),
              isHide: $('table[name=' + this.additionOptions[k].detailsTable + '] input[name=' + subAdditionArray[sub].isHide + ']').is(':checked'),
            }
          }
          this.productData.addingProducts[k] = {base: {itemGroup: $('input[name=' + this.additionOptions[k].itemGroupName + ']').val()}, details: details}
        }
      }
      // ------------------- Form Validate 체크 종료 -------------------
      // console.log(this.productData)
      let CallbackFn = function (res) {
        console.log(res)
        alert('상품등록이 완료 되었습니다.')
      }
      this.axiosPostRequest('/api/v1/products', {jsonData: this.productData}, CallbackFn)
      return false
    },
    onFocusMethod (object, message) {
      alert(message + '을(를) 확인하여 주시기 바랍니다.')
      object.focus()
      return false
    },
    unitTest () {

    }
  }
}
