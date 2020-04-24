/* eslint-disable no-unused-vars */
import $ from "jquery";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ImageResize from "image-resize";
import commonJs from '@/assets/js/common.js'
export default {
  mixins: [commonJs],
  methods: {
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
      let dir = params.imageDir
      let cdnUrl = "http://cdn.shallwe.link";

      // 1. 사용자 인증
      let loginParam = {user: "l2e2e2@epiens.com",pwd: "ny3yQaQumeje",stoid: "epienscdn",stopwd: "dlvldpstm2020!!"};
      let auth = await Axios.request({url: "https://stats.kinxcdn.com/api/auth?",params: loginParam})
                      .then((res) => {return res;})
                      .catch(function (err) {
                        alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                        return false
                      });

      // 2. 디렉토리를 체크한다.
      let dirFindParam = {key: auth.data.Response.key, stoid: "epienscdn", path: dir, type: "dir"};
      let isDirectory = await Axios.request({url: "https://stats.kinxcdn.com/api/exists?",params: dirFindParam})
                      .then((res) => {return res;})
                      .catch(function (err) {
                        alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                        return false
                      });

      let directory = "";
      //3. 디렉토리가 없을경우는 생성한다.
      if (this.isEmpty(isDirectory.dataItem)) {
        let createDirParam = {key: auth.data.Response.key, stoid: "epienscdn", path: dir, work: "C", type: "D"};
        directory = await Axios.request({url: "https://stats.kinxcdn.com/api/directorys?",params: dirFindParam})
                      .then((res) => {return res;})
                      .catch(function (err) {
                        alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                        return false
                      });
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
    // editor 용
    async onEditorImagesUploaderEvent(file, Editor, cursorLocation, imageDir){
      let dir = imageDir
      let cdnUrl = "http://cdn.shallwe.link";

      // 1. 사용자 인증
      let loginParam = { user: "l2e2e2@epiens.com", pwd: "ny3yQaQumeje", stoid: "epienscdn", stopwd: "dlvldpstm2020!!"};
      let auth = await Axios.request({url: "https://stats.kinxcdn.com/api/auth?",params: loginParam})
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });

      // 2. 디렉토리를 체크한다.
      let dirFindParam = { key: auth.data.Response.key, stoid: "epienscdn", path: dir, type: "dir"};
      let isDirectory = await Axios.request({url: "https://stats.kinxcdn.com/api/exists?",params: dirFindParam})
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });

      let directory = "";
      //3. 디렉토리가 없을경우는 생성한다.
      if (this.isEmpty(isDirectory.dataItem)) {
        let createDirParam = { key: auth.data.Response.key, stoid: "epienscdn", path: dir, work: "C", type: "D"};
        directory = await Axios.request({url: "https://stats.kinxcdn.com/api/directorys?",params: dirFindParam})
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });
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
    },

    // 이미지 업로드 다시 만듬
    async changeImage (event, requestObject) {
      if (this.productData.sellerSysId === 0) {
        alert('판매자를 선택해 주시기 바랍니다.')        
        return false
      }else if (this.productData.brandSysId === 0) {
        alert('브랜드를 선택해 주시기 바랍니다.')
        return false
      }
      this.imageEvent.isDisplay = true
      this.imageEvent.progress = 100
      this.productData.bigImageUrl = await this.uploadImageProcess(event.target.files[0], requestObject)
      
      let img = document.createElement("img");
      let fileReader = new FileReader();
      fileReader.onload = function(e) {
        img.src = e.target.result;
      };
      fileReader.readAsDataURL(event.target.files[0]);
      let ext = event.target.files[0].name.split(".");

      // 중간 이미지 
      let middleImageResize = new ImageResize({
        format: ext[1],
        width: 360,
        height: 340
      });
      const middleFile = await middleImageResize.play(event.target).then(function (res) {
        let imageExt = "png";
        let blob = this.dataURItoBlob(res);
        let file = this.blobToFile(blob, "temp." + imageExt);
        return file
      }.bind(this))
      this.productData.middleImageUrl = await this.uploadImageProcess(middleFile, requestObject)

      // 작은 이미지
      let smallImageResize = new ImageResize({
        format: ext[1],
        width: 100,
        height: 100
      });
      const smallFile = await smallImageResize.play(event.target).then(function (res) {
        let imageExt = "png";
        let blob = this.dataURItoBlob(res);
        let file = this.blobToFile(blob, "temp." + imageExt);
        return file
      }.bind(this));
      this.productData.smallImageUrl = await this.uploadImageProcess(smallFile, requestObject)
      alert('이미지 업로드 완료 !!')
      return true
    },

    async uploadImageProcess (file, requestObject) {
      let dir = requestObject.imageDir
      let cdnUrl = "http://cdn.shallwe.link";

      // 1. 사용자 인증
      let loginParam = { user: "l2e2e2@epiens.com", pwd: "ny3yQaQumeje", stoid: "epienscdn", stopwd: "dlvldpstm2020!!"};
      let auth = await Axios.request({url: "https://stats.kinxcdn.com/api/auth?",params: loginParam})
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });

      // 2. 디렉토리를 체크한다.
      let dirFindParam = { key: auth.data.Response.key, stoid: "epienscdn", path: dir, type: "dir"};
      let isDirectory = await Axios.request({url: "https://stats.kinxcdn.com/api/exists?",params: dirFindParam})
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });

      let directory = "";
      //3. 디렉토리가 없을경우는 생성한다.
      if (this.isEmpty(isDirectory.dataItem)) {
        let createDirParam = { key: auth.data.Response.key, stoid: "epienscdn", path: dir, work: "C", type: "D"};
        directory = await Axios.request({url: "https://stats.kinxcdn.com/api/directorys?",params: dirFindParam})
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });
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
      let upload = await Axios.post("https://stats.kinxcdn.com/api/upload",formData,{ "Content-Type": "multipart/form-data" })
                        .then((res) => {return res;})
                        .catch(function (err) {
                          alert('이미지 업로드에 실패했습니다. 관리자에게 문의하여 주시기 바랍니다.')
                          return false
                        });
      return cdnUrl + "" + dir + "/" + uuid + "." + imageExt
    }
  }
};