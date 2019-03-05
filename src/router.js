import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import List from './components/auto/list.vue'
import autoCard from './components/auto/autoCard.vue'
import cardItem from './components/auto/cardItem.vue'
import News from './components/News/news.vue'
import signin from './components/Main/SignIn.vue'
import signup from './components/Main/SignUp.vue'
import currency from './components/currency/currency.vue'
// import { Store } from 'vuex';
import store from './store'


Vue.use(Router)
//const router = new VueRouter({ routes: routes,  mode: 'history'} );
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/autoCard',
      name: 'autoCard',
      component: autoCard
    },
    {
      path: '/cardItem/:id',
      name: 'cardItem',
      props: true,
      component: cardItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/currency',
      name: 'currency',
      component: currency,
      meta: {
        requiresAuth: true
      }
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
// Не даёт зайти не зарегистрированному пользователю
// function authGuard(from, to, next) {
//   if (store.state.user.isAuthenticated){
//     next()
//   }
//   else
//     next('/signup')
// }

router.beforeEach((to, from, next) => {
  store.dispatch('user/INIT_STATE')
    .then(user => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (user) {
          next();
        } else {
          next('/signup');
        }
      } else {
        next();
      }
    })
});

export default router
