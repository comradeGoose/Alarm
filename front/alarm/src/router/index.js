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
// localStorage.setItem('access_key', '1q2w3e4r5t6y7u8i')
// localStorage.setItem('admin', '0')
// localStorage.clear()

// const access_key = localStorage.getItem('access_key')
// const admin = localStorage.getItem('admin')

// ----------------------------------------
// localStorage.setItem('username', 'goose')
// localStorage.setItem('access_key', '1q2w3e4r5t6y7u8i')
// localStorage.clear()

const check_key = function (to, from, next) {
  axios.post('/access_key', {
    access_key: localStorage.getItem('access_key')
  })
    .then((response) => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  const access_key = localStorage.getItem('access_key')
  if (access_key) {
    next()
  } else {
    next({ name: 'sign-in' })
  }
}

const check_key_sign_in = function (to, from, next) {
  axios.post('/access_key', {
    access_key: localStorage.getItem('access_key')
  })
    .then((response) => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
    const access_key = localStorage.getItem('access_key')
    if (access_key) {
      next({ name: 'calls' })
    } else {
      next()
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
      beforeEnter: check_key_sign_in
    },
    {
      path: '/calls',
      name: 'calls',
      component: CallListView,
      beforeEnter: check_key
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
      beforeEnter: check_key
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      beforeEnter: check_key
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      beforeEnter: check_key
    }
  ]
})

export default router
