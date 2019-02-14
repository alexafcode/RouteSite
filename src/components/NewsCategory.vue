<template>
  <div class="nav_category">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      :fixed="true"
    >
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="green">
        <v-icon @click.stop="changeCategory">edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon @click.stop="changeCategory">add</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon @click.stop="changeCategory">add</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: "NewsCategory",
  data: () => ({
    direction: "right",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    left: false,
    transition: "slide-y-reverse-transition"
  }),
  methods: {
    // Link() {
    //   this.$parent.$options.methods.testData()
    // },
    changeCategory() {
      console.log("Категории")
      this.$emit('change_category')
    }
  }

  // computed: {
  //   activeFab() {

  //   }
  // },
  // watch: {
  //   top(val) {
  //     this.bottom = !val;
  //   },
  //   right(val) {
  //     this.left = !val;
  //   },
  //   bottom(val) {
  //     this.top = !val;
  //   },
  //   left(val) {
  //     this.right = !val;
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.nav_category {
  .v-speed-dial {
    position: absolute;
  }
}
</style>
