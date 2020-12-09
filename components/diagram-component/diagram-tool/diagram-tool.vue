<template>
  <div class="diagram-tool">
    <ul>
        <li v-for="tool in tools" :key="tool.icon">
            <button :class="`${selected == tool.value ? 'active' : ''}`" @click="changeTool(tool.value)">
                <img :src="require(`./../../../assets/icons/tools/${tool.icon}.svg`)" alt="">
            </button>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "diagram-tool",
  props: {
    selected: {
      type: String
    }
  },
  data() {
    return {
        tools: [
            { label: 'Pencil', value: 'pencil', icon: 'pencil' },
            { label: 'Line', value: 'line', icon: 'line' },
            { label: 'Rectangle', value: 'rect', icon: 'rectangle' },
            { label: 'Triangle', value: 'triangle', icon: 'triangle' },
            { label: 'Circle', value: 'circle', icon: 'circle' },
        ]
    };
  },
  methods: {
    changeTool(val) {
      this.$emit("change", val)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./diagram-tool.scss";
</style>
