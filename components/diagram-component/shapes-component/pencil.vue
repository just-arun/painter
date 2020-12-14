<template>
  <g :id="id">
    <path
      :d="data.path"
      fill="transparent"
      stroke-width="2"
      :stroke="data.fill"
    />
  </g>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ShapeFillType } from "../shape-types";
import { Pencil } from "../shapes-type/pencil-type";

@Component({})
export default class PencilComponent extends Vue {
  @Prop({ required: true, type: String }) id!: string;
  @Prop({ required: true, type: Pencil, default: Object }) data!: Pencil;
}
</script>

<style>
</style>