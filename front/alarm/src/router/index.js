import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CallListView from '../views/CallListView.vue'
import MainView from '../views/MainView.vue'
import SettingView from '../views/SettingView.vue'
import AdminView from '../views/AdminView.vue'
import SignInView from '../views/SignInView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import axios from 'axios'

// localStorage.setItem('username', 'goose')
// localStorage.setItem('password','goose')
// localStorage.setItem('access_key', 'goose')
// localStorage.setItem('admin', 'goose')
// localStorage.clear()

const access_key = localStorage.getItem('access_key')
const admin = localStorage.getItem('admin')

const auth = function (to, from, next) {
  if (access_key) next({ name: 'calls' })
  else next()
}

const checkToken = function (to, from, next) {
  if (access_key) {
    axios.post('/access_key', {
      access_key: access_key
    })
      .then((response) => {
        // localStorage.setItem('token', String(response.data))
        // this.user = response.data
        console.log(response.data)
        // if (!localToken) next({ name: 'auth' })
        // else next()
      })
      .catch(function (error) {
        console.log(error)
        // next({ name: 'auth' })
      })
    if (!access_key) next({ name: 'sign-in' })
    else next()
  } else {
    next({ name: 'sign-in' })
  }
}

const checkTokenAdmin = function (to, from, next) {
  if (access_key) {
    axios.post('/access_key', {
      access_key: access_key
    })
      .then((response) => {
        // localStorage.setItem('token', String(response.data))
        // this.user = response.data
        console.log(response.data)
        // if (!localToken) next({ name: 'auth' })
        // else next()
      })
      .catch(function (error) {
        console.log(error)
        // next({ name: 'auth' })
      })
    if (!access_key && !admin) next({ name: 'sign-in' })
    else next()
  } else {
    next({ name: 'sign-in' })
  }
}

const call = function (to, from, next) {
  next({ name: 'calls' })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: call
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
      beforeEnter: auth
    },
    {
      path: '/calls',
      name: 'calls',
      component: CallListView,
      beforeEnter: checkToken
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
      beforeEnter: checkToken
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      beforeEnter: checkToken
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: checkTokenAdmin
    }
  ]
})

export default router
