<template>
  <div>
    <h1 @click.prevent="initState">List {{ autos[0].id}}</h1>
    <!-- <h1 @click.prevent="addAuto"> {{ autos[0].id}}</h1> -->
    <h1 @click.prevent="addLS"> {{ autos[0].name}}</h1>
    <h1>ID {{ getID }}</h1>
    <span v-for="(auto, index) in autos" :key="index">
      {{ auto.name }}
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters   } from 'vuex';

export default {
  name: "List",
  components: {},
  data() {
    return {
      auto: { id: 3, name: 'FORD'},
      id: 3

      //
    };
  },
computed: {
    ...mapState(
      'autoStore', ["autos"]
    ),
    ...mapGetters(
      'autoStore', ["getById"]
    ),
    getID() {
      return this.getById(this.id)
    }
},
methods: {
  ...mapMutations(
      'autoStore', ['ADD_AUTOS', 'ADD_LS', 'INIT_STATE']
    ),
    addAuto() {
      this.ADD_AUTOS(this.auto)
    },
    addLS() {
      this.ADD_LS(this.auto)
    },
    initState() {
      this.INIT_STATE
      console.log(this.autos)
    }
}
};
</script>

<style>
</style>
