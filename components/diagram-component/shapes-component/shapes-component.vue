<template>
  <g 
  @click="selectElement()"
  @mouseover="mouseOver($event)"
  @mouseout="mouseOut($event)"
  >
    <rect-component
      :class="shape.type"
      :diagramMode="diagramMode"
      v-if="shape.type == 'rect'"
      :data="shape.rect"
      :id="shape._id"
    />
    <triangle-component
      :class="shape.type"
      :diagramMode="diagramMode"
      v-if="shape.type == 'triangle'"
      :data="shape.triangle"
      :id="shape._id"
    />
    <circle-component
      :class="shape.type"
      :diagramMode="diagramMode"
      v-if="shape.type == 'circle'"
      :data="shape.circle"
      :id="shape._id"
    />
    <pencil-component
      :class="shape.type"
      :diagramMode="diagramMode"
      v-if="shape.type == 'pencil'"
      :data="shape.pencil"
      :id="shape._id"
    />
    <line-component
      :class="shape.type"
      :diagramMode="diagramMode"
      v-if="shape.type == 'line'"
      :data="shape.line"
      :id="shape._id"
    />
  </g>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { DiagramMode, Shape, ShapeType } from "../shape-types";
import CircleComponent from "./circle.vue";
import LineComponent from "./line.vue";
import PencilComponent from "./pencil.vue";
import RectangleComponent from "./rectangle.vue";
import TriangleComponent from "./triangle.vue";

@Component({
  components: {
    "rect-component": RectangleComponent,
    "triangle-component": TriangleComponent,
    "circle-component": CircleComponent,
    "pencil-component": PencilComponent,
    "line-component": LineComponent,
  },
})
export default class ShapeComponent extends Vue {
  @Prop({ default: Object, required: true, type: Shape }) shape!: Shape;
  @Prop({ required: true }) diagramMode!: DiagramMode;
  shapeType = ShapeType;

  @Emit("select-element")
  selectElement() {
    return this.shape;
  }

  @Emit("mouse-over")
  mouseOver(e: MouseEvent) {
    return this.shape;
  }

  @Emit("mouse-out")
  mouseOut(e: MouseEvent) {
    return this.shape;
  }
}
</script>

<style>
</style>