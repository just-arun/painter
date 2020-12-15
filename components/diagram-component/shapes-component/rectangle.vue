<template>
  <g class="rect">
    <rect
      :x="data.x"
      :y="data.y"
      stroke-width="2"
      :height="data.h"
      :width="data.w"
      :fill="fillAble ? data.fill : 'transparent'"
      :stroke="!fillAble ? data.fill : 'transparent'"
    />
    
  </g>
</template>
<style scoped lang="scss">

</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from "vue-property-decorator";
import CanvasMixin from "../canvas-mixin";
import { DiagramMode, ShapeFillType } from "../shape-types";
import { Rect } from "../shapes-type/rectangle-type";

@Component({})
export default class RectangleComponent extends Mixins(CanvasMixin) {
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true, type: String }) id!: string;
  @Prop({ required: true, default: Object, type: Rect }) data!: Rect | null;

  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }

  @Emit("select-element")
  clickEvent() {
    return;
  }
}
</script>