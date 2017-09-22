import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const types = {
   SET_USER: 'setUser'
}

const state = {
  user: null
}

const mutations = {
  [types.SET_USER](state, user) {
    // console.log(user);
    state.user = user;
  }
}

const actions = {
  exit({commit}) {
    commit(types.SET_USER, null);
  },
  login({commit}, user) {
    console.log(user);
    commit(types.SET_USER, user);
  }
}

export default new Vuex.Store({state, mutations, actions});
