<template>
  <v-container fluid fill-height class="grey lighten-3">
    <v-layout justify-center>
      <v-flex xs12>
        <v-card >
          <v-card-text class="text-xs-center">
            <layout-logo></layout-logo>
          </v-card-text>

          <v-card-text class="text-xs-center" >
            <p>Plataforma en Construcción! Muy Pronto sistema de turnos online!</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import LayoutLogo from '../layout/components/LayoutLogo'

  export default {
    name: 'Home',
    components: {
      LayoutLogo
    }
  }
</script>
