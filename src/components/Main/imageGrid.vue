<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
      class="home_container"
      :style="{ 'background-image': 'url(' + image + ')' }"
    >
      <v-flex xs12>
        <div class="display-4 font-weight-black grey--text text-xs-center">Проект</div>
<div class="text-xs-center">
    <v-btn round color="brown darken-4" dark>Начать</v-btn>
  </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import loading from "@/views/loading.vue";
export default {
  name: "imageGrid",
  components: {
    loading
  },
  data() {
    return {
      image: "https://picsum.photos/800/600?random"
    };
  }
};
</script>
<style lang="scss" scoped>
.home_container {
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
