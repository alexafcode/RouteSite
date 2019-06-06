<template>
  <div class="converter" v-show="show">
    <v-layout wrap align-center>
      <v-flex xs10 md4 sm10 offset-sm1>
        <v-autocomplete
          class="converter__select"
          :items="dataArr"
          v-model="currencyRate"
          item-text="name"
          label="Выбор валюты из"
          @change="amount = 1 "
          return-object
        ></v-autocomplete>
      </v-flex>
    </v-layout>
    <div v-show="currencyRate.name" class="converter__value">
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
        <current-price v-if="currencyRate.name" :currencyList="dataArr"></current-price>
      </v-flex>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import currentPrice from "./components-converter/current-price-modal.vue";

export default {
  name: "converter",
  components: {
    currentPrice
  },
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
      this.time = new Date(this.timeStamp).toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    });
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .converter {
    text-align: center;
    .converter__select {
      margin-left: 2vw;
      font-size: 22px;
    }
    .converter__value {
      font-size: 22px;
    }
  }
}
@media screen and (max-width: 600px) {
  .converter {
    .converter__select {
      font-size: 18px;
    }
    .converter__value {
      font-size: 18px;
    }
  }
}
</style>
