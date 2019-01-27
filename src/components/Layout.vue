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
                hide-overlay
        >



            <layout-menu-list :nav="nav"></layout-menu-list>


        </v-navigation-drawer>

        <v-toolbar color="pink" dark fixed app clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <layout-toolbar-logo></layout-toolbar-logo>
            <v-spacer></v-spacer>
            <login-account></login-account>
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
    import LayoutToolbarLogo from './LayoutToolbarLogo'
    import LoginAccount from './LoginAccount'

    export default {
        components: {LayoutMenuList, LayoutLogo, LayoutToolbarLogo, LoginAccount},
        data: () => ({
                drawer: false,
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
                        text: 'About',
                        link: {name: "about"}
                    },
                ]

            }
        ),
        props: {
            source: String
        }
    }
</script>