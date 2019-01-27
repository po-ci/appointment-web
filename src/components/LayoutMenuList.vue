<template>
    <v-list dense class="pt-3">
        <v-list-tile v-for="item in nav" :key="item.text" :to="item.link" exact>
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ item.text }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: "LayoutMenuList",
        props: {
            nav: {type: Array, default: null},
        }
    }
</script>

<style scoped>

</style>