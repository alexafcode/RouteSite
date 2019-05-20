<template>
  <v-layout column class="card">
    <v-layout row class="card__title">
      <p>{{city.country ? city.country : "Текущее местоположение"}} {{city.city ? city.city : ""}}</p>
    </v-layout>
    <v-layout row class="card__center">
      <v-flex xs3>
        <p class="card__center_temp">{{city.temp}}</p>
      </v-flex>
      <v-flex xs6>
        <div class="card__center_icon"></div>
      </v-flex>
      <v-flex xs3 class="card__center_wind">
        <p>Направление ветра:</p>
        <p class="text-md-center">{{city.windDirect}}</p>
        <p>Скорость ветра:</p>
        <p class="text-md-center">{{city.windSpeed}}</p>
      </v-flex>
    </v-layout>
    <v-layout row class="card__footer">
      <v-flex xs3 offset-sm5 class="card__center_wind">
        <p>{{city.weatherText}}</p>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
export default {
  name: "card-weather",
  components: {},
  props: {
    city: {
      // type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.card {
  width: 35vw;
  height: 45vh;
  background: grey;
  margin-bottom: 5vh;
  z-index: 1;
  border-radius: 1em;
  .card__title {
    margin-left: auto;
    margin-right: auto;
    height: 4em;
    padding-top: 0.5em;
  }
  .card__center {
    .card__center_temp {
    }
    .card__center_icon {
      width: 15vw;
      height: 25vh;
      background: red;
    }
    .card__center_wind {
    }
    .card__footer {
    }
  }
}

@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 600px) {
}
</style>
