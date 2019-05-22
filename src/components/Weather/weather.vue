<template>
  <v-layout column class="weather">
    <loading v-show="isLoading"></loading>
    <v-flex xs3 offset-sm3 v-click-outside>
      <v-layout v-show="!isLoading" class="weather__search">
        <v-layout column>
          <v-text-field label="Search" clearable v-model="searchText"></v-text-field>
          <search-list v-if="selectCityShow" :items="items" @selectItem="getWeatherByCity"></search-list>
        </v-layout>
        <v-btn fab dark color="brown darken-4" small @click="searchCity">
          <v-icon dark>search</v-icon>
        </v-btn>
        <v-divider></v-divider>
      </v-layout>
    </v-flex>
    <v-flex xs8 offset-sm3 v-show="!isLoading">
      <div v-for="(city, index) in cities" :key="index">
        <card :city="city"></card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import loading from "../../views/loading.vue";
import card from "./card-weather.vue";
import searchList from "./search-list.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "whether",
  components: {
    loading,
    card,
    searchList
  },
  data: () => ({
    searchText: "",
    selectCityShow: false,
    selectCity: {}
    // items: [
    //   {
    //     country: "Россия",
    //     city: "Москва"
    //   },
    //   {
    //     country: "Россия",
    //     city: "Москва"
    //   },
    //   {
    //     country: "Россия",
    //     city: "Москва"
    //   }
    // ],
    // cities: {
    //   city: "Пермь"
    // }
  }),
  computed: {
    ...mapActions("weatherStore", [
      "INIT_STATE",
      "SEARCH_CITY",
      "GET_WEATHER_CITY"
    ]),
    ...mapState("weatherStore", ["cities", "items", "isLoading"])
    // ...mapGetters("weatherStore", ["citiesGetter"])
  },
  created() {
    this.INIT_STATE;
  },
  mounted() {},
  methods: {
    searchCity() {
      this.SEARCH_CITY;
      this.selectCityShow = true;
    },
    getWeatherByCity(data) {
      this.selectCity = data;
      this.GET_WEATHER_CITY;
      this.selectCityShow = false;
      this.searchText = "";
    },
    hideDiv() {
      this.selectCityShow = false;
      this.searchText = "";
    }
  },
  directives: {
    ClickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = event => {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context.hideDiv();
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.weather {
}
@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 600px) {
}
</style>
