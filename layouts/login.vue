<template>
  <div class="login-layout">
    <Nuxt />
    <v-toster />
  </div>
</template>
<style scoped lang="scss">
@import "./styles/login.scss";
</style>
<script lang="ts">
import Vue from 'vue'
import AppToster from '~/components/ui/toster/toster.vue'
export default Vue.extend({
  components: {
    "v-toster": AppToster
  }
})
</script>