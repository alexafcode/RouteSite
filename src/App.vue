<template>
  <v-app>
    <app-header></app-header>
    <v-content transition="slide-x-transition">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
// .fade-enter {
//   opacity: 0;
// }

// .fade-enter-active {
//   transition: opacity 0.4s ease;
// }

// .fade-leave {
// }

// .fade-leave-active {
//   transition: opacity 0.4s ease;
//   opacity: 0;
// }
</style>

