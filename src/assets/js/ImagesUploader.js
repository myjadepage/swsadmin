/* eslint-disable no-unused-vars */
import $ from 'jquery'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import ImageResize from 'image-resize'
export default {
  data :() => ({
    privateKey: '',
    userId: 0,
    brandId: 0
  }),
  methods: {
    // 이미지 비율검사 함수
    resizeSmallImages: function (res) {
      var imageExt = 'png'
      var blob = this.dataURItoBlob(res)
      var file = this.blobToFile(blob, 'temp.'+imageExt)
      this.autoImageResize(file,'middleImageUrl')
    },
    resizeMiddleImages: function (res) {
      var imageExt = 'png'
      var blob = this.dataURItoBlob(res)
      var file = this.blobToFile(blob, 'temp.'+imageExt)
      this.autoImageResize(file,'smallImageUrl')
    },
    async validateImageRatioFn (event, sizeParam) {
      event.target.dataset.valid = false
      let img = document.createElement('img')
      img.onload = function () {
        // if (this.width !== this.height) {
        //   alert('업로드 이미지 비율을 확인해주시기 바랍니다.')
        //   return false
        // } else if (this.width < sizeParam.width){
        //   alert('업로드 이미지 사이즈를 확인해주시기 바랍니다.')
        //   return false
        // } else {
        //   event.target.dataset.valid = true
        // }
        event.target.dataset.valid = true
      }
      let fileReader = new FileReader()
      fileReader.onload = function (e) {
        img.src = e.target.result
      }
      fileReader.readAsDataURL(event.target.files[0])
      if(this.productData.isAutoImageUpload){
        let ext = (event.target.files[0].name).split('.')

        let middleImageResize = new ImageResize({
          format: ext[1],
          width: 510,
          height: 510
        })
        middleImageResize.play(event.target)
          .then(this.resizeMiddleImages)
  
        let smallImageResize = new ImageResize({
          format: ext[1],
          width: 280,
          height: 280
        })
        smallImageResize.play(event.target)
          .then(this.resizeSmallImages) 
      }
      await this.sleep(3000)

      if (event.target.dataset.valid === 'true') {
        let param = {
          obj: event.target,
          bool: false
        }
        this.onSingleImagesUploaderEvent(param)
      }
      return true
    },
    // },
    // type="file"을 직접적으로 사용
    // onDirectImageUploader: function (event) {
    //   if (event.target.dataset.valid === 'true') {
    //     let param = {
    //       obj: event.target,
    //       bool: false
    //     }
    //     this.onSingleImagesUploaderEvent(param)
    //   }
      
    // },    
    // type="file"을 hidden처리 하여 사용
    onAlternativeUploader: function (item) {
      let param = {
        obj: document.getElementById(item.imageObjName),
        bool: true,
        item: item
      }

      this.onSingleImagesUploaderEvent(param)
    },
    // 공통으로 이미지를 전달하기 위함 Function
    onSingleImagesUploaderEvent (param) {
      var target = param.obj
      var dir = '/product/image/' + this.userId + '/' + this.brandId
      var cdnUrl = 'http://cdn.shallwe.link'
      // 사용자 인증 Param
      var loginParam= {
        'user': 'l2e2e2@epiens.com',
        'pwd': 'ny3yQaQumeje',
        'stoid': 'epienscdn',
        'stopwd': 'dlvldpstm2020!!'
      }
      Axios.request({
        url: 'https://stats.kinxcdn.com/api/auth?',
        params:loginParam
      })
        .then(function (res) {
          // 2. 디렉토리 검사한다.
          var privateKey = res.data.Response.key
          var dirFindParam = {
            'key': privateKey,
            'stoid': 'epienscdn',
            'path': dir,
            'type': 'dir'
          }
          Axios.request({
            url: 'https://stats.kinxcdn.com/api/exists?',
            params: dirFindParam
          })
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
              if (!response.dataItem) {
                Axios.request({
                  url: 'https://stats.kinxcdn.com/api/directorys?',
                  params: createDirParam
                })
                  .then(function (res) {

                    // rename uuid
                    var ext = (target.files[0].name).split('.')
                    var imageExt = ext[1]
                    var uuid = uuidv4()

                    var formData = new FormData()
                    formData.append('key', privateKey)
                    formData.append('path', dir)
                    formData.append('stoid', 'epienscdn')
                    formData.append('file1', target.files[0], uuid + '.' + imageExt)
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        if (param.bool) {
                          param.item.imageVisibleTitle = uuid + '.' + imageExt
                          param.item.url = cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
                        }
                        target.dataset.imageurl = cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
                        return cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
                      })
                      .catch(function (err) {
                        console.log(err)
                      })
                  })
                  .catch(function (err) {
                    console.log(err)
                  })
              } else {
                Axios.request({
                  url: 'https://stats.kinxcdn.com/api/directorys?',
                  params: createDirParam
                })
                  .then(function (res) {

                    // rename uuid
                    var ext = (target.files[0].name).split('.')
                    var imageExt = ext[1]
                    var uuid = uuidv4()

                    var formData = new FormData()
                    formData.append('key', privateKey)
                    formData.append('path', dir)
                    formData.append('stoid', 'epienscdn')
                    formData.append('file1', target.files[0], uuid + '.' + imageExt)
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        if (param.bool) {
                          param.item.imageVisibleTitle = uuid + '.' + imageExt
                          param.item.url = cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
                        }
                        target.dataset.imageurl = cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
                        return cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
                      })
                      .catch(function (err) {
                        console.log(err)
                      })
                  })
                  .catch(function (err) {
                    console.log(err)
                  })
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        })
        .catch(function (err) {
          console.log(err)
        })
    },

    // 이미지 리사이징
    autoImageResize (file, targetObj) {
      var dir = '/product/image/' + this.userId + '/' + this.brandId
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
                    // rename uuid
                    var ext = (file.name).split('.')
                    var imageExt = ext[1]
                    var uuid = uuidv4()

                    var formData = new FormData()
                    formData.append('key', privateKey)
                    formData.append('path', dir)
                    formData.append('stoid', 'epienscdn')
                    formData.append('file1', file, uuid+'.'+imageExt)
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        // console.log(res)
                        // console.log(file)
                        document.getElementById(targetObj).dataset.imageurl = cdnUrl+''+dir+'/'+uuid+'.'+imageExt
                        // if (param.bool) {
                        //   param.item.imageVisibleTitle = target.files[0].name
                        // }
                        // target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
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
                    formData.append('file1', file)
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        // console.log(res)
                        // console.log(file)
                        document.getElementById(targetObj).dataset.imageurl=cdnUrl+''+dir+'/'+file.name
                        // Editor.insertEmbed(cursorLocation, 'image', cdnUrl+''+dir+'/'+file.name)
                        // if (param.bool) {
                        //   param.item.imageVisibleTitle = target.files[0].name
                        // }
                        // target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
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

    // editor 용
    onEditorImagesUploaderEvent (file, Editor, cursorLocation) {
      var dir = '/product/image/' + this.userId + '/' + this.brandId
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
                    // rename uuid
                    var ext = (file.name).split('.')
                    var imageExt = ext[1]
                    var uuid = uuidv4()

                    var formData = new FormData()
                    formData.append('key', privateKey)
                    formData.append('path', dir)
                    formData.append('stoid', 'epienscdn')
                    formData.append('file1', file, uuid+'.'+imageExt)
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        // console.log(res)
                        // console.log(file)
                        Editor.insertEmbed(cursorLocation, 'image', cdnUrl+''+dir+'/'+uuid+'.'+imageExt)
                        // if (param.bool) {
                        //   param.item.imageVisibleTitle = target.files[0].name
                        // }
                        // target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
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
                    formData.append('file1', file)
                    Axios.post('https://stats.kinxcdn.com/api/upload', formData, {'Content-Type': 'multipart/form-data'})
                      .then(function (res) {
                        // console.log(res)
                        // console.log(file)
                        Editor.insertEmbed(cursorLocation, 'image', cdnUrl+''+dir+'/'+file.name)
                        // if (param.bool) {
                        //   param.item.imageVisibleTitle = target.files[0].name
                        // }
                        // target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
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
