const imageMixin = {
  data () {
    return {
      imagesCounter: 2,
      images: [
        {id: 1, imageVisibleTitle: '', imageObjName: 'optionalImage1Url'},
        {id: 2, imageVisibleTitle: '', imageObjName: 'optionalImage2Url'}
      ]
    }
  },
  methods: {
    addImagesRow: function () {
      if (this.images.length >= 10) {
        alert('10개이상 이미지를 추가할수 없습니다.')
        return false
      } else {
        this.imagesCounter++
        this.images.push({
          id: this.imagesCounter, 
          imageVisibleTitle: '',
          imageObjName: 'optionalImage' + this.imagesCounter + 'Url'
        })
      }
    },
    removeImageRow: function (index) {
      this.images.splice(index, 1)
    }
  }
}

export default imageMixin
