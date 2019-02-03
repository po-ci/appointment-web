import Vue from 'vue'
import Vuex from 'vuex'
import AuthStore from '../layout/modules/AuthStore'
import CalendarStore from './modules/CalendarStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: AuthStore,
        calendar: CalendarStore
    }
})
