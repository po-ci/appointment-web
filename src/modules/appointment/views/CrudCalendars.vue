<template>

  <div>
    <CalendarsTable></CalendarsTable>
  </div>


</template>

<script>
  import CalendarsTable from '../components/CalendarsCrud'

  export default {
    name: 'CrudCalendarsView',
    components: {
      CalendarsTable
    }
  }
</script>
