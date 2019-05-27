<template>
  <v-layout column class="detail">
    <div class="detail__date">{{ cityItem.date }}</div>
    <div
      class="detail__day_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.dayIcon}.png`)})`}"
    ></div>
    <div class="detail__day_temp">Днём:</div>
    <div class="detail__day_temp_value">{{ cityItem.tempDay }}</div>
    <div
      class="detail__night_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.nightIcon}.png`)})`}"
    ></div>
    <div class="detail__night_temp">Ночью:</div>
    <div class="detail__night_temp_value">{{ cityItem.tempNight }}</div>
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
.detail {
  width: 90px;
  height: 250px;
  min-height: 240px;
  margin: 5px;
  border-radius: 1em;
  text-align: center;
  &:hover {
    transform: scale(1.05);
  }
  .detail__date {
    color: white;
  }
  .detail__day_icon {
    width: 80px;
    height: 50px;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__day_temp {
    color: lightgray;
  }
  .detail__day_temp_value {
    font-weight: 400;
    font-size: 1.5rem;
    color: white;
  }
  .detail__night_icon {
    width: 80px;
    height: 50px;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__night_temp {
    color: lightgray;
  }
  .detail__night_temp_value {
    font-weight: 400;
    font-size: 1rem;
    color: white;
  }
  .detail__day_text {
    font-size: .75rem;
    // overflow-wrap: break-word;
    word-break: normal;
    white-space: normal;
    color: lightgray;
  }
}
@media screen and (max-width: 840px) {
  .detail {
    width: 16vw;
    .detail__day_icon {
      width: 15vw;
    }
    .detail__day_temp {

    }
    .detail__day_temp_value {
      font-size: 1.25rem;
    }
    .detail__night_icon {
      width: 15vw;
      display: none;
    }
    .detail__day_text {
      word-break: break-word;
    }
  }
}
@media screen and (max-width: 600px) {
}
</style>
