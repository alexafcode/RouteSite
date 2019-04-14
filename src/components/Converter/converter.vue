<template>
  <div>
    <v-layout wrap align-center>
      <v-flex xs12 sm4 d-flex>
        <v-select :items="items" label="Выбор валюты из"></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "converter",
  data: () => ({
    dataArr: [],
    items: []
  }),

  created() {
    this.createConverter();
  },
  mounted() {
    // this.createConverter();
  },
  methods: {
    createConverter() {
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
          this.items.push(e.Name)
          arr.push(obj);
        });
        console.log(arr);
        this.dataArr = arr;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
