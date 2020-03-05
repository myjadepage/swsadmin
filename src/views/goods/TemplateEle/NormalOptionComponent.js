import $ from 'jquery'
const normalOption = {
  data () {
    return {
      normalOptionCounter: 1,
      productsOptions: [
        {id: 1, normalOptionName: 'normalOptionName1', normalOptionContent: 'normalOptionContent1', normalWordsize: 'wordSize'}
      ]
    }
  },
  methods: {
    productsOptionRemove: function (index) {
      this.productsOptions.splice(index, 1)
    },
    setKeyUpCounter: function (obj) {
      var wordSizer = document.getElementsByName(obj.normalWordsize)
      var content = document.getElementsByName(obj.normalOptionContent)
      $(wordSizer).html(content[0].textLength)
    },
    addProductOptionRow: function () {
      this.normalOptionCounter++
      this.productsOptions.push({id: this.normalOptionCounter,
        normalOptionName: 'normalOptionName' + this.normalOptionCounter,
        normalOptionContent: 'normalOptionContent' + this.normalOptionCounter,
        normalWordsize: 'wordSize' + this.normalOptionCounter
      })
    }
  }
}
export default normalOption
