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
            type="text">
          </v-text-field>

          <v-select
            :items="users"
            label="Usuario"
            data-vv-name="select"
            required
          ></v-select>

          <v-text-field
            name="description"
            label="Descripcion"
            type="text">
          </v-text-field>
        </v-form>
      </v-card-text>


      <v-spacer></v-spacer>

      <v-card-title primary-title class="title">Programación horaria</v-card-title>

      <v-card-text>
        Configuración del rango horario en el que se podrán agendar eventos en este calendario.
        <v-spacer></v-spacer>

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
  import {mapGetters} from 'vuex'

  export default {
    name: "CalendarCrudDialog",
    props: {
      open: Boolean,
      users: {}
    },
    data() {
      return {
        usuario: [],
        time: null,
        modal2: false,
        headers: [
          {text: 'Dias', value: 'dia', sortable: false},
          {text: 'Desde', value: 'desde', sortable: false},
          {text: 'Hasta', value: 'hasta', sortable: false},
          {text: 'Desde2', value: 'desde2', sortable: false},
          {text: 'Hasta2', value: 'hasta2', sortable: false},
        ]
      }
    },
  }
</script>
