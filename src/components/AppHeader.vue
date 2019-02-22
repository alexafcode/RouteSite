<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in menuItemsMobile">
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
      <router-link to="/">
      <v-toolbar-title>{{appTitle}}</v-toolbar-title>
      </router-link>
      <div v-for="(item, index) in menuItems" :key="index">
        <v-btn flat class="hidden-sm-and-down" :to="item.route">{{item.title}}</v-btn>
      </div>
      <!-- <v-btn flat class="hidden-sm-and-down">Menu</v-btn> -->
      <!-- <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-for="(item, index) in items" :key="index">
        <v-icon v-html="item.icon"></v-icon>
        <v-btn flat class="hidden-sm-and-down" :to="item.route">{{item.title}}</v-btn>
      </div>-->
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn
        color="brown lighten-1"
        v-show="!isAuthenticated"
        class="hidden-sm-and-down"
        to="/signin"
      >SignIn</v-btn>
      <v-btn
        color="brown lighten-1"
        v-show="!isAuthenticated"
        class="hidden-sm-and-down"
        to="/signup"
      >SignUp</v-btn>
      <v-btn
        color="brown lighten-1"
        v-show="isAuthenticated"
        class="hidden-sm-and-down"
        @click="openDialog"
      >SignOut</v-btn>
    </v-toolbar>
    <div>
      <v-layout>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Are ure Sure</v-card-title>
            <v-card-text>do you really want to go out?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="signOut">signOut</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AppHeader",
  data() {
    return {
      appTitle: "Router",
      drawer: false,
      dialog: false,
      items: [
        {
          title: "Home",
          route: "/",
          icon: "android"
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
      ],
      items_mobile: [
        {
          title: "Home",
          route: "/",
          icon: "android"
        },
        {
          title: "SignIn",
          route: "/signin",
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
  },
  methods: {
    signOut() {
      this.USER_SIGNOUT;
      this.dialog = false;
    },
    openDialog() {
      this.dialog = true;
    }
  },
  computed: {
    ...mapState("user", ["isAuthenticated"]),
    ...mapActions("user", ["USER_SIGNOUT", "USER_SIGNUP"]),
    menuItems() {
      return this.isAuthenticated
        ? [
            {
              title: "Home",
              route: "/",
              icon: "android"
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
        : [
            {
              title: "Список",
              route: "/autoCard",
              icon: "done"
            }
          ];
    },
    menuItemsMobile() {
      return this.isAuthenticated
        ? [
            {
              title: "Home",
              route: "/",
              icon: "android"
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
            // {
            //   title: "SignOut",
            //   route: "/signOut",
            //   icon: "done"
            // }
          ]
        : [
            {
              title: "SignIn",
              route: "/signin",
              icon: "done"
            },
            {
              title: "SignUp",
              route: "/signup",
              icon: "done"
            },
            {
              title: "Список",
              route: "/autoCard",
              icon: "done"
            }
          ];
    }
  }
};
</script>

<style scoped>
</style>
