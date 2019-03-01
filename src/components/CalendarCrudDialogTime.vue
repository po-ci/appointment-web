<template>
  <div>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >

        <v-text-field
          slot="activator"
          v-model="time"
          label="Picker in menu"
          prepend-icon="access_time"
          readonly
        ></v-text-field>

      <v-time-picker
        full-width
        v-model="time"
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
  export default {
    name: "CalendarCrudDialogTime",
    data() {
      return {
        time: null,
        openPick: false,
      }
    },
  }
</script>

