import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'
import Home from '@/components/Home'
import Tips from '@/components/Tips'
import PageNotFound from '@/components/PageNotFound'
import Categories from '@/components/Categories'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/category/:id/tip/:tip_id',
      name: 'Tip',
      component: Tips
    },
    {
      path: '/tips/:id',
      name: 'Tips',
      component: Tips
    },
    { path: '*',
      name: 'pageNotFound',
      component: PageNotFound
    },
    {
      path: '/sw/firebase-messaging-sw.js'
    }
  ]
})
