<template>
  <div :class="`diagram-tool ${!!diagramMode ? 'editable' : ''} horizontal`">
    <ul>
      <li v-for="tool in toolList" :key="tool.icon">
        <button
          draggable="false"
          :disabled="!diagramMode"
          :class="`${selected == tool.value ? 'active' : ''}`"
          @click="changeTool(tool.value)"
        >
          <img
            draggable="false"
            :src="require(`./../../../assets/icons/tools/${tool.icon}.svg`)"
            alt=""
          />
          <div class="label">{{ tool.label }}</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { DiagramMode, ShapeFillType } from "../shape-types";

@Component({})
export default class DiagramTool extends Vue {
  @Prop({ required: true, default: String }) selected!: string;
  @Prop({ required: true, default: String }) diagramMode!: DiagramMode;
  @Prop({ required: true }) fillMode!: ShapeFillType;
  tools = [
    { label: "Pencil", value: "pencil", icon: "pencil" },
    { label: "Line", value: "line", icon: "line" },
    { label: "Rectangle", value: "rect", icon: "rectangle" },
    { label: "Poligon", value: "triangle", icon: "triangle" },
    { label: "Circle", value: "circle", icon: "circle" },
    { label: "Text", value: "text", icon: "text" },
    { label: "Image", value: "image", icon: "img", stroke: true },
    // { label: "Import Image", value: "import-image", icon: "import-img", stroke: true },
  ];

  get toolList() {
    return this.tools;
  }

  @Emit("change")
  changeEvent(val: string) {
    return val;
  }

  @Emit("change")
  changeTool(val: string) {
    return val;
  }

  imagePicker() {
    let imagePicker: any = this.$refs.imagePicker
    imagePicker.click();
  }
}
</script>

<style lang="scss" scoped>
@import "./diagram-tool.scss";
</style>
