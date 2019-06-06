<template>
  <v-layout justify-center>
    <v-dialog width="300" v-model="dialog">
       <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Курс всех Валют
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Текущие курсы Валюты</v-card-title>
        <div v-for="(item, index) in currencyList" :key="index">
        <v-card-text><u>{{ item.name }}</u><v-spacer/>{{ item.value }} рублей <v-spacer/> за {{ item.nominal }} {{ item.nominal == 1 ? "единицу" : "единиц" }}</v-card-text>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat  @click="dialog = false">Готово</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "current-price",
  data: () => ({
    dialog: false
  }),
  props: {
    currencyList: {
      type: Array,
      required: true
    }
  }
}
</script>

