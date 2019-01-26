<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                enable-resize-watcher
                persistent
                :fixed="fixed"
                app
                :mini-variant="miniVariant"
                :clipped="clipped"
        >

            <layout-logo></layout-logo>

            <layout-menu-list :nav="nav"></layout-menu-list>


        </v-navigation-drawer>

        <v-toolbar color="pink" dark fixed app clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>

        <v-content>

                <slot></slot>


        </v-content>

        <v-footer color="pink" app>
            <span class="white--text">Son.Riu &copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>

    import LayoutMenuList from './LayoutMenuList'
    import LayoutLogo from './LayoutLogo'

    export default {
        components: {LayoutMenuList, LayoutLogo},
        data: () => ({
                drawer: null,
                clipped: true,
                miniVariant: false,
                fixed: true,
                title: 'Son.Riu',
                nav: [
                    {
                        icon: 'home',
                        text: 'Home',
                        link: {name: "home"}

                    },
                    {
                        icon: 'contact_mail',
                        text: 'Abaut',
                        link: {name: "abaut"}
                    },
                ]

            }
        ),
        props: {
            source: String
        }
    }
</script>