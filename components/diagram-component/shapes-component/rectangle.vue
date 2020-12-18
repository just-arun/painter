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
    <switch :x="data.x" :y="data.y">
      <foreignObject
        :x="data.x"
        :y="data.y"
        :width="data.w"
        :height="data.h"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
      <div style="
      height: 100%;
      max-height: 100%;
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      ">
      <div
      ref="localRef"
       :contenteditable="textEdit"
      @blur="blurTextEvent()"
      @dblclick="textEdit=true"
      @keyup="keyUp($event)"
      :style="`
      cursor: ${textEdit ? 'text' : 'grab'};
      padding: 2px 15%;
      outline: none;
      user-select: none;
      font-size: ${data.fontSize}px;
      max-width: ${data.w}px;
      `" :autofocus="textEdit">{{text}}</div>
      </div>
      </foreignObject>
    </switch>
  </g>
</template>
<style scoped lang="scss">

</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins, Watch } from "vue-property-decorator";
import CanvasMixin from "../canvas-mixin";
import { DiagramMode, ShapeFillType } from "../shape-types";
import { Rect } from "../shapes-type/rectangle-type";

@Component({})
export default class RectangleComponent extends Mixins(CanvasMixin) {
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true, default: Object, type: Rect }) data!: Rect | null;
  textEdit=true;
  text: any = "";

  @Watch("data.text")
  watchText(text: string) {
    this.text = this.data?.text;
    this.resizeText();
  }

  created() {
    this.text = this.data?.text;
  }

  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }

  @Emit("select-element")
  clickEvent() {
    return;
  }

  keyUp(e: any) {
    this.updateText(e);
    let hei = e.target.clientHeight;
    this.resizeText();
  }

  resizeText() {
    let ele: any = this.$refs.localRef;
    let hei = ele.clientHeight;
    let rHei: any = this.data?.h;
    let calc = rHei - hei;
      let data: any = this.data
    if (calc < 10) {
      data.fontSize -= 1;
    }
  }

  updateText(e: any) {
    if (this.data) {
      let text = e.target.textContent;
      this.data.text = text;
    }
  }

  blurTextEvent() {
    this.textEdit = false;
  }
}
</script>