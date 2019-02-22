import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import List from './components/auto/list.vue'
import autoCard from './components/auto/autoCard.vue'
import News from './components/News/news.vue'
import signin from './components/Main/SignIn.vue'
import signup from './components/Main/SignUp.vue'



Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/autoCard',
      name: 'autoCard',
      component: autoCard
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   props: true,
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
