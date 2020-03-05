const videoMixin = {
  data () {
    return {
      videoCounter: 2,
      videos: [
        {id: 1, videoTitle: 'videoTitle1', videoVisibleTitle: '', videoObjName: 'optionalVideo1Url', imageVisibleTitle: '' ,imageObjName: 'thumbNailImage1'},
        {id: 2, videoTitle: 'videoTitle2', videoVisibleTitle: '', videoObjName: 'optionalVideo2Url', imageVisibleTitle: '', imageObjName: 'thumbNailImage2'}
      ]
    }
  },
  methods: {
    addVideoRow: function () {
      if (this.videos.length >= 10) {
        alert('10개이상 영상을 추가할수 없습니다.')
        return false
      } else {
        this.videoCounter++
        var count = this.videoCounter
        this.videos.push({
          id: count, 
          videoVisibleTitle: '',
          videoTitle: 'videoTitle' + count,
          videoObjName: 'optionalVideo' + count + 'Url', 
          imageVisibleTitle: '',
          imageObjName: 'thumbNailImage' + count
        })
      }
    },
    removeVideoRow: function (index) {
      this.videos.splice(index, 1)
    }
  }
}

export default videoMixin
