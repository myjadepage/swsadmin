import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router/index.js"

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
      state.logStatus = !state.logStatus
    }
  },
  actions: {
    login({commit}){
      commit('changeLogStatus')
      router.push('/dashboard')
    },
    logout({commit}){
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refreshToken')
      sessionStorage.removeItem('userName')
      commit('changeLogStatus')
      router.push('/login')
    }
  },
  modules: {

  }
})
