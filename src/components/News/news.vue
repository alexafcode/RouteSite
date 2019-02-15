<template>
  <div id="app">
    <div id="news_container">
      <news-category @change_category="getNews" v-show="!category_show"></news-category>
      <loading v-show="loading"></loading>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-btn
            icon
            class="button_top"
            color="brown darken-1"
            v-scroll="scrollInitButton"
            v-show="scroll_show"
            @click="scrollTop"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <news-list :news="news"></news-list>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/views/loading.vue";
import NewsCategory from "./NewsCategory.vue";
import newsList from "./newsList.vue";

export default {
  name: "List",
  components: {
    NewsCategory,
    Loading,
    newsList
  },
  data() {
    return {
      show: false,
      errors: [],
      API_KEY: "",
      news: [],
      loading: true,
      scroll_show: false,
      category_show: false
    };
  },
  created() {
    this.getNews("");
  },
  computed: {},
  watch: {},
  methods: {
    getNews(category) {
      this.news = [];
      this.loading = true;
      let url = `https://newsapi.org/v2/top-headlines?country=ru&category=${category}&apiKey=`;
      axios
        .get(`${url}${this.API_KEY}`)
        .then(response => {
          // console.log(response.data.articles);
          this.news = response.data.articles;
          if (response) this.loading = false;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    scrollInitButton() {
      window.pageYOffset <= 0
        ? (this.category_show = false)
        : (this.category_show = true);
      window.pageYOffset > 350
        ? (this.scroll_show = true)
        : (this.scroll_show = false);
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  directives: {
    inserted: function(el, binding) {
      let f = function(evt) {
        if (binding.value(evt, el)) {
          window.removeEventListener("scroll", f);
        }
      };
      window.addEventListener("scroll", f);
    }
  }
};
</script>

 <style lang="scss" scoped>
.button_top {
  left: 0;
  bottom: 0;
  z-index: 9;
  position: fixed;
  margin-bottom: 10%;
}

@media screen and (max-width: 560px) {
  .button_top {
    bottom: initial !important;
    left: 0;
    z-index: 9;
    position: fixed;
  }
}
</style>
