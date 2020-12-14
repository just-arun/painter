<template>
  <div class="diagram-footer">
    <div class="footer-content">
      {{ scale }}
      <input type="range" 
      :value="scale"
      min="2"
      max="1000"
      @input="changeScale($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "diagram-footer",
  props: {
    scale: {
      required: true
    }
  },
  methods: {
    changeScale(e: any) {
      this.$emit('change-scale', e.target.value);
    }
  }
});
</script>

<style scoped lang="scss">
@import "./footer.scss";
</style>