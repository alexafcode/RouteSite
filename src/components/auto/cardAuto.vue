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
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "card_auto",
  props: ["auto"],
  components: {},
  data() {
    return {
      //
    };
  },
  computed: {},
  methods: {
    ShortName(name) {
      if (name.length > 185) {
        return name.substr(1, 270) + "...";
      } else
      return name;
    }
  },
};
</script>

<style>
</style>
