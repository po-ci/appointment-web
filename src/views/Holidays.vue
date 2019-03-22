<template>
  <div>
    <holidays-crud></holidays-crud>
  </div>
</template>

<script>
  import HolidaysCrud from '../components/HolidaysCrud'

  export default {
    name: "Holidays",
    components: {
      HolidaysCrud
    }
  }
</script>
