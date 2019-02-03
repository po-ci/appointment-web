<template>
    <v-tabs
            color="secondary"
            dark
            next-icon="mdi-arrow-right-bold-box-outline"
            prev-icon="mdi-arrow-left-bold-box-outline"
            show-arrows
    >
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab
                v-for="calendar in getCalendars"
                :href="'#tab-' + calendar.id"
                :key="'#tab-' + calendar.id"
        >
            {{ calendar.name }}
        </v-tab>

        <v-tabs-items>
            <v-tab-item
                    v-for="calendar in getCalendars"
                    :value="'tab-' + calendar.id"
                    :key="'#tabItem-' + calendar.id"
            >
                <v-card flat>
                    <v-card-text>{{ calendar.description }}</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "TurnosTab",
        computed: {
            ...mapGetters([
                'getCalendars',

            ]),
        },
        methods: {
            ...mapActions([])
        }
    }
</script>

<style scoped>

</style>