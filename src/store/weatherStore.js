import axios from "axios"
import key from "./keys.js";

export default {
  namespaced: true,
  state: {
    cities: [],
    items: []
  },
  mutations: {
    SET_CITY(state, payload) {
      state.cities.push(payload)
    },
    SET_ITEM_CITY(state, payload) {
      state.items = payload;
    },
    UNSET_CITY(state) {
      state.cities = [];
      state.items = [];
    },
  },
  actions: {
    INIT_STATE({ dispatch, commit }) {
      // if (localStorage.getItem())
      commit("UNSET_CITY")
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
            key.weather
            }&q=${latitude},${longitude}&language=ru-ru`;
          axios.get(url).then(response => {
            dispatch('GET_WEATHER_CITY', response.data)
          });
        });
      } else {
         /* eslint-disable */
        console.error("геолокация НЕдоступна");
      }
    },
    async GET_WEATHER_CITY({ commit }, data) {
      let queryKey = data.Key ? data.Key : data.selectCity.Key;
      let city = {};
      let url = `http://dataservice.accuweather.com/currentconditions/v1/${
        queryKey
        }?apikey=${key.weather}&language=ru-ru&details=true`;
      await axios.get(url)
        .then(result => {
          city = {
            city: data.AdministrativeArea
              ? data.AdministrativeArea.LocalizedName
              : data.selectCity.city,
            country: data.Country
              ? data.Country.LocalizedName
              : data.selectCity.country,
            temp: `${result.data[0].Temperature.Metric.Value}  ${
              result.data[0].Temperature.Metric.Unit
              }`,
            windDirect: result.data[0].Wind.Direction.Localized,
            windSpeed: `${result.data[0].Wind.Speed.Metric.Value}  ${
              result.data[0].Wind.Speed.Metric.Unit
              }`,
            weatherText: result.data[0].WeatherText,
            key: result.data[0].Key
          };
        });
      commit('SET_CITY', city)
    },
    SEARCH_CITY({ commit }, payload) {
      let url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
        key.weather
        }&q=${payload.searchText}&language=ru-ru`;
      let items = []
      let cities = {};
      axios.get(url).then(response => {
        response.data.forEach(el => {
          cities = {
            country: el.Country.LocalizedName,
            city: el.AdministrativeArea.LocalizedName,
            Key: el.Key
          };
          items.push(cities);
        });
      });
      commit('SET_ITEM_CITY', items)
    },
  },
  getters: {
    // user: state => {
    //   return state.user
    // },
  }
}
