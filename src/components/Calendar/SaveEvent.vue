<template>
  <div class="event">
    <v-textarea
      label="Добавить событие"
      id="textarea1"
      v-model="text"
      placeholder="Введите текст"
      :rows="3"
      :max-rows="6"
      ref="text"
    ></v-textarea>
    <v-btn color="success" class="btn btn-success" @click.stop.prevent="SaveEventToCalendar">Создать</v-btn>
    <v-btn color="warning" class="btn btn-danger event_button_cancel" @click="Cancel">Отмена</v-btn>
  </div>
</template>
<script>

import { mapState, mapActions } from "vuex";
export default {
  name: "SaveCalendar",
  props: {
    item: {
      type: Object
    }
  },
  data: () => ({
    text: "",
    storage: null
  }),
  computed: {
    ...mapActions("userDataDb", ["ADD_EVENT"]),
    ...mapState("user", ["user"])
  },
  methods: {
    SaveEventToCalendar() {
      this.evt = false;
      const storage = {
        id: `${this.item.day}-${this.item.month}-${this.item.year}`,
        day: this.item.day,
        month: this.item.month,
        year: this.item.year,
        message: this.text
      };
      this.text = "";
      this.storage = storage;
      this.ADD_EVENT
      // this.SaveToLocalStorage(storage); // ToDO Delete
    },
    Cancel() {
      this.text = "";
      this.$emit("cancelAddEvent");
    },
    // SaveToLocalStorage(data) {
    //   // ToDo Delete
    //   const arr = [];
    //   if (localStorage.getItem("message") != null) {
    //     try {
    //       arr = JSON.parse(localStorage.getItem("message"));
    //     }
    //     catch{(e) => console.error(e);}
    //   }
    //   arr.push(data);
    //   localStorage.setItem("message", JSON.stringify(arr));
    //   this.$emit("fromStorageEvent", data);
    // }
  }
};
</script>
<style lang="scss" scoped>
.event {
  right: 0;
  width: 15%;
  float: right;
  display: flex;
  position: fixed;
  text-align: center;
  background: #f6f6f6;
  flex-direction: column;
  border: 1px solid #ab7373;
  button {
    height: 30px;
    border-radius: 8px;
  }
}
@media screen and (max-width: 760px) {
  .event {
    width: 40%;
    position: absolute;
  }
}
</style>
