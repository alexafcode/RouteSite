<template>
  <v-layout
    column
    class="detail"
  >
    <!-- <v-layout
    column
    class="detail"
    :style="{backgroundImage:`url(${require(`@/assets/weather-icons/${dayTime}.jpg`)})`}"
  > -->
    <div class="detail__date">{{ cityItem.date }}</div>
    <div
      class="detail__day_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.dayIcon}.png`)})`}"
    ></div>
    <div class="detail__day_temp">
      Днём:
      <!-- <span class="detail__day_temp_value">{{ cityItem.tempDay }}</span> -->
    </div>
    <div class="detail__day_temp_value">{{ cityItem.tempDay }}</div>
    <div
      class="detail__night_icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.nightIcon}.png`)})`}"
    ></div>
    <div class="detail__night_temp">
      Ночью:
      <!-- <span class="detail__night_temp_value">{{ cityItem.tempNight }}</span> -->
    </div>
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
    font-size: 20px;
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
    font-size: 16px;
    color: white;
  }
  .detail__day_text {
    font-size: 10px;
    // overflow-wrap: break-word;
    word-break: normal;
    white-space: normal;
    color: lightgray;
  }
}
@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 600px) {
}
</style>
