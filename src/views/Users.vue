<template>
  <div>
    <div>
      <users-crud></users-crud>
    </div>
  </div>
</template>

<script>
  import UsersCrud from '../layout/components/UsersCrud'

  export default {
    name: "users",
    components: {
      UsersCrud
    }
  }
</script>
