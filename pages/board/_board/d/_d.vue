<template src="./diagram.html"></template>

<script lang="ts">
import DiagramBoard from "~/components/diagram-component/diagram-board.vue";
import { Component, Vue } from 'vue-property-decorator';


@Component({
  components: {
    "diagram-board-component": DiagramBoard,
  }
})
export default class DiagramPage extends Vue {
  socket: any;
  constructor() {
    super();
  }
};
</script>

<style lang="scss">
@import "./diagram.scss";
</style>