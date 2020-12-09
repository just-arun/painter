<template src="./diagram.html"></template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  watch,
  watchEffect,
  reactive,
  toRefs,
  toRef,
  onMounted,
} from "@nuxtjs/composition-api";
import DiagramBoard from "~/components/diagram-component/diagram-board.vue";



export default defineComponent({
  components: {
    "diagram-board-component": DiagramBoard,
  },
});
</script>

<style lang="scss">
@import "./diagram.scss";
</style>