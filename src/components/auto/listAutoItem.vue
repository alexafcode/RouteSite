<template>
  <v-container>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-img
          :src="auto.imageUrl ? auto.imageUrl : ''"
          :alt="auto.imageName"
          max-height="400px"
          max-width="750px"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ auto.name }}</h3>
            <div>{{ auto.descriptions }}</div>
          </div>
          <v-layout column>
            <div class="comment" v-for="item in auto.comment" :key="item">
              <v-list-tile>
                <li>{{ item }}</li>
              </v-list-tile>
            </div>
          </v-layout>
          <!-- <v-spacer></v-spacer> -->
        </v-card-title>
        <v-divider class="black"/>
        <div class="text-xs-right">
          <v-rating :value="auto.rating" color="amber" dense half-increments readonly size="14"></v-rating>
          <div class="ml-2 grey--text text--darken-4">
            <span>{{ auto.rating ? auto.rating : "NO" }}</span>
          </div>
        </div>
        <v-card-actions>
          <v-btn flat color="grey" @click="openDialog" v-show="isAuthenticated">Delete</v-btn>
          <v-btn flat color="grey" @click="addComment" v-show="isAuthenticated">Comment</v-btn>
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
      comments: ["LaLaLa", "LuLuLu", "LiLiLi"]
    };
  },
  computed: {
    ...mapActions("autoStore", ["DELETE", "CHANGE"]),
    ...mapState("user", ["isAuthenticated"])
  },
  methods: {
    ShortName(text) {
      if (text.length > 185) {
        return text.substr(0, 270) + "...";
      } else return text;
    },
    openDialog() {
      this.dialog = true;
    },
    deleteAuto() {
      this.DELETE.then(() => {
        this.dialog = false;
        this.$router.push("/autoCard");
      });
    },
    addComment() {
      console.log(this.auto);
      // this.CHANGE;
    }
  }
};
</script>

<style>
</style>
