<template>

    <v-container fluid fill-height class="grey lighten-3">
        <v-layout align-center justify-center>
            <v-flex xs12 sm12 md12>
                <v-card class="elevation-12">
                    <v-toolbar dark color="grey">
                        <v-toolbar-title>Turnos</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text>

                        <v-layout>

                            <v-flex class="col-md-4 col-xs-12">
                                <turnos-date-picker></turnos-date-picker>
                            </v-flex>

                            <v-flex class="col-md-8 col-xs-12">
                             YOUR TURN
                            </v-flex>

                        </v-layout>


                    </v-card-text>

                </v-card>

            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>

    import {mapActions} from 'vuex'
    import TurnosDatePicker from './TurnosDatePicker'

    export default {
        name: "Turnos",
        components: {TurnosDatePicker},
        mounted: function () {
            this.fetchCalendars()
        },
        methods: {
            ...mapActions([
                'fetchCalendars'
            ])
        }
    }
</script>

<style scoped>

</style>