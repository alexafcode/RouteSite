<template>
  <div v-show="show">
    <v-layout wrap align-center>
      <v-flex xs12 sm3 offset-sm1>
        <v-select
          :items="dataArr"
          v-model="currencyRate"
          item-text="name"
          label="Выбор валюты из"
          @change="amount = 1 "
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <div v-show="currencyRate.name">
      <v-flex xs8 sm3 offset-sm1>
        <v-layout row>
          <img src="@/./assets/icons_amount.png" alt="Amount" style="vertical-align: middle">
          <v-text-field label="Amount" v-model="amount"></v-text-field>
        </v-layout>
        <p>
          Цена единицу "{{ currencyRate.name}}":
          <b>{{ unitPrice }} рублей</b>
        </p>
        <p>
          Цена за {{ amount }} единицу:
          <b>{{ rate }} рублей</b>
        </p>
        <p> На Дату: {{ time }}</p>
      </v-flex>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

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
      if (this.currencyRate.name != null) {
        this.show = true;
      }
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.INIT_STATE.then(() => {
      this.show = true;
      this.dataArr = this.currency;
      this.time = this.timeStamp;
    });
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
