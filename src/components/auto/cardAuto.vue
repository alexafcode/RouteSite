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
            <div>{{ ShortName(auto.descriptions) }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange" @click="openDialog">Delete</v-btn>
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
              <v-btn color="green darken-1" flat="flat" @click="deleteAuto">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "card_auto",
  props: ["auto"],
  components: {},
  data() {
    return {
      dialog: false
      //
    };
  },
  computed: {
    ...mapActions("autoStore", ["DELETE"]),
  },
  methods: {
    ShortName(name) {
      if (name.length > 185) {
        return name.substr(0, 270) + "...";
      } else return name;
    },
    openDialog() {
      console.log(this)
      this.dialog = true;
    },
    deleteAuto() {
      console.log(this.auto.id);
      this.DELETE.then(r => {
        console.log(r);
        this.dialog = false;
        // ToDo update state or page
      });
    }
  }
};
</script>

<style>
</style>
