<template>
<v-expand-transition>
  <v-list class="lighten-3 search-list">
    <v-list-tile v-for="(item, i) in items" :key="i">
      <v-list-tile-content class="search-list__item" @click="selectItem(item)">
        <v-list-tile-title v-text="item.city"></v-list-tile-title>
        <v-list-tile-sub-title v-text="item.country"></v-list-tile-sub-title>
        <v-divider inset></v-divider>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  </v-expand-transition>
</template>
<script>
export default {
  name: "search-list",
  components: {},
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('selectItem', item)
    }
  }
};
</script>
<style lang="scss" scoped>
.search-list {
  cursor: pointer;
  position: absolute;
  max-height: 55vh;
  margin-top: 3.5rem;
  overflow: auto;
  width: 30%;
  z-index: 1;
}
@media screen and (max-width: 800px) {
  .search-list {
    width: 55%;
  }

}
</style>
