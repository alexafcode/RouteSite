<template>
  <div>
    <v-layout wrap align-center>
      <v-flex xs12 sm4 offset-sm1>
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
    <p>Rate: {{ currencyRate.name }}</p>
        <v-flex xs12 sm4 offset-sm1>
    <v-text-field label="Amount" solo v-model="amount"></v-text-field>
    </v-flex>
    <p>Rate за единицу: {{ unitPrice }}</p>
    <p>Rate Общей: {{ rate }}</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "converter",
  data: () => ({
    dataArr: [],
    currencyRate: {
      name: "Валюта",
      value: "",
      nominal: ""
    },
    amount: 1
  }),
  computed: {
    unitPrice() {
      return this.currencyRate.value / this.currencyRate.nominal
    },
    rate() {
      return (this.amount * this.unitPrice)
    }
  },
  created() {
    this.createConverter();
  },
  mounted() {
  },
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
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
