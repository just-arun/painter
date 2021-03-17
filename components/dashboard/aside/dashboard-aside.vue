<template src="./dashboard-aside.html"></template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class DashboardAside extends Vue {
    links = [
        { label: "Home", to: "/dashboard/home" },
        { label: "Organisations", to: "/dashboard/organisations" },
        { label: "Projects", to: "/dashboard/projects" },
        { label: "Diagrams", to: "/dashboard/diagrams" },
    ]
}
</script>

<style lang="scss" scoped>
@import "./dashboard-aside.scss";
</style>