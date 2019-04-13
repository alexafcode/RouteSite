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
    <v-container>
      <v-layout column class="card_filter">
        <v-flex xs1 offset-sm0 v-for="(factory, index) in manufacturers" :key="index">
          <v-checkbox v-model="checkedFactory" :value="factory" :label="`${factory.toString()}`"></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-between>
        <!-- <div class="card_list" v-for="(auto, index) in filterAuto" :key="index"> -->
        <div class="card_list" v-for="(auto, index) in pagination" :key="index">
          <listauto :auto="auto" @updateState="initState"></listauto>
        </div>
      </v-layout>
    </v-container>
    <v-layout row justify-center>
      <div class="display-1 text-xs-center">
        <p class="pages" @click="pageNumber = 1">Первая</p>
      </div>
      <v-btn fab small dark color="brown darken-4" @click="prevPage" :disabled="pageNumber == 1">
        <v-icon dark>skip_previous</v-icon>
      </v-btn>
      <div class="display-1 text-xs-center" v-for="(page, index) in pages" :key="index">
        <p class="pages" @click="goToPage(page)" :class="{ active: isPageActive(page) }">{{ page }}</p>
        <!--  -->
        <!-- :class="{ active: isPageActive(page.name) } -->
      </div>
      <!-- <p>{{ pageNumber }}</p> -->
      <v-btn
        fab
        small
        dark
        color="brown darken-4"
        @click="nextPage"
        :disabled="pageCount <= pageNumber"
      >
        <v-icon dark>skip_next</v-icon>
      </v-btn>
      <div class="display-1 text-xs-center">
        <p class="pages" @click="pageNumber = pageCount">Последняя</p>
      </div>
    </v-layout>
    <div class="display-1 text-xs-center">
      <p>Всего страниц: {{ pageCount }}</p>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import listauto from "./listAuto.vue";

export default {
  name: "autoCard",
  components: {
    listauto
  },
  data() {
    return {
      searchText: null,
      pageNumber: 1,
      size: 4,
      checkedFactory: []
    };
  },
  created() {
    this.LOAD_AUTO;
  },
  mounted() {},
  computed: {
    ...mapState("autoStore", ["autos"]),
    ...mapState("user", ["isAuthenticated"]),
    ...mapActions("autoStore", ["LOAD_AUTO"]),
    // filterAuto() {
    //   let autos = this.autos;
    //   if (this.searchText)
    //     autos = autos.filter(
    //       a => a.name.toLowerCase().includes(this.searchText.toLowerCase())
    //       // || a.descriptions.toLowerCase().includes(this.searchText.toLowerCase())
    //     );
    //   return autos;
    // },
    filterAuto() {
      let autos = this.autos;
      let filterAuto = [];
      if (this.checkedFactory.length > 0) {
        this.goToFirstPage()
        this.checkedFactory.forEach(r => {
          autos.forEach(a => {
            if (a.manufacturer == r) {
              filterAuto.push(a);
            }
          });
        });
        return filterAuto;
      } else {
        return autos;
      }
    },
    pagination() {
      // const autos = this.autos || []
      const autos = this.filterAuto;
      const pageNumber = this.pageNumber;
      const size = this.size;
      const from = pageNumber * size - size; // (1*4) -4 // (2*4) - 4
      const to = pageNumber * size; // 1*4
      return autos.slice(from, to);
    },
    pageCount() {
      let l = this.filterAuto.length;
      let s = this.size;
      return Math.ceil(l / s);
    },
    manufacturers() {
      let setAuto = new Set();
      this.autos.forEach(a => {
        setAuto.add(a.manufacturer);
      });
      let arrSet = Array.from(setAuto);
      return arrSet;
    },
    //ToDO
    pages() {
      let pages = [];
      pages.push(this.pageNumber > 1 ? this.pageNumber - 1 : "");
      pages.push(this.pageNumber);
      pages.push(this.pageNumber < this.pageCount ? this.pageNumber + 1 : "");
      return pages;
    }
  },

  methods: {
    initState() {
      this.LOAD_AUTO;
    },
    nextPage() {
      if (this.pageCount > this.pageNumber) this.pageNumber++;
    },
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
      }
    },
    goToPage(page) {
      this.pageNumber = page;
    },
    isPageActive(page) {
      if (page == this.pageNumber) return true;
    },
    goToFirstPage() {
      this.pageNumber = 1;
    }
  }
};
</script>
<style lang="scss">
.pages {
  cursor: pointer;
}
.active {
  text-decoration: underline;
}
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

