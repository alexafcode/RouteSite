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
          <!-- ToDo Spacer -->
          <autoComment :comments="auto.comment" :id="auto.id"></autoComment>
        </v-card-title>
        <v-divider class="black"/>
        <v-card-actions>
          <v-divider dark></v-divider>
          <v-rating :value="auto.rating" color="amber" dense half-increments readonly size="14"></v-rating>
          <span class="grey--text text--darken-4">({{ auto.rating ? auto.rating : "NO" }})</span>
        </v-card-actions>
        <v-card-actions>
          <!-- <v-btn flat color="grey" @click="openDialog" v-show="isAuthenticated">Delete</v-btn> -->
          <!-- <v-btn flat color="grey" @click="openDialog" v-if="user.emailVerified != null && user.emailVerified != false">Delete</v-btn> -->
          <v-btn flat color="orange" to="/autoCard">To List Cars</v-btn>
          <v-spacer></v-spacer>
          <span class="favorite_text">Favorite</span>
          <v-btn icon flat fab v-if="!favorite">
            <v-icon @click="addFavAuto">favorite_border</v-icon>
          </v-btn>
          <v-btn color="teal" flat fab v-if="favorite">
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="grey" @click="openDialog" v-if="user.emailVerified">Delete</v-btn>
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
import autoComment from "./listComments";
export default {
  name: "list-auto",
  props: {
    auto: {
      type: Object,
      required: true
    }
  },
  components: {
    autoComment
  },
  data() {
    return {
      dialog: false,
      comment: "",
      favorite: false
    };
  },
  computed: {
    ...mapActions("autoStore", ["DELETE", "ADD_COMMENT"]),
    ...mapActions("userDataDb", [
      "ADD_FAVORITE_AUTO",
      "LOAD_ADD_FAVORITE_AUTO"
    ]),
    ...mapState("user", ["isAuthenticated", "user"]),
    ...mapState("userDataDb", ["favoriteAuto"]),
  },
  mounted() {
    this.isFavoriteAuto();
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
    addFavAuto() {
      this.favorite = true;
      this.ADD_FAVORITE_AUTO;
    },
    isFavoriteAuto() {
      this.LOAD_ADD_FAVORITE_AUTO.then(res => {
        if (res)
          res.auto.forEach(auto => {
            if (auto.name.includes(this.auto.name)) {
              this.favorite = true;
            }
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .favorite_text {
    display: none;
  }
}
</style>
