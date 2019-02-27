<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
      class="home_container"
      :style="{ 'background-image': 'url(' + image + ')' }"
    >
      <v-flex xs12 >
        <div class="display-3 font-weight-black grey--text text-xs-center">Проект</div>
        <div class="text-xs-center">
          <v-btn round large color="brown darken-4" dark>
            <h2>Начать</h2>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "imageGrid",
  components: {},
  data() {
    return {
      image: "https://picsum.photos/700/300?random"
    };
  },
  mounted() {
    // this.startUpdate()
  },
  methods: {
    // startUpdate() {
    //   this.image = ''
    //   this.interval = window.setInterval(() => {
    //     console.log("Interval")
    //     this.image = "https://picsum.photos/800/600?random"
    //   }, 10000)
    // }
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
