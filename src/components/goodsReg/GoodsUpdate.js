export default {
  data() {
    return {
      updateProductData: {
        prdtTypeCode: 1,
        prdtSysId: '',
        name: '',
        briefComment: '',
        briefDescription: '',
        detailDescription: '',
        detailAttachFileUrl: '',
        // productGroupBuy: {
        //   startDate: '',
        //   endDate: '',
        //   productGroupBuyDiscount: []
        // },
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
        category: { categories: [] },
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
        productNotice: {
          prdtNoticeBaseSysId: '', 
          notices: [] 
        },
        addingProducts: [],
        normalOptions: []
      }
    };
  },
  methods: {
    async getProductData(res) {
      // 카테고리 정보 세팅
      let categoryData = res.data.jsonData.listPrdtCate;
      categoryData.forEach(item => {
        let categoryArray = new Array();
        if (!this.isEmpty(item.categorySysId1)) {
          categoryArray[0] = {
            value: item.categorySysId1,
            text: item.categoryName1,
            feeRate: 0
          };
        }
        if (!this.isEmpty(item.categorySysId2)) {
          categoryArray[1] = {
            value: item.categorySysId2,
            text: item.categoryName2,
            feeRate: 0
          };
        }
        if (!this.isEmpty(item.categorySysId3)) {
          categoryArray[2] = {
            value: item.categorySysId3,
            text: item.categoryName3,
            feeRate: 0
          };
        }
        if (!this.isEmpty(item.categorySysId4)) {
          categoryArray[3] = {
            value: item.categorySysId4,
            text: item.categoryName4,
            feeRate: 0
          };
        }
        if (!this.isEmpty(item.categorySysId5)) {
          categoryArray[4] = {
            value: item.categorySysId5,
            text: item.categoryName5,
            feeRate: 0
          };
        }
        this.addCateExtends(categoryArray, 1000, {
          prdtSysId: item.prdtSysId,
          prdtCategorySysId: item.prdtCategorySysId
        });
      });

      //상품 정보
      let product = res.data.jsonData.product;
      this.images.splice(0);
      for (let _k in product) {
        // 다른 이미지 처리
        if (_k.indexOf("isUsedOptionalImage") > -1) {
          if (product[_k] !== 0) {
            let num = _k.replace("isUsedOptionalImage", '');
            this.imagesCounter++;
            this.images.push({
              id: this.imagesCounter,
              imageVisibleTitle: product["optionalImage" + num + "Url"],
              imageObjName: "optionalImage" + num + "Url",
              url: product["optionalImage" + num + "Url"]
            });
          }
        } else if (_k.indexOf("iconList") > -1) {
          this.productData.iconList = product[_k].split(";");
        } else if (_k === "isAutoImageUpload") {
          this.productData[_k] = true;
        } else if (_k === 'feeRate'){
          this.productData[_k] = product[_k] * 100
        } else {
          this.productData[_k] = product[_k];
        }
      }

      // 판매자 브랜드 세팅
      this.changeSellerFn();

      // 영상정보 세팅
      let media = res.data.jsonData.listProductMedia;
      this.videos.splice(0);
      media.forEach(item => [
        this.videos.push({
          prdtMediaSysId: item.prdtMediaSysId,
          mediaId: item.mediaId,
          title: item.title,
          videoTitle: this.isEmpty(item.mediaId) ? '' : "영상있음",
          mediaTypeCode: item.mediaTypeCode,
          thumnailUrl: item.thumnailUrl,
          progressValue: 0,
          progressMax: 0,
          procTypeCode: 3
        })
      ]);

      // 상품 고시 로딩 시에 세팅
      let noticeObject = res.data.jsonData.productNotice;
      this.productData.prdtNoticeBaseSysId = noticeObject.prdtNoticeBaseSysId;
      this.notify.splice(0);
      noticeObject.notices.forEach(_item => {
        this.notify.push({
          item: _item.item,
          content: _item.content,
          procTypeCode: 3,
          prdtNoticeSysId: _item.prdtNoticeSysId
        });
      });
      
      // 일반 옵션시에 세팅
      let normalOptions = res.data.jsonData.normalOptions;
      if (normalOptions.length > 0) {
        this.nomarlOptions.splice(0);
        normalOptions.forEach(_item => {
          this.nomarlOptions.push({
            name: _item.name,
            content: _item.content,
            procTypeCode: 3,
            prdtNormalOptionSysId: _item.prdtNormalOptionSysId
          });
        });
      }

      // 추가 구성 사항
      let addingProducts = res.data.jsonData.addingProducts;
      this.additionOptions.splice(0);
      addingProducts.forEach(item => {
        let row = {
          itemGroup: item.base.itemGroup,
          prdtAddingProductSysId: item.base.prdtAddingProductSysId,
          procTypeCode: 3,
          subAdditionOptions: []
        };
        item.details.forEach(_item => {
          row.subAdditionOptions.push({
            procTypeCode: 3,
            prdtAddingProductSysId: _item.prdtAddingProductSysId,
            prdtAddingProductDetailSysId: _item.prdtAddingProductDetailSysId,
            item: _item.item,
            price: _item.price,
            stockQty: _item.stockQty,
            isSoldout: _item.isSoldout,
            isHide: _item.isHide
          });
        });
        this.additionOptions.push(row);
      });
    },
    // Update Validate
    updateSubmitValidate(obj) {
      // 카테 고리 추가
      this.updateProductData.category.categories.splice(0);
      if (this.categoryTable.length <= 0) {
        alert("카테고리를 확인하여 주시기 바랍니다.");
        return false;
      } else {
        this.categoryTable.forEach(item => {
          let params = {
            categorySysId1: item.categorySysId1,
            categorySysId2: item.categorySysId2
          };
          if (item.categorySysId3 > 0) {
            params.categorySysId3 = item.categorySysId3;
          }
          if (item.categorySysId4 > 0) {
            params.categorySysId4 = item.categorySysId4;
          }
          if (item.categorySysId5 > 0) {
            params.categorySysId5 = item.categorySysId5;
          }
          if (
            item.procTypeCode !== 4 ||
            !this.isEmpty(item.prdtCategorySysId)
          ) {
            params.procTypeCode = item.procTypeCode;
            params.prdtCategorySysId = item.prdtCategorySysId;
            this.updateProductData.category.categories.push(params);
          }
        });
      }

      // 간략한 설명 Validate
      let BriefCommentObj = obj.briefComment;
      if (BriefCommentObj.value.length < 1) {
        return this.onFocusMethod(BriefCommentObj, "간략한 설명");
      } else {
        this.updateProductData.briefComment = this.productData.briefComment;
      }

      // 상세 설명 Validate
      let BriefDescriptionObj = obj.briefDescription;
      if (BriefDescriptionObj.value.length < 1) {
        return this.onFocusMethod(BriefDescriptionObj, "상세 설명");
      } else {
        this.updateProductData.briefDescription = this.productData.briefDescription;
      }

      // 상품명  Validate
      let ProductNameObj = obj.name;
      if (ProductNameObj.value.length < 1) {
        return this.onFocusMethod(ProductNameObj, "상품명");
      } else {
        this.updateProductData.name = this.productData.name;
      }

      // 판매자
      let SellerSysIdObj = obj.sellers;
      if (SellerSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(SellerSysIdObj, "판매자");
      } else {
        this.updateProductData.sellerSysId = this.toNumber(
          SellerSysIdObj[SellerSysIdObj.selectedIndex].value
        );
      }

      // 브랜드
      let BrandSysIdObj = obj.brandSysId;
      if (BrandSysIdObj.selectedIndex === 0) {
        return this.onFocusMethod(BrandSysIdObj, "브랜드");
      } else {
        this.updateProductData.brandSysId = this.toNumber(
          BrandSysIdObj[BrandSysIdObj.selectedIndex].value
        );
      }

      // 상품 아이콘 Validate
      let IconListObj = obj.iconList;
      if (IconListObj.length < 1) {
        return this.onFocusMethod(IconListObj, "상품 아이콘");
      } else {
        this.updateProductData.iconList = this.productData.iconList.join(";");
      }
      this.updateProductData.isSoldout = this.productData.isSoldout ? 1 : 0;

      // 큰 이미지 Validate
      let BigimagesObj = obj.bigImageUrl;
      if (
        BigimagesObj.dataset.imageurl === null ||
        BigimagesObj.dataset.imageurl === ''
      ) {
        return this.onFocusMethod(BigimagesObj, "큰 이미지");
      } else {
        var imagesCdnUrl = document.Frm.bigImageUrl.dataset.imageurl;
        this.updateProductData.bigImageUrl = imagesCdnUrl;
      }

      this.updateProductData.isAutoImageUpload = 1;
      this.updateProductData.middleImageUrl = document.getElementById("middleImageUrl").dataset.imageurl;
      this.updateProductData.smallImageUrl = document.getElementById("smallImageUrl").dataset.imageurl;
      this.updateProductData.isAutoImageUpload = 1;

      // 다른이미지 Validate
      if (this.images.length > 0) {
        let targetObjName;
        for (let othercnt = 0; othercnt < this.images.length; othercnt++) {
          targetObjName = this.images[othercnt];
          if (targetObjName.url !== '') {
            this.updateProductData["isUsedOptionalImage" + (othercnt + 1)] = 1;
            this.updateProductData["optionalImage" + (othercnt + 1) + "Url"] =
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
          alert("1개 이상의 영상을 업로드 해야 합니다.");
          return false;
        } else {
          this.videos.forEach(item => {
            if (!this.isEmpty(item.prdtMediaSysId)) {
              this.updateProductData.media.push(item);
            } else if (item.procTypeCode !== 4) {
              this.updateProductData.media.push(item);
            }
          });
        }
      }

      this.updateProductData.isDisplay = this.productData.isDisplay
      this.updateProductData.isVat = this.productData.isVat
      this.updateProductData.marketPrice = this.productData.marketPrice
      this.updateProductData.feeRateBase = (this.productData.feeRateBase ? 9 : 0)
      this.updateProductData.feeRateMedia = (this.productData.feeRateMedia ? 9 : 0)
      this.updateProductData.feeRateInfluencer = (this.productData.feeRateInfluencer ? 9 : 0)


      // 재고설정
      let StockTypeCodeObj = obj.stockTypeCode;
      if (StockTypeCodeObj[0].checked) {
        // 무제한
        this.updateProductData.stockTypeCode = 1;
        this.updateProductData.stockQty = 0;
      } else if (StockTypeCodeObj[1].checked) {
        this.updateProductData.stockTypeCode = 2;
        let stockQtyObj = obj.stockQty;
        if (stockQtyObj.value.length < 1) {
          return this.onFocusMethod(stockQtyObj, "재고수량");
        } else {
          this.updateProductData.stockQty = this.toNumber(stockQtyObj.value);
        }
      }

      this.updateProductData.feeTypeCode = this.toNumber(String(this.productData.feeTypeCode));
      this.updateProductData.pointTypeCode = this.toNumber(String(this.productData.pointTypeCode));

      // 시중 가격
      let marketPrice = this.toNumber(String(this.productData.marketPrice));
      if (marketPrice === 0) {
        alert("시중가격을 확인해주세요");
        return false;
      } else {
        this.updateProductData.marketPrice = this.toNumber(
          String(this.productData.marketPrice)
        );
      }

      // 공구가격에 관련한 데이터 처리
      if (this.productData.prdtTypeCode === 2) {
        for (let _k in this.DateObject) {
          if (this.DateObject[_k] === '') {
            alert("공구가격의 할인일자 범위를 확인해주시기 바랍니다.");
            return false;
          }
        }

        this.updateProductData.productGroupBuy.startDate =
          this.DateObject.startDate.replace(/-/g, '') +
          this.DateObject.startTime.replace(/:/g, '');
        this.updateProductData.productGroupBuy.endDate =
          this.DateObject.endDate.replace(/-/g, '') +
          this.DateObject.endTime.replace(/:/g, '');

        // 할인인원 범위 Validate
        if (this.commonSellers.length < 1) {
          alert("최소 1개의 할인인원 범위가 존재해야 합니다.");
          return false;
        } else {
          let firstObject = this.commonSellers[0];
          let peopleObject = document.getElementById(firstObject.peopleObjName);
          let discountObject = document.getElementById(
            firstObject.discountObjName
          );
          if (
            this.isEmpty(peopleObject.value) ||
            this.isEmpty(discountObject.value)
          ) {
            alert("할인인원 범위 정책을 확인하여 주시기바랍니다.");
            return false;
          } else {
            for (let i = 0; i < this.commonSellers.length; i++) {
              peopleObject = document.getElementById(
                this.commonSellers[i].peopleObjName
              );
              discountObject = document.getElementById(
                this.commonSellers[i].discountObjName
              );
              this.updateProductData.productGroupBuy.productGroupBuyDiscount[
                i
              ] = {
                peopleQty: this.toNumber(peopleObject.value),
                discount: this.toNumber(discountObject.value),
                isUse: 1
              };
            }
          }
        }
      }

      // 판매가
      let PriceObj = obj.price;
      if (PriceObj.value.length < 1) {
        return this.onFocusMethod(PriceObj, "판매가");
      } else {
        this.updateProductData.price = this.toNumber(String(PriceObj.value));
      }

      // 공급가
      let SupplyPriceObj = obj.supplyPrice;
      if (SupplyPriceObj.value.length < 1) {
        return this.onFocusMethod(SupplyPriceObj, "공급가");
      } else {
        this.updateProductData.supplyPrice = this.toNumber(
          String(SupplyPriceObj.value)
        );
      }

      // 수수료율
      let feeRate = this.toNumber(String(this.productData.feeRate));
      if (this.isEmpty(feeRate)) {
        alert("수수료율을 확인해주시기 바랍니다.");
        return false;
      } else {
        this.updateProductData.feeRate = parseFloat(feeRate / 100);
      }

      // 적립금
      let pointObj = obj.pointTypeCode;
      if (pointObj.value === "4") {
        this.updateProductData.pointTypeCode = this.toNumber(
          document.Frm.pointTypeCodeSelect.value
        );
        this.updateProductData.pointRate = parseFloat(
          document.Frm.pointRate.value
        );
      } else if (pointObj.value === "6") {
        this.updateProductData.point = this.toNumber(document.Frm.point.value);
      }
      this.updateProductData.pointTypeCode = this.toNumber(
        obj.pointTypeCode.value
      );

      // 제조사
      let ManufacturerObj = obj.manufacturer;
      if (ManufacturerObj.value.length < 1) {
        return this.onFocusMethod(ManufacturerObj, "제조사");
      } else {
        this.updateProductData.manufacturer = ManufacturerObj.value;
      }

      // 원산지
      let OrigionObj = obj.origin;
      if (OrigionObj.value.length < 1) {
        return this.onFocusMethod(OrigionObj, "원산지");
      } else {
        this.updateProductData.origin = OrigionObj.value;
      }

      // Notify 공지부분
      let NotifyObj = this.notify;
      this.updateProductData.productNotice.prdtNoticeBaseSysId = '';
      this.updateProductData.productNotice.notices.splice(0);
      if (NotifyObj.length > 0) {
        this.updateProductData.productNotice.prdtNoticeBaseSysId = this.productData.productNotice.prdtNoticeBaseSysId;
        NotifyObj.forEach(_item => {
          let param;
          if (
            !this.isEmpty(_item.prdtNoticeSysId) ||
            _item.procTypeCode !== 4
          ) {
            param = {
              item: _item.item,
              content: _item.content,
              procTypeCode: _item.procTypeCode
            };
            if (!this.isEmpty(_item.prdtNoticeSysId)) {
              param.prdtNoticeSysId = _item.prdtNoticeSysId;
            }
            this.updateProductData.productNotice.notices.push(param);
          }
        });
      }

      let DeliveryPriceTypeCodeObj = this.productData.deliveryPriceTypeCode;
      if (DeliveryPriceTypeCodeObj.value === "2") {
        // 착불비용
        if (obj.debitAmount.value.length < 1) {
          return this.onFocusMethod(obj.debitAmount, "착불비용");
        } else {
          this.updateProductData.debitAmount = this.toNumber(
            obj.debitAmount.value
          );
        }
        // 착불시 무료비용
        if (obj.debitfreeMinAmount.value.length < 1) {
          return this.onFocusMethod(
            obj.debitfreeMinAmount,
            "착불비용시 무료배송비"
          );
        } else {
          this.updateProductData.debitfreeMinAmount = this.toNumber(
            obj.debitfreeMinAmount.value
          );
        }
      } else if (DeliveryPriceTypeCodeObj.value === "3") {
        // 선불비용
        if (obj.prepaymentAmount.value.length < 1) {
          return this.onFocusMethod(obj.prepaymentAmount, "선불비용");
        } else {
          this.updateProductData.prepaymentAmount = this.toNumber(
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
          this.updateProductData.prepayfreeMinAmount = this.toNumber(
            obj.prepayfreeMinAmount.value
          );
        }
      }
      //  상품 옵션유형 코드
      this.updateProductData.optionTypeCode = this.toNumber(document.Frm.optionTypeCode.value);

      if (this.updateProductData.optionTypeCode === 2) {
        // 상품옵션
        if (this.nomarlOptions.length > 0) {
          this.nomarlOptions.forEach(item => {
            if (!this.isEmpty(item.prdtNormalOptionSysId) || item.procTypeCode !==4) {
              this.updateProductData.normalOptions.push(item)
            }
          })
        }
      } else if (this.updateProductData.optionTypeCode === 5) {
        this.updateProductData.optionDescription =
          document.Frm.optionDescription.value;
      }

      // 추가 구성
      let isAddition = document.Frm.isAddingProduct.value === "0" ? false : true;
      if (isAddition) {
        this.additionOptions.forEach(addOption => {
          let row = {
            base: {},
            details: []
          }
          if (addOption.procTypeCode !==4 || !this.isEmpty(addOption.prdtAddingProductSysId)) {
            row.base = addOption
          }
          addOption.subAdditionOptions.forEach(item => {
            if (item.procTypeCode !==4 || !this.isEmpty(item.prdtAddingProductDetailSysId)) {
              row.details.push(item)
            }
          })
          this.updateProductData.addingProducts.push(row)
        })
        // for (let k = 0; k < this.additionOptions.length; k++) {
        //   if (this.additionOptions[k].procTypeCode !== 4 || !this.isEmpty(this.additionOptions[k].prdtAddingProductSysId)) {
        //     let subAdditionArray = this.additionOptions[k].subAdditionOptions;
        //     let details = new Array();
        //     for (let sub = 0; sub < subAdditionArray.length; sub++) {
        //       if (subAdditionArray[sub].procTypeCode !== 4 || !this.isEmpty(subAdditionArray[sub].prdtAddingProductDetailSysId)) {
        //         details[sub] = {
        //           item: subAdditionArray[sub].item,
        //           price: this.toNumber(String(this.isEmpty(subAdditionArray[sub].price)? 0: subAdditionArray[sub].price)),
        //           stockQty: this.toNumber(String(this.isEmpty(subAdditionArray[sub].stockQty)? 0: subAdditionArray[sub].stockQty)),
        //           isSoldout: subAdditionArray[sub].isSoldout ? 1 : 0,
        //           isHide: subAdditionArray[sub].isHide ? 1 : 0,
        //           proctTypecode : subAdditionArray[sub].procTypeCode
        //         };
        //         if (!this.isEmpty(subAdditionArray[sub].prdtAddingProductDetailSysId)) {
        //           details.prdtAddingProductDetailSysId = subAdditionArray[sub].prdtAddingProductDetailSysId
        //         }
        //       }
        //     }
        //     let row = {
        //       base: { 
        //         itemGroup: this.additionOptions[k].itemGroup,
        //         procTypeCode : this.additionOptions[k].procTypeCode,
        //         prdtAddingProductSysId: this.additionOptions[k].prdtAddingProductSysId
        //       },
        //       details: details
        //     }
        //     this.updateProductData.addingProducts.push(row)
        //   }
        // }
      }

      return this.updateProductData;
    }
  }
};
