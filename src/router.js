import Vue from 'vue'
import Router from 'vue-router'
import store from './store'


Vue.use(Router)
//const router = new VueRouter({ routes: routes,  mode: 'history'} );
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/components/Home.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import(/* webpackChunkName: "list" */ './components/auto/list.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/autoCard',
      name: 'autoCard',
      component: () => import(/* webpackChunkName: "autoCard" */ './components/auto/autoCard.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cardItem/:id',
      name: 'cardItem',
      props: true,
      component: () => import(/* webpackChunkName: "cardItem" */ './components/auto/cardItem.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "news" */ './components/News/news.vue'),
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/currency',
    //   name: 'currency',
    //   component: () => import(/* webpackChunkName: "currency" */ './components/currency/currency.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "sign" */ './components/Main/SignIn.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "sign" */ './components/Main/SignUp.vue'),
    },
    {
      path: '/pc',
      name: 'pc',
      component: () => import(/* webpackChunkName: "sign" */ './components/Main/PersonalCabinet.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import(/* webpackChunkName: "calendar" */ './components/Calendar/Calendar.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mainConverter',
      name: 'mainConverter',
      component: () => import(/* webpackChunkName: "converter" */ './components/Converter/main-converter.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/mainConverter/converter',
      name: 'converter',
      component: () => import(/* webpackChunkName: "converter" */ './components/Converter/converter.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mainConverter/currencyExchange',
      name: 'currencyExchange',
      component: () => import(/* webpackChunkName: "converter" */ './components/Converter/currency-exchange.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import(/* webpackChunkName: "converter" */ './components/Weather/weather.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: "/"
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
