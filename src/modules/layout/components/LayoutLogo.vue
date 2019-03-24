<template>


                <v-avatar
                        :tile="tile"
                        :size="avatarSize"
                        color="grey lighten-4"
                >
                    <img :src="src">
                </v-avatar>

</template>

<script>
    export default {
        name: "LayoutLogo",
        data: () => ({
            src: '/assets/sonriu.jpg',
            avatarSize: 200,
            tile: false
        })
    }
</script>

<style scoped>

</style>
