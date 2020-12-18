<template src="./diagram-board.html"></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineComponent } from "@nuxtjs/composition-api";
import diagramToolVue from "./diagram-tool/diagram-tool.vue";
import diagramFooterVue from "./diagram-footer/footer-component.vue";
import { mixins } from "vue-class-component";
import CanvasMixin from "./canvas-mixin";
import {
  DiagramMode,
  RelativePositionType,
  Shape,
  ShapeFillType,
  ShapeType,
} from "./shape-types";
import { Rect } from "./shapes-type/rectangle-type";
import ShapeComponent from "./shapes-component/shapes-component.vue";
import DiagramHeader from "./diagram-header-component/diagram-header-component.vue";
import { Circle } from "./shapes-type/circle-type";
import { Triangle } from "./shapes-type/triangle-type";
import { Pencil } from "./shapes-type/pencil-type";
import { Line } from "./shapes-type/line-type";
import io from "socket.io-client";
import CanvasVarsMixin from './canvas-vars-mixin';
import DiagramDetail from "./diagram-detail/diagram-detail.vue";

@Component({
  components: {
    "d-header": DiagramHeader,
    "d-tool": diagramToolVue,
    "d-footer": diagramFooterVue,
    "d-detail": DiagramDetail,
    "shapes-component": ShapeComponent,
  },
})
export default class DiagramBoard extends mixins(CanvasVarsMixin) {
  mouseImage() {

  }

}
</script>

<style lang="scss" scoped>
@import "./diagram-board.scss";
</style>