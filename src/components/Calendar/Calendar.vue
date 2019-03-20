<template>
  <div id="app">
    <div class="container_calendar">
      <div class="button_month">
        <v-btn fab @click="monthPrev">{{ NamePrevMonth }}</v-btn>
        <v-btn fab @click="monthNext">{{ NameNextMonth }}</v-btn>
      </div>
      <search-event :days="days"></search-event>
      <datapicker-component @changeData="changeData" :year="year" :month="month"></datapicker-component>
    </div>
    <save-event
      :item="item"
      v-show="eventAdd"
      @cancelAddEvent="Cancel"
      @fromStorageEvent="FromStorage"
    ></save-event>
    <div class="calendar">
      <div
        class="day"
        :class="{ today: day.today, notMonth: day.notMonth }"
        v-for="(day, index) in Crd"
        ref="days"
        :key="index"
        @click="addData(day.day, day.month, day.year)"
      >
        {{ day.dayName }} {{ day.day }}
        <div class="day_event" v-for="(mes, index) in day.message" :key="index">{{ mes }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import searchEvent from "./SearchEvent.vue";
import saveEvent from "./SaveEvent.vue";
import names from "./constNames.js";
import datapickerComponent from "./dataPicker.vue";
import { mapState, mapActions } from "vuex";
let today = new Date();
export default {
  name: "app",
  components: {
    searchEvent,
    saveEvent,
    datapickerComponent
  },
  data() {
    return {
      dayName: names.dayName,
      monthName: names.monthName,
      days: [],
      year: today.getFullYear(),
      month: today.getMonth(),
      eventAdd: false,
      eventDay: "",
      datapicker: false,
      item: {
        day: "",
        month: "",
        year: ""
      },
      array: []
    };
  },
  created() {
    // this.Create();
    this.GET_EVENT
  },
  mounted() {
    // this.Create();
  },
  beforeUpdate() {},
  watch: {},
  computed: {
    ...mapActions("userDataDb", ["GET_EVENT"]),
    ...mapState("user", ["user"]),
    ...mapState("userDataDb", ["dataDb"]),
    NamePrevMonth() {
      if (this.month == 0) {
        return this.monthName[11].toUpperCase();
      } else {
        return this.monthName[this.month - 1].toUpperCase();
      }
    },
    NameNextMonth() {
      if (this.month == 11) {
        return this.monthName[0].toUpperCase();
      } else {
        return this.monthName[this.month + 1].toUpperCase();
      }
    },
    Crd() {
      return this.Create();
    }
  },
  methods: {
    addID(day, month, year) {
      return `${day}-${month}-${year}`;
    },
    // hideDiv() {
    //   this.datapicker = false;
    // },
    Create() {
      if (this.days.length != 0) {
        this.days = [];
      }
      let id = 0;
      let data = new Date(this.year, this.month);
      let lastdata = new Date(this.year, this.month, 0);
      let lastmonth = lastdata.getMonth();
      let day = this.getDayN(data);
      if (day >= 2) {
        lastdata.setDate(lastdata.getDate() - (day - 1));
      }
      let obj = {};
      let s = 0;
      // Пишем пред. месяц
      if (this.getDayN(data) != 0) {
        while (lastdata.getMonth() == lastmonth) {
          let ids = this.addID(
            lastdata.getDate(),
            lastdata.getMonth(),
            lastdata.getFullYear()
          );
          obj = {
            id: id++,
            ids: ids,
            day: lastdata.getDate(),
            month: lastdata.getMonth(),
            year: lastdata.getFullYear(),
            message: [],
            dayName: this.dayName[this.getDayN(lastdata)],
            notMonth: true
          };
          s++;
          this.days.push(obj);
          lastdata.setDate(lastdata.getDate() + 1);
        }
      }
      if (s != 7) {
        while (s != 7) {
          s++;
          let ids = this.addID(
            data.getDate(),
            data.getMonth(),
            data.getFullYear()
          );
          obj = {
            id: id++,
            ids: ids,
            day: data.getDate(),
            month: data.getMonth(),
            dayName: this.dayName[this.getDayN(data)],
            year: data.getFullYear(),
            message: [],
            today:
              data.toLocaleDateString("ru") == today.toLocaleDateString("ru")
                ? true
                : false,
            notMonth: data.getMonth() != this.month ? true : false
          };
          this.days.push(obj);
          data.setDate(data.getDate() + 1);
        }
      }
      //////
      while (s != 35) {
        s++;
        let ids = this.addID(
          data.getDate(),
          data.getMonth(),
          data.getFullYear()
        );
        obj = {
          id: id++,
          ids: ids,
          day: data.getDate(),
          month: data.getMonth(),
          year: data.getFullYear(),
          message: [],
          today:
            data.toLocaleDateString("ru") == today.toLocaleDateString("ru")
              ? true
              : false,
          notMonth: data.getMonth() != this.month ? true : false
        };
        this.days.push(obj);
        data.setDate(data.getDate() + 1);
      }
      // fix long month (lastweek "september 2019")
      if (data.getMonth() == this.month) {
        while (s != 42) {
          let ids = this.addID(
            data.getDate(),
            data.getMonth(),
            data.getFullYear()
          );
          s++;
          obj = {
            id: id++,
            ids: ids,
            day: data.getDate(),
            month: data.getMonth(),
            year: data.getFullYear(),
            message: [],
            today:
              data.toLocaleDateString("ru") == lastdata.toLocaleDateString("ru")
                ? true
                : false,
            notMonth: data.getMonth() != this.month ? true : false
          };
          data.setDate(data.getDate() + 1);
          this.days.push(obj);
        }
      }
      this.FromStorage();
      return this.days;
    },
    getDayN(data) {
      // получить номер дня недели, от 0(пн) до 6(вс)
      let day = data.getDay();
      if (day == 0) day = 7;
      return day - 1;
    },
    monthNext() {
      if (this.month == 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
    },
    monthPrev() {
      if (this.month == 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
    },
    addData(day, month, year) {
      let dateNow = moment();
      let dateEvent = new Date(year, month, day);
      if (dateNow <= dateEvent) {
        this.eventAdd = true;
        this.item.day = day;
        this.item.month = month;
        this.item.year = year;
      } else {
        alert("Дата уже прошла")
      }
    },
    Cancel() {
      this.eventAdd = false;
    },
    FromStorage() {
      this.eventAdd = false;
      let array = this.dataDb // JSON.parse(localStorage.getItem("message"));
      if (array)
        this.days.forEach(el => {
          el.message = [];
          array.forEach(arEl => {
            if (arEl.id == el.ids) {
              el.message.push(arEl.message);
            }
          });
        });
    },
    changeData(value) {
      this.year = moment(value).year();
      this.month = moment(value).month();
    }
  }
  // directives: {
  //   ClickOutside: {
  //     bind(el, binding, vnode) {
  //       el.clickOutsideEvent = event => {
  //         if (!(el == event.target || el.contains(event.target))) {
  //           vnode.context.hideDiv();
  //         }
  //       };
  //       document.body.addEventListener("click", el.clickOutsideEvent);
  //     },
  //     unbind(el) {
  //       document.body.removeEventListener("click", el.clickOutsideEvent);
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
#app {
  .container_calendar {
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    .button_month {
      button {
        margin: 20px 10px 20px;
        font-size: x-small;
      }
    }
  }
  .calendar {
    width: 85%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding-top: 20px;
    .day {
      width: 13%;
      height: 9vw;
      overflow-x: auto;
      font-size: 18px;
      padding-left: 5px;
      white-space: nowrap;
      word-wrap: break-word;
      text-overflow: ellipsis;
      vertical-align: text-top;
      border: 1px solid black;
      background-color: floralwhite;
      &:hover {
        background-color: #f5dff5;
      }
      &:hover .add {
        cursor: pointer;
        display: initial;
      }
      .day_event {
        width: 140px;
        margin-left: 15px;
        display: list-item;
        &:hover {
          color: #ab7373;
        }
      }
    }
    .today {
      background-color: rgb(243, 157, 142);
    }
    .notMonth {
      color: #a9a9a9;
    }
  }
}
@media screen and (max-width: 760px) {
  #app {
    .container_calendar {
      flex-direction: column;
      width: 100%;
    }
    .button_month {
      margin: 0;
    }
    .date_title {
      display: none;
    }
    .calendar {
      width: 95%;
    }
  }
}
</style>
