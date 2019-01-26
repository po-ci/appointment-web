<template>
    <v-app>
        <layout>
            <v-content>
                <router-view/>
            </v-content>

        </layout>

    </v-app>
</template>

<script>
    import Layout from './components/Layout'

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
