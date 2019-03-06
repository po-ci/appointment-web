<template>
  <div>
    <div>
      <users-table></users-table>
    </div>
  </div>
</template>

<script>
  import UsersTable from '../components/UsersTable'

  export default {
    name: "users",
    components: {
      UsersTable
    }
  }
</script>
