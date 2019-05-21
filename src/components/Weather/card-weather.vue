<template>
  <v-layout
    column
    class="card"
    :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
  >
    <v-layout column class="card__title">
      <div class="card__title_time">Сейчас {{city.time}}</div>
      <div>{{city.country}}, {{city.city}}</div>
    </v-layout>
    <v-layout row class="card__center" align-center>
      <v-flex xs3>
        <p class="card__center_temp">{{city.temp}}</p>
        <div>Ощущается как:</div>
        <div class="card__center_tempreal">{{city.realFeelTemperature}}</div>
      </v-flex>
      <v-flex xs6>
        <div
          v-show="city.WeatherIcon"
          class="card__center_icon"
          :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${city.WeatherIcon}.png`)})`}"
        ></div>
      </v-flex>
      <v-flex xs4 class="card__center_wind">
        <div>Направление ветра:</div>
        <div class="text-md-center">{{city.windDirect}}</div>
        <div>Скорость ветра:</div>
        <div class="text-md-center">{{city.windSpeed}}</div>
      </v-flex>
    </v-layout>
    <v-layout row class="card__footer">
      <v-flex xs3 offset-sm5 class="card__center_wind">
        <div>{{city.weatherText}}, {{city.visibility}}</div>
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
      type: Object,
      required: true
    }
  },
  data: () => ({
    url: "~@/assets/weather-icons/01.png"
  }),
  computed: {
    dayTime() {
      return this.city.IsDayTime ? "day" : "night";
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.card {
  width: 500px;
  height: 250px;
  margin-bottom: 5vh;
  border-radius: 1em;
  padding: 20px;
  .card__title {
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    color: white;
    .card__title_time {
      font-weight: 200;
      font-size: 14px;
      color: wheat;
    }
  }
  .card__center {
    .card__center_temp {
      font-size: 30px;
      line-height: 30px;
      font-weight: 400;
      color: whitesmoke;
    }
    .card__center_tempreal {
      font-size: 20px;
      line-height: 28px;
      font-weight: 400;
      color: white;
    }
    .card__center_icon {
      width: 190px;
      height: 135px;
      background-size: contain;
      background-position: top;
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
