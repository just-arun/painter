<template>
  <g>
    <switch :x="data.x" :y="data.y" v-if="!data.editing">
      <foreignObject
        :x="data.x - (2 * data.border)"
        :y="data.y - (2 * data.border)"
        :width="data.w + (4 * data.border)"
        :height="data.h + (4 * data.border)"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <svg
          :class="`${data.canMove ? 'grabbing' : 'hand'}`"
          :viewBox="viewBox"
          :width="data.w + ( 4 * data.border)"
          :height="data.h + (4 * data.border)"
        >
          <path
            stroke-linejoin="round"
            :d="data.path"
            fill="transparent"
            :stroke-width="data.border"
            :stroke="data.fill"
          />
        </svg> </foreignObject
    ></switch>
    <path
      v-if="data.editing"
      :d="data.path"
      fill="transparent"
      :stroke-width="data.border"
      :stroke="data.fill"
      stroke-linejoin="round"
    />
  </g>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ShapeFillType } from "../shape-types";
import { Pencil } from "../shapes-type/pencil-type";

@Component({})
export default class PencilComponent extends Vue {
  @Prop({ required: true, type: Pencil, default: Object }) data!: Pencil;
  viewBox = `0 0 100 100`;

  created() {
    this.updateBox();
  }

  @Watch("data.editing")
  updateBox() {
    let b = this.data.border;
    this.viewBox = `${this.data.x - 2 * b} ${this.data.y - 2 * b} ${
      this.data.w + 4 * b
    } ${this.data.h + 4 * b}`;
  }
}
</script>

<style scoped lang="scss">
@import "./../diagram-vars.scss";
.grabbing {
  cursor: url("./../../../#{$grab-cursor}"), auto;
}
.hand {
  cursor: url("./../../../#{$hand-cursor}"), auto;
}
</style>