<template>
  <div class="color-input">
    <span>{{ label }}</span>
    <input @change="change" type="color" v-model="colorValue" />
    <input @keyup="change" type="text" v-model="colorValue" />
  </div>
</template>

<style lang="scss">
.color-input {
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  box-sizing: border-box;
  margin: 5px;
  padding: 5px;
  overflow: hidden;
  span {
      padding-right: 5px;
  }
  &:focus-within {
    border: 2px solid rgba(128, 128, 128, 0.4);
  }
  input[type="text"] {
    outline: none;
    border: none;
    padding: 5px 10px;
    // outline: 2px solid green;
    width: 65px;
  }
  input[type="color"] {
    padding: 0px;
    border: 0px;
    height: 20px;
    width: 20px;
    min-width: 20px;
    border: 0px !important;
    outline: none;
    width: min-content;
    margin-right: 8px;
    &[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
      border: 0px !important;
    }

    &[type="color"]::-webkit-color-swatch {
      border: 0px !important;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "color-input",
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colorValue: "",
    };
  },
  watch: {
    value(val: any) {
      this.colorValue = val;
    },
  },
  created() {
    this.colorValue = this.value;
  },
  methods: {
    change() {
      this.$emit("change", this.colorValue);
    },
  },
});
</script>