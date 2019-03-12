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
              imageUrl: data.imageUrl,
              rating: data.rating,
              comment: data.comment
            }
            tempDB.push(auto)
          })
        })
      commit('SET_AUTO', tempDB)
    },
    // TODO easy code
    // eslint-disable-next-line
    async UPLOAD({ commit }, payload) {
      let data = {
        id: payload.text.replace(/\s/g,''),
        name: payload.text,
        descriptions: payload.desc,
        rating: payload.rating,
        imageUrl: ""
      }
      const imageName = payload.imageName
      const blobImage = payload.blobImage
      let storage = firebase.storage()
      let storageRef = storage.ref();
      let imagesRef = storageRef.child('AutoImage');
      let spaceRef = imagesRef.child(imageName);
      await spaceRef.put(blobImage).then( async function() {
        await spaceRef.getDownloadURL().then( async function(url) {
          data.imageUrl = url;
          await firebase.firestore().collection('autoDb').doc(data.id).set(data).then(function() {
            // eslint-disable-next-line
            console.log("Document successfully written!");
          })
          // autogenerate doc ID
          // let autoRef = firebase.firestore().collection('autoDb').doc()
          // autoRef.set(data).then(function() {
          //   console.log("Document successfully written!");
          // })
        })
      })
      return "Success"
    },
    // eslint-disable-next-line
    async CHANGE({commit}, payload) {
      const change =  await firebase.firestore().collection('autoDb').doc(payload.auto.id)
      await change.update({
        comment: payload.auto.comment
      }).then(() => {
        // eslint-disable-next-line
        console.log("Document successfully updated!")
      }).catch(error => {
        // eslint-disable-next-line
        console.error("Error updating document: ", error);
      })
    },
    // eslint-disable-next-line
    async DELETE ({coomit}, payload) {
      await autoDb.autoDb.doc(payload.auto.id).delete().then(() => {
        // console.log("Document successfully deleted!");
        return "Document successfully deleted!"
    }).catch(function(error) {
      /* eslint-disable */
        console.error("Error removing document: ", error);
    });
    }
  },
  getters: {
    getById: state => (id) => {
      return state.autos.find(autos => autos.id === id)
    },
    autoState: state => {
      return state.autos
    }
  }
}
