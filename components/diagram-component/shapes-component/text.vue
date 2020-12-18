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
        stroke: red;
        font-size: 18px;
        padding: 20px 0px;
        cursor: ${!disableText ? 'text' : 'default' };
        `"
        :contenteditable="!disableText"
        @keyup="keyUp($event)"
        @dblclick="disableText=false"
        @focusout="disableText=true"
        >{{ data.text }}</div>
      </foreignObject>
    </switch>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DiagramMode } from "../shape-types";
import { TextClass } from "./../shapes-type/text-type";

@Component({})
export default class TextComponent extends Vue {
  @Prop({ default: Object, required: true, type: TextClass }) data!: TextClass;
  @Prop({ required: true }) diagramMode!: DiagramMode;
  
  disableText = false;

  keyUp(e: any) {
    let h = e.target.clientHeight;
    this.data.h = h;
  }

  get getOutline() {
    return !!(this.data.text.length) ? 'none' : '2px solid grey'
  }

  focusThis(e: any) {
    console.log(e);
  }


  constructor() {
    super();
  }
}
</script>

<style>
</style>