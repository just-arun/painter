<template>
  <g class="rect">
    <switch :x="data.x" :y="data.y">
      <foreignObject
        :x="data.x"
        :y="data.y"
        :height="data.h"
        :width="data.w"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <div class="image">
          <img draggable="false" src="./../../../assets/image.png" alt="">
        </div>
      </foreignObject>
    </switch>
  </g>
</template>
<style scoped lang="scss">
.image {
  position: relative;
  height: 100%;
  width: 100%;
  user-select: none;
  img {
    user-select: none;
    height: 100%;
    width: 100%;
    position: relative;
  }
}
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins } from "vue-property-decorator";
import CanvasMixin from "../canvas-mixin";
import { DiagramMode, ShapeFillType } from "../shape-types";
import { ImageClass } from "../shapes-type/image-type";
import { Rect } from "../shapes-type/rectangle-type";

@Component({})
export default class OutlineImageComponent extends Mixins(CanvasMixin) {
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true, default: Object, type: ImageClass })
  data!: ImageClass;

  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }

  @Emit("select-element")
  clickEvent() {
    return;
  }
}
</script>