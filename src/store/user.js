// import autoDb from '../main.js'
// import firebase from 'firebase';
//import firebaseApp from '../main.js'
import firebase from 'firebase/app';
import '@firebase/auth';


export default {
  namespaced: true,
  state: {
    recipes: [],
    apiUrl: '',
    user: null,
    isAuthenticated: false

  },
  mutations: {
    // INIT_STATE: (state) => {
    //   if (localStorage.getItem('autos')) {
    //     Object.assign(this.replaceState(state, JSON.parse(localStorage.getItem('autos'))))
    //   }
    // },

    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    unsetUser(state) {
      state.user = null;
      state.isAuthenticated = false
    }
  },
  actions: {
    async USER_JOIN({ commit }, { email, password }) {
      console.log(email, password)
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
        })
        .catch(error => {
          console.log(error)
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        })
      return "Success"
    },
    async USER_SIGNUP({ commit }, { email, password }) {
      console.log(email, password)
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
        })
    },
    USER_SIGNOUT({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          console.log("Success")
        })
        .catch((error) => {
          console.log(error)
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    STATE_CHANGED({ commit }, payload) {
      if (payload) {
        commit('setUser', payload);
        commit('setIsAuthenticated', true);
      } else {
        commit('unsetUser')
      }
    }
  },
  getters: {
    user: state => {
      return state.user
    },
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    }
  }
}
