<template>
  <div>
    <v-layout
      column
      class="card"
      :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
    >
      <v-snackbar v-model="snackbar" :timeout="timeout" :top="'top'" :color="'info'">
        {{ text }}
        <v-btn color="yellow" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-layout column class="card__title">
        <div class="card__title_time text-md-center">Обновлено {{city.time}}</div>
        <div class="card__title_location text-md-center">{{city.country}}, {{city.city}}</div>
      </v-layout>
      <v-layout row class="card__center" align-center>
        <v-flex xs4>
          <p class="card__center_temp text-md-center">{{city.temp}}</p>
          <div class="text-md-center card__center_tempreal_text">
            Ощущается как:
            <span class="card__center_tempreal">{{city.realFeelTemperature}}</span>
          </div>
          <div class="card__center_pressure text-md-center">{{city.pressure}}</div>
        </v-flex>
        <v-flex xs4>
          <div
            v-show="city.WeatherIcon"
            class="card__center_icon"
            :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${city.WeatherIcon}.png`)})`}"
          ></div>
        </v-flex>
        <v-flex xs4 class="card__center_wind">
          <div class="text-md-center">
            Направление ветра:
            <span class="card__center_wind_direct">{{city.windDirect}}</span>
          </div>
          <div class="text-md-center">
            Скорость ветра:
            <span class="card__center_wind_speed">{{city.windSpeed}}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row class="card__footer">
        <v-btn flat small color="white" @click="saveToLS">Сохранить</v-btn>
        <v-flex xs12 offset-sm1 class="card__footer_text">
          <div>{{city.weatherText}}</div>
          <div>Видимость {{city.visibility}}</div>
        </v-flex>
        <v-btn
          flat
          small
          color="white"
          class="card__footer_more"
          @click="GetWeatherForecast(city)"
        >5 дней</v-btn>
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
    snackbar: false,
    timeout: 4000,
    text: "",
    cityForecastItems: null,
    showMore: false
  }),
  computed: {
    dayTime() {
      return this.city.IsDayTime ? "day" : "night";
    },
    ...mapActions("weatherStore", ["GET_WEATHER_FORECAST"])
  },
  created() {},
  mounted() {},
  methods: {
    saveToLS() {
      let arr = [];
      let city = {};
      city = {
        Key: this.city.key,
        selectCity: {
          city: this.city.city,
          country: this.city.country
        }
      };
      if (localStorage.getItem("city") != null) {
        arr = JSON.parse(localStorage.getItem("city"));
      }
      let exist = false;
      arr.forEach(el => {
        if (el.Key === this.city.key) {
          exist = true;
        }
      });
      if (!exist) {
        arr.push(city);
        localStorage.setItem("city", JSON.stringify(arr));
        this.text = "Сохранено";
        this.snackbar = true;
      } else {
        this.text = "Уже Сохранено";
        this.snackbar = true;
      }
    },
    GetWeatherForecast(city) {
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
  margin-bottom: 2vh;
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
    // .card__title_location {
    // }
  }
  .card__center {
    .card__center_temp {
      font-size: 32px;
      line-height: 30px;
      font-weight: 400;
      color: whitesmoke;
    }
    .card__center_tempreal_text {
      color: lightgray;
      .card__center_tempreal {
        font-size: 18px;
        line-height: 20px;
        font-weight: 400;
        color: white;
      }
    }
    .card__center_pressure {
      color: lightgray;
    }
    .card__center_icon {
      width: 190px;
      height: 135px;
      background-size: contain;
      background-position: top;
      background-repeat: no-repeat;
    }
    .card__center_wind {
      color: lightgray;
      .card__center_wind_speed,
      .card__center_wind_direct {
        color: white;
      }
    }
  }
  .card__footer {
    color: lightgray;
    .card__footer_text {
      text-align: center;
    }
  }
}
.card__datails {
  position: relative;
  width: 500px;
  height: 260px;
  margin-bottom: 1vh;
  border-radius: 1em;
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

@media screen and (max-width: 840px) {
  .card {
    width: 95vw;
    height: 40%;
    margin: auto;
    .card__center {
      font-size: 12px;
      .card__center_icon {
        width: 25vw;
        height: 25vh;
      }
    }
    .card__footer {
      display: flex;
      justify-content: space-around;
      // align-items: flex-end;
      align-items: center;
      .card__footer_text {
        font-size: 12px;
        text-align: center;
      }
      .card__footer_more {
        // display: none;
      }
    }
  }
  .card__datails {
    margin: auto;
    width: 95vw;
  }
}
@media screen and (max-width: 600px) {
}
</style>
