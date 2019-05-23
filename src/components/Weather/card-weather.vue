<template>
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
      <v-flex xs6 offset-sm4>
        <div>{{city.weatherText}}, Видимость {{city.visibility}}</div>
      </v-flex>
      <v-btn flat small color="white" @click="saveToLS">Сохранить</v-btn>
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
    snackbar: false,
    timeout: 4000,
    text: ""
  }),
  computed: {
    dayTime() {
      return this.city.IsDayTime ? "day" : "night";
    }
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
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  position: relative;
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
  }
}

@media screen and (max-width: 1024px) {
  .card {
    width: 95vw;
    .card__center {
      font-size: 12px;
      .card__center_icon {
        width: 25vw;
        height: 25vh;
      }
    }
  }
}
@media screen and (max-width: 600px) {
}
</style>
