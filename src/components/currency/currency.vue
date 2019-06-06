<template>
  <div id="app">
    <currency-chart></currency-chart>
  </div>
</template>

<script>
import currencyChart from "./currencyChart.vue";

export default {
  name: "currency",
  components: {
    currencyChart
  },
};
</script>
