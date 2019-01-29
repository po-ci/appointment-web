import {AuthService} from './../../resource/index'

export default {
    namespaced: false,
    state: {
        access_token: null,
        user: {
            id: null,
            username: null
        },
        exp: null,
    },
    getters: {
        getUser: (state) => {
            return state.user
        },
        getAccessToken: (state) => {
            return state.access_token
        },
        isLogin: (state) => {
            return (state.user.id) ? true : false
        },
    },
    actions: {
        auth({commit, dispatch}, {username, password}) {
            AuthService.auth(username, password).then((response) => {

                if (response.data.success) {

                    commit('SET_TOKEN', response.data.token)

                    dispatch('extractTokenPayload')

                    return true
                } else {
                    console.log('Login Failed')
                    console.log(response.data.message)
                    return false
                }

            }).catch((error) => {
                console.log('Exception in auth.')
                console.log(error)
                return false
            });
        },
        register({commit}, {name, username, email, phone, password}) {
            return AuthService.register(name, username, email, phone, password)
        },
        extractTokenPayload({state, commit}) {
            let payload = JSON.parse(atob(state.access_token.split('.')[1]))
            commit('SET_USER', payload.data)
            commit('SET_EXP', payload.exp)
        },
        logout: ({commit}) => {
            commit('SET_TOKEN', '')
            commit('SET_USER', {id: null, username: null})
            commit('SET_EXP', null)
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
        ['SET_TOKEN'](state, access_token) {
            state.access_token = access_token;
            localStorage.setItem('access_token', access_token)
        },
        ['SET_USER'](state, user) {
            state.user = user;
        },
        ['SET_EXP'](state, exp) {
            state.exp = exp;
        },
    },
}