<template>
  <g>
    <switch :x="data.x" :y="data.y">
      <foreignObject
        :x="data.x"
        :y="data.y"
        :width="data.w"
        :height="data.h"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <div autofocus="true" :style="`
        outline: ${getOutline};
        min-width: 20px !important;
        max-width: 100%;
        min-height: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: ${edit ? 'text' : 'default' };
        `"
        :id="`text-${id}`"
        :contenteditable="edit"
        @keyup="keyUp($event)"
        @blur="blurTextEvent()"
        >{{ text }}</div>
      </foreignObject>
    </switch>
    <rect
    v-if="!edit"
    @dblclick="edit=true"
    :x="data.x"
    :y="data.y"
    :height="data.h"
    :width="data.w"
    fill="transparent"
    stroke="transparent"
     />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DiagramMode } from "../shape-types";
import { TextClass } from "./../shapes-type/text-type";

@Component({})
export default class TextComponent extends Vue {
  @Prop({ default: Object, required: true, type: TextClass }) data!: TextClass;
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true, default: String }) id!: string;
  edit = true;
  text: any = this.data?.text;

  keyUp(e: any) {
    let h = e.target.clientHeight;
    this.data.h = h;
    this.data.editText = false;
    this.updateText(e);
  }

  updateText(e: any) {
    let text = e.target.textContent;
    this.data.text = text;
  }


  @Watch("data.text")
  watchText(text: string) {
    if (this.data.editText) {
      let ele: any = document.querySelector(`#text-${this.id}`);
      ele.textContent = this.data?.text;
      this.data.h = ele.clientHeight;
    }
  }

  get getOutline() {
    return !!(this.data.text.length) ? 'none' : '2px solid grey'
  }

  focusThis(e: any) {
    console.log(e);
  }


  focusOnInput() {
    this.edit = true;
    let input: any = document.querySelector(`#text-${this.id}`);
    setTimeout(() => {
      input.focus();
    }, 100);
  }

  blurTextEvent() {
    this.edit = false;
    this.data.editText = true;
  }

  constructor() {
    super();
  }
}
</script>

<style>
</style>