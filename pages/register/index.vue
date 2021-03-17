<template>
  <div class="login-page">
      <auth-form
      type="register"
      ></auth-form>
  </div>
</template>

<script>
import LoginComponent from '~/components/login/login.component.vue'

export default {
    layout: 'login',
    components: {
        'auth-form': LoginComponent
    }
}
</script>

<style>

</style>