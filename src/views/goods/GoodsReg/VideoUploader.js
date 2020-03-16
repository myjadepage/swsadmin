import Axios from 'axios'
const videoUploader = {
  data:() =>({
    selectedindex: ''
  }),
  methods: {
    // onVideoUploaderEvent: function (event) {
    //   this.onSingleVideoUploaderEvent({ 
    //       videoTitle: 'videoTitle1', 
    //       videoVisibleTitle: '', 
    //       videoObjName: 'optionalVideo1Url', 
    //       imageVisibleTitle: '' ,
    //       imageObjName: 'thumbNailImage1'
    //   })
    // },
    progressBarEvent: function (event) {
      this.videos[this.selectedindex].progressValue= event.loaded
      this.videos[this.selectedindex].progressMax= event.total
    },
    onSingleVideoUploaderEvent: function (index, obj) {
      this.selectedindex = index
      var callback = function (res) {
        alert('업로드가 완료되었습니다.')
        targetObj.dataset.videourl = res.data.mediaId
        obj.videoVisibleTitle = targetObj.files[0].name
      }
      var targetObj = document.getElementById(obj.videoObjName)
      var formData = new FormData()
      formData.append('file', targetObj.files[0])
      Axios.request({
        method: 'post',
        url: 'https://api.midibus.kinxcdn.com/v1/upload/450',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Mbus-Token': 'D51D768EDB699F30ABBD16569FB07A630FED100A9D7AFF899EA24079F9C5BBECFF28C464E1AD49E6748BB409D9A4F0A227040A68503B771A8B78953AFAD4AA5B'
        },
        onUploadProgress: this.progressBarEvent,
        data: formData
      }).then(callback)
        .catch(function (err) {
          console.log(err)
        })
      return true
    }
  }
}

export default videoUploader
