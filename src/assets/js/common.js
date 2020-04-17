import Axios from 'axios';
import JSEncrypt from 'jsencrypt/bin/jsencrypt'


export default {
  data () {    
    // Axios.defaults.baseURL = 'http://192.168.1.20:3800/'
    Axios.defaults.baseURL = 'http://api.shallwe.link:3000' // 개발
    // Axios.defaults.baseURL = 'http://api.shallwe.link:3800' // 배포
    // Axios.defaults.baseURL = 'http://192.168.1.40:3000/' // -- admin.shallwe.link
    // Axios.defaults.baseURL = 'http://api.shallwe.shop:3000/' // -- admin.shallwe.shop
    // Axios.defaults.baseURL = 'http://shallwe.shop/' // --dev
    Axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
  },
  methods: {
    //---------------------- 파일업로드 관련된 함수 ----------------------------------------
    /**
     *
     * 일자 : 2020. 03. 09.
     * 작성자 : 김도령
     * DataURL to Blob
     * @param object
     *
     */
    dataURItoBlob: function(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },
    /**
     *
     * 일자 : 2020. 03. 09.
     * 작성자 : 김도령
     * blobToFile
     * @param object
     *
     */
    blobToFile: function(theBlob, fileName) {
      //A Blob() is almost a File() - it's just missing the two properties below which we will add
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    sleep: function(t) {
      return new Promise(resolve => setTimeout(resolve, t));
    },
    /**
     *
     * 일자 : 2020. 03. 09.
     * 작성자 : 김도령
     * 문자열 공백검사
     * @param object
     *
     */
    //---------------------- AXIOS업로드 관련된 함수  ----------------------------------------

    /**
     *
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * POST 형태로 보내기 위한 param 가공
     * @param object
     * k : v 형태
     *
     */
    postParam: function(param) {
      if (param === null) return '';
      var formData = new FormData();
      for (let _k in param) {
        formData.append(_k, JSON.stringify(param[_k]));
      }
      return formData;
    },
    /**
     *
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * PATCH 형태로 보내기 위한 param 가공
     * @param object
     * k : v 형태
     *
     */
    patchParam: function(param) {
      if (param === null) return '';
      var formData = new URLSearchParams();
      for (let _k in param) {
        formData.append(_k, JSON.stringify(param[_k]));
      }
      return formData;
    },
    /**
     *
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * DELETE 형태로 보내기 위한 param 가공
     * @param object
     * k : v 형태
     *
     */
    deleteParam: function(param) {
      if (param === null) return '';
      var formData = new URLSearchParams();
      for (let _k in param) {
        formData.append(_k, JSON.stringify(param[_k]));
      }
      return formData;
    },
    /**
     *
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * GET 형태로 Axios 전송
     *
     */
    axiosGetRequest: function(url, param, callback, errback, token=null) {
      var errorFn =
        typeof errback === 'undefined'
          ? function(err) {
              console.log(err);
            }
          : errback;

      if(token){
        Axios.request({
          url: url,
          params: param,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(callback)
          .catch(errorFn);
      }else{
        Axios.request({
          url: url,
          params: param
        })
          .then(callback)
          .catch(errorFn);
      }
    },

    /**
     *
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * POST 형태로 Axios 전송
     *
     */
    axiosPostRequest: function(url, param, callback, errback,token=null) {
      var errorFn =
        typeof errback === 'undefined'
          ? function(err) {
              console.log(err);
            }
          : errback;
      if(token){
      Axios.post(url, this.postParam(param), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: false
      })
        .then(callback)
        .catch(errorFn);
    }else{
      Axios.post(url, this.postParam(param), {
        header: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false
      })
        .then(callback)
        .catch(errorFn);
    }
    },

    /**
     *
     * 일자 : 2020. 03. 06.
     * 작성자 : 김도령
     * Delete 형태로 Axios 전송
     *
     */
    axiosDeleteRequest: function(url, param, callback, errback) {
      var errorFn =
        typeof errback === 'undefined'
          ? function(err) {
              console.log(err);
            }
          : errback;
      Axios.delete(url, this.deleteParam(param))
        .then(callback)
        .catch(errorFn);
    },
    axiosPatchRequest: function (url, param, callback, errback) {
      var errorFn = (typeof errback === 'undefined' ? function (err) { console.log(err)} : errback )
      Axios.patch(url, this.patchParam(param), Axios.defaults.headers.patch)
        .then(callback)
        .catch(errorFn);
    },
    axiosPutRequest: function(url, param, callback, errback) {
      var errorFn =
        typeof errback === 'undefined'
          ? function(err) {
              console.log(err);
            }
          : errback;
      Axios.put(url, this.patchParam(param))
        .then(callback)
        .catch(errorFn);
    },
    //---------------------- 유틸 관련된 함수 ----------------------------------------
    isEmpty: function(str) {
      if (typeof str === 'undefined' || str === null || str === '') {
        return true;
      } else {
        return false;
      }
    },
    numberWithCommasObj: function(event) {
      let num = event.target.value
      event.target.value = new Intl.NumberFormat().format(num.replace(/,/gi,''))
      return true
    },
    numberWithCommas: function(num) {
      return new Intl.NumberFormat().format(num.replace(/,/gi,''))
    },
    toNumber(str) {
      return parseFloat(str.replace(/[^0-9]/g, ''));
    },
    getImageUrl: function (url) {
      return url
    },
    makeRsa:  function (value) {
        const publicKey =  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA27Bf/sFXPg8cXgLp/n3tqTfKIZ/lcxO3I4K0NfXTXNm49KDmUofzntTS8bPvgcX688ZJRYDwig6a5ZmFE8FFSCdqJuUQ1c9UjnlU4KA7ztHDdPgd+zxCn9+lfaYgDXvwjXQb0t53u001VX5s/eTxsFri9qvMmdDQT4McYN1nIAUsDBDxPAkBQy4+CEddqWCjPLptqdroEUIgQ6fxrVVVzhuIpiG9zcSr/1RLbw6YERBxbVk/Q/CrgC5fKXWYRI5T4+V9MX4BxVvpqR2B+KEfxYQsXvJ2nyV0tKtb+m2hu+HtE4onsoM/lbm0Hw6yMKp/P2MofIyFNTdWeBcyEI3aRwIDAQAB"
        let encryptor = new JSEncrypt()
        encryptor.setPublicKey(publicKey)
        let rsaEncStr = encryptor.encrypt(value)
        return rsaEncStr
    }
  }
};
