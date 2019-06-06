<template>
  <div class="exchange">
    <v-layout wrap align-center>
      <v-flex xs11 md4 sm10 offset-sm1 class="exchange__from">
        <v-autocomplete
          v-model="currencyFrom"
          :items="dataCurrency"
          label="Конвертируем из"
          placeholder="Select..."
          item-text="name"
          item-value="name"
          return-object
          required
          @change="convert"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs11 md4 sm10 offset-sm1 v-show="currencyFrom != null" class="exchange__to">
        <v-autocomplete
          v-model="currencyTo"
          :items="dataCurrency"
          label="Конвертируем В"
          placeholder="Select..."
          item-text="name"
          item-value="name"
          return-object
          required
          @change="convert"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
    <v-layout wrap align-center>
      <v-flex xs5 md4 sm4 offset-sm1 v-show="currencyTo != null" class="exchange__amound">
        <v-text-field
          :suffix='`${currencyFrom ? currencyFrom.symbol : ""}`'
          type="number"
          label="Amount"
          v-model="amount"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 md4 sm4 offset-sm1 v-show="show" class="exchange__amound-converted">
        <v-text-field
          :suffix='`${currencyTo ? currencyTo.symbol : ""}`'
          label="Amount Converted"
          v-model="converted"
          readonly
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-flex xs4 md4 sm4 offset-sm1>
      <!-- <v-btn color="orange" @click="convert" v-show="currencyTo">Конвертировать</v-btn> -->
      <v-alert :value="errorMess" color="error" icon="warning" outline>{{ errorText }}.</v-alert>
    </v-flex>
    <v-flex v-if="show" class="exchange__result">
      <p
        class="text-xs-center"
      >{{ ` 1 ${currencyFrom.symbol} = ${convertValue.val} ${currencyTo ? currencyTo.symbol : ""}` }}</p>
      <p
        class="text-xs-center"
      >{{ `${amount} ${currencyFrom.symbol} = ${converted} ${currencyTo ? currencyTo.symbol : ""}` }}</p>
    </v-flex>
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
    currencyTo: null,
    convertValue: {},
    amount: 1,
    searchInput: "",
    show: false,
    errorMess: false,
    errorText: null
  }),
  computed: {
    converted() {
      let value = this.amount * this.convertValue.val;
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      // return (this.amount * this.convertValue.val).toFixed(2)
    }
  },
  async created() {
    await this.init();
  },
  mounted() {},
  methods: {
    async init() {
      let url = `https://free.currencyconverterapi.com/api/v6/currencies?apiKey=${
        this.apiKey
      }`;
      await axios
        .get(url)
        .then(response => {
          let data = response.data.results;
          let arr = Object.keys(data).map(key => {
            let e = data[key];
            return {
              name: e.currencyName,
              symbol: e.currencySymbol ? e.currencySymbol : "",
              id: e.id
            }
          })
          arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
          this.dataCurrency = arr;
        })
        .catch(error => {
          (this.errorMess = true),
            (this.errorText = error.message),
            // eslint-disable-next-line
            console.error(error);
        });
    },
    convert() {
      if (this.currencyTo != null && this.currencyFrom != null) {
        this.amount = 1;
        const url = `https://free.currencyconverterapi.com/api/v6/convert?apiKey=${
          this.apiKey
        }&q=${this.currencyFrom.id}_${this.currencyTo.id}`;
        axios
          .get(url)
          .then(response => {
            const data = response.data.results;
            Object.keys(data).map(key => {
            let e = data[key];
              this.convertValue = {
                  val: e.val,
                  from: e.fr,
                  to: e.to,
                  id: e.id
              }
              this.show = true;
            })
          })
          .catch(error => {
            (this.errorMess = true),
              (this.errorText = error.message),
              // eslint-disable-next-line
              console.error(error);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.exchange {
  width: 100%;
  height: 100%;
  .exchange__result {
    margin-top: 1%;
    font-size: 34px;
    font-weight: 600;
    line-height: 40px;
  }
}
@media screen and (max-width: 1000px) {
  .exchange {
    margin-left: 3vw;
    .exchange__amound-converted {
      margin-left: 5vh;
    }
    .exchange__result {
      margin-top: 5vh;
      font-size: 22px;
      line-height: 30px;
    }
  }
}
</style>
