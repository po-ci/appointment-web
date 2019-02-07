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
                @click="setCalendarSelected(calendar)"
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

                    <shifts-available v-for="s in getAvailableShifts"
                    :hour="s.hour"
                    >

                    </shifts-available>

                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import ShiftsAvailable from './ShiftsAvailable'

    export default {
        name: "TurnosTab",
        components: {ShiftsAvailable},
        computed: {
            ...mapGetters([
                'getCalendars',
                'getAvailableShifts'
            ]),
        },
        methods: {
            ...mapActions([
                'setCalendarSelected'
            ])
        }
    }
</script>

<style scoped>

</style>