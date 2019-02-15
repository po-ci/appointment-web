import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './layout/views/Login.vue'
import Register from './layout/views/Register.vue'
import Recovery from './layout/views/Recovery.vue'
import Validate from './layout/views/Validate.vue'
import Profile from './layout/views/Profile.vue'
import Turnos from './views/Turnos.vue'
import MisTurnos from './views/MisTurnos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: Turnos
    },
    {
      path: '/my-appointments',
      name: 'myAppointments',
      component: MisTurnos
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
