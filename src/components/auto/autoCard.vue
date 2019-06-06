<template>
  <v-container fluid>
    <loading v-show="!show"></loading>
    <v-layout row>
      <v-flex xs2 v-show="show" class="card__menu">
        <v-layout class="card__add">
          <!-- <v-text-field label="Search" v-model="searchText"></v-text-field> -->
          <v-btn fab dark color="brown darken-4" v-show="isAuthenticated" to="/list">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-layout>
        <v-layout class="card__filter">
          <v-flex xs1 offset-sm0 v-for="(factory, index) in manufacturers" :key="index">
            <v-checkbox v-model="checkedFactory" :value="factory" :label="`${factory.toString()}`"></v-checkbox>
          </v-flex>
          <div class="text-xs-left">
            <v-btn round color="primary" dark @click.prevent="resetFilter">Сбросить</v-btn>
          </div>
        </v-layout>
        <div class="card__select">
          <p>Показывать по:</p>
          <div class="card__select-input">
            <v-select v-model="size" :items="select" label="Select" return-object single-line></v-select>
          </div>
        </div>
      </v-flex>
      <div v-show="show">
        <v-flex xs11>
          <v-layout row wrap justify-space-between>
            <div class="card__list" v-for="(auto, index) in pagination" :key="index">
              <listauto :auto="auto" @updateState="initState"></listauto>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12 md12 class="card__pagination">
          <v-layout row justify-center>
            <div class="text-xs-center">
              <v-btn flat class="pages" @click="pageNumber = 1">Start</v-btn>
            </div>
            <div class="text-xs-center">
              <v-pagination
                @input="scrollTop"
                v-model="pageNumber"
                :length="pageCount"
                :total-visible="5"
                circle
              ></v-pagination>
            </div>
            <div class="text-xs-center">
              <v-btn flat class="pages" @click="pageNumber = pageCount">End</v-btn>
            </div>
          </v-layout>
          <div class="text-xs-center">
            <p>
              Всего страниц:
              <b>{{ pageCount }}</b>
            </p>
          </div>
        </v-flex>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import listauto from "./listAuto.vue";
import loading from "../../views/loading.vue";

export default {
  name: "autoCard",
  components: {
    listauto,
    loading
  },
  data() {
    return {
      searchText: null,
      pageNumber: 1,
      size: 4,
      checkedFactory: [],
      show: false,
      select: [4, 6, 8]
    };
  },
  created() {
    this.LOAD_AUTO.then(() => {
      this.show = true;
    });
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
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.card__filter {
  flex-direction: column;
}
.card__select {
  margin-top: 10%;
  .card__select-input {
    width: 30%;
  }
}

.pages {
  font-size: 18px; //em
  font-weight: 600;
}
.card__list {
  width: 50%;
}
@media screen and (max-width: 1024px) {
  .card__menu {
    display: none;
    .card__filter {
      flex-direction: row;
    }
  }

  .card__list {
    width: 90%;
  }
  .card__pagination {
    .pages {
      display: none;
    }
  }
}
</style>

