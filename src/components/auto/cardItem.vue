<template>
  <v-container>
      <listauto-item :auto="auto"></listauto-item>
  </v-container>
</template>

<script>
import { mapState, mapGetters, } from "vuex";
import listautoItem from "./listAutoItem.vue";


export default {
  name: "autoCard",
  components: {
    listautoItem
  },
  // props: ['id']
  props: {
    'id': {
      type: String,
      required: true
    }
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
     ...mapGetters("autoStore", ["getById"]),
          auto() {
       return this.getById(this.id)
     }
    //  ...mapState("autoStore", ["autos"]),
    //  auto() {
    //    return this.autos.find( a => a.id === this.id)
    //  },
  },
  methods: {
  },

};
</script>

<style>
</style>
