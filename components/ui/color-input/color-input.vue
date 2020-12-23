<template>
  <button class="color-input cus-component">
    <div class="label">{{ label }}</div>
    <div class="color-pallet" :style="`background: ${colors}`"></div>
    <div style="padding-left: 10px; width: 100px">{{ value }}</div>
    <div class="pick">
      <color-picker-c
      @input="change" 
      v-model="colors"
      />
    </div>
  </button>
</template>

<style lang="scss">
.color-input {
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  box-sizing: border-box;
  margin: 5px;
  padding: 5px;
  // overflow: hidden;
  border: 2px solid transparent;
  position: relative;
  &:hover {
    border: 2px solid rgba(128, 128, 128, 0.1);
  }
  &:focus-within {
    border: 2px solid rgb(0, 255, 242);
  }
  span {
    padding-right: 5px;
    flex: 1;
    color: grey;
  }
  input[type="text"] {
    outline: none;
    border: none;
    padding: 5px 10px;
    // outline: 2px solid green;
    width: 105px;
    // background: #000;
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
    // background-color: grey;
    // box-shadow: 1px 1px 2px grey,
    //     -1px -1px 2px rgb(255, 255, 255);
    filter: drop-shadow(0.5px 0.5px 4px rgba(128, 128, 128, 0.3));
    &[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
      // border: 0px !important;
    }
    &[type="color"]::-webkit-color-swatch {
      border: 0px !important;
    }
  }

  &.cus-component {
    background: transparent;
    outline: none;
    // width: 210px;
    .label {
      width: 90px;
      text-align: left;
    }
    .color-pallet {
      height: 24px;
      width: 24px;
      filter: drop-shadow(0.5px 0.5px 4px rgba(128, 128, 128, 0.3));
      cursor: pointer;
    }
    &:focus {
      .pick {
        display: block;
      }
    }
    &:focus-within {
      .pick {
        display: block;
      }
    }
    .pick {
      display: none;
      position: absolute;
      // height: 500px;
      bottom: -20px;
      left: -103%;
      z-index: 2;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import { Sketch, Chrome } from "vue-color";

export default Vue.extend({
  name: "color-input",
  components: {
    "color-picker": Sketch,
    "color-picker-c": Chrome,
  },
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
      colors: "#194D33A8",
    };
  },
  watch: {
    value(val: any) {
      if (typeof val == "string") {
        this.colors = val;
      }
    },
  },
  created() {
    this.colors = this.value;
  },
  methods: {
    change(value: any) {
      if (!!value) {
        this.$emit("change", value);
      }
      let color: any = this.colors;
      console.log(color.hex8);
      this.$emit("change", color.hex8);
    },
    hexToRGB(hex: string, a: number) {
      var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

      if (a) {
        return { r, g, b, a };
      } else {
        return { r, g, b, a: 1 };
      }
    },
  },
});
</script>