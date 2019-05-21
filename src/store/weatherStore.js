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
      // if (localStorage.getItem())
      // commit("UNSET_CITY")
      // let t = "2019-05-21T08:51:00+05:00"
      // YYYY-MM-DD[T]HH:mm:ss
      // let time = moment(t)
      // console.log(time.format("HH:mm"))
      // console.log(time.utc().format("HH:mm"))
      //
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
          let res = result.data[0];
          console.log(res)
          let time = moment(res.LocalObservationDateTime)///.format("HH:mm")
          console.log(res.LocalObservationDateTime) // ???
          console.log(time.format("HH:mm"))
          console.log(moment().utcOffset(res.LocalObservationDateTime).utc().format("HH:mm"))
          city = {
            city: data.AdministrativeArea
              ? data.AdministrativeArea.LocalizedName
              : data.selectCity.city,
            country: data.Country
              ? data.Country.LocalizedName
              : data.selectCity.country,
            temp: `${res.Temperature.Metric.Value}  ${
              res.Temperature.Metric.Unit
              }`,
            windDirect: res.Wind.Direction.Localized,
            windSpeed: `${res.Wind.Speed.Metric.Value}  ${
              res.Wind.Speed.Metric.Unit
              }`,
            weatherText: res.WeatherText,
            key: res.Key,
            realFeelTemperature: `${res.RealFeelTemperature.Metric.Value} ${res.RealFeelTemperature.Metric.Unit}`, //ощущается как
            visibility: `${res.Visibility.Metric.Value} ${res.Visibility.Metric.Unit}`,
            WeatherIcon: res.WeatherIcon,
            IsDayTime: res.IsDayTime,
            time: time
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
    citiesGetter: state => {
      return state.cities
    },
  }
}
