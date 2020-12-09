<template src="./diagram-board.html"></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineComponent } from "@nuxtjs/composition-api";
import diagramHeaderComponentVue from "./diagram-header-component/diagram-header-component.vue";
import diagramToolVue from "./diagram-tool/diagram-tool.vue";
import diagramFooterVue from "./diagram-footer/footer-component.vue";
import { mixins } from "vue-class-component";
import CanvasMixin from './canvas-mixin';
import { DiagramMode, ShapeType } from "./shape-types";

@Component({
  components: {
    "d-header": diagramHeaderComponentVue,
    "d-tool": diagramToolVue,
    "d-footer": diagramFooterVue,
  },
})
export default class DiagramBoard extends mixins(CanvasMixin) {
  name = "undefined";
  diagramMode: DiagramMode = DiagramMode.Edit
  selectedTool: ShapeType | null = null;
  
  
  updateName(e: string) {
    this.name = String(e).trim();
  }

  updateSelectedTool(val: ShapeType) {
    this.selectedTool = val;
  }

  switchMode(val: DiagramMode) {
    this.diagramMode = val
  }
}
</script>

<style lang="scss" scoped>
@import "./diagram-board.scss";
</style>