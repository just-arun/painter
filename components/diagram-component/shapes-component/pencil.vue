<template>
  <g>
    <switch :x="data.x" :y="data.y" v-if="!data.editing">
      <foreignObject
        :x="data.x - 2"
        :y="data.y - 2"
        :width="data.w + 4"
        :height="data.h + 4"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <svg
        :class="`${data.canMove ? 'grabbing' : 'hand'}`"
         :viewBox="viewBox" :width="data.w + 4" :height="data.h + 4">
          <path
            :d="data.path"
            fill="transparent"
            stroke-width="2"
            :stroke="data.fill"
          />
        </svg> </foreignObject
    ></switch>
    <path
      v-if="data.editing"
      :d="data.path"
      fill="transparent"
      stroke-width="2"
      :stroke="data.fill"
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
    this.viewBox = `${this.data.x - 2} ${this.data.y - 2} ${this.data.w + 4} ${
      this.data.h + 4
    }`;
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