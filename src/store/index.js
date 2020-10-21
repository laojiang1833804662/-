import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//刷新页面回丢失用户信息，所以要从本地取
let userInfo=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
// userInfo=JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    userInfo,
  },
  mutations: {
    //更改useinfo
    SET_USERINFO(state,payload){
      state.userInfo=payload
    }
  },
  actions: {},
  modules: {}
});
