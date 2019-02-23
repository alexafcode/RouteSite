<template>
  <v-container>
    <v-btn color="green darken-1" flat="flat" @click="initState">Update</v-btn>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-container fluid>
          <v-layout row>
            <v-text-field label="Search" v-model="searchText"></v-text-field>
            <v-btn fab dark color="brown darken-4" to="/list">
            <!-- <v-btn fab dark color="brown darken-4" @click="initState"> -->
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <div id="card_list" v-for="(auto, index) in filterAuto" :key="index">
      <cardauto :auto="auto"  @updateState="initState"></cardauto>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import cardauto from "./cardAuto.vue";
import firebase from 'firebase/app';


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
  mounted() {
    this.LOAD_AUTO
  },
  computed: {
     ...mapState("autoStore", ["autos"]),
     // ...mapGetters("autoStore",['LOAD_AUTO']),
      ...mapActions("autoStore",['LOAD_AUTO']),
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
  },

  methods: {
        // ...mapMutations("autoStore", ["ADD_LS", "INIT_STATE"]),
    initState() {
      this.LOAD_AUTO
    },
  },

};
</script>

<style>
</style>
