export default {
  data() {
    return {}
  },
  methods: {
    async getProductData(res) {
      // 카테고리 정보 세팅
      let categoryData = res.data.jsonData.listPrdtCate;
      categoryData.forEach(item => {
        let row = {}
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
          this.productData.iconList = product[_k].split(";");
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
      // 판매자 브랜드 세팅
      this.resultSeller(this.productData.sellerSysId);

      // 영상정보 세팅
      if (!this.isEmpty(res.data.jsonData['listProductMedia'])){
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
    // Update Validate
    updateSubmitValidate() {
    //   // ------------------- Form Validate 체크 시작 -------------------
    //   if (this.selectedCategories.categoryTable.length <= 0) {
    //     alert('카테고리를 선택하여 추가하여 주시기 바랍니다.')
    //     return false
    //   } else {
    //     this.updateProductData.category.categories.splice(0)
    //     this.selectedCategories.categoryTable.forEach(item => {
    //       let params = {
    //         categorySysId1: item.categorySysId1,
    //         categorySysId2: item.categorySysId2 !== undefined ? item.categorySysId2 : 0,
    //         categorySysId3: item.categorySysId3 !== undefined ? item.categorySysId3 : 0,
    //         categorySysId4: item.categorySysId4 !== undefined ? item.categorySysId4 : 0,
    //         categorySysId5: item.categorySysId5 !== undefined ? item.categorySysId5 : 0
    //       }
    //       if (item.procTypeCode !== 4 || !this.isEmpty(item.prdtCategorySysId)) {
    //         params.procTypeCode = item.procTypeCode;
    //         params.prdtCategorySysId = item.prdtCategorySysId;
    //         this.updateProductData.category.categories.push(params);
    //       }
          
    //     });
    //   }
    //   this.updateProductData.prdtTypeCode = String(this.productData.prdtTypeCode)
    //   this.updateProductData.isAutoImageUpload = (this.productData.isAutoImageUpload ? 1 : 0)
    //   this.updateProductData.name = this.productData.name
    //   this.updateProductData.briefComment = this.productData.briefComment
    //   this.updateProductData.briefDescription = this.productData.briefDescription
    //   this.updateProductData.detailDescription = this.productData.detailDescription
    //   this.updateProductData.detailAttachFileUrl = this.productData.detailAttachFileUrl
    //   this.updateProductData.sellSysId = this.productData.sellSysId
    //   this.updateProductData.brandSysId = this.productData.brandSysId
    //   this.updateProductData.iconList = this.productData.iconList.join(';')
      
    //   this.updateProductData.bigImageUrl = this.productData.bigImageUrl
    //   this.updateProductData.middleImageUrl = this.productData.middleImageUrl
    //   this.updateProductData.smallImageUrl = this.productData.smallImageUrl

    //   // 다른이미지 Validate
    //   if (this.images.length > 0) {
    //     let targetObjName;
    //     for (let othercnt = 0; othercnt < this.images.length; othercnt++) {
    //       targetObjName = this.images[othercnt];
    //       if (!this.isEmpty(targetObjName.imageurl)) {
    //         this.updateProductData["isUsedOptionalImage" + (othercnt + 1)] = 1;
    //         this.updateProductData["optionalImage" + (othercnt + 1) + "Url"] =
    //           targetObjName.imageurl;
    //       }
    //     }
    //   }

    //   // 영상 업로드
    //   let videos = this.videos;
    //   if (videos.length <= 0) {
    //     // alert("1개 이상의 영상을 업로드 해야 합니다.");
    //     // return false;
    //   } else {
    //     let vaildatArray = this.videos[0];
    //     if (this.isEmpty(vaildatArray.mediaId)) {
    //       // alert("1개 이상의 영상을 업로드 해야 합니다.");
    //       // return false;
    //     } else {
    //       this.videos.forEach(item => {
    //         if (!this.isEmpty(item.mediaId)) {
    //           this.updateProductData.media.push({
    //             mediaTypeCode: item.mediaTypeCode,
    //             mediaId: item.mediaId,
    //             title: item.title,
    //             thumnailUrl: item.thumnailUrl
    //           });
    //         }
    //       });
    //     }
    //   }

    //   this.updateProductData.stockTypeCode = this.productData.stockTypeCode
    //   this.updateProductData.stockQty = this.productData.stockQty
    //   this.updateProductData.isSoldout = this.productData.isSoldout
      
    //   this.updateProductData.isDisplay = this.productData.isDisplay
    //   this.updateProductData.marketPrice = this.productData.marketPrice
    //   this.updateProductData.feeTypeCode = this.productData.feeTypeCode

    //   // this.updateProductData.feeRateBase = (this.productData.feeRateBase === true  ? parseFloat(0.09) : parseFloat(0.00));
    //   // this.updateProductData.feeRateMedia = (this.productData.feeRateMedia === true ? parseFloat(0.09) : parseFloat(0.00));
    //   // this.updateProductData.feeRateInfluencer = (this.productData.feeRateInfluencer === true ? parseFloat(0.09): parseFloat(0.00));

    //   this.updateProductData.isVat = this.productData.isVat
    //   this.updateProductData.price = this.productData.price
    //   this.updateProductData.feeRate = this.productData.feeRate
    //   this.updateProductData.supplyPrice = this.productData.supplyPrice

    //   // 공구가격에 관련한 데이터 처리
    //   if (this.updateProductData.prdtTypeCode === 2) {
    //     for (let _k in this.DateObject) {
    //       if (this.DateObject[_k] === "") {
    //         alert("공구가격의 할인일자 범위를 확인해주시기 바랍니다.");
    //         return false;
    //       }
    //     }
    //     this.updateProductData['productGroupBuy'] = {}
    //     this.updateProductData.productGroupBuy.startDate =
    //       this.DateObject.startDate.replace(/-/g, "") +
    //       this.DateObject.startTime.replace(/:/g, "");
    //     this.updateProductData.productGroupBuy.endDate =
    //       this.DateObject.endDate.replace(/-/g, "") +
    //       this.DateObject.endTime.replace(/:/g, "");

    //     // 할인인원 범위 Validate
    //     if (this.commonSellers.length < 1) {
    //       alert("최소 1개의 할인인원 범위가 존재해야 합니다.");
    //       return false;
    //     } else {
    //       let firstObject = this.commonSellers[0];
    //       let peopleObject = firstObject.people;
    //       let discountObject = firstObject.discount;
    //       if (this.isEmpty(peopleObject) || this.isEmpty(discountObject)) {
    //         alert("할인인원 범위 정책을 확인하여 주시기바랍니다.");
    //         return false;
    //       } else {
    //         this.updateProductData.productGroupBuy['productGroupBuyDiscount'] = []
    //         this.commonSellers.forEach(item => {
    //           this.updateProductData.productGroupBuy.productGroupBuyDiscount.push({
    //             peopleQty: this.toNumber(String(item.people)),
    //             discount: this.toNumber(String(item.discount)),
    //             isUse: 1
    //           });
    //         });
    //       }
    //     }
    //   }

    //   this.updateProductData.feeRateBase = this.productData.feeRateBase ? 9.0 : 0;
    //   this.updateProductData.feeRateMedia = this.productData.feeRateMedia ? 9.0 : 0;
    //   this.updateProductData.feeRateInfluencer = this.productData.feeRateInfluencer? 9.0: 0;

    //   // Notify 공지부분
    //   let NotifyObj = this.notify;
    //   if (NotifyObj.length > 0) {
    //     NotifyObj.forEach(_item => {
    //       let params = {
    //         item: _item.item,
    //         content: _item.content,
    //         procTypeCode: _item.procTypeCode
    //       }
    //       if (!this.isEmpty(_item.prdtNoticeSysId)) {
    //         params.prdtNoticeSysId = _item.prdtNoticeSysId;
    //       }
    //       this.productData.productNotice.notices.push(params)
    //     });
    //   }

    //   if (this.productData.optionTypeCode === 2) {
    //     // 상품옵션
    //     if (this.nomarlOptions.length > 0) {
    //       this.nomarlOptions.forEach(item => {
    //         if (!this.isEmpty(item.prdtNormalOptionSysId) || item.procTypeCode !==4) {
    //           this.updateProductData.normalOptions.push(item)
    //         }
    //       })
    //     }
    //   }

    //   // 추가 구성
    //   this.updateProductData.isAddingProduct = (this.productData.isAddingProduct? 1 : 0)
    //   let isAddition = this.updateProductData.isAddingProduct
    //   if (isAddition === 1) {
    //     this.additionOptions.forEach(addOption => {
    //       let row = {
    //         base: {},
    //         details: []
    //       }
    //       if (addOption.procTypeCode !==4 || !this.isEmpty(addOption.prdtAddingProductSysId)) {
    //         row.base = {
    //           itemGroup: addOption.itemGroup,
    //           procTypeCode: addOption.procTypeCode,
    //           prdtAddingProductSysId: addOption.prdtAddingProductSysId
    //         }
    //       }
    //       addOption.subAdditionOptions.forEach(item => {
    //         if (item.procTypeCode !==4 || !this.isEmpty(item.prdtAddingProductDetailSysId)) {
    //           item.isHide = (item.isHide ? 1 : 0)
    //           item.isSoldout = (item.isSoldout ? 1 : 0)
    //           item.price = (this.isEmpty(item.price) ? 0 : item.price)
    //           item.stockQty = (this.isEmpty(item.stockQty) ? 0 : item.stockQty)
    //           row.details.push(item)
    //         }
    //       })
    //       this.updateProductData.addingProducts.push(row)
    //     })
    //   }
    //   return this.updateProductData;
    }
  }
};
