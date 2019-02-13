<template>
  <div class="nav_category">
    <v-app id="inspire">
      <div class="text-xs-center">
        <v-menu bottom origin="center center" transition="scale-transition">
          <v-btn slot="activator" color="primary" dark left>Scale Transition</v-btn>

          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i" @click="1">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "NewsCategory",
  data() {
    return {
      items: [{ title: "Click Me" }, { title: "Click Me" }]
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
