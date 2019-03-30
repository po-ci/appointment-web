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
        :label="title"
        prepend-icon="access_time"
        readonly
        class="pt-0"
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
    name: "SpecificsSchedulesCrudTime",
    props: {
      value: String,
      title: String,
      field: String
    },

    data() {
      return {
        time: null,
        openPick: false,
      }
    },
    watch: {
      time: function (value) {
        this.$emit('time', {field: this.field, value: value})
      },
      value(newValue) {
        this.time = newValue
      },
    }
  }
</script>

