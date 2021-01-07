<template>
  <g>
      <foreignObject :x="x" :y="y" width="17" height="18">
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="17"
        height="18"
      >
        <rect width="16.4842" height="18" :fill="fill" />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M0.142905 0.0537697L16.5611 9.18878C11.318 9.23549 6.80054 12.8937 5.66474 18.0125L0.142905 0.0537697Z"
          :fill="fill"
        />
      </g>
    </svg>
  </foreignObject>
  </g>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class UserCursor extends Vue {
    @Prop({ required: true }) x!: number;
    @Prop({ required: true }) y!: number;
    @Prop({ required: true }) fill!: string;
}
</script>

<style>
</style>