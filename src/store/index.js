import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logStatus:false
  },
  getters: {
    isLogin:(state)=>state.logStatus
  },
  mutations: {
    changeLogStatus(state){
      state.logStatus = true
    }
  },
  actions: {
  },
  modules: {

  }
})
