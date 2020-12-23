<template src="./shapes-list.html"></template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Shape } from "../shape-types";

@Component({})
export default class ShapeList extends Vue {
  @Prop({ required: true }) shapes!: Shape[];
  @Prop({ required: true }) selectedElement!: string[];
  @Prop({ required: true }) show!: boolean;
  width = 220;
  resize = false;
  search = "";
  editName = false;

  get listShape() {
    return this.shapes.filter((item) => {
      if (
        item
        .name
        .toLowerCase()
        .indexOf(
          String(this.search)
        .toLowerCase()) != -1
      ) {
        return item;
      }
    });
  }

  @Emit("focus-to-shape")
  focusToShape(shape: Shape) {
    return shape;
  }

  @Emit("toggle-show")
  toggleShow() {
    // this.editName = false;
    return !this.show;
  }

  @Watch("selectedElement")
  updateEditName(oldVal: any) {
    if (oldVal != this.selectedElement) {
      this.editName = false;
    }
  }

  editNameFun() {
    this.editName = true;
  }

  mouseDown() {
    this.resize = true;
  }

  mouseUp() {
    this.resize = false;
    let elem: any = this.$refs.shapeList;
    elem.style.transition = '.3s';
  }

  mouseMove(e: MouseEvent) {
    let elem: any = this.$refs.shapeList;
    elem.style.transition = '0s';
    if (this.resize) {
      if (e.clientX > 200 && e.clientX < 400) {
        this.width = e.clientX;
      }
    }
  }

  isSelected(id: string) {
    return this.selectedElement.includes(id);
  }
}
</script>

<style lang="scss">
@import "./shapes-list.scss";
</style>