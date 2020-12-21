<template>
  <g>
    <circle
      stroke-width="2"
      :cx="data.x"
      :cy="data.y"
      :r="data.r"
      :fill="fillAble ? data.fill : 'transparent'"
      :stroke="!fillAble ? data.fill : 'transparent'"
    />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ShapeFillType } from "../shape-types";
import { Circle } from "../shapes-type/circle-type";

@Component({})
export default class CircleComponent extends Vue {
  @Prop({ required: true, default: Object, type: Circle }) data!: Circle;

  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }
}
</script>

<style>
</style>