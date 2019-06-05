<template>
  <v-layout column class="detail">
    <div class="detail__date">{{ cityItem.date }}</div>
    <div
      class="detail__day-icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.dayIcon}.png`)})`}"
    ></div>
    <div class="detail__day-temp">Днём:</div>
    <div class="detail__day-value">{{ cityItem.tempDay }}</div>
    <div
      class="detail__night-icon"
      :style="{backgroundImage: `url(${require(`@/assets/weather-icons/${cityItem.nightIcon}.png`)})`}"
    ></div>
    <div class="detail__night-temp">Ночью:</div>
    <div class="detail__night-value">{{ cityItem.tempNight }}</div>
    <div class="detail__text">{{ cityItem.dayIconText }}</div>
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
};
</script>
<style lang="scss" scoped>
.detail {
  margin: 5px;
  width: 90px;
  height: 250px;
  min-height: 240px;
  border-radius: 1em;
  text-align: center;
  &:hover {
    transform: scale(1.05);
  }
  .detail__date {
    color: white;
  }
  .detail__day-icon {
    width: 80px;
    height: 50px;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__day-temp {
    color: lightgray;
  }
  .detail__day-value {
    color: white;
    font-weight: 400;
    font-size: 1.5rem;

  }
  .detail__night-icon {
    width: 80px;
    height: 50px;
    min-height: 50px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .detail__night-temp {
    color: lightgray;
  }
  .detail__night-value {
    color: white;
    font-size: 1rem;
    font-weight: 400;
  }
  .detail__text {
    font-size: 0.75rem;
    word-break: normal;
    color: lightgray;
    white-space: normal;
  }
}
@media screen and (max-width: 800px) {
  .detail {
    width: 16vw;
    .detail__date {
      color: white;
      font-size: 3vw;
    }
    .detail__day-icon {
      width: 15vw;
    }
    .detail__day-value {
      font-size: 1.25rem;
    }
    .detail__night-icon {
      width: 15vw;
      display: none;
    }
    .detail__text {
      word-break: break-all;
      font-size: 3vw;
    }
  }
}
</style>
