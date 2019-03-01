<template>
  <div>
    <v-menu
      ref="menu"
      v-model="openPick"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{on}">
        <v-text-field
          v-model="time"
          label="Picker in menu"
          prepend-icon="access_time"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="openPick"
        v-model="time"
        full-width
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

