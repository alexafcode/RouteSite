<template>
  <div id="app_chart">
    <loading v-show="loading"></loading>
    <currency-change></currency-change>
    <!-- <div class="text-xs-center" :style="{'padding-top': '1%'}"><h3>{{ currentCur }}</h3></div> -->
    <div class="text-xs-center">
      <h3>{{ currentCur }}</h3>
    </div>
    <v-container fluid>
      <v-layout row>
        <v-btn
          fab
          small
          dark
          color="brown darken-4"
          class="app__button"
          @click="datapicker = !datapicker"
          v-click-outside
        >
          <v-icon>date_range</v-icon>
        </v-btn>
        <v-flex xs2 class="app__datepicker" ref="datepicker" v-show="datapicker">
          <v-date-picker
            v-model="pickerDate"
            width="210"
            @change="getCurrency(currentCur)"
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
// ToDo separate on components
import axios from "axios";
import Loading from "@/views/loading.vue";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";
import currencyChange from "./currenceChange.vue";
import key from '../../store/keys.js'

am4core.useTheme(am4themes_moonrisekingdom);
am4core.useTheme(am4themes_animated);

export default {
  name: "currencyChart",
  components: {
    Loading,
    currencyChange
  },
  data() {
    return {
      show: false,
      errors: [],
      apiKey: key.currency,
      currency: [],
      currencyDate: [],
      loading: true,
      pickerDate: moment().format("YYYY-MM-DD"),
      datapicker: false,
      currentCur: null
    };
  },
  mounted() {
    this.getCurrency("USD_RUB");
  },
  created() {},
  computed: {},
  watch: {},
  methods: {
    getCurrency(cur) {
      this.currentCur = cur;
      this.datapicker = false;
      let endDate = moment(this.pickerDate).format("YYYY-MM-DD");
      let date = moment(endDate)
        .add(-8, "days")
        .format("YYYY-MM-DD");
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.paddingRight = 20;
      this.loading = true;
      let url = `https://free.currencyconverterapi.com/api/v6/convert?apiKey=${
        this.apiKey
      }&q=${cur}&compact=ultra&date=${date}&endDate=${endDate}`;
      //}&q=USD_RUB&compact=ultra&date=${date}&endDate=${endDate}`;
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
    },
    hideDiv() {
      this.datapicker = false;
    }
  },
  directives: {
    ClickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = event => {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context.hideDiv();
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    }
  }
};
</script>

 <style lang="scss" scoped>
#app_chart {
  .app__datepicker {
    position: absolute;
    z-index: 3;
  }
  .app__button {
    margin-top: 2.5%;
    position: absolute;
    z-index: 1;
  }
  #chart {
    height: 40em;
  }
}
@media screen and (max-width: 980px) {
  #app_chart {
    .app__datepicker {
      z-index: 2;
      position: absolute;
    }
    .app__button {
      margin-left: 2.5%;
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
