<template>
  <div class="login-page">
    <login-component type="login"></login-component>
  </div>
</template>

<script>
import LoginComponent from "~/components/login/login.component.vue";
export default {
  layout: "login",
  components: {
    "login-component": LoginComponent,
  },
};
</script>

<style>
</style>