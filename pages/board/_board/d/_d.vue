<template src="./diagram.html"></template>

<script>
import Vue from "vue";
import DiagramBoard from "~/components/diagram-component/diagram-board.vue";
import { io, Socket } from "socket.io-client";
import { ShapeActions } from "~/store/shapes/shapes_actions";

export default {
  components: {
    "diagram-board-component": DiagramBoard,
  },
  data() {
    return {
      socket: null,
    };
  },
  created() {},
  mounted() {
    this.initFun();
  },
  methods: {
    initFun() {
      let socket = io("http://localhost:8000", {
        withCredentials: true,
      });
      this.socket = socket;
    },
  },
};
</script>

<style lang="scss">
@import "./diagram.scss";
</style>