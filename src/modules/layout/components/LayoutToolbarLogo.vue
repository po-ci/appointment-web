<template>

    <v-btn icon large  to="/">
                <v-avatar
                        :tile="tile"
                        :size="avatarSize"
                        color="grey lighten-4"

                >
                    <img :src="src">
                </v-avatar>
    </v-btn>
</template>

<script>
    export default {
        name: "LayoutToolbarLogo",
        data: () => ({
            src: '/assets/'+process.env.VUE_APP_LOGO,
            avatarSize: 40,
            tile: false
        })
    }
</script>

<style scoped>

</style>
