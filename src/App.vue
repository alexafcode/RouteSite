<template>
  <v-app>
    <app-header></app-header>
    <!-- <AppHeader></AppHeader> -->
    <v-content transition="slide-x-transition">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
</style>
