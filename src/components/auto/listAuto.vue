<template>
  <v-container>
    <v-flex xs12 md12>
      <v-card>
        <router-link :to="{name: 'cardItem', params: {id: auto.id}}">
          <v-img
            :src="srcImage"
            :alt="auto.imageName"
            max-height="400px"
            max-width="750px"
            aspect-ratio="2.75"
          ></v-img>
        </router-link>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ auto.name }}</h3>
            <div class="autolist_desc">{{ ShortDesc(auto.descriptions) }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            flat
            color="orange"
            v-show="isAuthenticated"
            :to="{name: 'cardItem', params: {id: auto.id}}"
          >Open</v-btn>
          <!-- <v-btn flat color="grey" @click="openDialog" v-show="isAuthenticated">Delete</v-btn> -->
          <!-- ToDO v-for -->
        </v-card-actions>
      </v-card>
    </v-flex>
    <div>
      <v-layout>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Are ure Sure</v-card-title>
            <v-card-text>do you really want to go out?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat="flat" @click.stop.prevent="deleteAuto">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "card_auto",
  props: {
    auto: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {
      dialog: false,
      observer: null,
      intersected: false
    };
  },
  computed: {
    ...mapActions("autoStore", ["DELETE"]),
    ...mapState("user", ["isAuthenticated"]),
    srcImage() {
      if ("IntersectionObserver" in window) {
        return this.intersected ? this.auto.imageUrl : "";
      } else {
        return this.auto.imageUrl;
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
  methods: {
    ShortDesc(text) {
      if (text.length > 185) {
        return text.substr(0, 260) + "...";
      } else return text;
    },
    openDialog() {
      this.dialog = true;
    },
    deleteAuto() {
      this.$emit("updateState");
      this.DELETE.then(() => {
        this.$emit("updateState");
        this.dialog = false;
      });
    }
  }
};
</script>

<style>
.autolist_desc {
  height: 100px;
}
@media screen and (max-width: 760px) {
  .autolist_desc {
    height: 15vh;
    overflow: hidden;
  }
}
</style>
