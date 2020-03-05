import Axios from 'axios'
const videoUploader = {
  data () {

  },
  methods: {
    onSingleVideoUploaderEvent: function (obj) {
      // Axios.get('http://192.168.1.40:3000/api/v1/categories?categoryLevel=2&parentSysId=1')
      //   .then(function (res) {
      //     console.log(res)
      //   })
      //   var _obj = document.getElementById(obj.videoObjName)
      //   console.log(_obj)
      //   obj.videoVisibleTitle=_obj.files[0].name
      var callback = function (res) {
        alert('업로드가 완료되었습니다.')
        targetObj.dataset.videourl = res.data.mediaId
        obj.videoVisibleTitle = targetObj.files[0].name
      }
      var header = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Mbus-Token': 'BAA22BDBA33253BB417307EFBB9B01EEE5A3495A4E458CDDD802C0CB5D2BC39AFF28C464E1AD49E6748BB409D9A4F0A2025BB1A48AECEE1AB010719D4EBCDEE5'
        }
      }
      var targetObj = document.getElementById(obj.videoObjName)
      var formData = new FormData()
      formData.append('file', targetObj.files[0])
      Axios.post('https://api.midibus.kinxcdn.com/v1/upload/450', formData, header)
        .then(callback)
        .catch(function (err) {
          console.log(err)
        })
      return true
    }
  }
}

export default videoUploader
