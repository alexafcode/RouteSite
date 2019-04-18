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
      const results  = await axios.get(url)
      .then(response => {
        commit('setDataTime', response.data.Timestamp)
        let val = response.data.Valute;
        let obj = {};
        let arr = [];
        Object.keys(val).forEach(key => {
          let e = val[key];
          obj = {
            name: e.Name,
            value: e.Value,
            nominal: e.Nominal
          };
          arr.push(obj);
        });
        arr.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
       commit('setCurrency', arr);
      })
      // eslint-disable-next-line
      .catch(error => console.error(error))
      return results
    }
  },
  getters: {
    currencyState: state => {
      return state.currency
    }
  }
}
