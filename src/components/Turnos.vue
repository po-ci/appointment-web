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
                    </v-card-text>

                </v-card>

            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "Turnos",
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