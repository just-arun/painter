<template>
  <g>
    <polygon
      stroke-width="2"
      :points="data.points"
      :fill="fillAble ? data.fill : 'transparent'"
      :stroke="!fillAble ? data.borderColor : 'transparent'"
    />
    <switch :x="data.x" :y="data.y">
      <foreignObject
        :x="data.x"
        :y="data.y + 20"
        :width="data.w"
        :height="data.h - 20"
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
      <div :contenteditable="textEdit"
      @blur="blurTextEvent()"
      @keyup="keyUp($event)"
      ref="textRef"
      class="text-content"
      :style="`
      cursor: ${textEdit ? 'text' : 'grab'};
      color: ${data.textColor};
      font-size: ${data.fontSize}px;
      max-width: ${data.w}px;
      `" :autofocus="textEdit">{{text}}</div>
      </div>
      </foreignObject>
    </switch>
    <rect 
    :class="`${data.canMove ?'grabbing' : 'hand'}`"
    @dblclick="textEdit=true"
    v-if="!textEdit"
    :x="data.x"
    :y="data.y"
    :width="data.w"
    :height="data.h"
    fill="transparent"
    stroke="transparent"
    ></rect>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ShapeFillType } from "../shape-types";
import { Triangle } from "../shapes-type/triangle-type";

@Component({})
export default class TriangleComponent extends Vue {
  @Prop({ required: true, type: Triangle, default: Object }) data!: Triangle;

  textEdit=true;
  text: any = "";

  @Watch("data.text")
  watchText(text: string) {
    if (!this.textEdit) {
      this.updateText();
    }
  }

  created() {
    this.text = this.data?.text;
  }


  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }

  keyUp(e: any) {
    this.textEdit = true;
    // this.text = e.target.textContent;
    this.data.text = e.target.textContent;
    let hei = e.target.clientHeight;
    let rHei: any = this.data?.h;
    let calc = rHei - hei;
    let data: any = this.data;
    if (calc < 10) {
      data.fontSize -= 1;
    }
  }

  updateText() {
    let text: any = this.$refs.textRef
    text.textContent = this.data.text;
  }

  blurTextEvent() {
    this.textEdit = false;
  }
}
</script>

<style lang="scss" scoped>
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
</style>