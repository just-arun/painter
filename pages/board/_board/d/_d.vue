<template src="./diagram.html"></template>

<script lang="ts">
import Vue from 'vue';
import DiagramBoard from '~/components/diagram-component/diagram-board.vue';

export default Vue.extend({
  components: {
    "diagram-board-component": DiagramBoard,
  },
  data() {
    return {}
  }
});
</script>

<style lang="scss">
@import "./diagram.scss";
</style>