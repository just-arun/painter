<template>
  <button class="v-select">
    <div>{{ typeof value == "object" ? value.label : value }}</div>
    <ul class="v-select__list">
      <li v-for="(item, i) in items" :key="i" @click="update(item)">
        {{ typeof item == "object" ? item.label : item }}
      </li>
    </ul>
  </button>
</template>
<style scoped lang="scss">
@import "./select.scss";
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Select",
  props: {
    value: {
      required: true,
    },
    items: {
      required: true,
    },
  },
  methods: {
    update(val: any) {
      this.$emit("change", val);
      let focusOut: any = document.querySelector("#focusOut");
      focusOut.focus();
    },
  },
});
</script>
