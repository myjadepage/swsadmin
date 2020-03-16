/* eslint-disable no-unused-vars */
import $ from 'jquery'
import Axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
export default {
  data :() => ({
    privateKey: '',
    userId: 0,
    brandId: 0
  }),
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
      // item.imageVisibleTitle = target.files[0].name
      // var fileName = moment().format('YYYYMMDDHH24mmss') + '_' + md5(target.files[0].name)
      // var fileFormat = target.files[0].name.split('.').pop().toLowerCase()
      // target.files[0].name = fileName + '.' + fileFormat
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
                        }
                        target.dataset.imageurl = cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
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
                        }
                        target.dataset.imageurl = cdnUrl + '' + dir + '/' + uuid + '.' + imageExt
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
