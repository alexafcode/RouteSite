import firebase from 'firebase/app';

export default {
  state: {
    dataDb: []
  },
  mutations: {
    SET_dataDb(state, payload) {
      state.dataDb = payload
      console.log("state", state.dataDb)
    }
  },
  actions: {
    async ADD_EVENT({ commit }, payload) {
      await firebase.firestore().collection(payload.user.email).doc(payload.storage.id).set(payload.storage).then(function() {
        // eslint-disable-next-line
        console.log("Document successfully written!");
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
