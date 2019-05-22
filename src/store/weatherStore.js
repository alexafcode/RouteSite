import axios from "axios"
import key from "./keys.js";
import moment from "moment";

export default {
  namespaced: true,
  state: {
    cities: [],
    items: [],
    isLoading: true
  },
  mutations: {
    SET_CITY(state, payload) {
      state.cities.push(payload)
      state.isLoading = false
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
    INIT_STATE({ dispatch, commit, state }) {
      state.isLoading = true;
      let arr = [];
      if (localStorage.getItem("city") != null) {
        arr = JSON.parse(localStorage.getItem("city"));
      }
      arr.forEach(el => {
        dispatch('GET_WEATHER_CITY', el)
      })
      // commit("UNSET_CITY")
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${
            key.weather
            }&q=${latitude},${longitude}&language=ru-ru`;
          axios.get(url).then(response => {
            //  ToDO compare key in localStorage
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
          let res = result.data[0];
          let time = moment(res.LocalObservationDateTime).format("HH:mm")
          city = {
            key: queryKey,
            city: data.AdministrativeArea
              ? data.AdministrativeArea.LocalizedName
              : data.selectCity.city,
            country: data.Country
              ? data.Country.LocalizedName
              : data.selectCity.country,
            temp: `${(res.Temperature.Metric.Value).toFixed()}°  ${
              res.Temperature.Metric.Unit
              }`,
            windDirect: res.Wind.Direction.Localized,
            windSpeed: `${res.Wind.Speed.Metric.Value}  ${
              res.Wind.Speed.Metric.Unit
              }`,
            weatherText: res.WeatherText,
            realFeelTemperature: `${(res.RealFeelTemperature.Metric.Value).toFixed()}° ${res.RealFeelTemperature.Metric.Unit}`, //ощущается как
            visibility: `${(res.Visibility.Metric.Value)} ${res.Visibility.Metric.Unit}`,
            WeatherIcon: res.WeatherIcon,
            IsDayTime: res.IsDayTime,
            time: time,
            pressure: `${res.Pressure.Metric.Value} мм рт. ст.`
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
            city: el.LocalizedName,
            Key: el.Key
          };
          items.push(cities);
        });
      });
      commit('SET_ITEM_CITY', items)
    },
  },
  getters: {
    citiesGetter: state => {
      return state.cities
    },
  }
}
