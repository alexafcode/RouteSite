<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
      class="home"
      :style="{ 'background-image': 'url(' + isMobile + ')' }"
    >
      <v-flex xs12>
        <!-- <div
          class="display-3 font-weight-black grey--text text-xs-center"
          v-show="isAuthenticated"
        >Проект</div>-->
        <div class="display-2 font-weight-black text-xs-center" v-show="!isAuthenticated">
          <p>To continue</p>
          <p>you need to register</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "imageGrid",
  data() {
    return {
      // image: "https://picsum.photos/700/300?random"
    };
  },
  computed: {
    ...mapState("user", ["isAuthenticated"]),
    isMobile() {
      let userAgent = navigator.userAgent || navigator.vendor || window.opera;
      let mql = window.matchMedia("(orientation: portrait)");
      if (/android|iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {
        if (mql.matches) {
          return "https://picsum.photos/200/320?random";
        } else {
          return "https://picsum.photos/400/200?random";
        }
      }
      // return "https://picsum.photos/700/300?random";
      return "https://picsum.photos/1000/500?random";
    }
  },
  methods: {
    listenerOrientation() {
      let mql = window.matchMedia("(orientation: portrait)");
      mql.addListener(m => {
        if (m.matches) {
          // console.log("Изменено на портретный");
        } else {
          // console.log("Изменено на горизонтальный режим");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  background-size: cover;
  transition: 1s;
  &:hover {
    transform: scale(1.1);
  }
  p {
    mix-blend-mode: color-dodge;
    font-family: Candara;
    font-size: 5rem;
    color: rgb(208, 170, 156);
  }
}
</style>
