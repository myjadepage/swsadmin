export default {
  methods: {
    getProductData(res) {
        // 카테고리 정보
        // const categories = res.data.jsonData.category.categories

        //상품 정보
        let data = res.data.jsonData
        for(let _k in data.product) {
            this.productData[_k] = data.product[_k]
        }
        this.changeSellerFn()

        let noticeObject = data.productNotice
        this.productData.prdtNoticeBaseSysId = noticeObject.prdtNoticeBaseSysId
        console.log(noticeObject.notices)
        noticeObject.notices.forEach(_item => {
            this.productData.productNotice.notices.push({prdtNoticeSysId: _item.prdtNoticeSysId, item: _item.item, content: _item.content})
        })
        
        console.log(this.productData)
    }
  }
}