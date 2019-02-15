<template>
  <div class="nav_category">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :left="left"
      :direction="direction"
      :open-on-hover="true"
      :transition="transition"
      :fixed="true"
    >
      <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="green">
        <v-icon @click.stop="changeCategory(category.all)">360</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon @click.stop="changeCategory(category.sport)">directions_bike</v-icon>
      </v-btn>
      <v-btn fab dark small color="brown">
        <v-icon @click.stop="changeCategory(category.health)">favorite</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue">
        <v-icon @click.stop="changeCategory(category.tech)">android</v-icon>
      </v-btn>
      <v-btn fab dark small color="yellow">
        <v-icon @click.stop="changeCategory(category.business)">perm_phone_msg</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon @click.stop="changeCategory(category.ent)">record_voice_over</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: "NewsCategory",
  data: () => ({
    direction: "right",
    fab: false,
    fling: false,
    tabs: null,
    top: false,
    left: false,
    transition: "slide-y-reverse-transition",
    category: {
      all: "",
      sport: "sports",
      health: "health",
      science: "science",
      tech: "technology",
      business: "business",
      ent: "entertainment"
    }
  }),
  methods: {
    changeCategory(category) {
      // console.log(category);
      this.$emit("change_category", category);
    }
  }
};
</script>
<style lang="scss" >
.nav_category {
  .v-speed-dial {
    position: absolute;
  }
}
@media screen and (max-width: 560px) {
  .nav_category {
    .v-speed-dial {
      .v-speed-dial__list {
      display: table-header-group;
      }
    }
  }
}
</style>
