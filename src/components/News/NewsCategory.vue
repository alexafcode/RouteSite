<template>
  <div class="category">
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
        <v-icon>dashboard</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="green">
        <v-icon @click.stop.prevent="changeCategory(category.all)">360</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon @click.stop.prevent="changeCategory(category.sport)">directions_bike</v-icon>
      </v-btn>
      <v-btn fab dark small color="brown">
        <v-icon @click.stop.prevent="changeCategory(category.health)">favorite</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue">
        <v-icon @click.stop.prevent="changeCategory(category.tech)">android</v-icon>
      </v-btn>
      <v-btn fab dark small color="yellow">
        <v-icon @click.stop.prevent="changeCategory(category.business)">perm_phone_msg</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon @click.stop.prevent="changeCategory(category.ent)">record_voice_over</v-icon>
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
      this.$emit("change_category", category);
    }
  }
};
</script>
<style lang="scss" >
.category {
  .v-speed-dial {
    position: absolute;
  }
}
@media screen and (max-width: 560px) {
  .category {
    .v-speed-dial {
      .v-speed-dial__list {
      display: table-header-group;
      }
    }
  }
}
</style>
