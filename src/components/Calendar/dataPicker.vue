<template>
  <div class="date">
    <div class="datapicker">
      <v-btn
        v-click-outside
        fab
        small
        dark
        color="brown darken-4"
        @click="datapicker = !datapicker"
      >
        <v-icon>date_range</v-icon>
      </v-btn>
      <transition name="fade">
      <v-date-picker
        v-if="datapicker"
        class="date__input"
        ref="date"
        v-model="picker"
        width="210"
        :first-day-of-week="1"
        color="brown darken-4"
      ></v-date-picker>
      </transition>
    </div>
    <div class="date__title">{{ NameMonth }} - {{ year }}</div>
  </div>
</template>
<script>

import names from "./constNames";
export default {
  name: "dataPicker",
  props: {
    month: {
      type: Number
    },
    year: {
      type: Number
    }
  },
  data: () => ({
    datapicker: false,
    monthName: names.monthName
  }),
  computed: {
    picker: {
      get() {
        let dateLocal = new Date(this.year, this.month);
        return `${dateLocal.getFullYear()}-${dateLocal.getMonth() + 1}`
      },
      set(val) {
        this.$emit("changeData", val);
      }
    },
    NameMonth() {
      return this.monthName[this.month].toUpperCase();
    }
  },
  methods: {
    hideDiv() {
      this.datapicker = false;
    }
  },
  directives: {
    ClickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = event => {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context.hideDiv();
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.date {
  display: flex;
  margin-top: 10px;
  align-items: center;
  flex-direction: column;

  &__title {
    font-size: 20px;
    padding-top: 20px;
    color: darkcyan;
    font-family: cursive;
  }
  .datapicker {
    .date__input {
      position: absolute;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 760px) {
  .date__title {
    display: none;
  }
}
</style>

