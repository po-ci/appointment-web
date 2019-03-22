<template>
  <v-container>
    <v-card class="elevation-8">
      <v-layout row>
        <v-flex xs6>
          <v-card-title primary-title class="title">
            Feriados
          </v-card-title>
        </v-flex>
        <v-flex xs6 class="pt-2 pr-4 text-xs-right">
        </v-flex>
      </v-layout>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="[]"></v-data-table>
      </v-card-text>
    </v-card>
    <v-btn color="#D81B60"
           fixed
           dark
           fab
           bottom
           right
           @click="">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    name: "HolidaysCrud",
    data() {
      return {
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Titulo', value: 'title'},
          {text: 'Fecha', value: 'date'},
          {text: 'Aciones', value: 'acciones', sortable: false},
        ]
      }
    }
  }
</script>

