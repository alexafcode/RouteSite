<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index" :to="item.route">
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="brown darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-sm-and-up"></v-spacer>
      <v-toolbar-title>{{appTitle}}</v-toolbar-title>
      <div v-for="(item, index) in items" :key="index">
        <v-btn flat class="hidden-sm-and-down" :to="item.route">{{item.title}}</v-btn>
      </div>
      <!-- <v-btn flat class="hidden-sm-and-down">Menu</v-btn> -->
      <!-- <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-for="(item, index) in items" :key="index">
        <v-icon v-html="item.icon"></v-icon>
        <v-btn flat class="hidden-sm-and-down" :to="item.route">{{item.title}}</v-btn>
      </div>-->
      <!-- <v-btn color="brown lighten-3" class="hidden-sm-and-down">JOIN</v-btn> -->
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      appTitle: "Router",
      drawer: false,
      items: [
        {
          title: "Home",
          route: "/",
          icon: "android"
        },
        {
          title: "Создать",
          route: "/list",
          icon: "done"
        },
                {
          title: "Список",
          route: "/autoCard",
          icon: "done"
        },
        {
          title: "Новости",
          route: "/news",
          icon: "done"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
