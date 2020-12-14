<template>
  <g :id="id">
    <switch
    :x="data.x"
    :y="data.y"
    >
      <foreignObject
        :x="data.x"
        :y="data.y"
        :width="data.w"
        :height="data.h"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
      <p>
          {{ data.text }}
      </p>
      </foreignObject>
    </switch>
  </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TextClass } from './../shapes-type/text-type';

export default class TextComponent extends Vue {
    @Prop({ required: true, type: String }) id!: string;
    @Prop({ default: Object, required: true, type: TextClass }) data!: TextClass
};
</script>

<style>
</style>