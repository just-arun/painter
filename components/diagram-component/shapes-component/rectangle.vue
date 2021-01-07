<template>
  <g class="rect-wrapper">
    <!-- <text
      :x="data.x"
      :y="data.y - 20">
      {{ id }}
    </text> -->
    <rect
      :rx="data.rx"
      :x="data.x"
      :y="data.y"
      :stroke-width="data.border"
      :height="data.h"
      :width="data.w"
      :fill="fillAble ? data.fill : '#f4f4f4'"
      :stroke="!fillAble ? data.borderColor : 'transparent'"
    />
    <switch :x="data.x" :y="data.y">
      <foreignObject
        :x="data.x"
        :y="data.y"
        :width="data.w"
        :height="data.h"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
      <div :style="`
      height: 100%;
      max-height: 100%;
      display: flex;
      overflow: hidden;
      align-items: ${data.alignItem};
      justify-content: ${data.justifyContent};
      `">
      <div
      ref="localRef"
       :contenteditable="textEdit"
      @blur="blurTextEvent()"
      @keyup="keyUp($event)"
      :id="`text-${id}`"
      class="text-content"
      :style="`
      cursor: ${textEdit ? 'text' : 'grab'};
      font-size: ${data.fontSize}px;
      max-width: ${data.w}px;
      color: ${data.textColor};
      font-weight: ${data.fontWeight};
      text-align: ${alignText[data.justifyContent]}
      `" :autofocus="textEdit">{{text}}</div>
      </div>
      </foreignObject>
    </switch>
    <rect 
      :class="`${grabClass} editor`"
      v-if="!textEdit"
      @dblclick="focusOnInput()"
      @mousedown="mouseDown($event)"
      :x="data.x"
      :y="data.y"
      :width="data.w"
      :height="data.h"
      fill="transparent"
      stroke="transparent"
     />
  </g>
</template>
<style scoped lang="scss">
@import "./../diagram-vars.scss";
.text-content {
  padding: 2px 15%;
  outline: none;
  user-select: none;
}
.grabbing {
  cursor: url("./../../../#{$grab-cursor}"), auto;
}
.hand {
  cursor: url("./../../../#{$hand-cursor}"), auto;
}

.rect {
  cursor: url('./../../../#{$rectangle-cursor}'), auto;
}
.circle {
  cursor: url('./../../../#{$circle-cursor}'), auto;
}
.line {
  cursor: crosshair !important;
}
</style>
<script lang="ts">
import { Vue, Component, Prop, Emit, Mixins, Watch } from "vue-property-decorator";
import CanvasMixin from "../canvas-mixin";
import { DiagramMode, ShapeFillType } from "../shape-types";
import { Rect } from "../shapes-type/rectangle-type";

@Component({})
export default class RectangleComponent extends Mixins(CanvasMixin) {
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true, default: Object, type: Rect }) data!: Rect;
  @Prop({ required: true, default: String }) id!: string;
  @Prop({}) selectedTool?: any;

  get grabClass() {
    if (!this.selectedTool) {
      return `${this.data.canMove ?'grabbing' : 'hand'}`;
    }
    return this.selectedTool;
  }

  textEdit=true;
  text: any = this.data?.text;

  alignText = {
    "flex-start": "left",
    "center": "center",
    "flex-end": "right",
  }

  @Watch("data.text")
  watchText(text: string) {
    if (this.data?.editText) {
      let ele: any = document.querySelector(`#text-${this.id}`);
      ele.textContent = this.data?.text;
    }
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
    this.data.editText = false;
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
    this.data.editText = true;
  }

  focusOnInput() {
    this.textEdit = true;
    let input: any = document.querySelector(`#text-${this.id}`);
    setTimeout(() => {
      input.focus();
    }, 100);
  }

  mouseDown(evt: MouseEvent) {
    
  }
}
</script>