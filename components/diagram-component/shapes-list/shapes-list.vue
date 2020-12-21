<template src="./shapes-list.html"></template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Shape } from "../shape-types";

@Component({})
export default class ShapeList extends Vue {
  @Prop({ required: true }) shapes!: Shape[];
  width = 220;
  resize = false;
  show = true;
  search = "";

  get listShape() {
    return this.shapes.filter((item) => {
      if (item.name.indexOf(this.search) != -1) {
        return item;
      }
    });
  }

  @Emit("focus-to-shape")
  focusToShape(shape: Shape) {
    return shape;
  }

  mouseDown() {
    this.resize = true;
  }

  mouseUp() {
    this.resize = false;
  }

  mouseMove(e: MouseEvent) {
    if (this.resize) {
      if (e.clientX > 200 && e.clientX < 400) {
        this.width = e.clientX;
      }
    }
  }
}
</script>

<style lang="scss">
@import "./shapes-list.scss";
</style>