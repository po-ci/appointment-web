<template>
    <v-container>
      <v-layout>
        <v-card>
          <v-card-text>
            <layout-logo></layout-logo>
          </v-card-text>

          <v-card-text>
            <p>Plataforma en Construcción! Muy Pronto sistema de turnos online!</p>
          </v-card-text>
        </v-card>
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
