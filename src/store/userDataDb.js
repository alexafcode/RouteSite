import firebase from 'firebase/app';

export default {
  state: {
    dataDb: null
  },
  mutations: {
  },
  actions: {
    async ADD_EVENT({ commit }, payload) {
      let data = {
        day: payload.storage.day,
        month: payload.storage.month,
        year: payload.storage.year,
        message: payload.storage.message
      }
      await firebase.firestore().collection('userData').doc(payload.user.email).set(data).then(function() {
        // eslint-disable-next-line
        console.log("Document successfully written!");
      })
      return "Success"
    },
  },
  getters: {
    dataDb: state => {
      return state.dataDb
    },
  }
}
