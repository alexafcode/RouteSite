import autoDb from '../main.js'

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
    async LOAD_AUTO( { commit }) {
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
    }
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

