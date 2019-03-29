<template>
  <v-container fluid fill-height grid-list-lg class="grey lighten-3">
    <v-layout row wrap>

      <v-flex xs12 md3>
        <!--        <h1>Atajos</h1>
                <v-divider class="mb-3 primary"></v-divider>-->

        <v-card v-if="!isLogin" color="teal darken-2" class="white--text mb-3" to="/my-appointments">
          <v-card-title primary-title>
            <v-icon dark x-large class="pr-2">assignment_ind</v-icon>

            <div>
              <div class="headline">INICIAR SESION</div>
              <span>Ingresa con tu cuenta o registrate.</span>
            </div>
          </v-card-title>
        </v-card>

        <v-card color="blue  darken-2" class="white--text mb-3" to="/my-appointments">
          <v-card-title primary-title>
            <v-icon dark x-large class="pr-2">event_note</v-icon>

            <div>
              <div class="headline">VER TURNOS</div>
              <span>Revisá tus turnos</span>
            </div>
          </v-card-title>
        </v-card>

        <v-card color="deep-purple darken-2" class="white--text" to="/appointments">
          <v-card-title primary-title>
            <v-icon dark x-large class="pr-2">add_to_photos</v-icon>

            <div>
              <div class="headline">SOLICITAR TURNOS</div>
              <span>Solicitá un nuevo turno con SonRiu</span>
            </div>
          </v-card-title>
        </v-card>

      </v-flex>

      <v-flex xs12 md7>
        <v-card color="primary" dark>
          <v-card-title>
            <h1 class="font-weight-light display-3 ">SON.RIU</h1>
          </v-card-title>
          <!--    <v-card-text class="text-xs-center white">
                <layout-logo></layout-logo>
              </v-card-text>-->

          <v-card-text class="text-xs-left white black--text">
            <p>Bienvenidos a la plataforma web para gestion de turnos de Son.Riu!</p>
            <p>Solicitar un turno es muy facil, solo tenes que tener una cuenta en nuestra web, si aun no estas
              registrado,
              podes
              <router-link to="/register">crear una cuenta desde aqui</router-link>
              o bien
              <router-link to="/login">iniciar sesión desde aqui</router-link>
            </p>
            <p>La solicitud de turnos se realiza en 3 pasos muy sencillos:</p>

            <ol>
              <li>Seleccionar la agenda</li>
              <li>Elegir el dia</li>
              <li>Confirmar el horario <strong>Listo!</strong></li>
            </ol>
            <br>
            <p>Te enviaremos un correo con la confirmación de tu turno. Tambien podras revisar los
              <router-link to="/appointments">turnos agendados desde aqui</router-link>
            </p>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import LayoutLogo from '../../layout/components/LayoutLogo'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Home',
    components: {
      LayoutLogo
    },
    computed: {
      ...mapGetters(['isLogin'])
    }
  }
</script>
