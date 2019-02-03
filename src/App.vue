<template>
    <v-app>
        <layout>

                <router-view/>


        </layout>

    </v-app>
</template>

<script>
    import Layout from './layout/components/Layout'

    export default {
        name: 'App',
        components: {Layout},
        data() {
            return {
                //
            }
        }
    }
</script>
