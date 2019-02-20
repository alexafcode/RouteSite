import autoDb from '../main.js'
import firebaseApp from '../main.js'
import firebase from 'firebase/app';
import 'firebase/storage'
import db from '../main.js'
import UPLOAD_MAIN from '../main.js'

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
      console.log("payload", payload)
      const name = payload.text
      const descriptions = payload.desc
      const imageName = payload.imageName
      let imageUrl = "";
      // const imageUrl = payload.imageUrl
      const blobImage  = payload.blobImage
      // var ref = firebase.database().ref("autoDb");
      var storage = firebase.storage()
      var storageRef = storage.ref();
      var imagesRef = storageRef.child('AutoImage');
      var spaceRef = imagesRef.child(imageName);
      let refer = spaceRef.put(blobImage).then(function(snapshot){
        spaceRef.getDownloadURL().then(function (url) {
          imageUrl = url;
          console.log("url", imageUrl)
        })
        console.log("Success")
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
