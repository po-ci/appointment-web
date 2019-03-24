import Vue from 'vue'
import Vuex from 'vuex'
import AuthStore from '../modules/user-auth/storage/AuthStore'
import CalendarStore from '../modules/appointment/storage/CalendarStore'
import RoleStore from '../modules/user-crud/storage/RoleStore'
import UserStore from '../modules/user-crud/storage/UserStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: AuthStore,
    calendar: CalendarStore,
    Role: RoleStore,
    User: UserStore
  }
})
