// import $ from 'jquery'
const clickEvent = {
  data() {
    return {
      brands: [{ id: "", title: "::브랜드를 선택하십시오::" }],
      detailDescriptionOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image"]
            ],
            handlers: {
              image: function() {
                document.getElementById("detailDescriptionImage").click();
              }
            }
          },
          imageDropAndPaste: {
            handler: this.detailDescriptionimageHandler
          }
        },
        placeholder: "내용을 입력해주세요..."
      },
      deliveryCommentHtmlOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image"]
            ],
            handlers: {
              image: function() {
                document.getElementById("deliveryCommentHtmlImage").click();
              }
            }
          },
          imageDropAndPaste: {
            handler: this.deliveryCommentHtmlimageHandler
          }
        },
        placeholder: "내용을 입력해주세요..."
      }
    };
  },
  methods: {
    // ------------- 가격 Event 시작 -------------
    // 수수료 설정 Event
    onFeeTypeCodeEvent: function(event) {
      this.calculFeeRateFn({ type: event.target.value });
    },
    async calculFeeRateFn(obj) {
      await this.sleep(100);
      let typeCode = obj.type;
      if (typeCode === "1") {
        var cnt = 0;
        this.productData.feeRateBase ? cnt++ : "";
        this.productData.feeRateMedia ? cnt++ : "";
        this.productData.feeRateInfluencer ? cnt++ : "";
        this.productData.feeRate = 9 * cnt;
        this.priceToSupplyPrice();
      } else if (typeCode === "2") {
        this.productData.priceTypeCode = 1;
        this.productData.feeRate = 0;
        this.priceToSupplyPrice();
      }
    },
    // defaultFeeRate(bool) {
    //   var obj = this.$data.feeRateObject[bool]
    //   !obj ? this.productData.feeRate += 9 : this.productData.feeRate -= 9
    //   this.priceToSupplyPrice()

    // },
    // 공급가, 기준가 관련 Event
    onPriceTypeCode: function(event) {
      let obj = event.target.value;
      if (obj === "1") {
        document.getElementById("feeRate").disabled = true;
        document.getElementById("supplyPrice").disabled = false;
      } else if (obj === "2") {
        document.getElementById("feeRate").disabled = false;
        document.getElementById("supplyPrice").disabled = true;
      }
    },
    onPriceEvent: function() {
      if (this.$refs.feeTypeCode.value === "1") {
        this.priceToSupplyPrice();
      } else if (this.$refs.feeTypeCode.value === "2") {
        if (this.productData.priceTypeCode === 1) {
          this.priceToFeeRate();
        } else if (this.productData.priceTypeCode === 2) {
          this.priceToSupplyPrice();
        }
      }
      return true;
    },
    onFeeRate: function() {
      this.priceToSupplyPrice();
      return true;
    },
    onSupplyPrice: function() {
      this.priceToFeeRate();
      return true;
    },
    // 판매가 -> 공급가
    priceToSupplyPrice: function() {
      var priceValue = this.productData.price.toString().replace(/,/g, "");
      var feeRateValue = this.productData.feeRate;
      if (feeRateValue === "" || feeRateValue === 0) {
        this.productData.supplyPrice = priceValue; //this.numberWithCommas()
      } else {
        this.productData.supplyPrice = Math.floor(
          priceValue - priceValue * (feeRateValue / 100)
        ); // this.numberWithCommas()
      }
      return true;
    },
    // 판매가 -> 수수료율
    priceToFeeRate: function() {
      let priceValue = this.productData.price.toString().replace(/,/g, "");
      let supplyPriceValue = this.productData.supplyPrice
        .toString()
        .replace(/,/g, "");
      this.productData.feeRate = Math.floor(
        ((priceValue - supplyPriceValue) / priceValue) * 100
      );
      return true;
    },
    // ------------- 가격 Event 끝 -------------
    // ------------- 카테고리 Event -------------
    onCategorySelector: function(event, myLevel) {
      const mySelected = this.selectedCategoryRow[myLevel - 1];
      var param = {
        categoryLevel: myLevel + 1,
        parentSysId: mySelected.value
      };
      this.axiosGetRequest(
        "/api/v1/categories",
        param,
        this.onCategorySelectorResult,
        this.inInitCategory
      );
    },
    inInitCategory: function(err) {
      const errParam = err.response.config.params;
      switch (errParam.categoryLevel) {
        case "1":
          this.category2.splice(1);
          this.category3.splice(1);
          this.category4.splice(1);
          this.category5.splice(1);
          break;
        case "2":
          this.category3.splice(1);
          this.category4.splice(1);
          this.category5.splice(1);
          break;
        case "3":
          this.category4.splice(1);
          this.category5.splice(1);
          break;
        case "4":
          this.category5.splice(1);
          break;
      }
    },
    onCategorySelectorResult: function(response) {
      const categories = response.data.jsonData.categories;
      if (categories === "") return false;
      const categoryLevel = response.data.jsonData.categoryLevel;
      this.CategorySelectorSetting(categories, categoryLevel);
    },
    CategorySelectorSetting: function(categories, level) {
      var obj = "";
      var selectTitle = "";
      switch (level) {
        case 2:
          obj = this.category2;
          selectTitle = "필수";
          break;
        case 3:
          obj = this.category3;
          selectTitle = "선택";
          break;
        case 4:
          obj = this.category4;
          selectTitle = "선택";
          break;
        case 5:
          obj = this.category5;
          selectTitle = "선택";
          break;
      }
      obj.splice(0);
      this.selectedCategoryRow[level - 1] = {
        value: 0,
        text: level + "차카테고리 " + selectTitle,
        parentId: "",
        feeRate: ""
      };
      obj.push({
        value: 0,
        text: level + "차카테고리 " + selectTitle,
        parentId: "",
        feeRate: ""
      });
      categories.forEach(item => {
        obj.push({
          value: item.categorySysId,
          text: item.name + "[" + item.feeRate * 100 + "%]",
          parentId: item.parentSysId,
          feeRate: item.feeRate
        });
      });
    },
    addCate: function() {
      // 1, 2 카테고리 검증
      for (let i = 0; i < 2; i++) {
        if (this.selectedCategoryRow[i].value === 0) {
          alert("1, 2차 카테고리는 필수 입니다.");
          return false;
        }
      }
      this.addCateExtends(this.selectedCategoryRow, 0);
    },
    addCateExtends: function(arry, delayTime, extendsParam) {
      setTimeout(() => {
        let param = { id: "", text: "", feeRate: "", procTypeCode: 2 };
        let titleArray = new Array();
        for (let i = 0; i < arry.length; i++) {
          let item = arry[i];
          if (item.value !== 0) {
            param.id += item.value;
            param.feeRate = item.feeRate;
            param["categorySysId" + (i + 1)] = item.value;
            titleArray.push(item.text);
          }
        }
        var addCateFlag = true;
        this.categoryTable.filter(function(item) {
          if (item.id === param.id) {
            alert("중복된 카테고리를 추가할수 없습니다.");
            addCateFlag = false;
          }
        });
        if (addCateFlag) {
          param.text = titleArray.join(" > ");
          if (!this.isEmpty(extendsParam)) {
            param.prdtSysId = extendsParam.prdtSysId;
            param.prdtCategorySysId = extendsParam.prdtCategorySysId;
            param.procTypeCode = 3;
          }
          this.categoryTable.push(param);
          if (this.categoryTable.length === 1) {
            this.selectedCategoryTable = param.id;
          }
        }
      }, delayTime);
    },
    addCategoryFn: function(param) {
      this.categoryRow.push(param);
      return true;
    },
    onSelectCate: function(event) {
      document.Frm.feeRate.value = event.target.dataset.feerate;
      this.priceToSupplyPrice(document.Frm.price, document.Frm.feeRate);
    },
    // ------------- 카테고리 Event 끝 -------------
    detailDescriptionImage: function(event) {
      var obj = this.$refs.detailDescriptionRef.quill;
      var cursorLocation = obj.getSelection(true);
      this.onEditorImagesUploaderEvent(event.target.files[0], obj, cursorLocation.index);
    },
    deliveryCommentHtmlImage: function(event) {
      var obj = this.$refs.deliveryCommentHtmlRef.quill;
      var cursorLocation = obj.getSelection(true);
      this.onEditorImagesUploaderEvent(event.target.files[0], obj, cursorLocation.index);
    },
    detailDescriptionimageHandler: function(imageDataUrl, type) {
      var ext = type.split("/");
      var imageExt = ext[1];
      var blob = this.dataURItoBlob(imageDataUrl);
      var file = this.blobToFile(blob, "temp." + imageExt);
      var cursorLocation = this.$refs.detailDescriptionRef.quill.getSelection(true);
      this.onEditorImagesUploaderEvent( file, this.$refs.detailDescriptionRef.quill, cursorLocation.index);
    },
    deliveryCommentHtmlimageHandler: function(imageDataUrl, type) {
      var ext = type.split("/");
      var imageExt = ext[1];
      var blob = this.dataURItoBlob(imageDataUrl);
      var file = this.blobToFile(blob, "temp." + imageExt);
      var cursorLocation = this.$refs.deliveryCommentHtmlRef.quill.getSelection(
        true
      );
      this.onEditorImagesUploaderEvent(
        file,
        this.$refs.deliveryCommentHtmlRef.quill,
        cursorLocation.index
      );
    }
  }
};

export default clickEvent;
