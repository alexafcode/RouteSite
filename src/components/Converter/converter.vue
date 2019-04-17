<template>
  <div class="converter" v-show="show">
    <v-layout wrap align-center>
      <v-flex xs10 md4 sm10 offset-sm1>
        <v-select
          class="converter_select"
          :items="dataArr"
          v-model="currencyRate"
          item-text="name"
          label="Выбор валюты из"
          @change="amount = 1 "
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <div v-show="currencyRate.name" class="converter_value">
      <v-flex xs10 md4 sm10 offset-sm1>
        <v-layout row>
          <img src="@/./assets/icons_amount.png" alt="Amount" style="vertical-align: middle">
          <v-text-field type="number" label="Amount" v-model="amount"></v-text-field>
        </v-layout>
        <p>
          Цена единицу "{{ currencyRate.name}}":
          <b>{{ unitPrice }} рублей</b>
        </p>
        <p>
          Цена за
          <b>{{ amount }}</b> единиц:
          <b>{{ rate }} рублей</b>
        </p>
        <p>
          Данные на дату:
          <b>{{ time }}</b>
        </p>
      </v-flex>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import names from "../Calendar/constNames.js";

export default {
  name: "converter",
  data: () => ({
    dataArr: [],
    currencyRate: {
      name: null,
      value: "",
      nominal: null
    },
    amount: 1,
    show: false,
    time: null
  }),
  computed: {
    ...mapActions("currencyStore", ["INIT_STATE"]),
    ...mapState("currencyStore", ["currency", "timeStamp"]),
    unitPrice() {
      return this.currencyRate.nominal
        ? this.currencyRate.value / this.currencyRate.nominal
        : "";
    },
    rate() {
      let value = this.amount * this.unitPrice;
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.INIT_STATE.then(() => {
      this.show = true;
      this.dataArr = this.currency;
      let date = new Date(Date.parse(this.timeStamp));
      this.time = `${date.getDate()} ${
        names.monthNameS[date.getMonth()]
      } ${date.getFullYear()}`;
    });
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .converter {
    text-align: center;
    .converter_select {
      margin-left: 2vW;
      font-size: 22px;
    }
    .converter_value {
      font-size: 22px;
    }
  }
}
@media screen and (max-width: 600px) {
  .converter {
    .converter_select {
      font-size: 18px;
    }
    .converter_value {
      font-size: 18px;
    }
  }
}
</style>
