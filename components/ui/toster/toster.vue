<template>
  <div class="app-toster-list">
    <div class="app-toster-list__item" v-for="(item, i) in $store.state.toster.data" :key="i">
      <div :class="`app-toster-list__item__message ${types[item.type]}`">{{ item.message }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-toster-list {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
  &__item {
    position: relative;
    padding: 10px;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.1);
    margin: 10px 5px;
    min-width: 200px;
    max-height: 3rem;
    min-height: 1rem;
    position: relative;
    font-size: 0.8rem;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    &--error {
      color: rgb(248, 0, 0);
    }
    &--success {
      color: rgb(0, 168, 0);
    }
    &--error::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 4px;
      background: rgb(255, 0, 191);
    }
    &--success {
      &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 4px;
        background: rgb(0, 255, 170);
      }
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface Toster {
  message: string;
  type: "error" | "success";
}

@Component({})
export default class AppToster extends Vue {
  types = {
    success: "app-toster-list__item--success",
    error: "app-toster-list__item--error",
  };

  get tosters() {
    return;
  }
}
</script>
