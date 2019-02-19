<template>
  <v-container>
    <v-card>
      <v-img :src="post.urlToImage ? post.urlToImage : ''" max-height="400px"></v-img>
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
  </v-container>
</template>

<script>
export default {
  name: "newsList",
  props: ["post"],
  components: {},
  data() {
    return {
      show: false
    };
  },
  methods: {},
  directives: {}
};
</script>

<style>
</style>
