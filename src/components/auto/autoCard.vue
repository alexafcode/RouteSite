<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-container fluid>
          <v-layout row>
            <v-text-field label="Search" v-model="searchText"></v-text-field>
            <v-btn fab dark color="brown darken-4" to="/list">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <div id="card_list" v-for="(auto, index) in filterAuto" :key="index">
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
      searchText: null
      //
    };
  },
  computed: {
    ...mapState("autoStore", ["autos"]),
    filterAuto() {
      let autos = this.autos;
      if (this.searchText)
        autos = autos.filter(
          a =>
            a.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            a.descriptions.toLowerCase().includes(this.searchText.toLowerCase())
        );
      return autos;
    }
  }
};
</script>

<style>
</style>
