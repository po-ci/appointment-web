import {RoleProvider, UserProvider, AuthService} from '../../resource/index'

import {SET_ROLES, SET_ROLES_GENERAL_ERROR} from './role-mutation-types'

export default {
  state: {
    role: [],
    errors: null
  },
  getters: {
    getRoles(state) {
      return state.role
    }
  },
  actions: {
    fetchRoles({commit}) {
      RoleProvider.fetchAll().then((response) => {
        commit('SET_ROLES', response.data)
      }).catch((error) => {
        commit('SET_ROLES_GENERAL_ERROR', error.data)
      })
    }
  },
  mutations: {
    [SET_ROLES](state, data) {
      state.role = data
    },
    [SET_ROLES_GENERAL_ERROR](state, data) {
      state.errors = data
    }
  }
}
