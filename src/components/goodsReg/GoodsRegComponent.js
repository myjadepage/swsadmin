export default {
  data: () => ({
    productData: {
      productSysId: "",
      prdtTypeCode: 1,
      name: "",
      briefComment: "",
      briefDescription: "",
      detailDescription: "",
      detailAttachFileUrl: "",
      iconList: '1',
      bigImageUrl: require('@/assets/img/default_image.jpg'),
      middleImageUrl: "",
      smallImageUrl: "",
      optionalImage1Url: "",
      optionalImage2Url: "",
      optionalImage3Url: "",
      optionalImage4Url: "",
      optionalImage5Url: "",
      optionalImage6Url: "",
      optionalImage7Url: "",
      optionalImage8Url: "",
      optionalImage9Url: "",
      optionalImage10Url: "",
      isUsedOptionalImage1: 0,
      isUsedOptionalImage2: 0,
      isUsedOptionalImage3: 0,
      isUsedOptionalImage4: 0,
      isUsedOptionalImage5: 0,
      isUsedOptionalImage6: 0,
      isUsedOptionalImage7: 0,
      isUsedOptionalImage8: 0,
      isUsedOptionalImage9: 0,
      isUsedOptionalImage10:0,
      media: [],
      price: 0,
      naverPrice: 0,
      marketPrice: 0,
      supplyPrice: 0,
      discount: 0,
      discountRate: 0,
      manufacturer: "",
      displaySeq: 0,
      debitAmount: 0,
      prepaymentAmount: 0,
      debitfreeMinAmount: 0,
      prepayfreeMinAmount: 0,
      deliveryCommentHtml: "",
      category: { categories: [] },
      origin: "",
      point: 0,
      pointRate: 0.0,
      salesQty: 0,
      stockQty: 0,
      feeRate: 0,
      feeTypeCode: 1,
      feeRateBase: true,
      feeRateMedia: false,
      feeRateInfluencer: false,
      sellerSysId: 0,
      brandSysId: 0,
      isDisplay: 1,
      isVat: 1,
      isSoldout: false,
      isAddingProduct: 0,
      isAutoImageUpload: 1,
      isWeekly: false,
      isSale: false,
      isPlanBrand: false,
      isPlanThema: false,
      optionTypeCode: 1,
      stockTypeCode: 1,
      priceTypeCode: 1,
      pointTypeCode: 1,
      deliveryPriceTypeCode: 1,
      optionDescription: "",
      productNotice: { 
        prdtNoticeBaseSysId: 0, 
        notices: [
          {
            item: '',
            content: '',
            procTypeCode: 2
          }
        ] 
      },
      addingProducts: [
        {
          base: {
            itemGroup: '',
            procTypeCode: 2
          },
          details: [
            {
              item: "",
              price: 0,
              stockQty: 0,
              isSoldout: false,
              isHide: false,
              procTypeCode: 2
            }
          ],
          procTypeCode: 2
        }
      ],
      normalOptions: [{ name: '', content: '', procTypeCode: 2 }]
    }
  }),
  methods: {
    onSubmitValidate() {
      let sendObject = {}
      sendObject.prdtTypeCode = this.productData.prdtTypeCode
      sendObject.salesQty = this.productData.salesQty
      // ------------------- Form Validate 체크 시작 -------------------
      // 카테고리 선택에 대한 필수값 체크
      let categoryObject = this.selectedCategories.categoryTable
      
      if (categoryObject.length <= 0) {
        alert('카테고리를 추가하여 주시기 바랍니다.')
        return false
      } else {
        sendObject.category ={
          categories: []
        }
        categoryObject.forEach(item => {
          let row = {}
          row.categorySysId1 = item.categorySysId1
          row.categorySysId2 = item.categorySysId2
          row.categorySysId3 = item.categorySysId3 !== undefined ? item.categorySysId3 : 0
          row.categorySysId4 = item.categorySysId4 !== undefined ? item.categorySysId4 : 0
          row.categorySysId5 = item.categorySysId5 !== undefined ? item.categorySysId5 : 0
          if (!this.isEmpty(item['prdtCategorySysId'])) {
            row.prdtCategorySysId = item.prdtCategorySysId
            row.procTypeCode = item.procTypeCode
          } else {
            row.procTypeCode = 2
          }
          sendObject.category.categories.push(row);
        });
        
        let itemCounter = 0
        for(let validateItem of sendObject.category.categories) {
          if (this.isEmpty(validateItem['prdtCategorySysId'])) {
            if (validateItem.procTypeCode !== 4) {
              itemCounter++
            }
          } else {
            itemCounter++
          }
        }
        if (itemCounter < 1) {
          alert('카테고리를 추가하여 주시기 바랍니다.')
          return false
        }
      }

      if (String(this.productData.briefComment).trim().length < 1) {
        this.popAlert('간략한 설명')
        return false
      } else {
        sendObject.briefComment = String(this.productData.briefComment).trim()
      }
      
      if (String(this.productData.briefDescription).trim().length < 1) {
        this.popAlert('상세한 설명')
        return false
      } else {
        sendObject.briefDescription = String(this.productData.briefDescription).trim()
      }

      if (String(this.productData.name).trim().length < 1) {
        this.popAlert('상품명')
        return false
      } else {
        sendObject.name = String(this.productData.name).trim()
      }

      if (this.productData.sellerSysId === 0) {
        this.popAlert('판매자')
        return false
      } else {
        sendObject.sellerSysId = this.productData.sellerSysId
      }

      if (this.productData.brandSysId === 0) {
        this.popAlert('브랜드')
        return false
      } else {
        sendObject.brandSysId = this.productData.brandSysId
      }

      if (this.productData.bigImageUrl.length > 100) {
        alert('큰 이미지를 확인하여 주시기 바랍니다.')
        return false
      } else {
        sendObject.bigImageUrl = this.productData.bigImageUrl
        sendObject.middleImageUrl = this.productData.middleImageUrl
        sendObject.smallImageUrl = this.productData.smallImageUrl
      }
      sendObject.isAutoImageUpload = this.productData.isAutoImageUpload

      // 다른이미지 Validate
      if (this.images.length > 0) {
        let targetObjName;
        for (let othercnt = 0; othercnt < this.images.length; othercnt++) {
          targetObjName = this.images[othercnt];
          if (!this.isEmpty(targetObjName.imageurl)) {
            sendObject["isUsedOptionalImage" + (othercnt + 1)] = 1;
            sendObject["optionalImage" + (othercnt + 1) + "Url"] =
              targetObjName.imageurl;
          }
        }
      }

      // 영상 업로드
      let videos = this.videos;
      if (videos.length <= 0) {
        // alert("1개 이상의 영상을 업로드 해야 합니다.");
        // return false;
      } else {
        let vaildatArray = this.videos[0];
        if (this.isEmpty(vaildatArray.mediaId)) {
          // alert("1개 이상의 영상을 업로드 해야 합니다.");
          // return false;
        } else {
          sendObject.media = []
          this.videos.forEach(item => {
            let row = {
              mediaId: item.mediaId,
              title: item.title,
              thumnailUrl: item.thumnailUrl,
              procTypeCode: item.procTypeCode
            }
            if (!this.isEmpty(item['prdtMediaSysId'])) {
              row.prdtMediaSysId = item['prdtMediaSysId']
            }
            if (!this.isEmpty(item.mediaId)) {
              sendObject.media.push(row);
            }
          });
        }
      }

      
      // 공구가격에 관련한 데이터 처리
      if (this.productData.prdtTypeCode === 2) {
        for (let _k in this.DateObject) {
          if (this.DateObject[_k] === "") {
            alert("공구가격의 할인일자 범위를 확인해주시기 바랍니다.");
            return false;
          }
        }
        sendObject['productGroupBuy'] = {}
        sendObject.productGroupBuy.startDate =
          this.DateObject.startDate.replace(/-/g, "") +
          this.DateObject.startTime.replace(/:/g, "");
        sendObject.productGroupBuy.endDate =
          this.DateObject.endDate.replace(/-/g, "") +
          this.DateObject.endTime.replace(/:/g, "");

        // 할인인원 범위 Validate
        if (this.commonSellers.length < 1) {
          alert("최소 1개의 할인인원 범위가 존재해야 합니다.");
          return false;
        } else {
          let firstObject = this.commonSellers[0];
          let peopleObject = firstObject.people;
          let discountObject = firstObject.discount;
          if (this.isEmpty(peopleObject) || this.isEmpty(discountObject)) {
            alert("할인인원 범위 정책을 확인하여 주시기바랍니다.");
            return false;
          } else {
            sendObject.productGroupBuy['productGroupBuyDiscount'] = []
            this.commonSellers.forEach(item => {
              sendObject.productGroupBuy.productGroupBuyDiscount.push({
                peopleQty: this.toNumber(String(item.people)),
                discount: this.toNumber(String(item.discount)),
                isUse: 1
              });
            });
          }
        }
      }
      // 재고 설정
      sendObject.stockTypeCode = this.productData.stockTypeCode
      sendObject.stockQty = this.productData.stockQty
      sendObject.isSoldout = (this.productData.isSoldout ? 1 : 0)
      sendObject.isVat = this.productData.isVat

      // 진열 설정
      sendObject.isDisplay = this.productData.isDisplay
      sendObject.isWeekly = this.productData.isWeekly ? 1 : 0
      sendObject.isSale = this.productData.isSale ? 1 : 0  
      sendObject.isPlanBrand = this.productData.isPlanBrand ? 1 : 0 
      sendObject.isPlanThema = this.productData.isPlanThema ? 1 : 0 
      sendObject.marketPrice = this.toNumber(String(this.productData.marketPrice))
      sendObject.naverPrice = this.toNumber(String(this.productData.naverPrice))
      sendObject.feeTypeCode = this.productData.feeTypeCode
      // 가격 설정

      sendObject.feeRateBase = this.productData.feeRateBase ? 0.09 : 0.00;
      sendObject.feeRateMedia = this.productData.feeRateMedia ? 0.09 : 0.00;
      sendObject.feeRateInfluencer = this.productData.feeRateInfluencer? 0.09: 0.00;
      
      sendObject.priceTypeCode = this.productData.priceTypeCode
      // 판매가
      if (this.isEmpty(this.productData.price)) {
        this.popAlert('판매가')
        return false
      } else {
        sendObject.price = this.toNumber(String(this.productData.price))
      }     
      // 수수료율
      let feeRate = this.toNumber(String(this.productData.feeRate));
      if (this.isEmpty(feeRate)) {
        alert("수수료율을 확인해주시기 바랍니다.");
        return false;
      } else {
        sendObject.feeRate = this.toNumber(String(this.productData.feeRate)) / 100
        
      }
      // 공급가 정보
      if (this.isEmpty(this.productData.supplyPrice)) {
        this.popAlert('공급가')
        return false
      } else {
        sendObject.supplyPrice = this.toNumber(String(this.productData.supplyPrice))
      }

      sendObject.pointTypeCode = this.productData.pointTypeCode
      sendObject.point = this.toNumber(String(this.productData.point))
      sendObject.pointRate = this.toNumber(String(this.productData.pointRate))

      if (String(this.productData.manufacturer).trim().length < 1) {
        this.popAlert('제조사')
        return false
      } else {
        sendObject.manufacturer = this.productData.manufacturer
      }
      
      if (String(this.productData.origin).trim().length < 1) {
        this.popAlert('원산지')
        return false
      } else {
        sendObject.origin = this.productData.origin
      }

      // 상품고시정보에 대해서 첫번째 컬럼이 빈값일 경우는 에러이다. 
      const checkNotice = this.productData.productNotice.notices[0]
      console.log(checkNotice)
      if (this.productData.productNotice.notices.length === 0) {
        this.popAlert('상품고시정보');
        return false
      } else if (this.isEmpty(checkNotice.item)) {
        this.popAlert('첫번째 상품고시 항목 ')
        return false
      } else if (this.isEmpty(checkNotice.content)) {
        this.popAlert('첫번째 상품고시 내용 ')
        return false
      } else {
        sendObject.productNotice = this.productData.productNotice
      }
      
      // 상품설명
      if (this.isEmpty(this.productData.detailDescription)) {
        this.popAlert('상품설명')
        return false
      } else {
        sendObject.detailDescription = this.productData.detailDescription
      }
      
      //배송비 설정
      sendObject.deliveryPriceTypeCode = this.productData.deliveryPriceTypeCode
      sendObject.debitAmount = this.toNumber(String(this.productData.debitAmount))
      sendObject.debitfreeMinAmount = this.toNumber(String(this.productData.debitfreeMinAmount))
      sendObject.prepaymentAmount = this.toNumber(String(this.productData.prepaymentAmount))
      sendObject.prepayfreeMinAmount = this.toNumber(String(this.productData.prepayfreeMinAmount))
      // 배송정책에 관련
      sendObject.deliveryCommentHtml = this.productData.deliveryCommentHtml
      sendObject.normalOptions = this.productData.normalOptions

      sendObject.optionTypeCode = this.productData.optionTypeCode
      sendObject.isAddingProduct = this.productData.isAddingProduct


      // 추가 구성
      let addArray = this.productData.addingProducts

      sendObject.addingProducts = addArray.forEach(item => {
        item.details.forEach(subItem => {
          subItem.price =  this.toNumber(String(subItem.price))
          subItem.stockQty =  this.toNumber(String(subItem.stockQty))
          subItem.isSoldout = (subItem.isSoldout ? 1: 0)
          subItem.isHide = (subItem.isHide ? 1: 0)
        })
      })

      return sendObject;
    },
    popAlert: function (message) {
      alert(`${message}을(를) 확인하여 주시기 바랍니다.`)
      return false
    },
    getProductData(res) {
      // 카테고리 정보 세팅
      let categoryData = res.data.jsonData.listPrdtCate;
      categoryData.forEach(item => {
        let row = {}
        row.procTypeCode = 1
        row.prdtCategorySysId = item.prdtCategorySysId
        if (!this.isEmpty(item.categorySysId1)){
          row.categorySysId1 = item.categorySysId1
          row.categoryText1 = item.categoryName1
        }
        if (!this.isEmpty(item.categorySysId2)){
          row.categorySysId2 = item.categorySysId2
          row.categoryText2 = item.categoryName2
        }
        if (!this.isEmpty(item.categorySysId3)){
          row.categorySysId3 = item.categorySysId3
          row.categoryText3 = item.categoryName3
        }
        if (!this.isEmpty(item.categorySysId4)){
          row.categorySysId4 = item.categorySysId4
          row.categoryText4 = item.categoryName4
        }
        if (!this.isEmpty(item.categorySysId5)){
          row.categorySysId5 = item.categorySysId5
          row.categoryText5 = item.categoryName5
        }
        row.procTypeCode = 1
        row.prdtCategorySysId = item.prdtCategorySysId
        this.selectedCategories.categoryTable.push(row)
      });


      //상품 정보
      let product = res.data.jsonData.product;
      this.images.splice(0);
      for (let _k in product) {
        // 다른 이미지 처리
        if (_k.indexOf("isUsedOptionalImage") > -1) {
          if (product[_k] !== 0) {
            let num = _k.replace("isUsedOptionalImage", '');
            this.images.push({
              imageurl: product["optionalImage" + num + "Url"]
            });
          }
        } else if (_k.indexOf("iconList") > -1) {
          this.iconList = product[_k].split(";");
        } else if (_k === "isAutoImageUpload") {
          this.productData[_k] = 1;
        } else if (_k === 'feeRate'){
          this.productData[_k] = product[_k] * 100
        } else if (_k === 'feeRateBase'){
          this.productData[_k] = (product[_k] > 0 ? true : false)
        } else if (_k === 'feeRateMedia'){
          this.productData[_k] = (product[_k] > 0 ? true : false)
        } else if (_k === 'feeRateInfluencer'){
          this.productData[_k] = (product[_k] > 0 ? true : false)
        }else {
          this.productData[_k] = product[_k];
        }
      }
      
      this.productData.isWeekly = (product.isWeekly === 1 ? true : false)
      this.productData.isSale = (product.isSale === 1 ? true : false)
      this.productData.isPlanBrand = (product.isPlanBrand === 1 ? true : false)
      this.productData.isPlanThema = (product.isPlanThema === 1 ? true : false)

      this.changeBrandList(product.sellerSysId)
      this.productData.brandSysId = product.brandSysId
      // 영상정보 세팅
      if (!this.isEmpty(res.data.jsonData['listProductMedia'])){
        let media = res.data.jsonData.listProductMedia;
        this.videos.splice(0);
        for (let item of media) {
            this.videos.push({
              prdtMediaSysId: item.prdtMediaSysId,
              mediaId: item.mediaId,
              title: item.title,
              videoTitle: this.isEmpty(item.mediaId) ? '' : "영상있음",
              thumnailUrl: item.thumnailUrl,
              progressValue: 0,
              progressMax: 0,
              procTypeCode: 3
            })
        }
      }

      // 상품 고시 로딩 시에 세팅
      if (!this.isEmpty(res.data.jsonData['productNotice'])){
        this.productData.productNotice = res.data.jsonData['productNotice']
        this.productData.productNotice.notices.forEach(item => {
          item.procTypeCode = 3
        })
      }

      // 일반 옵션시에 세팅
      if(!this.isEmpty(res.data.jsonData.normalOptions)){
        this.productData.normalOptions = res.data.jsonData.normalOptions
        this.productData.normalOptions.forEach(item => {
          item['procTypeCode'] = 3
        })
      }
      
      // 추가 구성 사항
      if (!this.isEmpty(res.data.jsonData['addingProducts'])){
        this.productData.addingProducts = res.data.jsonData.addingProducts;
        this.productData.addingProducts.forEach(item => {
          item.base['procTypeCode'] = 3
          item.details.forEach(sub => {
            sub['procTypeCode'] = 3
          })
        })
      }
    },
  }
};