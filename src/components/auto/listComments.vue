<template>
  <v-layout column>
    <div class="mt-2" v-for="(item, index) in commentLocal" :key="index">
      <v-list-tile>
        <li>{{ item }}</li>
      </v-list-tile>
    </div>
    <v-layout row>
      <v-flex xs10 md8>
        <v-textarea
          name="input"
          label="Add Commentt"
          v-model="comment"
          hint="Введите текст"
        >{{ comment }}</v-textarea>
      </v-flex>
      <v-btn fab small dark color="brown darken-4" @click="addComment">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "card_auto",
  props: {
    comments: {
      type: Array
    },
    id: {
      type: String
    }
  },
  components: {},
  data() {
    return {
      comment: "",
      commentLocal: this.comments
    };
  },
  computed: {
    ...mapActions("autoStore", ["ADD_COMMENT"])
  },
  methods: {
    addComment() {
      if (this.comment !== "") {
        if (this.comments === undefined) {
          this.comments = [];
        }
        this.comments.push(this.comment);
        this.ADD_COMMENT;
        this.comment = "";
      }
    }
  }
};
</script>
