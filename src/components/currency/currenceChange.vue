<template>
  <div class="cur__items">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :left="left"
      :direction="direction"
      :open-on-hover="false"
      :transition="transition"
      :fixed="true"
    >
      <v-btn slot="activator" v-model="fab" color="blue darken-4" dark fab small>
        <v-icon>account_balance</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <div v-for="(item, index) in currencyTitle" :key="index">
        <v-btn dark small color="green darken-4" @click.stop.prevent="changeCurrency(item)">{{ item }}</v-btn>
      </div>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: "currencyChange",
  data: () => ({
    direction: "right",
    fab: false,
    fling: false,
    tabs: null,
    top: false,
    left: false,
    transition: "slide-y-reverse-transition",
    currencyTitle: ["USD_RUB", "EUR_RUB"]
  }),
  methods: {
    changeCurrency(item) {
      this.$parent.getCurrency(item);
    }
  }
};
</script>
<style lang="scss" >
.cur_items {
  .v-speed-dial {
    position: absolute;
    z-index: 3;
  }
}
@media screen and (max-width: 560px) {
  .cur__items {
    .v-speed-dial {
      .v-speed-dial__list {
        display: table-header-group;
      }
    }
  }
}
</style>
