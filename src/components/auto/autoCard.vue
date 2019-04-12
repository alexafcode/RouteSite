<template>
  <v-container>
    <v-layout class="card_search">
      <v-flex xs10 offset-sm1>
        <v-layout>
          <v-text-field label="Search" v-model="searchText"></v-text-field>
          <v-btn fab dark color="brown darken-4" v-show="isAuthenticated" to="/list">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-between>
      <!-- <div class="card_list" v-for="(auto, index) in filterAuto" :key="index"> -->
        <div class="card_list" v-for="(auto, index) in pagination" :key="index">
        <listauto :auto="auto" @updateState="initState"></listauto>
      </div>
    </v-layout>
    <v-layout row justify-center>
      <v-btn fab small dark color="brown darken-4" @click="prevPage" :disabled="pageCount > pageNumber">
        <v-icon dark>skip_previous</v-icon>
      </v-btn>
      <div class="display-1 text-xs-center">
        <p>{{ pageNumber }}</p>
        <!-- :class="{ active: isPageActive(page.name) } -->
      </div>
      <v-btn fab small dark color="brown darken-4" @click="nextPage" :disabled="pageCount <= pageNumber">
        <v-icon dark>skip_next</v-icon>
      </v-btn>
    </v-layout>
    <div class="display-1 text-xs-center">
      <p>Всего страниц: {{ pageCount }}</p>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import listauto from "./listAuto.vue";
// import firebase from "firebase/app";

export default {
  name: "autoCard",
  components: {
    listauto
  },
  data() {
    return {
      searchText: null,
      pageNumber: 1,
      size: 4
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
      // const a = this.autos || []
      // return a.slice((this.pageNumber - 1), this.size);
    },
    pagination() {
      // const autos = this.autos || []
      const autos = this.filterAuto
      const pageNumber = this.pageNumber;
      const size = this.size;
      const from = (pageNumber * size) - size; // (1*4) -4 // (2*4) - 4
      const to = (pageNumber * size); // 1*4
      return  autos.slice(from, to);
    },
    pageCount() {
      let l = this.filterAuto.length;
      let s = this.size;
      return Math.ceil(l / s);
    }
  },

  methods: {
    initState() {
      this.LOAD_AUTO;
    },
    nextPage() {
      if (this.pageCount > this.pageNumber)
      this.pageNumber++;
    },
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
      }
    },
    goToPage(page) {
    }
  }
};
</script>
<style lang="scss">
.card_list {
  width: 50%;
}
@media screen and (max-width: 760px) {
  .card_search {
    padding-left: 10vw;
  }
  .card_list {
    width: 100%;
  }
}
</style>

