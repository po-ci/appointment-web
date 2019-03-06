<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-6">
          <v-card-title primary-title class="title pb-0">
            Usuarios
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex md6 xs12>
                <v-btn color="info">
                  Nuevo Usuario
                </v-btn>
              </v-flex>
              <v-flex md6 xs12>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  class="pa-0"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-data-table
              class="mt-3"
              :headers="headers"
              :items="getUsers"
              :search="search">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.username}}</td>
                <td>{{ props.item.email }}</td>
                <td v-if="props.item.active == 1">
                  <v-icon
                    color="primary">check_circle
                  </v-icon>
                </td>
                <td v-else>
                  <v-icon color="error">highlight_off</v-icon>
                </td>
                <td>{{ props.item.phone }}</td>
                <td>
                  <v-icon
                    small
                    @click="">lock
                  </v-icon>
                </td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click=""
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click=""
                  >
                    delete
                  </v-icon>

                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "UsersTable",
    data() {
      return {
        headers: [
          {text: 'Nombre', value: 'name'},
          {text: 'Usuario', value: 'user'},
          {text: 'Email', value: 'email'},
          {text: 'Active', value: 'active', sortable: false},
          {text: 'Phone', value: 'phone'},
          {text: 'Password', value: 'password', sortable: false},
          {text: 'Aciones', value: 'acciones', sortable: false},
        ],
        search: '',
      }
    },
    computed: {
      ...mapGetters(['getUsers'])
    },
    methods: {
      ...mapActions(['allUsers'])
    },
    mounted() {
      this.allUsers()
    }
  }
</script>
