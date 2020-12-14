<template>
  <g :id="id">
    <line 
    :x1="data.x"
    :y1="data.y"
    :x2="data.x1"
    :y2="data.y1"
      :style="`stroke: ${data.fill};stroke-width:2`" 
    />
  </g>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Line } from '../shapes-type/line-type';

@Component({})
export default class LineComponent extends Vue {
    @Prop({ type: String, required: true }) id!: string;
    @Prop({ type: Line, required: true, default: Object }) data!: Line;
}
</script>

<style>

</style>