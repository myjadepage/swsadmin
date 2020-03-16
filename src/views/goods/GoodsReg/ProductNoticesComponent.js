export default {
  data () {
    return {
      notify: [
        {id: 1, itemObjName: 'item1', contentObjName: 'content1', item: '', content: ''}
      ],
      notifyCounter: 1
    }
  },
  methods: {
    notifyRemove: function (index) {
      this.notify.splice(index, 1)
    },
    addNotifyRow: function () {
      this.notifyCounter++
      this.notify.push({id: this.notifyCounter, itemObjName: 'item' + this.notifyCounter, contentObjName: 'content' + this.notifyCounter, item: '', content: ''})
    },
    // 정보고시
    productNoticesFn: function (event) {
      var obj = event.target
      if (obj.selectedIndex > 0) {
        this.axiosGetRequest('http://api.shallwe.shop/api/v1/preferences/productNoticeDetails/' + obj[obj.selectedIndex].value, '', this.productNoticesLoadFn)
      }
    },
    productNoticesLoadFn: function (res) {
      var data = res.data.jsonData.productDetailNotices
      this.notify.splice(0)
      for (var i = 0; i < data.length; i++) {
        this.notify.push({id: this.notifyCounter++, itemObjName: 'item' + this.notifyCounter++, contentObjName: 'content' + this.notifyCounter++, item: data[i].item, content: data[i].content})
      }
    }
  }
}
