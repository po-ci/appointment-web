<template>

        <v-layout fluid row justify-center class="pt-3">
            <v-flex xs4 sm4 lg2 align-center justify-center>
                <v-avatar
                        :tile="tile"
                        :size="avatarSize"
                        color="grey lighten-4"
                >
                    <img :src="src">
                </v-avatar>
            </v-flex>
        </v-layout>

</template>

<script>
    export default {
        name: "LayoutLogo",
        data: () => ({
            src: '/assets/sonriu.jpg',
            avatarSize: 100,
            tile: false
        })
    }
</script>

<style scoped>

</style>