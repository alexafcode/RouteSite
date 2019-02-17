import Vue from 'vue'
import Vuex from 'vuex'
import autoStore from './store/autoStore'

Vue.use(Vuex)

export default new Vuex.Store({
modules: {
  autoStore: autoStore
}
})
