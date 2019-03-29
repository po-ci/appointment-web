<template>
  <v-container>
    <v-layout row wrap>
      <v-flex pa-3 xs12>
        <v-card>
          <v-card-title><h2>
            Progracion Especifica
          </h2></v-card-title>
        </v-card>
      </v-flex>
      <v-flex pa-3 xs12>
        <v-card>
          <v-card-text>
            <v-data-table
              :loding="getSpecificsSchedulesLoading"
              :headers="headers"
              :items="getSpecificsSchedules">

              <template slot="no-data">

                <div v-if="getSpecificsSchedulesLoading"
                     color="info"
                     outline
                     class="text-xs-center">
                  Cargando Licencias
                </div>

                <div v-if="!getSpecificsSchedulesLoading"
                     outline
                     color="info">
                  Sin datos
                </div>

              </template>

              <template slot="items" slot-scope="props">
                <td>{{props.item.id}}</td>
                <td v-if="props.item.calendar">{{props.item.calendar.name}}</td>
                <td v-else></td>
                <td>{{props.item.date}}</td>
                <td>{{props.item.start}}</td>
                <td>{{props.item.end}}</td>
                <td>{{props.item.start2}}</td>
                <td>{{props.item.end2}}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click=""
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click=""
                  >
                    delete
                  </v-icon>
                </td>
              </template>


            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "SpecificsSchedulesCrud",
    data() {
      return {
        headers: [
          {text: 'ID', value: 'id'},
          {text: 'Calendario', value: 'calendar'},
          {text: 'Dia', value: 'date'},
          {text: 'Desde', value: 'start'},
          {text: 'Hasta', value: 'end'},
          {text: 'Desde2', value: 'start2'},
          {text: 'Hasta2', value: 'end2'},
          {text: 'Acciones', value: 'actions'}
        ]
      }
    },
    computed: {
      ...mapGetters(['getSpecificsSchedules', 'getSpecificsSchedulesLoading',
        'getSpecificsSchedulesError', 'getSpecificsSchedulesResult'])
    },
    methods: {
      ...mapActions(['fetchAllSpecificsSchedules'])
    },
    mounted() {
      this.fetchAllSpecificsSchedules()
    }
  }
</script>

