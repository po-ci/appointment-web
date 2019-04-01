<template>
  <v-container class="grey lighten-3">

    <v-layout row wrap>
      <v-flex class="pa-2" xs12 sm12 md6 offset-md3>
        <v-card class="elevation-12">
          <v-card-title primary-title>
            <div>
              <h3 class="headline">Mis Turnos</h3>
              <div> A continuación se muestra los turnos reservados</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>


    <!--List of Appointments-->
    <v-layout row wrap>
      <v-flex class="pa-2" xs12 sm12 md6 offset-md3>
        <v-tabs
          v-model="active"
          color="primary"
          dark
          slider-color="yellow"
        >

          <v-tab :key="'pending'" ripple>Activos</v-tab>
          <v-tab :key="'cancelled'" ripple>Cancelados</v-tab>
          <!--          <v-tab :key="'expired'" ripple>Vencidos</v-tab>-->
          <v-tab :key="'all'" ripple>Todos</v-tab>


          <v-tab-item :key="'pending'">
            <template v-if="getCalendarLoading">
              <v-layout column align-center justify-center class="pa-3">
                <span class="primary--text headline d-block">Cargando Turnos</span>
                <v-progress-circular
                  class="mt-3"
                  :size="100"
                  :width="6"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-layout>
            </template>

            <template v-else-if="pendingAppointment.length > 0">
              <v-flex class="pa-0 mt-2" v-for="appointment in pendingAppointment">
                <my-appointments-view :appointment="appointment"
                                      @dialogCancel="appointmentsCancel"></my-appointments-view>
              </v-flex>
            </template>

            <template v-else>
              <v-layout fill-height align-center justify-center class="pa-3">
                <span class="primary--text headline">No hay turnos activos</span><br>
              </v-layout>
            </template>

          </v-tab-item>

          <v-tab-item :key="'cancelled'">

            <template v-if="getCalendarLoading">
              <v-layout column align-center justify-center class="pa-3">
                <span class="primary--text headline d-block">Cargando Turnos</span>
                <v-progress-circular
                  class="mt-3"
                  :size="100"
                  :width="6"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-layout>
            </template>

            <template v-else-if="cancelledAppointment.length > 0">
              <v-flex class="pa-0 my-2" v-for="appointment in cancelledAppointment">
                <my-appointments-view :appointment="appointment"
                                      @dialogCancel="appointmentsCancel"></my-appointments-view>
              </v-flex>
            </template>

            <template v-else>
              <v-layout fill-height align-center justify-center class="pa-3">
                <span class="primary--text headline">No hay turnos cancelados</span><br>
              </v-layout>
            </template>

          </v-tab-item>

          <!--          <v-tab-item :key="'expired'">
                      <v-flex class="pa-0 my-2"  v-for="appointment in expiredAppointment">
                        <my-appointments-view :appointment="appointment"></my-appointments-view>
                      </v-flex>
                    </v-tab-item>-->

          <v-tab-item :key="'all'">
            <template v-if="getCalendarLoading">
              <v-layout column align-center justify-center class="pa-3">
                <span class="primary--text headline d-block">Cargando Turnos</span>
                <v-progress-circular
                  class="mt-3"
                  :size="100"
                  :width="6"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-layout>
            </template>

            <template v-else-if="orderAppointments.length > 0">

              <v-flex class="pa-0 mb-2" v-for="appointment in orderAppointments">
                <my-appointments-view :appointment="appointment"
                                      @dialogCancel="appointmentsCancel"></my-appointments-view>
              </v-flex>
            </template>

            <template v-else>
              <v-layout fill-height align-center justify-center class="pa-3">
                <span class="primary--text headline">No hay turnos</span><br>
              </v-layout>
            </template>

          </v-tab-item>

        </v-tabs>
      </v-flex>


    </v-layout>


    <v-dialog
      v-model="dialogCancel"
      max-width="500"
    >

      <v-card v-if="getFlashMessageAppointment != null">
        <v-card-text>

          <v-alert
            :value="true"
            :color="getResultAppointment?'success':'error'"
            icon="check_circle"
            outline>
            {{getFlashMessageAppointment}}
          </v-alert>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="grey"
            flat="flat"
            @click="dialogCancel = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else>
        <v-card-title class="title" primary-title>
          Desea cancelar este turno?
        </v-card-title>
        <v-card-text>
          Si cancela el turno no se podrá recuperar nuevamente, y en tal caso deberá solicitar uno nuevo.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            flat="flat"
            @click="dialogCancel = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            :loading="getAppointmentsLoading"
            @click="cancelAppointment(appointmentCancel)"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>

  </v-container>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex'
  import MyAppointmentsView from './MyAppointmentsView'

  export default {
    name: "MyAppointments",
    components: {MyAppointmentsView},
    data: () => ({
      active: 'pendientes',
      dialogCancel: false,
      appointmentCancel: null,
      cancel: false
    }),
    computed: {
      ...mapGetters([
        'getAppointments',
        'getCalendarLoading',
        'pendingAppointment',
        'cancelledAppointment',
        'expiredAppointment',
        'orderAppointments',
        'getFlashMessageAppointment',
        'getAppointmentsLoading',
        'getResultAppointment'
      ])
    },
    methods: {
      ...mapActions([
        'cancelAppointment'
      ]),
      appointmentsCancel(appointment) {
        this.dialogCancel = true
        this.appointmentCancel = appointment
      }
    },

  }
</script>

<style scoped>

</style>
