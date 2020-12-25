<template>
  <div class="label-input">
    <label :for="name">{{ label }}</label>
    <input
      :readonly="readonly"
      :id="name"
      :type="inputType"
      :value="value"
      @input="emitChange($event)"
    />
  </div>
</template>

<style lang="scss">
.label-input {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 2px 0px;
    margin-right: 5px;
    padding-left: 5px;
    border: 2px solid transparent;
    &:hover {
        border: 2px solid rgba(128, 128, 128, 0.1);
    }
    &:focus-within {
        border: 2px solid rgb(0, 255, 242);
    }
    label {
        padding-right: 5px;
        height: 20px;
        flex: 1;
        color: grey;
    }
    input {
        border: none;
        outline: none;
        width: 65px;
        background: transparent;
    }
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "label-input",
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
    },
    value: {
      required: true,
    },
    readonly: {
      default: false,
    }
  },
  data() {
    return {};
  },
  methods: {
    emitChange(event: any) {
      console.log(event);
      this.$emit('update:value', event.target.value);
      // this.$emit('change', event.target.value)
    }
  }
});
</script>