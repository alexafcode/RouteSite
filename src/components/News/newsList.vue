<template>
  <v-container>
    <v-card>
      <v-img :src="srcImage" max-height="400px"></v-img>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ post.title }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="purple" :href="post.url">К Новости</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <!-- <slot>
        <v-slide-y-transition>
          <v-card-text v-show="show">{{ post.description }}</v-card-text>
        </v-slide-y-transition>
      </slot>-->
      <newsdescription :desc="post.description" v-if="show"></newsdescription>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "newsList",
  // props: ["post"],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: {
    newsdescription: () => import("./newsDesc.vue")
  },
  data() {
    return {
      show: false,
      observer: null,
      intersected: false
    };
  },
  computed: {
    srcImage() {
      if ("IntersectionObserver" in window) {
        return this.intersected ? this.post.urlToImage : "";
      } else {
        return this.post.urlToImage;
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.intersected = true;
        this.observer.disconnect();
      }
    });
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {},
  directives: {}
};
</script>

<style>
</style>
