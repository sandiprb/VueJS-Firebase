import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import auth from '../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    isLoading: false
  },

  getters: {
    user (state) {
      return state.user
    },
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    isLoading (state) {
      return state.isLoading
    }
  },

  mutations: {
    setUser (state, {user = null, isLoggedIn = false}) {
      state.user = user
      state.isLoggedIn = isLoggedIn
      user ? router.push({ path: '/dashboard' }) : router.push({ path: '/login' })
      state.isLoading = false
    },

    isLoading (state, flag = false) {
      state.isLoading = flag
    }
  },

  actions: {
    LOGIN (context, user) {
      auth.login(user)
      auth.auth.onAuthStateChanged(user => {
        user && context.commit('setUser', {user, isLoggedIn: true})
      })
    },
    LOGOUT (context) {
      auth.logout(function () {
        context.commit('setUser', {isLoggedIn: false})
      })
    },
    isLOADING (context, flag) {
      context.commit('isLoading', flag)
    }
  }
})

export default store
