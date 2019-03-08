import {UserProvider, AuthService} from '../../resource/index'

import {UPDATE_USERS, SET_USERS, SET_USERS_LOADING} from './user-mutation-type'


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
      commit('SET_USERS_LOADING', true)
      UserProvider.create(newUser).then((response) => {
        console.log(response.data)
        newUser.id = response.data.id
        commit('UPDATE_USERS', newUser)
        commit('SET_USERS_LOADING', false)
      }).catch((error) => {
        console.log(error.data)
      })
    },

    allUsers({commit}) {
      commit('SET_USERS_LOADING', true)
      AuthService.users().then((response) => {
        commit(SET_USERS, response.data)
        commit('SET_USERS_LOADING', false)
      }).catch((error) => {
          if (error.response && error.response.data && response.data.errors) {
            //commit(SET_USERS_GENERAL_ERROR, response.data.errors);
          }
        }
      )
    },
  },
  mutations: {
    [UPDATE_USERS](state, data) {
      state.users.push(data)
    },

    [SET_USERS](state, response) {
      state.users = response
    },
    [SET_USERS_LOADING](state, loading) {
      state.usersLoading = loading
    }
  }
}
