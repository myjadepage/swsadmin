import $ from 'jquery'
import Axios from 'axios'

export default {
  data () {

  },
  methods: {
    isEmpty: function (str) {
      if (typeof str === 'undefined' || str === null || str === '') {
        return true
      } else {
        return false
      }
    },
    /**
     * 
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * GET 형태로 보내기 위한 param 가공
     * @param object
     * k : v 형태 
     * 
     */
    getParam: function (param) {
      if (param === null) return ''
      var paramText = ''
      $.each(param, function (k, v) {
        paramText += k + '=' + v + '&'
      })
      return paramText
    },

    /**
     * 
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * POST 형태로 보내기 위한 param 가공
     * @param object
     * k : v 형태 
     * 
     */
    postParam: function (param) {
      if (param === null) return ''
      var formData = new FormData()
      $.each(param, function (k, v) {
        formData.append(k, JSON.stringify(v))
      })
      return formData
    },

    /**
     * 
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * GET 형태로 Axios 전송
     * 
     */
    axiosGetRequest: function (url, param, callback) {
      Axios.get(url + '?' + this.getParam(param), {header: {'Content-Type': 'multipart/form-data'}, withCredentials: false})
        .then(callback)
        .catch(function (err) {
          console.log(err)
        })
    },

    /**
     * 
     * 일자 : 2020. 03. 04.
     * 작성자 : 김도령
     * POST 형태로 Axios 전송
     * 
     */
    axiosPostRequest: function (url, param, callback) {
      Axios.post(url, this.postParam(param), {header: {'Content-Type': 'multipart/form-data'}, withCredentials: false})
        .then(callback)
        .catch(function (err) {
          console.log(err)
        })
    },
  }
}
