<template>
  <div>
    <h1>List {{ autos[0].id}}</h1>
    <span v-for="(auto, index) in autos" :key="index">
      {{ auto.name }}
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "List",
  components: {},
  data() {
    return {
      //
    };
  },
computed: {
    ...mapState(
      'autoStore', ["autos"]
    )
}
};
</script>

<style>
</style>
