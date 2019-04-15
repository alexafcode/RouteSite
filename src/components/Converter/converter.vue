<template>
  <div>
    <v-layout wrap align-center>
      <v-flex xs12 sm4 offset-sm1>
        <v-select :items="dataArr" v-model="currencyRate" item-text="name" label="Выбор валюты из" @change="test"></v-select>
      </v-flex>
    </v-layout>
    <p>Rate: {{ currencyRate }}</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "converter",
  data: () => ({
    dataArr: [],
    currencyRate: null,
  }),

  created() {
    this.createConverter();
  },
  mounted() {
    // this.createConverter();
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
        console.log(arr);
        this.dataArr = arr;
      });
    },
    test() {
      console.log(this.currencyRate)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
