<template>
  <div class="diagram-header">
    <button class="diagram-header__mode">
      <div class="text">
        <span>{{modeList[diagramMode].label}}</span>
        <img :src="require(`./../../../assets/icons/${modeList[diagramMode].icon}.svg`)" alt="" />
      </div>
      <ul>
        <li @click="changeMode(item.value)" v-for="(item, j) in diagramModeList()" :key="`mode-${j}`" >
          <span>{{ item.label }}</span>
          <img :src="require(`./../../../assets/icons/${item.icon}.svg`)" alt="" />
        </li>
      </ul>
    </button>
    <div class="diagram-name">
        <div ref="name" @blur="nameFocusOut()" class="name" contenteditable="true">
          {{ name }}
        </div>
    </div>
    <div class="users">
      <button class="users__avatar" v-for="(item, i) in users" :key="i" 
      :style="`z-index: ${ind()[i]}`">
        <img :src="require(`~/assets/${item.img}`)" alt="">
      </button>
    </div>
    <button ref="placeholder" style="transform:scale(0)"></button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: "diagram-header",
  props: {
    name: {
      type: String,
      required: true
    },
    diagramMode: {
      required: true
    }
  },
  data() {
    return {
      modeList: [
        { label: 'View', value: 0, icon: 'eye' },
        { label: 'Edit', value: 1, icon: 'edit' },
      ],
      users: [
        { img: 'av1.jpeg' },
        { img: 'av2.jpeg' },
        { img: 'av3.jpg' },
      ]
    }
  },
  created() {
    
  },
  methods: {
    diagramModeList() {
      return this.modeList.filter((res) => {
        if (res.value != this.diagramMode) {
          return res;
        }
      })
    },
    ind() {
      let index = [];
      for (let i = 0; i < this.users.length; i++) {
        index.push(this.users.length - i);
      }
      return index;
    },
    nameFocusOut() {
      let name: any = this.$refs.name
      let content: any = name.textContent;
      if (!!content) {
        this.$emit("update-name", content);
      }
    },
    changeMode(val: string) {
      this.$emit("switch-mode", val);
      let placeholder: any = this.$refs.placeholder;
      placeholder.focus();
    }
  }
});
</script>

<style lang="scss" scoped>
@import "./diagram-header.scss";
</style>