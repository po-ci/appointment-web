<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      disable-route-watcher
      :fixed="fixed"
      app
      :mini-variant="miniVariant"
      :clipped="clipped"
    >

      <layout-menu-list :nav="nav" v-on:closeDrawer="drawer = false"></layout-menu-list>


    </v-navigation-drawer>

    <v-toolbar color="primary" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <layout-toolbar-logo></layout-toolbar-logo>
      <v-spacer></v-spacer>
      <slot name="toolbar"></slot>
      <login-toolbar></login-toolbar>
    </v-toolbar>

    <v-content class="grey lighten-3">
      <slot></slot>
    </v-content>

    <v-footer color="primary" app>
      <span class="white--text">Son.Riu &copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

  import LayoutMenuList from './LayoutMenuList'
  import LayoutToolbarLogo from './LayoutToolbarLogo'
  import LoginToolbar from './LoginToolbar'

  export default {
    components: {LayoutMenuList, LayoutToolbarLogo, LoginToolbar},
    props: {
      nav: {type: Array, default: null}
    },
    data: () => ({
        drawer: false,
        clipped: true,
        miniVariant: false,
        fixed: true,
        title: 'Son.Riu',
      }
    )
  }
</script>
