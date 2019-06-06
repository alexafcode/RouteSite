<template>
  <v-slide-y-transition>
    <v-card-text>{{ desc }}</v-card-text>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: "newsDesc",
  props: {
    desc: {
      type: String,
      required: true
    }
  },
};
</script>
