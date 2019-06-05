<template>
  <v-layout column class="weather">
    <loading v-show="isLoading"></loading>
    <loading-search v-show="searchLoading"></loading-search>
    <div v-click-outside>
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
    </div>
    <v-flex xs8 offset-sm3 v-show="!isLoading">
      <div v-for="(city, index) in cities" :key="index">
        <card :city="city"></card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import loading from "../../views/loading.vue";
import loadingSearch from "../../views/search-loading.vue";
import card from "./card-weather.vue";
import searchList from "./search-list.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "whether",
  components: {
    loading,
    card,
    searchList,
    loadingSearch
  },
  data: () => ({
    searchText: "",
    selectCityShow: false,
    selectCity: {}
  }),
  computed: {
    ...mapActions("weatherStore", [
      "INIT_STATE",
      "SEARCH_CITY",
      "GET_WEATHER_CITY"
    ]),
    ...mapState("weatherStore", ["cities", "items", "isLoading", "searchLoading"])
  },
  created() {
    this.INIT_STATE;
  },
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
  position: relative;
  .weather__search {
    margin-left: 25%;
    width: 750px;
  }
}
@media screen and (max-width: 800px) {
  .weather {
    .weather__search {
      width: 70%;
    }
  }
}
</style>
