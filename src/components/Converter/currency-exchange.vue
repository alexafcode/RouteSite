<template>
  <div class="exchange">
    <v-layout wrap align-center>
      <v-flex xs10 md4 sm10 offset-sm1>
        <v-select
          class="converter_select"
          :items="dataCurrency"
          v-model="currencyFrom"
          item-text="name"
          label="Конвертируем из"
          return-object
          @change="test"
        ></v-select>
      </v-flex>
      <v-flex xs10 md4 sm10 offset-sm1>
        <v-select
          class="converter_select"
          :items="dataCurrency"
          v-model="currencyTo"
          item-text="name"
          label="Конвертируем В"
          return-object
          @change="test"
        ></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
import key from "../../store/keys.js";

export default {
  name: "converter",
  data: () => ({
    apiKey: key.currency,
    dataCurrency: [],
    currencyFrom: null,
    currencyTo: null
  }),
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      let url = `https://free.currencyconverterapi.com/api/v6/currencies?apiKey=${
        this.apiKey
      }`;
      axios.get(url).then(response => {
        let data = response.data.results;
        let obj = {};
        let arr = [];
        Object.keys(data).forEach(key => {
          let e = data[key];
          obj = {
            name: e.currencyName,
            symbol: e.currencySymbol ? e.currencySymbol : "",
            id: e.id
          };
          arr.push(obj);
        });
        this.dataCurrency = arr;
      });
    },
    test() {
      // console.log(this.currencyFrom.id);
      // console.log(this.currencyTo.id);
    },
    convert() {
      let url = `https://free.currencyconverterapi.com/api/v6/convert?apiKey=${this.apiKey}&q=USD_RUB`
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 600px) {
}
</style>
