<template>
  <div
    class="diagram-detail"
    :style="`
  `"
  >
    <div class="tabs">
      <button @click="tab = 0" :class="`tab ${tab == 0 ? 'selected' : ''}`">
        Diagram
      </button>
      <button v-if="data.length == 1" @click="tab = 1" :class="`tab ${tab == 1 ? 'selected' : ''}`">
        Click through
      </button>
    </div>
    <!-- <button @click="saveDiagram()">Save as SVG</button> -->
    <v-shape-detail
    v-if="data.length == 1"
    :data.sync="data[0]"
    :shapesName="shapesName" 
    @data-change="$emit('data-change', $event)" 
    @update-selected="$emit('update-selected', $event)" 
    ></v-shape-detail>
  </div>
</template>
<style lang="scss" >
@import "./diagram-detail.scss";
</style>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Mixins } from "vue-property-decorator";
import acordianVue from "~/components/ui/acordian/acordian.vue";
import colorInputVue from "~/components/ui/color-input/color-input.vue";
import labelInputVue from "~/components/ui/label-input/label-input.vue";
import SearchOption from "~/components/ui/search-with-option/search-with-option.vue";
import selectVue from "~/components/ui/select/select.vue";
import ToggleButton from "~/components/ui/toggle-button/toggle-button.vue";
import { ArrayFunction } from "../array-functions";
import { Shape, ShapeFillType } from "../shape-types";
import { FontWeight } from "../shapes-text-util";
import ShapeDetail from "./shape-detail/shape-detail.vue";

@Component({
  components: {
    "v-select": selectVue,
    "v-acordian": acordianVue,
    "v-color-input": colorInputVue,
    "v-input": labelInputVue,
    "v-toggle-button": ToggleButton,
    "v-search-option": SearchOption,
    "v-shape-detail": ShapeDetail,
  },
})
export default class DiagramDetail extends Mixins(ArrayFunction) {
  @Prop({ required: true, default: Object }) data!: Shape[];
  @Prop({ required: true }) shapesName!: { name: string, _id: string }[];
  
  tab = 0;

  @Watch("data")
  watchData() {
    this.tab = 0;
  }

  getElementDimention() {

  }

  saveDiagram() {
    let svgEle = document.querySelector("#mainSvg");
    console.log(svgEle);
    this.saveSvg(svgEle, "some.svg")
  }
  
}
</script>
