<template>
  <div class="text-xs-center">
    <v-progress-circular
      class="circular"
      :size="80"
      :width="8"
      color="brown darken-4"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loading",
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss" scoped>
.text-xs-center {
  .circular {
    z-index: 99999;
    position: fixed;
    margin-top: 25%;
  }
}
</style>
