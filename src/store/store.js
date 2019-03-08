import Vue from 'vue'
import Vuex from 'vuex'
import AuthStore from '../layout/modules/AuthStore'
import CalendarStore from './modules/CalendarStore'
import RoleStore from './modules/RoleStore'
import UserStore from './modules/UserStore'

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
