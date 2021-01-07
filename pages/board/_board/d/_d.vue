<template src="./diagram.html"></template>

<script>
import Vue from "vue";
import DiagramBoard from "~/components/diagram-component/diagram-board.vue";
import { io, Socket } from "socket.io-client";
import { ShapeActions } from "~/store/shapes/shapes_actions";
import { DiagramService } from '~/service/diagram';

export default {
  components: {
    "diagram-board-component": DiagramBoard,
  },

  // async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
  //   try {
  //     const { data } = await DiagramService
  //     .getOneDiagram(route.params.d);
  //     return {
  //       diagramName: data.data.name,
  //       shapes: data.data.shapes
  //     }
  //   } catch (err) {
  //     return {
  //       diagramName: "failed",
  //       shapes: []
  //     }
  //   }
  // },
  data() {
    return {
      socket: null,
      title: "some shit"
    };
  },
  head() {
    return {
      title: this.title
    }
  },
  created() {},
  mounted() {
    this.initFun();
  },
  methods: {
    async initFun() {
      let socket = io("http://localhost:8000", {
        withCredentials: true,
      });
      this.socket = socket;
      const {data} = await DiagramService
      .getOneDiagram(this.$route.params.d)
      console.log("connection to socket", data.data.name);
    },
  },
};
</script>

<style lang="scss">
@import "./diagram.scss";
</style>