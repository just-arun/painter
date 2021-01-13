<template>
  <button class="v-select">
    <div v-if="value">{{ typeof value == "object" ? value[labelN] : value }}</div>
    <div v-else>{{ name }}</div>
    <ul class="v-select__list">
      <li v-for="(item, i) in itemList" :key="i" @click="update(item)">
        {{ typeof item == "object" ? item[labelN] : item }}
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
      
    },
    items: {
      required: true,
      type: Array
    },
    labelName: {
      type: String
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      labelN: ""
    }
  },
  computed: {
    itemList(): any {
      return this.items.filter((res: any) => {
        if (this.value != res) {
          return res;
        }
      })
    }
  },
  methods: {
    update(val: any) {
      this.$emit("change", val);
      let focusOut: any = document.querySelector("#focusOut");
      focusOut.focus();
    },
  },
  created() {
    this.labelN = !!this.labelName ? this.labelName : 'label';
  }
});
</script>
