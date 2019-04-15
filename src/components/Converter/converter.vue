<template>
  <div>
    <v-layout wrap align-center>
      <v-flex xs12 sm2 offset-sm1>
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
    <div v-show="show">
      <v-flex xs8 sm2 offset-sm1>
        <!-- <p>Rate: {{ currencyRate.name }}</p> -->
        <v-layout row>
        <img src="@/./assets/icons_amount.png" alt="Amount" style="vertical-align: middle">
        <v-text-field label="Amount" v-model="amount" ></v-text-field>
        </v-layout>
        <p>Rate за единицу: {{ unitPrice }}</p>
        <p>Rate Общей: {{ rate }}</p>
      </v-flex>
    </div>
  </div>
</template>
<script>
import axios from "axios";

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
    show: false
  }),
  computed: {
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
      // return (this.amount * this.unitPrice)
    }
  },
  created() {
    this.createConverter();
  },
  mounted() {},
  methods: {
    createConverter() {
      // let val = (value/1).toFixed(2).replace('.', ',')
      //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      let url = "https://www.cbr-xml-daily.ru/daily_json.js";
      axios.get(url).then(response => {
        let val = response.data.Valute;
        let obj = {};
        let arr = [];
        Object.keys(val).forEach(key => {
          let e = val[key];
          obj = {
            name: e.Name,
            value: e.Value,
            nominal: e.Nominal
          };
          arr.push(obj);
        });
        this.dataArr = arr;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
