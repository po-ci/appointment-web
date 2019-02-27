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
            :items="usuario"
            label="Usuario"
            data-vv-name="select"
            required
          ></v-select>

          <v-text-field
            name="description"
            label="Descripcion"
            type="text">
          </v-text-field>

          <v-spacer></v-spacer>

        </v-form>
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
  export default {
    name: "CalendarCrudDialog",
    props: {
      open: Boolean,
    },
    data() {
      return {
        usuario: []
      }
    }
  }
</script>
