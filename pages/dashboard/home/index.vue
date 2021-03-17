<template src="./dashboard.html"></template>
<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
    layout: "dashboard"
})
export default class DashboardPage extends Vue {
    
}
</script>
<style lang="scss" scoped>
@import "./dashboard.scss";
</style>