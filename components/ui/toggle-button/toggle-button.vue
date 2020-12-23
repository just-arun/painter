<template>
  <div class="toggle-button">
    <div v-for="(item, i) in items" :key="i">
      <input
        v-model="value"
        @input="$emit('update:value', item.value)"
        :id="`${name}-${item.value}`"
        :name="name"
        :value="item.value"
        type="radio"
      />
      <label :for="`${name}-${item.value}`">
        <img :src="require(`./../../../assets/icons/${item.img}.svg`)" alt="" />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ToggleButton extends Vue {
  @Prop({ required: true }) value!: string;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) items!: string[];

  @Emit("change")
  changeFunc(val: any) {
    return val;
  }
}
</script>

<style lang="scss" scoped>
.toggle-button {
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: space-between;
  margin: 4px 0px;
  input {
    display: none;
    &:checked {
      & + label {
        // background: rgb(0, 255, 213);
        outline: 1px solid grey;
        cursor: pointer;
      }
    }
  }
  label {
    padding: 6px;
    display: inline-block;
    margin: 2px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>