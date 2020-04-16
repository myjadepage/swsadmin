import $ from "jquery";

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
      productGroupBuy: {
        startDate: "",
        endDate: "",
        productGroupBuyDiscount: []
      },
      iconList: [],
      bigImageUrl: "",
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
      isUsedOptionalImage10: 0,
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
      isDisplay: 1,
      isVat: 0,
      isSoldout: 0,
      isAddingProduct: 0,
      isAutoImageUpload: true,
      optionTypeCode: 1,
      stockTypeCode: 1,
      priceTypeCode: 1,
      pointTypeCode: 0,
      deliveryPriceTypeCode: 6,
      optionDescription: "",
      productNotice: { prdtNoticeBaseSysId: 0, notices: [] },
      addingProducts: [],
      normalOptions: []
    }
  }),
  methods: {
    insertSubmitValidate(obj) {
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

      // 간략한 설명 Validate
      let BriefCommentObj = obj.briefComment;
      if (BriefCommentObj.value.length < 1) {
        return this.onFocusMethod(BriefCommentObj, "간략한 설명");
      }

      // 상세 설명 Validate
      let BriefDescriptionObj = obj.briefDescription;
      if (BriefDescriptionObj.value.length < 1) {
        return this.onFocusMethod(BriefDescriptionObj, "상세 설명");
      }

      // 상품명  Validate
      let ProductNameObj = obj.name;
      if (ProductNameObj.value.length < 1) {
        return this.onFocusMethod(ProductNameObj, "상품명");
      }

      // 판매자
      let SellerSysIdObj = obj.sellers;
      if (SellerSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(SellerSysIdObj, "판매자");
      } else {
        this.productData.sellerSysId = this.toNumber(
          SellerSysIdObj[SellerSysIdObj.selectedIndex].value
        );
      }

      // 브랜드
      let BrandSysIdObj = obj.brandSysId;
      if (BrandSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(BrandSysIdObj, "브랜드");
      } else {
        this.productData.brandSysId = this.toNumber(
          BrandSysIdObj[BrandSysIdObj.selectedIndex].value
        );
      }

      // 상품 아이콘 Validate
      let IconListObj = obj.iconList;
      if (IconListObj.length < 1) {
        return this.onFocusMethod(IconListObj, "상품 아이콘");
      } else {
        let IconTempArray = new Array();
        for (let j = 0; j < obj.iconList.length; j++) {
          if ($(obj.iconList[j]).is(":checked")) {
            IconTempArray[j] = obj.iconList[j].value;
          }
        }
        this.productData.iconList = IconTempArray.join(";");
      }
      this.productData.isSoldout = this.productData.isSoldout ? 1 : 0;

      // 큰 이미지 Validate
      let BigimagesObj = obj.bigImageUrl;
      if (
        BigimagesObj.dataset.imageurl === null ||
        BigimagesObj.dataset.imageurl === ""
      ) {
        return this.onFocusMethod(BigimagesObj, "큰 이미지");
      } else {
        var imagesCdnUrl = document.Frm.bigImageUrl.dataset.imageurl;
        this.productData.bigImageUrl = imagesCdnUrl;
      }

      this.productData.isAutoImageUpload = 1;
      this.productData.middleImageUrl = document.getElementById("middleImageUrl").dataset.imageurl;
      this.productData.smallImageUrl = document.getElementById("smallImageUrl").dataset.imageurl;

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

      // 재고설정
      let StockTypeCodeObj = obj.stockTypeCode;
      if (StockTypeCodeObj[0].checked) {
        // 무제한
        this.productData.stockTypeCode = 1;
        this.productData.stockQty = 0;
      } else if (StockTypeCodeObj[1].checked) {
        this.productData.stockTypeCode = 2;
        let stockQtyObj = obj.stockQty;
        if (stockQtyObj.value.length < 1) {
          return this.onFocusMethod(stockQtyObj, "재고수량");
        } else {
          this.productData.stockQty = this.toNumber(stockQtyObj.value);
        }
      }

      this.productData.feeTypeCode;


      // 시중 가격
      let marketPrice = this.toNumber(String(this.productData.marketPrice));
      if (marketPrice === 0) {
        alert("시중가격을 확인해주세요");
        return false;
      } else {
        this.productData.marketPrice = this.toNumber(
          String(this.productData.marketPrice)
        );
      }

      // 공구가격에 관련한 데이터 처리
      if (this.productData.prdtTypeCode === 2) {
        for (let _k in this.DateObject) {
          if (this.DateObject[_k] === "") {
            alert("공구가격의 할인일자 범위를 확인해주시기 바랍니다.");
            return false;
          }
        }

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
            this.commonSellers.forEach(item => {
              this.productData.productGroupBuy.productGroupBuyDiscount.push({
                peopleQty: this.toNumber(String(item.people)),
                discount: this.toNumber(String(item.discount)),
                isUse: 1
              });
            });
            // for (let i = 0 ; i < this.commonSellers.length ; i++) {
            //   this.productData.productGroupBuy.productGroupBuyDiscount[i] = {
            //     peopleQty: this.toNumber(String(this.commonSellers[i].people)),
            //     discount: this.toNumber(String(this.commonSellers[i].discount)),
            //     isUse: 1
            //   }
            // }
          }
        }
      }

      this.productData.feeRateBase = this.productData.feeRateBase ? 9.0 : 0;
      this.productData.feeRateMedia = this.productData.feeRateMedia ? 9.0 : 0;
      this.productData.feeRateInfluencer = this.productData.feeRateInfluencer
        ? 9.0
        : 0;

      // 판매가
      if (this.productData.price <= 0) {
        alert("판매가를 확인하여 주시기 바랍니다");
        return false;
      } else {
        this.productData.price = this.toNumber(String(this.productData.price));
      }
      // let PriceObj = obj.price
      // if (PriceObj.value.length < 1) {
      //   return this.onFocusMethod(PriceObj, '판매가')
      // } else {
      //   this.productData.price = this.toNumber(String(PriceObj.value))
      // }

      // 공급가
      if (this.productData.supplyPrice <= 0) {
        alert("공급가를 확인하여 주시기 바랍니다.");
        return false;
      } else {
        this.productData.supplyPrice = this.toNumber(
          String(this.productData.supplyPrice)
        );
      }
      // let SupplyPriceObj = obj.supplyPrice
      // if (SupplyPriceObj.value.length < 1) {
      //   return this.onFocusMethod(SupplyPriceObj, '공급가')
      // } else {
      //   this.productData.supplyPrice = this.toNumber(String(SupplyPriceObj.value))
      // }

      // 수수료율
      let feeRate = this.toNumber(String(this.productData.feeRate));
      if (this.isEmpty(feeRate)) {
        alert("수수료율을 확인해주시기 바랍니다.");
        return false;
      } else {
        this.productData.feeRate = parseFloat(feeRate / 100);
      }

      // 적립금
      let pointObj = obj.pointTypeCode;
      if (pointObj.value === "4") {
        this.productData.pointTypeCode = this.toNumber(
          document.Frm.pointTypeCodeSelect.value
        );
        this.productData.pointRate = parseFloat(document.Frm.pointRate.value);
      } else if (pointObj.value === "6") {
        this.productData.point = this.toNumber(document.Frm.point.value);
      }
      this.productData.pointTypeCode = this.toNumber(obj.pointTypeCode.value);

      // 제조사
      let ManufacturerObj = obj.manufacturer;
      if (ManufacturerObj.value.length < 1) {
        return this.onFocusMethod(ManufacturerObj, "제조사");
      } else {
        this.productData.manufacturer = ManufacturerObj.value;
      }

      // 원산지
      let OrigionObj = obj.origin;
      if (OrigionObj.value.length < 1) {
        return this.onFocusMethod(OrigionObj, "원산지");
      } else {
        this.productData.origin = OrigionObj.value;
      }

      // Notify 공지부분
      let NotifyObj = this.notify;
      if (NotifyObj.length > 0) {
        NotifyObj.forEach(_item => {
          this.productData.productNotice.notices.push({
            item: _item.item,
            content: _item.content
          });
        });
      }

      let DeliveryPriceTypeCodeObj = this.productData.deliveryPriceTypeCode;
      if (DeliveryPriceTypeCodeObj.value === "2") {
        // 착불비용
        if (obj.debitAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitAmount, "착불비용");
        } else {
          this.productData.debitAmount = this.toNumber(obj.debitAmount.value);
        }
        // 착불시 무료비용
        if (obj.debitfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(
            obj.debitfreeMinAmount,
            "착불비용시 무료배송비"
          );
        } else {
          this.productData.debitfreeMinAmount = this.toNumber(
            obj.debitfreeMinAmount.value
          );
        }
      } else if (DeliveryPriceTypeCodeObj.value === "3") {
        // 선불비용
        if (obj.prepaymentAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepaymentAmount, "선불비용");
        } else {
          this.productData.prepaymentAmount = this.toNumber(
            obj.prepaymentAmount.value
          );
        }
        // 착불시 무료비용
        if (obj.prepayfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(
            obj.prepayfreeMinAmount,
            "선불비용시 무료배송비"
          );
        } else {
          this.productData.prepayfreeMinAmount = this.toNumber(
            obj.prepayfreeMinAmount.value
          );
        }
      }
      //  상품 옵션유형 코드
      this.productData.optionTypeCode = this.toNumber(
        document.Frm.optionTypeCode.value
      );
      if (this.productData.optionTypeCode === 2) {
        if (this.nomarlOptions.length > 0) {
          this.nomarlOptions.forEach(item => {
            if (item.procTypeCode !== 4) {
              this.productData.normalOptions.push({
                name: item.name,
                content: item.content
              });
            }
          });
        }
      }
      //  else if (this.productData.optionTypeCode === 5) {
      //   this.productData.optionDescription = this.productData.optionDescription
      // }

      // 추가 구성
      let isAddition =
        document.Frm.isAddingProduct.value === "0" ? false : true;
      if (isAddition) {
        for (let k = 0; k < this.additionOptions.length; k++) {
          if (this.additionOptions.procTypeCode !== 4) {
            let subAdditionArray = this.additionOptions[k].subAdditionOptions;
            let details = new Array();
            for (let sub = 0; sub < subAdditionArray.length; sub++) {
              if (subAdditionArray[sub].procTypeCode !== 4) {
                details[sub] = {
                  item: subAdditionArray[sub].item,
                  price: this.toNumber(String(this.isEmpty(subAdditionArray[sub].price) ? 0: subAdditionArray[sub].price)),
                  stockQty: this.toNumber(String(this.isEmpty(subAdditionArray[sub].stockQty) ? 0: subAdditionArray[sub].stockQty)),
                  isSoldout: subAdditionArray[sub].isSoldout ? 1 : 0,
                  isHide: subAdditionArray[sub].isHide ? 1 : 0
                };
              }
            }
            this.productData.addingProducts[k] = {
              base: { itemGroup: this.additionOptions[k].itemGroupName },
              details: details
            };
          }
        }
      }
      return this.productData;
    },
    onFocusMethod(object, message) {
      alert(message + "을(를) 확인하여 주시기 바랍니다.");
      object.focus();
      return false;
    }
  }
};
