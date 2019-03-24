import Vue from 'vue'
import {UserProvider, AuthService} from '../../../resource'

import {UPDATE_USER, SET_USERS, SET_USERS_LOADING, ADD_USER, SET_RESPONSE_USER, SET_RESULT, SET_ERRORS, SET_FLASH_MESSAGE} from './user-mutation-type'


export default {
  state: {
    response: null,
    errors: [],
    users: [],
    usersLoading: false,
    result: false,
    flashMessage: null
  },
  getters: {
    getFlashMessage(state){
      return state.flashMessage
    },
    getResult(state) {
      return state.result
    },
    getErrors(state) {
      return state.errors
    },
    getUsers(state) {
      return state.users
    },
    getUsersLoading(state) {
      return state.usersLoading
    }
  },
  actions: {
    createUser({commit}, newUser) {
      commit(SET_FLASH_MESSAGE,null)
      commit(SET_RESULT,null)
      commit(SET_ERRORS, [])
      commit(SET_USERS_LOADING, true)
      UserProvider.create(newUser).then((response) => {
        console.log(response.data)
        newUser.id = response.data.id
        //console.log(newUser)
        commit(UPDATE_USER, response.data.item)
        commit(SET_USERS_LOADING, false)
        commit(SET_RESPONSE_USER, response.data)
        commit(SET_RESULT,true)
        commit(SET_FLASH_MESSAGE,"El usuario se creo con exito")
      }).catch((error) => {
        commit(SET_RESULT,false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_ERRORS, error.response.data.errors)
        }
        commit(SET_USERS_LOADING, false)
      })
    },

    updateUser({commit}, saveUser) {
      commit(SET_FLASH_MESSAGE,null)
      commit(SET_RESULT,null)
      commit(SET_ERRORS, [])
      commit(SET_USERS_LOADING, true)
      UserProvider.update(saveUser.id, saveUser).then((response) => {
        console.log("roles")
        console.log(response.data.item.roles)
        saveUser.id = response.data.id
        commit(UPDATE_USER, response.data.item)
        commit(SET_USERS_LOADING, false)
        commit(SET_RESULT,true)
        commit(SET_FLASH_MESSAGE,"El usuario se edito con exito")
      }).catch((error) => {
        commit(SET_RESULT,false)
        if (error && error.response && error.response.data && error.response.data.errors) {
          commit(SET_ERRORS, error.response.data.errors)
        }
        commit(SET_USERS_LOADING, false)
      })
    },

    allUsers({commit}) {
      commit(SET_USERS_LOADING, true)
      AuthService.users().then((response) => {
        commit(SET_USERS_LOADING, false)
        commit(SET_USERS, response.data)
      }).catch((error) => {

        }
      )
    },
  },
  mutations: {
    [ADD_USER](state, data) {
      state.users.push(data)
    },
    [SET_USERS](state, data) {
      state.users = data
    },
    [SET_USERS_LOADING](state, loading) {
      state.usersLoading = loading
    },
    [UPDATE_USER](state, data) {
      let index = state.users.findIndex(user => user.id == data.id)
      Vue.set(state.users, index, data)
    },
    [SET_ERRORS](state, data) {
      state.errors = data
    },
    [SET_RESULT](state, result) {
      state.result = result
    },
    [SET_FLASH_MESSAGE](state, flashMessage) {
      state.flashMessage = flashMessage
    }
  }
}
