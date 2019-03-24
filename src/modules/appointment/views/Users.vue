<template>
  <div>
    <div>
      <users-crud></users-crud>
    </div>
  </div>
</template>

<script>
  import UsersCrud from '../../user-crud/components/UsersCrud'

  export default {
    name: "users",
    components: {
      UsersCrud
    }
  }
</script>
