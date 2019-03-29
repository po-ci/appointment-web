import Vue from 'vue'
import Router from 'vue-router'
import Home from './modules/appointment/views/Home.vue'
import Login from './modules/layout/views/Login.vue'
import Register from './modules/layout/views/Register.vue'
import Recovery from './modules/layout/views/Recovery.vue'
import Validate from './modules/layout/views/Validate.vue'
import Profile from './modules/layout/views/Profile.vue'
import Appointments from './modules/appointment/views/Appointments.vue'
import MyAppointmentsView from './modules/appointment/views/MyAppointmentsView.vue'
import AdminAppointments from './modules/appointment/views/AdminAppointments.vue'
import ShowAppointmentsView from './modules/appointment/views/ShowAppointmentsView.vue'
import CrudCalendars from './modules/appointment/views/CrudCalendars.vue'

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
      component: Appointments,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-appointments',
      name: 'myAppointments',
      component: MyAppointmentsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/crud-calendars',
      name: 'crudCalendars',
      component: CrudCalendars,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
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
      path: '/show-appointments',
      name: 'showAppointments',
      component: ShowAppointmentsView,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './modules/appointment/views/About.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ './modules/appointment/views/Users.vue'),
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    },
    {
      path: '/holidays',
      name: 'holidays',
      component: () => import(/* webpackChunkName: "holidays" */ './modules/appointment/views/Holidays.vue'),
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    },
    {
      path: '/out-of-service',
      name: 'out-of-service',
      component: () => import(/* webpackChunkName: "OutOfService" */ './modules/appointment/views/OutOfService.vue'),
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    },
    {
      path: '/specificts-schedule',
      name: 'specificts-schedule',
      component: () => import(/* webpackChunkName: "SpecificsSchedule" */ './modules/appointment/views/SpecificsSchedule.vue'),
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    store.dispatch('checkAuth')

    if (!store.getters.isLogin) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {

      if (to.meta.role && !store.getters.hasRole(to.meta.role)) {
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
