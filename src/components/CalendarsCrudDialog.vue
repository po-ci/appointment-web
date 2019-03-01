<template>
  <v-dialog :value="open" persistent>

    <v-card>
      <v-card-title primary-title class="title">
        Nuevo Calendario
      </v-card-title>
      <v-card-text>
        <v-form>

          <v-text-field
            name="name"
            label="Nombre del Calendario"
            type="text"
            v-model="form.name">
          </v-text-field>

          <v-select
            :items="users"
            :item-text="'name'"
            :item-value="'id'"
            label="Usuario"
            v-model="form.user"
            required
          ></v-select>

          <v-text-field
            name="description"
            label="Descripcion"
            type="text"
            v-model="form.description">
          </v-text-field>
        </v-form>
      </v-card-text>


      <v-spacer></v-spacer>

      <v-card-title primary-title class="title">Programación horaria</v-card-title>

      <v-card-text>
        Configuración del rango horario en el que se podrán agendar eventos en este calendario.
        <v-spacer></v-spacer>
        <v-layout class="mt-2">
          <v-flex xs3>
            Dia
          </v-flex>
          <v-flex xs3>
            Desde
          </v-flex>

          <v-flex xs3>
            Hasta
          </v-flex>

          <v-flex xs3>
            Desde 2
          </v-flex>

          <v-flex xs3>
            Hasta 2
          </v-flex>
          <br>
        </v-layout>
        <template v-for="dia in days">
          <v-layout row>
            <v-flex xs3>
              {{dia}}
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time @time="timeCalendars"></calendars-crud-dialog-time>
            </v-flex>
            <v-flex xs3>
              <calendars-crud-dialog-time @time="timeCalendars"></calendars-crud-dialog-time>
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
          @click=""
        >
          Agregar
        </v-btn>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import CalendarsCrudDialogTime from './CalendarsCrudDialogTime'

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
          'Lunes',
          'Martes',
          'Miercoles',
          'Jueves',
          'Viernes',
          'Sabado',
          'Domingo',
          'Feriado'
        ],
        form: {
          name: null,
          description: null,
          user: null,
          schedules: []
        }
      }
    },
    methods: {
      timeCalendars(values) {
        console.log(values)
      }
    }
  }
</script>
