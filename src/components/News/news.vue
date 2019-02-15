<template>
  <div id="app">
    <div id="news_container">
      <news-category @change_category="getNews" v-show="!scroll_show"></news-category>
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
          <v-flex xs12 sm6 offset-sm3 v-for="(post, index) in news" :key="index">
            <v-card>
              <v-img :src="post.urlToImage" max-height="300px"></v-img>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ post.title }}</div>
                  <!-- <span class="grey--text">1,000 miles of wonder</span> -->
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="purple" :href="post.url">К Новости</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <slot>
                <v-slide-y-transition>
                  <v-card-text v-show="show">{{ post.description }}</v-card-text>
                </v-slide-y-transition>
              </slot>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/views/loading.vue";
import NewsCategory from "./NewsCategory.vue";

export default {
  name: "List",
  components: {
    NewsCategory,
    Loading
  },
  data() {
    return {
      show: false,
      errors: [],
      API_KEY: "",
      news: [],
      loading: true,
      scroll_show: false
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
          console.log(response.data.articles);
          this.news = response.data.articles;
          if (response) this.loading = false;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    scrollInitButton() {
      console.log(window.pageYOffset);
      window.pageYOffset != 0
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
  z-index: 9;
  position: fixed;
}
</style>
