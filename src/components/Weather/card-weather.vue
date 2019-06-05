<template>
  <div>
    <v-layout
      column
      class="card"
      :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
    >
      <v-layout column class="card__title">
        <div class="title__time text-md-center">{{city.time}}</div>
        <div class="title__location text-md-center">{{city.country}}, {{city.city}}</div>
      </v-layout>
      <v-layout row class="card__center" align-center>
        <v-flex xs4>
          <p class="center__temp text-md-center">{{city.temp}}</p>
          <div class="center__tempreal-text text-md-center">
            Ощущается как:
            <span class="center__tempreal">{{city.realFeelTemperature}}</span>
          </div>
          <div class="center__pressure text-md-center">{{city.pressure}}</div>
        </v-flex>
        <v-flex xs4>
          <div
            v-show="city.WeatherIcon"
            class="center__icon"
            :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${city.WeatherIcon}.png`)})`}"
          ></div>
        </v-flex>
        <v-flex xs4 class="center__wind">
          <div class="text-md-center">
            Направление ветра:
            <span class="center__wind-direct">{{city.windDirect}}</span>
          </div>
          <div class="text-md-center">
            Скорость ветра:
            <span class="center__wind-speed">{{city.windSpeed}}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row class="card__footer">
        <v-btn flat small color="white" @click="saveToLS" v-if="!save">Сохранить</v-btn>
        <v-btn flat small color="white" @click="deleteToLS" v-if="save">Удалить</v-btn>
        <v-flex xs12 offset-sm1 class="card__footer-text">
          <div>{{city.weatherText}}</div>
          <div>Видимость {{city.visibility}}</div>
        </v-flex>
        <v-btn flat small color="white" class="card__footer-more" @click="GetWeatherForecast">5 дней</v-btn>
      </v-layout>
    </v-layout>
    <transition name="fade" mode="out-in">
      <v-layout
        row
        class="card__datails"
        v-if="showMore"
        :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
      >
        <div v-for="(item, index) in cityForecastItems" :key="index">
          <card-datail :cityItem="item" :dayTime="dayTime"></card-datail>
        </div>
      </v-layout>
    </transition>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import cardDatail from "./card-detail.vue";

export default {
  name: "card-weather",
  components: {
    cardDatail
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    cityForecastItems: null,
    showMore: false,
    save: null
  }),
  computed: {
    dayTime() {
      return this.city.IsDayTime ? "day" : "night";
    },
    ...mapActions("weatherStore", [
      "GET_WEATHER_FORECAST",
      "SAVE_TO_LS",
      "DELETE_TO_LS"
    ])
  },
  mounted() {
    if (this.city.fromLS) {
      this.save = true;
    } else {
      this.save = false;
    }
  },
  methods: {
    saveToLS() {
      this.SAVE_TO_LS;
      this.save = true;
    },
    deleteToLS() {
      this.DELETE_TO_LS;
      this.save = false;
    },
    GetWeatherForecast() {
      if (!this.showMore) {
        this.GET_WEATHER_FORECAST.then(result => {
          this.cityForecastItems = result;
          this.showMore = true;
        });
      } else {
        this.showMore = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  width: 500px;
  height: 250px;
  padding: 1.25rem;
  border-radius: 1em;
  margin-bottom: 1rem;
  .card__title {
    color: white;
    font-weight: 400;
    text-align: center;
    font-size: 1.125rem;
    .title__time {
      color: wheat;
      font-size: 1rem;
      font-weight: 200;
    }
  }
  .card__center {
    .center__temp {
      font-weight: 400;
      line-height: 2rem;
      font-size: 2.125rem;
      color: whitesmoke;
    }
    .center__tempreal-text {
      color: lightgray;
      .center_tempreal {
        color: white;
        font-weight: 400;
        font-size: 1.125rem;
        line-height: 1.5rem;
      }
    }
    .center__pressure {
      color: lightgray;
    }
    .center__icon {
      width: 190px;
      height: 135px;
      background-size: contain;
      background-position: top;
      background-repeat: no-repeat;
    }
    .center__wind {
      color: lightgray;
      .center__wind-speed,
      .center__wind-direct {
        color: white;
      }
    }
  }
  .card__footer {
    color: lightgray;
    .card__footer-text {
      text-align: center;
    }
  }
}
.card__datails {
  position: relative;
  width: 500px;
  height: 260px;
  border-radius: 1em;
  margin-bottom: 1rem;
  background-color: lightgray;
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

@media screen and (max-width: 800px) {
  .card {
    width: 95vw;
    height: 40%;
    margin: auto;
    .card__center {
      font-size: 0.75rem;
      .center__icon {
        width: 32vw;
        height: 20vh;
        background-position: center;
      }
    }
    .card__footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .card__footer-text {
        font-size: 0.75rem;
        text-align: center;
        background-size: cover;
      }
    }
  }
  .card__datails {
    margin: auto;
    width: 95vw;
    height: 40vh;
  }
}
</style>
