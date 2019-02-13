import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import List from '@/components/list.vue'
import News from '@/components/news.vue'

Vue.use(Router)

export default new Router({
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
      path: '/news',
      name: 'news',
      component: News
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
