import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './layout/views/Login.vue'
import Register from './layout/views/Register.vue'
import Recovery from './layout/views/Recovery.vue'
import Validate from './layout/views/Validate.vue'
import Profile from './layout/views/Profile.vue'
import Appointments from './views/Appointments.vue'
import MyAppointments from './views/MyAppointments.vue'
import AdminAppointments from './views/AdminAppointments.vue'

import store from './store/store'

Vue.use(Router)

const router = new Router({
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
      component: Appointments
    },
    {
      path: '/my-appointments',
      name: 'myAppointments',
      component: MyAppointments
    },
    {
      path: '/admin-appointments',
      name: 'adminAppointments',
      component: AdminAppointments,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
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


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {

      if (!store.getters.hasRole(to.meta.role)) {
        next({
          path: '/',
          query: {redirect: to.fullPath}
        })
      } else {
        next()
      }

    }
  } else {
    next() // make sure to always call next()!
  }
})


export default router
