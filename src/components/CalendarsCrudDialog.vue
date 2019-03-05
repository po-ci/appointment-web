<template>
  <v-dialog :value="open"
            fullscreen
            persistent>

    <v-card>
      <v-card-title primary-title class="title">
        Nuevo Calendario
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-layout row wrap>
            <v-text-field
              md4 xs12
              class="px-2"
              name="name"
              label="Nombre del Calendario"
              type="text"
              v-model="form.name">
            </v-text-field>

            <v-select
              md4 xs12
              class="px-2"
              :items="users"
              :item-text="'name'"
              :item-value="'id'"
              label="Usuario"
              v-model="form.user"
              required
            ></v-select>

            <v-text-field
              md4 xs12
              class="px-2"
              name="description"
              label="Descripcion"
              type="text"
              v-model="form.description">
            </v-text-field>
          </v-layout>
        </v-form>
      </v-card-text>


      <v-spacer></v-spacer>

      <v-card-title primary-title class="title py-0">Programación horaria</v-card-title>

      <v-card-text>
        Configuración del rango horario en el que se podrán agendar eventos en este calendario.
        <v-spacer></v-spacer>
        <v-layout class="mt-2">
          <v-flex xs3 class="text-xs-center">
            Dia
          </v-flex>
          <v-flex xs3 class="text-xs-center">
            Desde
          </v-flex>

          <v-flex xs3 class="text-xs-center">
            Hasta
          </v-flex>

          <v-flex xs3 class="text-xs-center">
            Desde 2
          </v-flex>

          <v-flex xs3 class="text-xs-center">
            Hasta 2
          </v-flex>
          <br>
        </v-layout>
        <template v-for="day in days">
          <v-layout row>
            <v-flex xs3 class="text-xs-center pa-3">
              {{day.name}}
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'start'"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'end'"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'start2'"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time
                :day="day.number"
                :field="'end2'"
                @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>

          </v-layout>
        </template>

      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          flat
          @click="$emit('closeDialog')"
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          @click="submitForm"
        >
          Agregar
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import CalendarsCrudDialogTime from './CalendarsCrudDialogTime'
  import {mapActions} from 'vuex'

  export default {
    name: "CalendarCrudDialog",
    components: {
      CalendarsCrudDialogTime
    },
    props: {
      open: Boolean,
      users: Array
    },
    data() {
      return {
        days: [
          {number: 1, name: 'Lunes'},
          {number: 2, name: 'Martes'},
          {number: 3, name: 'Miercoles'},
          {number: 4, name: 'Jueves'},
          {number: 5, name: 'Viernes'},
          {number: 6, name: 'Sabado'},
          {number: 7, name: 'Domingo'},
          {number: 8, name: 'Feriado'}
        ],
        form: {
          name: null,
          description: null,
          user: null,
          schedules: [
            {day: 1, start: null, end: null, start2: null, end2: null},
            {day: 2, start: null, end: null, start2: null, end2: null},
            {day: 3, start: null, end: null, start2: null, end2: null},
            {day: 4, start: null, end: null, start2: null, end2: null},
            {day: 5, start: null, end: null, start2: null, end2: null},
            {day: 6, start: null, end: null, start2: null, end2: null},
            {day: 7, start: null, end: null, start2: null, end2: null},
            {day: 8, start: null, end: null, start2: null, end2: null}

          ]
        }
      }
    },
    methods: {
      timeCalendars(object) {
        this.form.schedules.find(sc => sc.day === object.day)[object.field] = object.value;
      },
      ...mapActions(['createCalendar']),

      submitForm() {
        this.createCalendar(this.form)
        this.$emit('closeDialog')
        this.$emit('refreshAllCalendars')
      }
    }
  }
</script>
