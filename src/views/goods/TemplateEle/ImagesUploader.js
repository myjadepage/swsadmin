/* eslint-disable no-unused-vars */
import $ from 'jquery'
import Axios from 'axios'
import moment from 'moment'
import md5 from 'md5'
export default {
  data () {
    return {
      // Image CDN 로그인 정보
      // loginParam: {
      //   'user': 'l2e2e2@epiens.com',
      //   'pwd': 'ny3yQaQumeje',
      //   'stoid': 'epienscdn',
      //   'stopwd': 'dlvldpstm2020!!'
      // },
      // cdnDefaultUrl: 'http://cdn.shallwe.link',
      // cdnDirectory: '/product/' + this.userId + '/' + this.brandId
    }
  },
  methods: {
    // type="file"을 직접적으로 사용
    onDirectImageUploader: function (event) {
      var param = {
        obj: event.target,
        bool: false
      }
      this.onSingleImagesUploaderEvent(param)
    },
    // type="file"을 hidden처리 하여 사용
    onAlternativeUploader: function (item) {
      var param = {
        obj: document.getElementById(item.imageObjName),
        bool: true,
        item: item
      }
      this.onSingleImagesUploaderEvent(param)
    },
    // axiosCdnAuthCallbackFn: function (res) {
    //   this.privateKey = res.data.Response.key

    //   var dirFindParam = {
    //     'key': this.privateKey,
    //     'stoid': 'epienscdn',
    //     'path': '/product/' + this.userId + '/' + this.brandId,
    //     'type': 'dir'
    //   }
    //   this.axiosGetRequest('https://stats.kinxcdn.com/api/exists', dirFindParam, this.axiosCdnDirectoryCallbackFn)
    // },
    // axiosCdnDirectoryCallbackFn: function (res) {
    //   var response = res.data
    //   if (response.dataItem) {
    //     this.axiosPostRequest()
    //   } else {
    //     this.axiosCreateDirectoryCallbackFn()
    //   }
    // },
    // axiosCreateDirectoryCallbackFn: function (res) {
    //   this.axiosCdnUploadImages()
    // },
    // axiosCdnUploadImages: function (res) {

    // },
    // 공통으로 이미지를 전달하기 위함 Function
    onSingleImagesUploaderEvent (param) {
      var target = param.obj
      var dir = '/product/' + this.userId + '/' + this.brandId
      var cdnUrl = 'http://cdn.shallwe.link'
      // 사용자 인증 Param
      var loginParam= {
        'user': 'l2e2e2@epiens.com',
        'pwd': 'ny3yQaQumeje',
        'stoid': 'epienscdn',
        'stopwd': 'dlvldpstm2020!!'
      }
      var userjson = ''
      $.each(loginParam, function (k, v) {
        userjson += k + '=' + v + '&'
      })
      // item.imageVisibleTitle = target.files[0].name
      // var fileName = moment().format('YYYYMMDDHH24mmss') + '_' + md5(target.files[0].name)
      // var fileFormat = target.files[0].name.split('.').pop().toLowerCase()
      // target.files[0].name = fileName + '.' + fileFormat
      Axios.get('https://stats.kinxcdn.com/api/auth?' + userjson)
        .then(function (res) {
          // 2. 디렉토리 검사한다.
          var privateKey = res.data.Response.key
          var dirFindParam = {
            'key': privateKey,
            'stoid': 'epienscdn',
            'path': dir,
            'type': 'dir'
          }
          var dirjson = ''
          $.each(dirFindParam, function (k, v) {
            dirjson += k + '=' + v + '&'
          })
          Axios.get('https://stats.kinxcdn.com/api/exists?' + dirjson)
            .then(function (res) {
              var response = res.data
              // 3. 디렉토리가 없을 경우, 생성한다.
              var createDirParam = {
                'key': privateKey,
                'stoid': 'epienscdn',
                'path': dir,
                'work': 'C',
                'type': 'D'
              }
              var createdirjson = ''
              $.each(createDirParam, function (k, v) {
                createdirjson += k + '=' + v + '&'
              })
              if (!response.dataItem) {
                Axios.get('https://stats.kinxcdn.com/api/directorys?' + createdirjson)
                  .then(function (res) {
                    var formData = new FormData()
                    formData.append('key', privateKey)
                    formData.append('path', dir)
                    formData.append('stoid', 'epienscdn')
                    formData.append('file1', target.files[0])
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        if (param.bool) {
                          param.item.imageVisibleTitle = target.files[0].name
                        }
                        target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
                      })
                      .catch(function (err) {
                        console.log(err)
                      })
                  })
                  .catch(function (err) {
                    console.log(err)
                  })
              } else {
                Axios.get('https://stats.kinxcdn.com/api/directorys?' + createdirjson)
                  .then(function (res) {
                    var formData = new FormData()
                    formData.append('key', privateKey)
                    formData.append('path', dir)
                    formData.append('stoid', 'epienscdn')
                    formData.append('file1', target.files[0])
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        if (param.bool) {
                          param.item.imageVisibleTitle = target.files[0].name
                        }
                        target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
                      })
                      .catch(function (err) {
                        console.log(err)
                      })
                  })
                  .catch(function (err) {
                    console.log(err)
                  })
              }
              return false
            })
            .catch(function (err) {
              console.log(err)
            })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    onImagesUploadResult: function (item, titleName) {
      console.log(item)
    }
  }
}
