export default {
  data () {
    return {
      reqCategory: []
    }
  },
  methods: {
    /**
     * 
     * @param {*} 카테고리 리스트 
     */
    setCategory: function (category) {
      category.forEach(item => {
        for (let i = 0 ; i < 5 ; i++) {
          if (item['categorySysId' + (i + 1)] !== undefined) {
            this.axiosGetRequest('/api/v1/categories',{ categoryLevel: (i + 1), categorySysId: item['categorySysId' + (i + 1)], parentSysId: item['categorySysId' + i]}, this.resultCategorySearch)
          }
        }
      })
    },
    resultCategorySearch: function (res) {
      let reqParams = res.config.params
      let getData = res.data.jsonData.categories
      getData.forEach(item => {
        if (item.categorySysId === reqParams.categorySysId) {
          this.reqCategory[reqParams.categoryLevel - 1] = {
            value: item.categorySysId, 
            text: item.name,
            feeRate: item.feeRate
          }
        }
      })
    },
    getProductData(res) {
        // 카테고리 
        this.setCategory(res.data.jsonData.category.categories)
        this.addCateExtends('reqCategory')

        //상품 정보
        console.log(res.data.jsonData)
        let product = res.data.jsonData.product
        this.images.splice(0)
        for(let _k in product) {
          // 다른 이미지 처리
          if (_k.indexOf('isUsedOptionalImage') > 1) {
            if (product[_k] !== 0) {
              let num = _k.replace('isUsedOptionalImage')
              this.imagesCounter++
              this.images.push({
                id: this.imagesCounter,
                imageVisibleTitle: product['optionalImage' + num + 'Url'],
                imageObjName: 'optionalImage' + num + 'Url',
                url: product['optionalImage' + num + 'Url']
              })
            }
          } else {
            this.productData[_k] = product[_k]
          }
        }

        this.changeSellerFn()

        let noticeObject = res.data.jsonData.productNotice
        this.productData.prdtNoticeBaseSysId = noticeObject.prdtNoticeBaseSysId
        noticeObject.notices.forEach(_item => {
            this.productData.productNotice.notices.push({prdtNoticeSysId: _item.prdtNoticeSysId, item: _item.item, content: _item.content})
        })        
    }
  }
}