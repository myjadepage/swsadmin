import $ from 'jquery'
export default {
  data () {
    return {
      resourceData: '',
      reqCategory: [],
      updateProductData: {
        productSysId: '',
        prdtTypeCode: 1,
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
        iconList: [],
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
        isDisplay: 1,
        isVat: 0,
        isSoldout: 0,
        isAddingProduct: 0,
        isAutoImageUpload: true,
        optionTypeCode: 1,
        stockTypeCode: 1,
        feeTypeCode: 1,
        priceTypeCode: 0,
        pointTypeCode: 0,
        deliveryPriceTypeCode: 5,
        optionDescription: '',
        productNotice: {notices: []},
        addingProducts: [],
        normalOptions: []
      }
    }
  },
  methods: {
    /**
     * 
     * @param {*} 카테고리 리스트 
     */
    setCategory: function (category) {
      category.forEach(item => {
        item
        // for (let i = 0 ; i < 5 ; i++) {
        //   if (item['categorySysId' + (i + 1)] !== 'undefined') {
        //     this.axiosGetRequest('/api/v1/categories',{ categoryLevel: (i + 1), categorySysId: item['categorySysId' + (i + 1)], parentSysId: item['categorySysId' + i]}, this.resultCategorySearch)
        //   }
        // }
      })
    },
    // resultCategorySearch: function (res) {
    //   let reqParams = res.config.params
    //   let getData = res.data.jsonData.categories
    //   let item
    //   if (!this.isEmpty(res.data.jsonData.categories)){
    //     for (let i = 0 ; i < getData.length ; i++) {
    //       item = getData[i]
    //       if (item.categorySysId === reqParams.categorySysId) {
    //         this.reqCategory[reqParams.categoryLevel - 1] = {
    //           value: item.categorySysId, 
    //           text: item.name + '[' + item.feeRate * 100 + '%]',
    //           feeRate: item.feeRate
    //         }
    //       }
    //     }
    //   }
    // },
    getProductData(res) {
        this.resourceData = res.data.jsonData
        // 카테고리 
        this.productData.category = res.data.jsonData.category
        this.setCategory(res.data.jsonData.category.categories)
        this.addCateExtends('reqCategory', 500)

        //상품 정보
        let product = res.data.jsonData.product
        this.images.splice(0)
        for(let _k in product) {
          // 다른 이미지 처리
          if (_k.indexOf('isUsedOptionalImage') > -1) {
            if (product[_k] !== 0) {
              let num = _k.replace('isUsedOptionalImage','')
              this.imagesCounter++
              console.log('optionalImage' + num + 'Url')
              this.images.push({
                id: this.imagesCounter,
                imageVisibleTitle: product['optionalImage' + num + 'Url'],
                imageObjName: 'optionalImage' + num + 'Url',
                url: product['optionalImage' + num + 'Url']
              })
            }
          } else if (_k.indexOf('iconList') > -1) {
            this.productData.iconList = product[_k].split(';')
          } else if (_k === 'isAutoImageUpload'){
            this.productData[_k] = true
          } else {
            this.productData[_k] = product[_k]
          }
        }

        this.changeSellerFn()

        let noticeObject = res.data.jsonData.productNotice
        this.productData.prdtNoticeBaseSysId = noticeObject.prdtNoticeBaseSysId
        this.notify.splice(0)
        noticeObject.notices.forEach(_item => {
          this.notify.push({
            item: _item.item, 
            content: _item.content,
            procTypeCode: 3,
            prdtNoticeSysId: _item.prdtNoticeSysId
          })
        })        

        let normalOptions = res.data.jsonData.normalOptions
        if (normalOptions.length > 0) {
          this.nomarlOptions.splice(0)
          normalOptions.forEach(_item => {
            this.nomarlOptions.push({
              name: _item.name,
              content: _item.content,
              procTypeCode: 3,
              prdtNormalOptionSysId: _item.prdtNormalOptionSysId
            })
          })
        }

    },
    // Update Validate
    updateSubmitValidate (obj) {
      // ------------------- Form Validate 체크 시작 -------------------
      let categories = this.productData.category.categories
      console.log(categories)
      let categoriesString = ''
      categories.forEach(item => {
        categoriesString = ''
        if (item['categorySysId1'] == undefined) { categoriesString = item['categorySysId1']}
        if (item['categorySysId2'] == undefined) { categoriesString += new String(item['categorySysId2'])}
        if (item['categorySysId3'] == undefined) { categoriesString += new String(item['categorySysId3'])}
        if (item['categorySysId4'] == undefined) { categoriesString += new String(item['categorySysId4'])}
        if (item['categorySysId5'] == undefined) { categoriesString += new String(item['categorySysId5'])}
      })
      categoriesString

      // if (this.categoryRow <= 0) {
      //   return this.onFocusMethod(obj.category1, '카테고리')
      // } else {
      //   this.categoryTable.forEach(item => {
      //     this.productData.category.categories.push({
      //       categorySysId1: item.categorySysId1,
      //       categorySysId2: (item.categorySysId2 !== undefined ? item.categorySysId2 : 0),
      //       categorySysId3: (item.categorySysId3 !== undefined ? item.categorySysId3 : 0),
      //       categorySysId4: (item.categorySysId4 !== undefined ? item.categorySysId4 : 0),
      //       categorySysId5: (item.categorySysId5 !== undefined ? item.categorySysId5 : 0)
      //     })
      //   })
      // }

      // 간략한 설명 Validate
      let BriefCommentObj = obj.briefComment
      if (BriefCommentObj.value.length < 1) {
        return this.onFocusMethod(BriefCommentObj, '간략한 설명')
      } else {
        this.updateProductData.briefComment = this.productData.briefComment
      }

      // 상세 설명 Validate
      let BriefDescriptionObj = obj.briefDescription
      if (BriefDescriptionObj.value.length < 1) {
        return this.onFocusMethod(BriefDescriptionObj, '상세 설명')
      } else {
        this.updateProductData.briefDescription = this.productData.briefDescription
      }

      // 상품명  Validate
      let ProductNameObj = obj.name
      if (ProductNameObj.value.length < 1) {
        return this.onFocusMethod(ProductNameObj, '상품명')
      } else {
        this.updateProductData.name = this.productData.name
      }
      
      // 판매자
      let SellerSysIdObj = obj.sellers
      if (SellerSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(SellerSysIdObj, '판매자')
      } else {
        this.updateProductData.sellerSysId = this.toNumber(SellerSysIdObj[SellerSysIdObj.selectedIndex].value)
      }


      // 브랜드
      let BrandSysIdObj = obj.brandSysId
      if (BrandSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(BrandSysIdObj, '브랜드')
      } else {
        this.updateProductData.brandSysId = this.toNumber(BrandSysIdObj[BrandSysIdObj.selectedIndex].value)
      }

      // 상품 아이콘 Validate
      let IconListObj = obj.iconList
      if (IconListObj.length < 1) {
        return this.onFocusMethod(IconListObj, '상품 아이콘')
      } else {
        // let IconTempArray = new Array()
        // for (let j = 0; j < obj.iconList.length; j++) {
        //   if ($(obj.iconList[j]).is(':checked')) {
        //     IconTempArray[j] = obj.iconList[j].value
        //   }
        // }
        this.updateProductData.iconList = (this.productData.iconList).join(';')
      }
      this.updateProductData.isSoldout = (this.productData.isSoldout ? 1 : 0)

      // 큰 이미지 Validate
      let BigimagesObj = obj.bigImageUrl
      if (BigimagesObj.dataset.imageurl === null || BigimagesObj.dataset.imageurl=== "") {
        return this.onFocusMethod(BigimagesObj, '큰 이미지')
      } else {
        var imagesCdnUrl = document.Frm.bigImageUrl.dataset.imageurl
        this.updateProductData.bigImageUrl = imagesCdnUrl
      }

      // 이미지 자동등록 여부
      // if(this.productData.isAutoImageUpload) {

      //   let img = document.createElement('img')
      //   img.src = imagesCdnUrl

      //   let canvas = document.createElement('canvas')
      //   let ctx = canvas.getContext('2d')
      //   ctx.drawImage(img,0,0)
      //   let MIDDLE_MAX_WIDTH = 510
      //   let MIDDLE_MAX_HEIGHT = 510
      //   let middel_width = img.width
      //   let middel_height = img.height

      //   middel_width *= MIDDLE_MAX_WIDTH/middel_width
      //   middel_height *= MIDDLE_MAX_HEIGHT/middel_height
      //   canvas.width = middel_width
      //   canvas.height= middel_height

      //   let ctx_d = canvas.getContext('2d')
      //   ctx_d.drawImage(img,0,0,middel_width, middel_height)
      //   let dataurl = canvas.toDataURL('image/png')
      //   document.getElementById('middleImageUrl').src= dataurl


      // } else {
      //   let MiddleImageObj = obj.middleImageUrl
      //   let SmallImageObj = obj.smallImageUrl

      //   if (this.isEmpty(MiddleImageObj.dataset.imageurl)) {
      //     return this.onFocusMethod(MiddleImageObj, '중간 이미지')
      //   } else if (this.isEmpty(SmallImageObj.dataset.imageurl)){
      //     return this.onFocusMethod(MiddleImageObj, '작은 이미지')
      //   } else {
      //     this.productData.middleImageUrl = MiddleImageObj.dataset.imageurl
      //     this.productData.smallImageUrl = SmallImageObj.dataset.imageurl
      //   }
      // }

      this.updateProductData.isAutoImageUpload = 1


      // 다른이미지 Validate
      if(this.images.length > 0) {
        let targetObjName
        for(let othercnt = 0; othercnt < this.images.length; othercnt++) {
          targetObjName = this.images[othercnt]
          if (targetObjName.url !== '') {
            this.updateProductData['isUsedOptionalImage' +(othercnt+1)] = 1
            this.updateProductData['optionalImage' +(othercnt+1) + 'Url'] = targetObjName.url
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
          if (targetObj.videourl !== '') {
            this.updateProductData.media[videoCnt] = {
              'mediaId':  document.getElementById(targetObj.videoObjName).dataset.videourl,
              'title': this.$refs.videoRef.$refs[targetObj.videoTitle][0].value,
              'thumnailUrl': $('input[name=' + targetObj.imageObjName + ']').data('imageurl')
            }
          }
        }
      }

      // 재고설정
      let StockTypeCodeObj = obj.stockTypeCode
      if (StockTypeCodeObj[0].checked) {
        // 무제한
        this.updateProductData.stockTypeCode = 1
        this.updateProductData.stockQty = 0
      } else if (StockTypeCodeObj[1].checked) {
        this.updateProductData.stockTypeCode = 2
        let stockQtyObj = obj.stockQty
        if (stockQtyObj.value.length < 1) {
          return this.onFocusMethod(stockQtyObj, '재고수량')
        } else {
          this.updateProductData.stockQty = this.toNumber(stockQtyObj.value)
        }
      }

      this.updateProductData.feeTypeCode = this.toNumber(obj.feeTypeCode.value) 
      this.updateProductData.pointTypeCode = this.toNumber(obj.pointTypeCode.value)

      // 

      // 시중 가격
      let marketPrice = this.toNumber(String(this.productData.marketPrice))
      if (marketPrice === 0) {
        alert('시중가격을 확인해주세요')
        return false
      } else {
        this.updateProductData.marketPrice = this.toNumber(String(this.productData.marketPrice))
      }
     
      
      // 공구가격에 관련한 데이터 처리
      if (this.productData.prdtTypeCode === 2) {
        for(let _k in this.DateObject) {
          if (this.DateObject[_k] === '') {
            alert('공구가격의 할인일자 범위를 확인해주시기 바랍니다.')
            return false
          } 
        }

        this.updateProductData.productGroupBuy.startDate = ((this.DateObject.startDate).replace(/-/g,''))+(this.DateObject.startTime).replace(/:/g,'')
        this.updateProductData.productGroupBuy.endDate = ((this.DateObject.endDate).replace(/-/g,''))+(this.DateObject.endTime).replace(/:/g,'')


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
              this.updateProductData.productGroupBuy.productGroupBuyDiscount[i] = {
                peopleQty: this.toNumber(peopleObject.value),
                discount: this.toNumber(discountObject.value),
                isUse: 1
              }
            }
          }
        }
      }

      
      // 판매가
      let PriceObj = obj.price
      if (PriceObj.value.length < 1) {
        return this.onFocusMethod(PriceObj, '판매가')
      } else {
        this.updateProductData.price = this.toNumber(String(PriceObj.value))
      }

      // 공급가
      let SupplyPriceObj = obj.supplyPrice
      if (SupplyPriceObj.value.length < 1) {
        return this.onFocusMethod(SupplyPriceObj, '공급가')
      } else {
        this.updateProductData.supplyPrice = this.toNumber(String(SupplyPriceObj.value))
      }

      // 수수료율
      let feeRate = this.toNumber(String(this.productData.feeRate))
      if (this.isEmpty(feeRate)) {
        alert('수수료율을 확인해주시기 바랍니다.')
        return false
      } else {
        this.updateProductData.feeRate = parseFloat(feeRate / 100)
      }

      // 적립금
      let pointObj = obj.pointTypeCode
      if (pointObj.value === '4') {
        this.updateProductData.pointTypeCode = this.toNumber(document.Frm.pointTypeCodeSelect.value)
        this.updateProductData.pointRate = parseFloat(document.Frm.pointRate.value)
      } else if (pointObj.value === '6') {
        this.updateProductData.point = this.toNumber(document.Frm.point.value)
      }
      this.updateProductData.pointTypeCode = this.toNumber(obj.pointTypeCode.value)

      // 제조사
      let ManufacturerObj = obj.manufacturer
      if (ManufacturerObj.value.length < 1) {
        return this.onFocusMethod(ManufacturerObj, '제조사')
      } else {
        this.updateProductData.manufacturer = ManufacturerObj.value
      }

      // 원산지
      let OrigionObj = obj.origin
      if (OrigionObj.value.length < 1) {
        return this.onFocusMethod(OrigionObj, '원산지')
      } else {
        this.updateProductData.origin = OrigionObj.value
      }
      
      // Notify 공지부분
      let NotifyObj = this.notify
      this.updateProductData.productNotice.prdtNoticeBaseSysId = ''
      this.updateProductData.productNotice.notices.splice(0)
      if(NotifyObj.length > 0) {
        this.updateProductData.productNotice.prdtNoticeBaseSysId = this.productData.productNotice.prdtNoticeBaseSysId
        NotifyObj.forEach(_item => {
          let param
          if (!this.isEmpty(_item.prdtNoticeSysId) || _item.procTypeCode !== 4) {
            param = {
              item: _item.item,
              content: _item.content,
              procTypeCode: _item.procTypeCode
            }
            if (!this.isEmpty(_item.prdtNoticeSysId)) {param.prdtNoticeSysId = _item.prdtNoticeSysId}
            this.updateProductData.productNotice.notices.push(param)
          }
        })
      }
      
      let DeliveryPriceTypeCodeObj = this.productData.deliveryPriceTypeCode
      if (DeliveryPriceTypeCodeObj.value === '2') {
        // 착불비용
        if (obj.debitAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitAmount, '착불비용')
        } else {
          this.updateProductData.debitAmount = this.toNumber(obj.debitAmount.value)
        }
        // 착불시 무료비용
        if (obj.debitfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitfreeMinAmount, '착불비용시 무료배송비')
        } else {
          this.updateProductData.debitfreeMinAmount = this.toNumber(obj.debitfreeMinAmount.value)
        }
      } else if (DeliveryPriceTypeCodeObj.value === '3') {
        // 선불비용
        if (obj.prepaymentAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepaymentAmount, '선불비용')
        } else {
          this.updateProductData.prepaymentAmount = this.toNumber(obj.prepaymentAmount.value)
        }
        // 착불시 무료비용
        if (obj.prepayfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepayfreeMinAmount, '선불비용시 무료배송비')
        } else {
          this.updateProductData.prepayfreeMinAmount = this.toNumber(obj.prepayfreeMinAmount.value)
        }
      }
      //  상품 옵션유형 코드
      this.updateProductData.optionTypeCode = this.toNumber(document.Frm.optionTypeCode.value)

      if (this.updateProductData.optionTypeCode === 2) {
        // 상품옵션
        if (this.normalOptionCounter < 1) {
          return false
        } else {
          for (var optionCnt = 0; optionCnt < this.nomarlOptions.length; optionCnt++) {
            this.updateProductData.normalOptions[optionCnt] = {
              name: $('input[name=' + this.nomarlOptions[optionCnt].normalOptionName + ']').val(),
              content: $('textarea[name=' + this.nomarlOptions[optionCnt].normalOptionContent + ']').val()
            }
          }
        }
      } else if (this.updateProductData.optionTypeCode === 5) {
        this.updateProductData.optionDescription = document.Frm.optionDescription.value
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
          this.updateProductData.addingProducts[k] = {base: {itemGroup: $('input[name=' + this.additionOptions[k].itemGroupName + ']').val()}, details: details}
        }
      }
      // ------------------- Form Validate 체크 종료 -------------------
      // console.log(this.productData)
      // let CallbackFn = function (res) {
      //   console.log(res)
      //   alert('상품등록이 완료 되었습니다.')
      // }
      // this.axiosPostRequest('/api/v1/products', {jsonData: this.productData}, CallbackFn)
      return this.updateProductData
    },
    test: function () {

      if (this.productData.optionTypeCode === 2) {
        // 상품옵션
        let optionData = this.nomarlOptions;
        optionData.forEach(_item => {
          this.productData.normalOptions.push({
            name: _item.name,
            content: _item.content,
            procTypeCode: _item.procTypeCode
          })
        })
        // if (this.normalOptionCounter < 1) {
        //   return false
        // } else {
        //   for (var optionCnt = 0; optionCnt < this.nomarlOptions.length; optionCnt++) {
        //     this.productData.normalOptions[optionCnt] = {
        //       name: $('input[name=' + this.nomarlOptions[optionCnt].normalOptionName + ']').val(),
        //       content: $('textarea[name=' + this.nomarlOptions[optionCnt].normalOptionContent + ']').val()
        //     }
        //   }
        // }
      } else if (this.productData.optionTypeCode === 5) {
        this.productData.optionDescription = document.Frm.optionDescription.value
      }

    }
  }
}