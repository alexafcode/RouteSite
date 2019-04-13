<template>
  <v-container>
    <v-layout column class="card_filter">
      <v-flex xs1 offset-sm0 v-for="(factory, index) in manufacturers" :key="index">
        <v-checkbox v-model="checkedFactory" :value="factory" :label="`${factory.toString()}`"></v-checkbox>
      </v-flex>
      <div class="text-xs-left">
        <v-btn round color="primary" dark @click.prevent="resetFilter">Сбросить</v-btn>
      </div>
    </v-layout>
    <v-container>
      <v-layout class="card_add">
        <!-- <v-text-field label="Search" v-model="searchText"></v-text-field> -->
        <v-btn fab dark color="brown darken-4" v-show="isAuthenticated" to="/list">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-layout>
      <v-container>
        <v-layout row wrap justify-space-between>
          <!-- <div class="card_list" v-for="(auto, index) in filterAuto" :key="index"> -->
          <div class="card_list" v-for="(auto, index) in pagination" :key="index">
            <listauto :auto="auto" @updateState="initState"></listauto>
          </div>
        </v-layout>
      </v-container>
      <v-layout row justify-center>
        <div class="display-1 text-xs-center">
          <p class="pages" @click="pageNumber = 1">Start</p>
        </div>
        <div class="text-xs-center">
          <v-pagination v-model="pageNumber" :length="3" :total-visible="5" circle></v-pagination>
        </div>
        <div class="display-1 text-xs-center">
          <p class="pages" @click="pageNumber = pageCount">End</p>
        </div>
      </v-layout>
      <div class="display-1 text-xs-center">
        <p>Всего страниц: {{ pageCount }}</p>
      </div>
    </v-container>
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
    filterAuto() {
      let autos = this.autos;
      let filterAuto = [];
      if (this.checkedFactory.length > 0) {
        this.goToFirstPage();
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
    goToFirstPage() {
      this.pageNumber = 1;
    },
    resetFilter() {
      this.checkedFactory = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.card_filter {
  position: absolute;
  left: 1%;
  top: 12%;
}
.card_add {
  position: absolute;
  left: 1%;
  top: 1%;
}

.card_list {
  width: 50%;
}
@media screen and (max-width: 1024px) {
  .card_filter {
    flex-direction: row;
    position: relative;
    flex-wrap: wrap;
  }
  .card_list {
    width: 100%;
  }
  .card_add {
    position: absolute;
    left: -1vw;
    top: 19vh;
  }
}
</style>

