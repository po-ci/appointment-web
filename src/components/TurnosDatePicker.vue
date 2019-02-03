<template>
    <v-date-picker
            v-model="datePick"
            locale="es-es"
            full-width
            color="secondary"
    ></v-date-picker>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        name: "TurnosDatePicker",
        data: () => ({
        }),
        computed: {
            ...mapGetters([
               'getDateFormated'
            ]),
            datePick: {
                get () {
                    return this.getDateFormated
                },
                set (value) {
                    this.$store.commit('SET_DATE', value)
                }
            }
        }
    }
</script>

<style scoped>

</style>