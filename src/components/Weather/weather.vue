<template>
  <v-layout column class="weather">
    <!-- <loading v-show="isLoading"></loading> -->
    <v-flex xs6 offset-sm3>
      <!-- <v-layout v-show="!isLoading" class="weather__search"> -->
      <v-layout class="weather__search">
        <v-layout column>
          <v-text-field label="Search" clearable v-model="searchText"></v-text-field>
          <v-expand-transition>
            <v-list v-if="selectCityShow" class="lighten-3 weather__searchList">
              <v-list-tile v-for="(item, i) in items" :key="i">
                <v-list-tile-content @click="getWeatherByCity(item)">
                  <v-list-tile-title v-text="item.city"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="item.country"></v-list-tile-sub-title>
                  <v-divider inset></v-divider>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-expand-transition>
        </v-layout>
        <v-btn fab dark color="brown darken-4" small @click="searchCity">
          <v-icon dark>search</v-icon>
        </v-btn>
        <v-divider></v-divider>
      </v-layout>
    </v-flex>
    <v-flex xs8 offset-sm3>
      <div v-for="(city, index) in cities" :key="index">
        <card :city="city"></card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import loading from "../../views/loading.vue";
import card from "./card-weather.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "whether",
  components: {
    loading,
    card
  },
  data: () => ({
    latitude: null,
    longitude: null,
    searchText: "",
    selectCityShow: false,
    // isLoading: false,
    selectCity: {}
  }),
  computed: {
    ...mapActions("weatherStore", [
      "INIT_STATE",
      "SEARCH_CITY",
      "GET_WEATHER_CITY"
    ]),
    ...mapState("weatherStore", ["cities", "items"])
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
    }
  }
};
</script>
<style lang="scss" scoped>
.weather {
  .weather__search {
    position: relative;
    .weather__searchList {
      cursor: pointer;
      height: 55vh;
      overflow: auto;
      z-index: 1;
    }
  }
}
@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 600px) {
}
</style>
