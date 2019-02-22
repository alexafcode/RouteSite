import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'
import firebase from 'firebase/app';
// import 'firebase/database';
import 'firebase/firestore'
import 'firebase/storage'
import config from './firebase-config'
import '@firebase/auth';

// Vue.config.productionTip = false

// Vue.prototype.$firebase = firebase.initializeApp(config);
Vue.use(VueFire)


// firebase.initializeApp({
//   projectId: "routesite-vue",
//   databaseURL: "https://routesite-vue.firebaseio.com"
//  })
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const storage = firebase.storage()
const autoDb = db.collection('autoDb')

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged( user => {
      store.dispatch('user/STATE_CHANGED', user)
    })
  }
}).$mount('#app')

export default {
  firebaseApp,
  db,
  autoDb,
  storage
}
