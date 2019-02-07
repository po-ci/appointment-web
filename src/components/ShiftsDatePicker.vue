<template>
    <v-date-picker
            v-model="datePick"
            locale="es-es"
            full-width
            color="secondary"
            :allowed-dates="allowedDates"

    ></v-date-picker>
</template>

<script>
    import moment from 'moment'
    import {mapGetters} from 'vuex'

    export default {
        name: "TurnosDatePicker",
        data: () => ({}),
        methods: {

            allowedDates: function (val) {
                let start = moment()
                let end = start.clone()
                end.add(this.getMaxDays, 'days')

                let v = moment(val)

                if (v >= start && v <= end) {
                    return true
                }
                return false
            }

        },
        computed: {
            ...mapGetters([
                'getDateFormated',
                'getCalendarSelected'
            ]),
            getMaxDays: function () {
                if (this.getCalendarSelected && this.getCalendarSelected.predefinedEvents && this.getCalendarSelected.predefinedEvents.maxDaysForShifs) {
                    return this.getCalendarSelected.predefinedEvents.maxDaysForShifs
                }
                return 30
            },
            datePick: {
                get() {
                    return this.getDateFormated
                },
                set(value) {
                    this.$store.commit('SET_DATE', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>