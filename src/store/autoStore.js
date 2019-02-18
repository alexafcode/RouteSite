export default {
  namespaced: true,
  state: {
    // autos: [
    //   { id: 1, name: 'BMW'},
    //   { id: 2, name: 'Mercedes'}
    // ]
    autos: JSON.parse(localStorage.getItem('autos'))

  },
  mutations: {
    // ADD_AUTOS: (state, auto) => {
    //   state.autos.push(auto)
    // },
    ADD_LS: (state, auto) => {
      state.autos.push(auto)
      localStorage.setItem('autos', JSON.stringify(state.autos))
    },
    INIT_STATE: (state) => {
      if (localStorage.getItem('autos')) {
        Object.assign(this.replaceState(state, JSON.parse(localStorage.getItem('autos'))))
      }
    }
  },
  actions: {

  },
  getters: {
    getById: state => (id) => {
      return state.autos.find(autos => autos.id === id)
    }
  }
}

