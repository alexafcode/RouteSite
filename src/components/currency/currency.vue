<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <div class="text-xs-center">{{ textTitle }}</div>
    <v-container fluid>
      <v-layout row>
        <v-btn
          fab
          small
          dark
          color="brown darken-4"
          class="app__button"
          @click="datapicker = !datapicker"
        >
          <v-icon>date_range</v-icon>
        </v-btn>
        <v-flex xs2 class="app__datepicker" ref="datepicker" v-show="datapicker">
          <v-date-picker
            v-model="pickerDate"
            width="210"
            @change="getCurrency"
            :first-day-of-week="1"
            color="brown darken-4"
          ></v-date-picker>
        </v-flex>
        <v-flex xs12>
          <div id="chart" ref="chartdiv"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/views/loading.vue";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
/// import { now } from "@amcharts/amcharts4/.internal/core/utils/Time";
import moment from "moment";

am4core.useTheme(am4themes_moonrisekingdom);
am4core.useTheme(am4themes_animated);

export default {
  name: "currency",
  components: {
    Loading
  },
  data() {
    return {
      show: false,
      errors: [],
      apiKey: "",
      currency: [],
      currencyDate: [],
      loading: true,
      pickerDate: moment().format("YYYY-MM-DD"),
      datapicker: false,
      textTitle: "USD/RUB"
    };
  },
  mounted() {
    this.getCurrency();
  },
  created() {
    //this.getCurrency();
  },
  computed: {},
  watch: {},
  methods: {
    getCurrency() {
      this.datapicker = false;
      let now = new Date();
      let endDate = moment(this.pickerDate).format("YYYY-MM-DD");
      let date = moment(endDate)
        .add(-8, "days")
        .format("YYYY-MM-DD");
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.paddingRight = 20;
      this.loading = true;
      let url = `https://free.currencyconverterapi.com/api/v6/convert?apiKey=${
        this.apiKey
      }&q=USD_RUB&compact=ultra&date=${date}&endDate=${endDate}`;
      axios
        .get(url)
        .then(response => {
          let data = response.data;
          if (response) this.loading = false;
          // ToDo easy
          let array = Object.values(data);
          let cur = array[0];
          let dataChart = [];
          for (let prop in cur) {
            dataChart.push({
              date: new Date(prop),
              value: cur[prop]
            });
          }
          chart.data = dataChart;

          let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
          dateAxis.renderer.grid.template.location = 0;

          let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.tooltip.disabled = true;
          valueAxis.renderer.minWidth = 35;

          let series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "value";

          series.tooltipText = "{valueY.value}";
          chart.cursor = new am4charts.XYCursor();

          let scrollbarX = new am4charts.XYChartScrollbar();
          scrollbarX.series.push(series);
          chart.scrollbarX = scrollbarX;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

 <style lang="scss" scoped>
#app {
  .app__datepicker {
    position: absolute;
    z-index: 3;
  }
  .app__button {
    position: absolute;
    z-index: 2;
  }
  #chart {
    height: 40em;
  }
}
@media screen and (max-width: 980px) {
  #app {
    .app__datepicker {
      z-index: 3;
      position: absolute;
    }
    .app__button {
      position: absolute;
      z-index: 2;
    }
    #chart {
      height: 85vh;
      width: 85vw;
    }
  }
}
</style>
