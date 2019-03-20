import {UserProvider, AuthService} from '../../resource/index'

import {UPDATE_USERS, SET_USERS, SET_USERS_LOADING, ADD_USER, SET_RESPONSE_USER} from './user-mutation-type'


export default {
  state: {
    response: null,
    error: null,
    users: [],
    usersLoading: false
  },
  getters: {
    getResponse(state) {
      return state.response
    },
    getError(state) {
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
      commit(SET_USERS_LOADING, true)
      UserProvider.create(newUser).then((response) => {
        console.log(response.data)
        newUser.id = response.data.id
        //console.log(newUser)
        commit(ADD_USER, newUser)
        commit(SET_USERS_LOADING, false)
        commit(SET_RESPONSE_USER, response.data)
      }).catch((error) => {
        console.log(error)
        commit(SET_RESPONSE_USER, error.data)
      })
    },

    updateUser({commit}, saveUser) {
      commit(SET_USERS_LOADING, true)
      UserProvider.update(saveUser.id, saveUser).then((response) => {
        console.log(response.data)
        saveUser.id = response.data.id
        commit(UPDATE_USERS, saveUser)
        commit(SET_USERS_LOADING, false)
      }).catch((error) => {
        console.log(error.data)
      })
    },

    allUsers({commit}) {
      commit(SET_USERS_LOADING, true)
      AuthService.users().then((response) => {
        //console.log(response.data)
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

    [SET_USERS](state, response) {
      state.users = response
    },
    [SET_USERS_LOADING](state, loading) {
      state.usersLoading = loading
    },
    [UPDATE_USERS](state, data) {
      let index = state.users.findIndex(user => user.id == data.id)
      state.users[index] = data
    },
    [SET_RESPONSE_USER](state, data) {
      state.response = data
    }
  }
}
