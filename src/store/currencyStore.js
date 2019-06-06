import axios from "axios";

export default {
  namespaced: true,
  state: {
    currency: [],
    timeStamp: null

  },
  mutations: {
    setCurrency(state, payload) {
      state.currency = payload;
    },
    setDataTime(state, payload) {
      state.timeStamp = payload;
    }
  },
  actions: {
    async INIT_STATE({ commit }) {
      let url = "https://www.cbr-xml-daily.ru/daily_json.js";
      await axios.get(url)
      .then(response => {
        commit('setDataTime', response.data.Timestamp)
        const data = response.data.Valute;
        const arr = Object.keys(data).map(key => {
          let e = data[key];
          return {
            name: e.Name,
            value: e.Value,
            nominal: e.Nominal
          }
        })
        arr.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
       commit('setCurrency', arr);
      })
      // eslint-disable-next-line
      .catch(error => console.error(error))
    }
  },
  getters: {
    currencyState: state => {
      return state.currency
    }
  }
}
