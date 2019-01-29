import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Shift from './views/Shift.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Recovery from './views/Recovery.vue'
import Validate from './views/Validate.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/shift',
            name: 'shift',
            component: Shift
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/recovery',
            name: 'recovery',
            component: Recovery
        },
        {
            path: '/validate/:id/:token',
            name: 'validate',
            component: Validate
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
