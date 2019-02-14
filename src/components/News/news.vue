<template>
  <div id="app" >
    <div id="news_container">
      <news-category @change_category="getNews"></news-category>
      <loading v-show="loading"></loading>
      <v-container grid-list-lg>
      <v-layout row wrap >
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
            <v-slide-y-transition>
              <v-card-text v-show="show">{{ post.description }}</v-card-text>
            </v-slide-y-transition>
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
import NewsCategory from './NewsCategory.vue';

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
      loading: true
    };
  },
  created() {
    this.getNews("");
  },
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
  }
};
</script>

 <style lang="scss" scoped>
</style>
