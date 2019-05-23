<template>
  <v-layout
    column
    class="detail"
    :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
  >
    <div class="detail__date">{{ cityItem.date }}</div>
    <div
      class="detail__day_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.dayIcon}.png`)})`}"
    ></div>
    <div class="detail__day_temp">
      Днём:
      <span class="detail__day_temp_value">{{ cityItem.tempDay }}</span>
    </div>
    <div class="detail__night_temp">
      Ночью:
      <span class="detail__night_temp_value">{{ cityItem.tempNight }}</span>
    </div>
    <div class="detail__day_text">{{ cityItem.dayIconText }}</div>
  </v-layout>
</template>
<script>
export default {
  name: "card-datails",
  components: {},
  props: {
    cityItem: {
      type: Object,
      required: true
    },
    dayTime: {
      required: false
    }
  },
  data: () => ({
    // cityItem: {
    //   date: "24 июня",
    //   dayIcon: 6, // Day.Icon
    //   dayIconText: "Преимущественно облачно", // Day.IconPhrase
    //   tempDay: "8° C", // Temperature.Maximum.Value.toFixed(),
    //   nightIcon: 35, // Night.Icon
    //   tempNight: "0° C" // Temperature.Minimum.Value.toFixed(),
    // }
  }),
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.detail {
  width: 115px;
  margin: 5px;
  border-radius: 1em;
  text-align: center;
  .detail__date {
  }
  .detail__day_icon {
    width: 120px;
    height: 55px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__day_temp {
    color: lightgray;
    .detail__day_temp_value {
      font-weight: 400;
      font-size: 20px;
      color: white;
    }
  }
  .detail__night_temp {
    color: lightgray;
    .detail__night_temp_value {
      font-weight: 400;
      font-size: 16px;
      color: white;
    }
  }
  .detail__day_text {
    font-size: 10px;
    overflow-wrap: break-word;
  }
}
@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 600px) {
}
</style>
