import Vue from 'vue'
import {AuthService} from '../../../resource'
import router from '../../../router'
import {
  SET_USERS_GENERAL_ERROR,
  SET_USERS_LOADING,
  SET_USER, SET_USER_IMG
} from "./auth-mutation-types";

export default {
  namespaced: false,
  state: {
    authLoading: false,
    access_token: null,
    user: {
      id: null,
      username: null,
      name: null,
      email: null,
      phone: null,
      img: null,
      roles: []
    },
    usersGeneralErrors: [],
    usersLoading: false,
    exp: null,
    //Define si hay errores en el login
    loginError: false,
    loginMessage: null,
    //Define si la cuenta se valido con exito
    validate: false,
    validateError: false,
    validateMessage: null,
    //Recovery define si el recovery se realizo con exito
    recovery: false,
    //dialog change  password
    changePasswordDialog: false,
  },
  getters: {
    hasRole: (state) => (role) => {
      if (state.user && state.user.roles && state.user.roles.some(value => value.name == role)) {
        return true
      }
      return false
    },
    getUser: (state) => {
      return state.user
    },
    getAccessToken: (state) => {
      return state.access_token
    },
    isLogin: (state) => {
      return (state.user.id) ? true : false
    },
    getLoginError: (state) => {
      return state.loginError
    },
    getLoginMessage: (state) => {
      return state.loginMessage
    },
    getValidate: (state) => {
      return state.validate
    },
    getValidateError: (state) => {
      return state.validateError
    },
    getValidateMessage: (state) => {
      return state.validateMessage
    },
    getAuthLoading: (state) => {
      return state.authLoading
    },
    getChangePasswordDialog: (state) => {
      return state.changePasswordDialog
    }
  },
  actions: {

    setChangePasswordDialog({commit}, value) {
      commit('SET_CHANGE_PASSWORD_DIALOG', value)
    },

    auth({commit, dispatch}, {username, password}) {
      commit('SET_AUTH_LOADING', true)
      commit('SET_LOGIN_ERROR', false)
      commit('SET_LOGIN_MESSAGE', null)
      AuthService.auth(username, password).then((response) => {

        if (response.data.success) {

          commit('SET_TOKEN', response.data.token)

          dispatch('extractTokenPayload')
        } else {
          commit('SET_LOGIN_ERROR', true)
          commit('SET_LOGIN_MESSAGE', response.data.message)
        }
        commit('SET_AUTH_LOADING', false)
      }).catch((error) => {
        commit('SET_LOGIN_ERROR', true)
        commit('SET_AUTH_LOADING', false)
        if (error.response) {
          commit('SET_LOGIN_MESSAGE', error.response.data.message)
        } else {
          commit('SET_LOGIN_MESSAGE', 'Imposible conectar con el servidor')
        }
      });

    },

    register({commit}, {name, username, email, phone, password}) {
      return AuthService.register(name, username, email, phone, password)
    },

    validate({commit}, {id, token}) {
      commit('SET_AUTH_LOADING', true)
      return AuthService.validate(id, token).then((response) => {
        if (response.data.status) {
          commit('SET_VALIDATE', true)
        } else {
          commit('SET_VALIDATE_ERROR', true)
          commit('SET_VALIDATE_MESSAGE', response.data.message)
        }
        commit('SET_AUTH_LOADING', false)
      }).catch((error) => {
        commit('SET_VALIDATE_ERROR', true)
        commit('SET_VALIDATE_MESSAGE', error.response.data.message)
        commit('SET_AUTH_LOADING', false)
      })
    },

    recovery({commit}, {email}) {
      return AuthService.recovery(email)
    },

    passwordChange({commit, getters}, {password, password_verify}) {
      return AuthService.passwordChange(password, password_verify, getters.getAccessToken)
    },

    imageChange({commit, getters}, img) {
      return AuthService.imageChange(img, getters.getAccessToken)
    },


    extractTokenPayload({state, commit}) {
      let payload = JSON.parse(atob(state.access_token.split('.')[1]))

      let user_img = localStorage.getItem('user_img')

      if(user_img && payload.data.img){
        payload.data.img = user_img
      }

      commit('SET_USER', payload.data)
      commit('SET_EXP', payload.exp)
    },

    logout: ({commit}) => {
      commit('SET_TOKEN', '')
      commit('SET_USER', {
        id: null,
        username: null,
        name: null,
        email: null,
        phone: null,
        img: null,
      })
      commit('SET_EXP', null)
      router.push('login')
    },

    loadTokenFromLocalStorage({state, commit, dispatch}) {
      if (!state.access_token) {
        let access_token = localStorage.getItem('access_token')
        if (access_token) {
          commit('SET_TOKEN', access_token)
          dispatch('extractTokenPayload')
        }
      }
    },

    checkAuth: ({state, dispatch}) => {

      dispatch('loadTokenFromLocalStorage')

      if (state.exp) {

        let dateNow = new Date();

        if ((dateNow.getTime() / 1000) > state.exp) {
          dispatch('logout')
        }

      } else {
        dispatch('logout')
      }
    },
  },
  mutations: {
    ['SET_AUTH_LOADING'](state, value) {
      state.authLoading = value;
    },
    ['SET_TOKEN'](state, access_token) {
      state.access_token = access_token;
      localStorage.setItem('access_token', access_token)
    },
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_USER_IMG](state, img) {
      Vue.set(state.user,'img',img)
      localStorage.setItem('user_img', img)
    },
    ['SET_EXP'](state, exp) {
      state.exp = exp;
    },
    ['SET_LOGIN_ERROR'](state, error) {
      state.loginError = error;
    },
    ['SET_LOGIN_MESSAGE'](state, value) {
      state.loginMessage = value;
    },
    ['SET_VALIDATE'](state, validate) {
      state.validate = validate;
    },
    ['SET_VALIDATE_ERROR'](state, error) {
      state.validateError = error;
    },
    ['SET_VALIDATE_MESSAGE'](state, message) {
      state.validateMessage = message;
    },
    ['SET_CHANGE_PASSWORD_DIALOG'](state, value) {
      state.changePasswordDialog = value;
    },
    [SET_USERS_GENERAL_ERROR](state, error) {
      state.usersGeneralErrors = error
    },
    [SET_USERS_LOADING](state, loading) {
      state.usersLoading = loading
    }
  },
}
