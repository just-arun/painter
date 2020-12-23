<template>
  <div class="shapes-list__wrapper__item">
    <div @click="focusToShape(item)" 
    :class="`
    shapes-list__wrapper__item 
    ${isSelected(item._id) ? 'shapes-list__wrapper__item--active' : ''}
    `" v-for="(item, i) in listShape"
    :key="i"
    :contenteditable="isSelected(item._id) && editName"
    @dblclick="editNameFun()"
    >
      {{ shape.name }}
      {{ isSelected(item._id) }} {{ editName }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Shape } from "../../shape-types";


Component({})
export default class ShapeListItem extends Vue {
  @Prop({ required: true }) selectedElementId!: string[];
  @Prop({ required: true }) shape!: Shape;

  @Emit("is-selected")
  isSelected() {
    return 
  }

  editNameFun() {

  }
};
</script>

<style scoped lang="scss">
</style>