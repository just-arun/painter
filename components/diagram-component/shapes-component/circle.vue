<template>
  <g>
    <circle
      :stroke-width="data.border"
      :cx="data.x"
      :cy="data.y"
      :r="data.r"
      :fill="fillAble ? data.fill : 'transparent'"
      :stroke="!fillAble ? data.borderColor : 'transparent'"
    />

    <switch :x="data.x" :y="data.y">
      <foreignObject
        :x="data.x - data.r"
        :y="data.y - data.r"
        :width="data.w"
        :height="data.h"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <div class="text-content">
          <div
            class="text-content__value"
            :style="`
            color: ${data.textColor};
            font-size: ${data.fontSize}px;
            font-weight: ${data.fontWeight};
            `"
            ref="textRef"
            :contenteditable="editText && diagramMode == 1"
            @blur="blurOut($event)"
            @keyup="keyUp($event)"
          >
            {{ text }}
          </div>
        </div>
      </foreignObject>
    </switch>
    <rect
      v-if="!editText || diagramMode == 0"
      @dblclick="editTextAction()"
      :x="data.x - data.r"
      :y="data.y - data.r"
      :width="data.w"
      :height="data.h"
      :class="`${data.canMove ? 'grabbing' : 'hand'}`"
      fill="transparent"
      :rx="data.w"
    ></rect>
  </g>
</template>

<style lang="scss" scoped>
.text-content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  overflow: hidden;
  filter: drop-shadow(10px 10px 30px grey);
  &__value {
    outline: none;
    padding: 10px;
  }
}
@import "./../diagram-vars.scss";
.grabbing {
  cursor: url("./../../../#{$grab-cursor}"), auto;
}
.hand {
  cursor: url("./../../../#{$hand-cursor}"), auto;
}
</style>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { DiagramMode, ShapeFillType } from "../shape-types";
import { Circle } from "../shapes-type/circle-type";

@Component({})
export default class CircleComponent extends Vue {
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true, default: Object, type: Circle }) data!: Circle;
  text = this.data.text;
  editText = true;

  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }

  @Watch("diagramMode")
  watchDiagramMode(val: number) {
    this.editText = false;
  }

  @Emit("data.text")
  updateName() {
    if (!this.editText) {
      let elem: any = this.$refs.textRef;
      this.data.text = elem.textContent;
    }
  }

  mounted() {
    this.focusIn();
  }

  keyUp(e: any) {
    this.editText = true;
    this.data.text = e.target.textContent;
  }

  editTextAction() {
    this.editText = true;
    this.focusIn();
  }

  focusIn() {
    let elem: any = this.$refs.textRef;
    elem.focus();
  }

  blurOut(e: any) {
    this.editText = false;
  }
}
</script>