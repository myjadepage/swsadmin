/* eslint-disable no-unused-vars */
import $ from "jquery";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ImageResize from "image-resize";
export default {
  methods: {
    // 이미지 비율검사 함수
    resizeSmallImages: function(res) {
      let imageExt = "png";
      let blob = this.dataURItoBlob(res);
      let file = this.blobToFile(blob, "temp." + imageExt);
      this.autoImageResize(file, "smallImageUrl");
    },
    resizeMiddleImages: function(res) {
      let imageExt = "png";
      let blob = this.dataURItoBlob(res);
      let file = this.blobToFile(blob, "temp." + imageExt);
      this.autoImageResize(file, "middleImageUrl");
    },
    async validateImageRatioFn(event, sizeParam) {
      event.target.dataset.valid = false;
      let img = document.createElement("img");
      img.onload = function() {
        event.target.dataset.valid = true;
      };
      let fileReader = new FileReader();
      fileReader.onload = function(e) {
        img.src = e.target.result;
      };
      fileReader.readAsDataURL(event.target.files[0]);
      if (this.productData.isAutoImageUpload) {
        let ext = event.target.files[0].name.split(".");

        let middleImageResize = new ImageResize({
          format: ext[1],
          width: 360,
          height: 340
        });
        middleImageResize.play(event.target).then(this.resizeMiddleImages);

        let smallImageResize = new ImageResize({
          format: ext[1],
          width: 100,
          height: 100
        });
        smallImageResize.play(event.target).then(this.resizeSmallImages);
      }
      await this.sleep(3000);

      if (event.target.dataset.valid === "true") {
        let param = {
          obj: event.target,
          bool: false
        };
        this.onSingleImagesUploaderEvent(param);
      }
      return true;
    },
    // type="file"을 hidden처리 하여 사용
    onAlternativeUploader: function(item) {
      let param = {
        obj: document.getElementById(item.imageObjName),
        bool: true,
        item: item
      };

      this.onSingleImagesUploaderEvent(param);
    },

    /**
     * 이미지업로드시에 item으로 리턴해줌 Async/ await
     */
    async onNewSingleImageUploadEvent(event, params) {
      let dir = '/product/image/0/'+this.productData.sellerSysId
      let cdnUrl = "http://cdn.shallwe.link";

      // 1. 사용자 인증
      let loginParam = {user: "l2e2e2@epiens.com",pwd: "ny3yQaQumeje",stoid: "epienscdn",stopwd: "dlvldpstm2020!!"};
      let auth = await Axios.request({url: "https://stats.kinxcdn.com/api/auth?",params: loginParam}).then((res) => {return res;});

      // 2. 디렉토리를 체크한다.
      let dirFindParam = {key: auth.data.Response.key, stoid: "epienscdn", path: dir, type: "dir"};
      let isDirectory = await Axios.request({url: "https://stats.kinxcdn.com/api/exists?",params: dirFindParam}).then((res) => {return res});

      let directory = "";
      //3. 디렉토리가 없을경우는 생성한다.
      if (this.isEmpty(isDirectory.dataItem)) {
        let createDirParam = {key: auth.data.Response.key, stoid: "epienscdn", path: dir, work: "C", type: "D"};
        directory = await Axios.request({url: "https://stats.kinxcdn.com/api/directorys?",params: dirFindParam}).then((res) =>{return res})
      }

      // 4. 디렉토리가 존재할경우는 바로 업로드진행한다.
      let ext = event.target.files[0].name.split(".");
      let imageExt = ext[1];
      let uuid = uuidv4();
      let formData = new FormData();
      formData.append("key", auth.data.Response.key);
      formData.append("path", dir);
      formData.append("stoid", "epienscdn");
      formData.append("file1", event.target.files[0], uuid + "." + imageExt);
      let upload = await Axios.post("https://stats.kinxcdn.com/api/upload",formData,{ "Content-Type": "multipart/form-data" });
      let item = params.item;
      let field = params.field;
      item[field] = cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
      alert("이미지 업로드 완료!");
      return true;
    },

    // 공통으로 이미지를 전달하기 위함 Function
    /**
     *
     * 삭제 예정
     */
    onSingleImagesUploaderEvent(param) {
      let target = param.obj;
      let dir = '/product/image/0/'+this.productData.sellerSysId;
      let cdnUrl = "http://cdn.shallwe.link";
      // 사용자 인증 Param
      let loginParam = {
        user: "l2e2e2@epiens.com",
        pwd: "ny3yQaQumeje",
        stoid: "epienscdn",
        stopwd: "dlvldpstm2020!!"
      };
      Axios.request({
        url: "https://stats.kinxcdn.com/api/auth?",
        params: loginParam
      })
        .then(function(res) {
          // 2. 디렉토리 검사한다.
          let privateKey = res.data.Response.key;
          let dirFindParam = {
            key: privateKey,
            stoid: "epienscdn",
            path: dir,
            type: "dir"
          };
          Axios.request({
            url: "https://stats.kinxcdn.com/api/exists?",
            params: dirFindParam
          })
            .then(function(res) {
              let response = res.data;
              // 3. 디렉토리가 없을 경우, 생성한다.
              let createDirParam = {
                key: privateKey,
                stoid: "epienscdn",
                path: dir,
                work: "C",
                type: "D"
              };
              if (!response.dataItem) {
                Axios.request({
                  url: "https://stats.kinxcdn.com/api/directorys?",
                  params: createDirParam
                })
                  .then(function(res) {
                    // rename uuid
                    let ext = target.files[0].name.split(".");
                    let imageExt = ext[1];
                    let uuid = uuidv4();

                    let formData = new FormData();
                    formData.append("key", privateKey);
                    formData.append("path", dir);
                    formData.append("stoid", "epienscdn");
                    formData.append(
                      "file1",
                      target.files[0],
                      uuid + "." + imageExt
                    );
                    Axios.post(
                      "https://stats.kinxcdn.com/api/upload",
                      formData,
                      { "Content-Type": "multipart/form-data" }
                    )
                      .then(function(res) {
                        if (param.bool) {
                          param.item.imageVisibleTitle = uuid + "." + imageExt;
                          param.item.url =
                            cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                        }
                        target.dataset.imageurl =
                          cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                        return cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              } else {
                Axios.request({
                  url: "https://stats.kinxcdn.com/api/directorys?",
                  params: createDirParam
                })
                  .then(function(res) {
                    // rename uuid
                    let ext = target.files[0].name.split(".");
                    let imageExt = ext[1];
                    let uuid = uuidv4();

                    let formData = new FormData();
                    formData.append("key", privateKey);
                    formData.append("path", dir);
                    formData.append("stoid", "epienscdn");
                    formData.append(
                      "file1",
                      target.files[0],
                      uuid + "." + imageExt
                    );
                    Axios.post(
                      "https://stats.kinxcdn.com/api/upload",
                      formData,
                      { "Content-Type": "multipart/form-data" }
                    )
                      .then(function(res) {
                        if (param.bool) {
                          param.item.imageVisibleTitle = uuid + "." + imageExt;
                          param.item.url =
                            cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                        }
                        target.dataset.imageurl =
                          cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                        return cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    // 이미지 리사이징
    autoImageResize(file, targetObj) {
      let dir = '/product/image/0/'+this.productData.sellerSysId;
      let cdnUrl = "http://cdn.shallwe.link";
      // 사용자 인증 Param
      let loginParam = {
        user: "l2e2e2@epiens.com",
        pwd: "ny3yQaQumeje",
        stoid: "epienscdn",
        stopwd: "dlvldpstm2020!!"
      };
      let userjson = "";
      $.each(loginParam, function(k, v) {
        userjson += k + "=" + v + "&";
      });
      // item.imageVisibleTitle = target.files[0].name
      // var fileName = moment().format('YYYYMMDDHH24mmss') + '_' + md5(target.files[0].name)
      // var fileFormat = target.files[0].name.split('.').pop().toLowerCase()
      // target.files[0].name = fileName + '.' + fileFormat
      Axios.get("https://stats.kinxcdn.com/api/auth?" + userjson)
        .then(function(res) {
          // 2. 디렉토리 검사한다.
          let privateKey = res.data.Response.key;
          let dirFindParam = {
            key: privateKey,
            stoid: "epienscdn",
            path: dir,
            type: "dir"
          };
          let dirjson = "";
          $.each(dirFindParam, function(k, v) {
            dirjson += k + "=" + v + "&";
          });
          Axios.get("https://stats.kinxcdn.com/api/exists?" + dirjson)
            .then(function(res) {
              let response = res.data;
              // 3. 디렉토리가 없을 경우, 생성한다.
              let createDirParam = {
                key: privateKey,
                stoid: "epienscdn",
                path: dir,
                work: "C",
                type: "D"
              };
              let createdirjson = "";
              $.each(createDirParam, function(k, v) {
                createdirjson += k + "=" + v + "&";
              });
              if (!response.dataItem) {
                Axios.get(
                  "https://stats.kinxcdn.com/api/directorys?" + createdirjson
                )
                  .then(function(res) {
                    // rename uuid
                    let ext = file.name.split(".");
                    let imageExt = ext[1];
                    let uuid = uuidv4();

                    let formData = new FormData();
                    formData.append("key", privateKey);
                    formData.append("path", dir);
                    formData.append("stoid", "epienscdn");
                    formData.append("file1", file, uuid + "." + imageExt);
                    Axios.post(
                      "https://stats.kinxcdn.com/api/upload",
                      formData,
                      { "Content-Type": "multipart/form-data" }
                    )
                      .then(function(res) {
                        // console.log(res)
                        // console.log(file)
                        document.getElementById(targetObj).dataset.imageurl =
                          cdnUrl + "" + dir + "/" + uuid + "." + imageExt;
                        // if (param.bool) {
                        //   param.item.imageVisibleTitle = target.files[0].name
                        // }
                        // target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              } else {
                Axios.get(
                  "https://stats.kinxcdn.com/api/directorys?" + createdirjson
                )
                  .then(function(res) {
                    let formData = new FormData();
                    formData.append("key", privateKey);
                    formData.append("path", dir);
                    formData.append("stoid", "epienscdn");
                    formData.append("file1", file);
                    Axios.post(
                      "https://stats.kinxcdn.com/api/upload",
                      formData,
                      { "Content-Type": "multipart/form-data" }
                    )
                      .then(function(res) {
                        // console.log(res)
                        // console.log(file)
                        console.log(targetObj);
                        document.getElementById(targetObj).dataset.imageurl =
                          cdnUrl + "" + dir + "/" + file.name;
                        // Editor.insertEmbed(cursorLocation, 'image', cdnUrl+''+dir+'/'+file.name)
                        // if (param.bool) {
                        //   param.item.imageVisibleTitle = target.files[0].name
                        // }
                        // target.dataset.imageurl = cdnUrl + '' + dir + '/' + target.files[0].name
                      })
                      .catch(function(err) {
                        console.log(err);
                      });
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
              }
              return false;
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    // editor 용
    async onEditorImagesUploaderEvent(file, Editor, cursorLocation){
      let dir = '/product/image/0/'+this.productData.sellerSysId
      let cdnUrl = "http://cdn.shallwe.link";

      // 1. 사용자 인증
      let loginParam = { user: "l2e2e2@epiens.com", pwd: "ny3yQaQumeje", stoid: "epienscdn", stopwd: "dlvldpstm2020!!"};
      let auth = await Axios.request({url: "https://stats.kinxcdn.com/api/auth?",params: loginParam}).then((res) => {return res;});

      // 2. 디렉토리를 체크한다.
      let dirFindParam = { key: auth.data.Response.key, stoid: "epienscdn", path: dir, type: "dir"};
      let isDirectory = await Axios.request({url: "https://stats.kinxcdn.com/api/exists?",params: dirFindParam}).then((res) => {return res});

      let directory = "";
      //3. 디렉토리가 없을경우는 생성한다.
      if (this.isEmpty(isDirectory.dataItem)) {
        let createDirParam = { key: auth.data.Response.key, stoid: "epienscdn", path: dir, work: "C", type: "D"};
        directory = await Axios.request({url: "https://stats.kinxcdn.com/api/directorys?",params: dirFindParam}).then((res) =>{return res})
      }

      // 4. 디렉토리가 존재할경우는 바로 업로드진행한다.
      let ext = file.name.split(".");
      let imageExt = ext[1];
      let uuid = uuidv4();
      var formData = new FormData();
      formData.append("key", auth.data.Response.key);
      formData.append("path", dir);
      formData.append("stoid", "epienscdn");
      formData.append("file1", file, uuid + "." + imageExt);
      let upload = await Axios.post("https://stats.kinxcdn.com/api/upload",formData,{ "Content-Type": "multipart/form-data" });
      Editor.insertEmbed(cursorLocation, "image", cdnUrl + "" + dir + "/" + uuid + "." + imageExt);
      return true;
    }
  }
};
