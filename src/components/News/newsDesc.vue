<template>
  <v-slide-y-transition>
    <v-card-text>{{ desc }}</v-card-text>
  </v-slide-y-transition>
</template>

<script>

export default {
  name: "newsDesc",
  props: ["desc"],
  components: {
  },
  data() {
    return {
    };
  }
};
</script>

<style>
</style>
