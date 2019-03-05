<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-container fluid>
          <v-layout row>
            <v-text-field label="Search" v-model="searchText"></v-text-field>
            <v-btn fab dark color="brown darken-4" v-show="isAuthenticated" to="/list">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <div id="card_list" v-for="(auto, index) in filterAuto" :key="index">
      <listauto :auto="auto" @updateState="initState"></listauto>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import listauto from "./listAuto.vue";
import firebase from "firebase/app";

export default {
  name: "autoCard",
  components: {
    listauto
  },
  data() {
    return {
      searchText: null
    };
  },
  mounted() {
    this.LOAD_AUTO;
  },
  computed: {
    ...mapState("autoStore", ["autos"]),
    ...mapState("user", ["isAuthenticated"]),
    ...mapActions("autoStore", ["LOAD_AUTO"]),
    filterAuto() {
      let autos = this.autos;
      if (this.searchText)
        autos = autos.filter(
          a => a.name.toLowerCase().includes(this.searchText.toLowerCase())
          // || a.descriptions.toLowerCase().includes(this.searchText.toLowerCase())
        );
      return autos;
    }
  },

  methods: {
    initState() {
      this.LOAD_AUTO;
    }
  }
};
</script>

<style>
</style>
