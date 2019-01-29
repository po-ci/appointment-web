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
        loginError: false,
        loginErrorMessage: null
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
        getLoginError: (state) => {
            return state.loginError
        },
        getLoginErrorMessage: (state) => {
            return state.loginErrorMessage
        },
    },
    actions: {
        auth({commit, dispatch}, {username, password}) {
           AuthService.auth(username, password).then((response) => {

                if (response.data.success) {

                    commit('SET_TOKEN', response.data.token)

                    dispatch('extractTokenPayload')
                }else{
                    commit('SET_LOGIN_ERROR', true)
                    commit('SET_LOGIN_ERROR_MESSAGE', response.data.message)
                }

            }).catch((error) => {
               commit('SET_LOGIN_ERROR', true)
               commit('SET_LOGIN_ERROR_MESSAGE', error.response.data.message)
            });

        },
        register({commit}, {name, username, email, phone, password}) {
            return AuthService.register(name, username, email, phone, password)
        },
        recovery({commit}, {email}) {
            return AuthService.register(email)
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
        ['SET_LOGIN_ERROR'](state, error) {
            state.loginError = error;
        },
        ['SET_LOGIN_ERROR_MESSAGE'](state, errorMessage) {
            state.loginErrorMessage = errorMessage;
        },
    },
}