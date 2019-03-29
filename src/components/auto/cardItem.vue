<template>
  <v-container v-if="dataReady">
    <listauto-item :auto="auto"></listauto-item>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import listautoItem from "./listAutoItem.vue";

export default {
  name: "autoCard",
  components: {
    listautoItem
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dataReady: false
    };
  },
  mounted() {
    this.LOAD_AUTO.then(r => {
      this.dataReady = true;
    });
  },
  computed: {
    ...mapActions("autoStore", ["LOAD_AUTO"]),
    ...mapGetters("autoStore", ["getById"]),
    auto() {
      return this.getById(this.id);
    }
    //  ...mapState("autoStore", ["autos"]),
    //  auto() {
    //    return this.autos.find( a => a.id === this.id)
    //  },
  },
  methods: {}
};
</script>

<style>
</style>
