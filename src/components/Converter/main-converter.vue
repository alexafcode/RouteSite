<template>
  <v-container fluid fill-height>
    <v-layout justify-center class="main">
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn
            color="brown lighten-0"
            dark
            :to="{name: 'converter'}"
          >Конвертировать валюту в рубли</v-btn>
          <v-btn
            color="brown lighten-0"
            dark
            :to="{name: 'currencyExchange'}"
          >Конвертировать любую валюту</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
