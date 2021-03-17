<template>
  <div class="dashboard-layout">
    <dashboard-header />
    <dashboard-aside />
    <div class="dashboard-layout__content">
        <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import DashboardAside from '~/components/dashboard/aside/dashboard-aside.vue'
import DashboardHeaderComponent from '~/components/dashboard/header/dashboard-header.vue'

export default Vue.extend({
    components: {
        "dashboard-header": DashboardHeaderComponent,
        "dashboard-aside": DashboardAside
    }
})
</script>
<style lang="scss" scoped>
@import "./styles/dashboard.scss";
</style>
