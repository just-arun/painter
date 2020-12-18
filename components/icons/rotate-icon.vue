<template>
  <switch :x="x" :y="y">
    <foreignObject
      :x="x"
      :y="y"
      width="24"
      height="24"
      requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
    >
    <img height="24" width="24" src="./../../assets/icons/rotate.svg" alt="">
    </foreignObject>
  </switch>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "rotate-icon",
  props: {
    x: {
      required: true,
      type: Number,
    },
    y: {
      required: true,
      type: Number,
    },
  },
});
</script>

<style>
</style>