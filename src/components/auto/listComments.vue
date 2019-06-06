<template>
  <v-layout column>
    <div class="mt-2" v-for="(item, index) in commentLocal" :key="index">
      <v-list-tile-sub-title class="user">{{ item.name }}</v-list-tile-sub-title>
      <v-list-tile>
        <v-list-tile-sub-title class="text--primary comment">{{ item.comment }}</v-list-tile-sub-title>
      </v-list-tile>
      <v-divider/>
    </div>
    <v-layout row>
      <v-flex xs10 md8>
        <v-textarea
          name="input"
          label="Add Comment"
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
import { mapActions, mapState } from "vuex";
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
  data() {
    return {
      comment: "",
      commentLocal: this.comments
    };
  },
  computed: {
    ...mapActions("autoStore", ["ADD_COMMENT"]),
    ...mapState("user", ["user"])
  },
  methods: {
    addComment() {
      if (this.comment !== "") {
        if (this.commentLocal === undefined) {
          this.commentLocal = [];
        }
        let obj = {
          name: this.user.displayName ? this.user.displayName : this.user.email,
          comment: this.comment
        };
        this.commentLocal.push(obj);
        this.ADD_COMMENT;
        this.comment = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  font-size: 12px;
  color: #c5c5c5;
}
</style>

