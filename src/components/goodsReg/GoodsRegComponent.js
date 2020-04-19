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
      iconList: [],
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
      brandSysId: 0,
      sellerSysId: 0,
      isDisplay: 0,
      isVat: 0,
      isSoldout: 0,
      isAddingProduct: 0,
      isAutoImageUpload: 1,
      isWeekley: 0,
      optionTypeCode: 1,
      stockTypeCode: 1,
      priceTypeCode: 1,
      pointTypeCode: 1,
      deliveryPriceTypeCode: 6,
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
    insertSubmitValidate() {
      // ------------------- Form Validate 체크 시작 -------------------
      if (this.selectedCategories.categoryTable.length <= 0) {
        alert('카테고리를 선택하여 추가하여 주시기 바랍니다.')
        return false
      } else {
        this.productData.category.categories.splice(0)
        this.selectedCategories.categoryTable.forEach(item => {
          this.productData.category.categories.push({
            categorySysId1: item.categorySysId1,
            categorySysId2: item.categorySysId2 !== undefined ? item.categorySysId2 : 0,
            categorySysId3: item.categorySysId3 !== undefined ? item.categorySysId3 : 0,
            categorySysId4: item.categorySysId4 !== undefined ? item.categorySysId4 : 0,
            categorySysId5: item.categorySysId5 !== undefined ? item.categorySysId5 : 0
          });
        });
      }
      this.productData.iconList = this.productData.iconList.join(';')

      // 다른이미지 Validate
      if (this.images.length > 0) {
        let targetObjName;
        for (let othercnt = 0; othercnt < this.images.length; othercnt++) {
          targetObjName = this.images[othercnt];
          if (!this.isEmpty(targetObjName.imageurl)) {
            this.productData["isUsedOptionalImage" + (othercnt + 1)] = 1;
            this.productData["optionalImage" + (othercnt + 1) + "Url"] =
              targetObjName.imageurl;
          }
        }
      }

      // 영상 업로드
      let videos = this.videos;
      if (videos.length <= 0) {
        alert("1개 이상의 영상을 업로드 해야 합니다.");
        return false;
      } else {
        let vaildatArray = this.videos[0];
        if (this.isEmpty(vaildatArray.mediaId)) {
          // alert("1개 이상의 영상을 업로드 해야 합니다.");
          // return false;
        } else {
          this.videos.forEach(item => {
            this.productData.media.splice(0)
            if (!this.isEmpty(item.mediaId)) {
              this.productData.media.push({
                mediaTypeCode: item.mediaTypeCode,
                mediaId: item.mediaId,
                title: item.title,
                thumnailUrl: item.thumnailUrl
              });
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
        this.productData['productGroupBuy'] = {}
        this.productData.productGroupBuy.startDate =
          this.DateObject.startDate.replace(/-/g, "") +
          this.DateObject.startTime.replace(/:/g, "");
        this.productData.productGroupBuy.endDate =
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
            this.productData.productGroupBuy['productGroupBuyDiscount'] = []
            this.commonSellers.forEach(item => {
              this.productData.productGroupBuy.productGroupBuyDiscount.push({
                peopleQty: this.toNumber(String(item.people)),
                discount: this.toNumber(String(item.discount)),
                isUse: 1
              });
            });
          }
        }
      }

      this.productData.feeRateBase = this.productData.feeRateBase ? 0.09 : 0.00;
      this.productData.feeRateMedia = this.productData.feeRateMedia ? 0.09 : 0.00;
      this.productData.feeRateInfluencer = this.productData.feeRateInfluencer? 0.09: 0.00;
      this.productData.isWeekley = this.productData.isWeekley ? 1 : 0

      // 수수료율
      let feeRate = this.toNumber(String(this.productData.feeRate));
      if (this.isEmpty(feeRate)) {
        alert("수수료율을 확인해주시기 바랍니다.");
        return false;
      } else {
        this.productData.feeRate = parseFloat(feeRate / 100);
      }

      let addArray = this.productData.addingProducts
      addArray.forEach(item => {
        item.details.forEach(item => {
          item.isSoldout = (item.isSoldout ? 1: 0)
          item.isHide = (item.isHide ? 1: 0)
        })
      })

      return this.productData;
    }
  }
};
