<template>
    <v-card>
        <v-card-text>
            <v-layout>
                <v-flex md3>

                    <span> <v-icon>alarm</v-icon> {{hour}}</span>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "ShiftsAvailable",
        props: {
            hour: {type:String}
        }
    }
</script>

<style scoped>

</style>