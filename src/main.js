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
import config from './firebase-config'

// Vue.config.productionTip = false

// Vue.prototype.$firebase = firebase.initializeApp(config);
Vue.use(VueFire)


// firebase.initializeApp({
//   projectId: "routesite-vue",
//   databaseURL: "https://routesite-vue.firebaseio.com"
//  })
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const autoDb = db.collection('autoDb');

// autoDb.get()
// .then(querySnapshot => {
//   querySnapshot.forEach(s => {
//     const data = s.data()
//     let auto = {
//       id: s.id,
//       name: data.name,
//       descriptions: data.descriptions,
//       imageUrl: data.imageUrl2
//     }
//     console.log(auto)
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default {
  db,
  autoDb,
}
