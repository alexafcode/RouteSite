<template>
    <div class="news">
      <news-category @change_category="getNews" v-show="!category_show"></news-category>
      <loading v-show="loading"></loading>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-btn
            icon
            large
            class="button_top"
            color="brown darken-1"
            v-scroll="scrollInitButton"
            v-show="scroll_show"
            @click="scrollTop"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
          <v-flex xs12 sm8 offset-sm2 v-for="(post, index) in news" :key="index">
            <news-list :post="post"></news-list>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>
import axios from "axios";
import Loading from "@/views/loading.vue";
import NewsCategory from "./NewsCategory.vue";
import newsList from "./newsList.vue";
import key from '../../store/keys.js'

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
      API_KEY: key.news,
      news: [],
      loading: true,
      scroll_show: false,
      category_show: false
    };
  },
  created() {
    this.getNews("");
  },
  methods: {
    getNews(category) {
      this.news = [];
      this.loading = true;
      const url = `https://newsapi.org/v2/top-headlines?country=ru&category=${category}&apiKey=`;
      axios
        .get(`${url}${this.API_KEY}`)
        .then(response => {
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
      const f = function(evt) {
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
