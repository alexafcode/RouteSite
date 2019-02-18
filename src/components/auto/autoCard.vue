<template>
<v-container>
<div id="card_list" v-for="(auto, index) in autos" :key="index">
  <cardauto :auto="auto"></cardauto>
</div>
</v-container>
</template>

<script>
import { mapState } from "vuex";
import cardauto from "./cardAuto.vue";


export default {
  name: "autoCard",
  components: {
    cardauto
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState("autoStore", ["autos"])
  }
};
</script>

<style>
</style>
