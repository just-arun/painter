<template>
  <g :id="id">
    <polygon
      stroke-width="2"
      :points="data.points"
      :fill="fillAble ? data.fill : 'transparent'"
      :stroke="!fillAble ? data.fill : 'transparent'"
    />
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ShapeFillType } from "../shape-types";
import { Triangle } from "../shapes-type/triangle-type";

@Component({})
export default class TriangleComponent extends Vue {
  @Prop({ required: true, type: String }) id!: string;
  @Prop({ required: true, type: Triangle, default: Object }) data!: Triangle;

  get fillAble() {
    return this.data?.type == ShapeFillType.fill;
  }
}
</script>

<style lang="scss" scoped>
</style>