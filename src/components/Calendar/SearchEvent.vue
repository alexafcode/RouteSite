<template>
  <div class="search" v-click-outside v-on:keypress="searchEvent">
    <div class="container_search">
      <v-text-field
        id="nav_seach"
        type="text"
        autocomplete="off"
        placeholder="Search"
        v-model="text_search"
      />
    </div>
    <div class="search_result">
      <div
        v-show="search_panel"
        class="search_result_list"
        v-for="(search, index) in search_result"
        :key="index"
      >
        <li>{{ search }}</li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchEvent",
  props: {
    days: {
      type: Array
    }
  },
  data: () => ({
    text_search: "",
    search_panel: false,
    search_result: []
  }),
  methods: {
    searchEvent() {
      this.search_result = [];
      let filter = this.text_search.toUpperCase();
      let arr = [];
      if (localStorage.getItem("message") != null) {
        arr = JSON.parse(localStorage.getItem("message"));
      }
      if (this.text_search != "") {
        arr.forEach(el => {
            if (el.message.toUpperCase().includes(filter)) {
              this.search_result.push(el.message); // el.day + el.month + el.message
              this.search_panel = true;
            }
        });
      }
    },
    hideDiv() {
      this.search_panel = false;
      this.search_result = [];
      this.text_search = "";
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
<style scoped lang="scss">
.search {
  padding-top: 1%;
  .search_result {
    max-height: 150px;
    width: 13%;
    overflow: auto;
    border-radius: 5px;
    position: absolute;
    background-color: white;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    .search_result_list {
      text-align: start;
    }
  }
}
@media screen and (max-width: 760px) {
  .container_search {
    padding-left: 10%;
    #nav_seach {
      width: 75%;
      padding-left: 5%;
    }
  }
  .search_result {
    width: 35% !important;
    margin-left: 10%;
  }
}
</style>

