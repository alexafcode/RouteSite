import autoDb from '../main.js'
import firebase from 'firebase/app';
import 'firebase/storage'


export default {
  namespaced: true,
  state: {
    // autos: JSON.parse(localStorage.getItem('autos')) ? JSON.parse(localStorage.getItem('autos')) : []
    autos: []

  },
  mutations: {
    // ADD_AUTOS: (state, auto) => {
    //   state.autos.push(auto)
    // },
    // ADD_LS: (state, auto) => {
    //   state.autos.push(auto)
    //   localStorage.setItem('autos', JSON.stringify(state.autos))
    // },
    // INIT_STATE: (state) => {
    //   if (localStorage.getItem('autos')) {
    //     Object.assign(this.replaceState(state, JSON.parse(localStorage.getItem('autos'))))
    //   }
    // },

    SET_AUTO(state, payload) {
      state.autos = payload
    }
  },
  actions: {
    async LOAD_AUTO({ commit }) {
      let tempDB = []
      await autoDb.autoDb.get()
        .then(querySnapshot => {
          querySnapshot.forEach(s => {
            const data = s.data()
            let auto = {
              id: s.id,
              name: data.name,
              descriptions: data.descriptions,
              imageUrl: data.imageUrl
            }
            tempDB.push(auto)
          })
        })
      commit('SET_AUTO', tempDB)
    },
    UPLOAD({ commit }, payload) {
      let data = {
        name: payload.text,
        descriptions: payload.desc,
        imageUrl: ""
      }
      const imageName = payload.imageName
      const blobImage = payload.blobImage
      var storage = firebase.storage()
      var storageRef = storage.ref();
      var imagesRef = storageRef.child('AutoImage');
      var spaceRef = imagesRef.child(imageName);
      spaceRef.put(blobImage).then(function() {
        spaceRef.getDownloadURL().then(function(url) {
          data.imageUrl = url;
          firebase.firestore().collection('autoDb').doc(data.name).set(data).then(function() {
            // eslint-disable-next-line
            console.log("Document successfully written!");
          })
          // let autoRef = firebase.firestore().collection('autoDb').doc() // autogenerate doc ID
          // autoRef.set(data).then(function() {
          //   console.log("Document successfully written!");
          // })
        })
      })
    },
  },
  getters: {
    getById: state => (id) => {
      return state.autos.find(autos => autos.id === id)
    },
    auto: state => {
      return state.autos
    }
  }
}
