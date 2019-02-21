<template>
  <span>
    <image-grid></image-grid>
  </span>
</template>

<script>
import imageGrid from "../components/Main/imageGrid.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    imageGrid
  },
  data() {
    return {

    }
  },
  created() {
    this.auth()
  },
  computed: {
    ...mapGetters("user",['isAuthenticated']),
  },
  methods: {
    auth() {
      console.log(this.isAuthenticated)
      return this.isAuthenticated
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

