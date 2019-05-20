import Vue from 'vue'
import Vuex from 'vuex'
import autoStore from './store/autoStore'
import user from './store/user'
import userDataDb from './store/userDataDb'
import currencyStore from './store/currencyStore'
import weatherStore from './store/weatherStore'

Vue.use(Vuex)

export default new Vuex.Store({
modules: {
  autoStore: autoStore,
  user: user,
  userDataDb: userDataDb,
  currencyStore: currencyStore,
  weatherStore: weatherStore
}
})
