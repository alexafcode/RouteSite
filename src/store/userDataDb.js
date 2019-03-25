import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    dataDb: []
  },
  mutations: {
    SET_dataDb(state, payload) {
      state.dataDb = payload
    }
  },
  actions: {
    async ADD_EVENT({ commit, dispatch }, payload) {
      // await firebase.firestore().collection(payload.user.email).doc(payload.storage.id).collection("2").doc(payload.storage.id).set(payload.storage).then(function() {
        await firebase.firestore().collection(payload.user.email).doc(payload.storage.id).set(payload.storage).then(function() {
        // eslint-disable-next-line
        console.log("Successfully written! - return Update Store");
        dispatch("GET_EVENT", payload)
      })
      return "Success"
    },
    async GET_EVENT({ commit }, payload) {
      let tempDB = []
      await firebase.firestore().collection(payload.user.email).get().then(querySnapshot => {
        querySnapshot.forEach(s => {
          const data = s.data()
          let event = {
            id: s.id,
            day: data.day,
            month: data.month,
            year: data.year,
            message: data.message
          }
          tempDB.push(event)
        })
        commit("SET_dataDb", tempDB)
      })
    }
  },
  getters: {
    dataDb: state => {
      return state.dataDb
    },
  }
}
