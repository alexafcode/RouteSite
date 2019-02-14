<template>
  <div class="nav_category">
    <v-container class="nav_category__dropdown" grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-overflow-btn
            :items="items"
            label="Тематика"
            target=".nav_category__dropdown"
          ></v-overflow-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NewsCategory",
  data() {
    return {
      items: ['HiTech', 'All']
    };
  }
};
</script>
<style lang="scss" scoped>
.nav_category {
  .nav_category__dropdown {
    height: 1em;
  }
}
</style>
