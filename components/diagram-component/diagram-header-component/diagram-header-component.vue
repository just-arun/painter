<template>
  <div class="diagram-header">
    <div class="tool-section">
      <button class="diagram-header__mode">
      <div class="text">
        <span>{{ modeList[diagramMode].label }}</span>
        <img
          :src="
            require(`./../../../assets/icons/${modeList[diagramMode].icon}.svg`)
          "
          alt=""
        />
      </div>
      <ul>
        <li
          @click="changeMode(item.value)"
          v-for="(item, j) in diagramModeList()"
          :key="`mode-${j}`"
        >
          <span>{{ item.label }}</span>
          <img
            :src="require(`./../../../assets/icons/${item.icon}.svg`)"
            alt=""
          />
        </li>
      </ul>
    </button>
    
    <button class="diagram-header__tool-mode">
      <div class="text">
        <span>{{ fillModeVal[fillMode] }}</span>
      </div>
      <ul>
        <li
          @click="changeFillMode(item.value)"
          v-for="(item, j) in fillModeList()"
          :key="`fill-mode-${j}`"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </button>
    </div>

    <div class="diagram-name">
      <div
        v-if="editName"
        tabindex="-1"
        id="name"
        ref="name"
        @blur="nameFocusOut($event)"
        class="name"
        contenteditable="true"
      >{{ name }}</div>
      <div v-if="!editName" class="name" @click="editNameFun()">
        <b>{{ this.$route.params.board }}</b> / {{ name }}
      </div>
    </div>
    <div class="users">
      <button
        class="users__avatar"
        v-for="(item, i) in users"
        :key="i"
        :style="`z-index: ${ind()[i]}`"
      >
        <img :src="require(`~/assets/${item.img}`)" alt="" />
      </button>
    </div>
    <button ref="placeholder" style="transform: scale(0)"></button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DiagramMode, ShapeFillType } from "../shape-types";

@Component({})
export default class DiagramHeader extends Vue {
  @Prop({}) name!: string;
  @Prop({}) diagramMode!: DiagramMode;
  @Prop({}) fillMode!: ShapeFillType;

  modeList = [
    { label: "View", value: 0, icon: "eye" },
    { label: "Edit", value: 1, icon: "edit" },
  ];
  fillModeVal = {
    1: "Sticky Note",
    0: "Wireframe",
  };
  fillModeList() {
    return [
      { label: "Sticky Note", value: ShapeFillType.fill },
      { label: "Wireframe", value: ShapeFillType.stroke },
    ].filter((itm) => {if(itm.value != this.fillMode) return itm;});
  }
  editName = false;
  users = [{ img: "av1.jpeg" }, { img: "av2.jpeg" }, { img: "av3.jpg" }];
  created() {}
  diagramModeList() {
    return this.modeList.filter((res) => {
      if (res.value != this.diagramMode) {
        return res;
      }
    });
  }
  ind() {
    let index = [];
    for (let i = 0; i < this.users.length; i++) {
      index.push(this.users.length - i);
    }
    return index;
  }
  nameFocusOut(e: Event) {
    let name: any = this.$refs.name;
    let content: any = name.textContent;
    if (!!content) {
      this.$emit("update-name", content);
    } else {
      e.preventDefault();
    }
    // window.location.hash = '';
    this.editName = false;
  }
  editNameFun() {
    this.editName = true;
    // window.location.hash = '#name';
    setTimeout(() => {
      let doc: any = document;
      doc.querySelector("#name").focus();
    }, 1000);
  }
  changeMode(val: string) {
    this.$emit("switch-mode", val);
    let placeholder: any = this.$refs.placeholder;
    placeholder.focus();
  }
  changeFillMode(val: ShapeFillType) {
    this.$emit("change-fill-mode", val);
    let placeholder: any = this.$refs.placeholder;
    placeholder.focus();
  }
}
</script>

<style lang="scss" scoped>
@import "./diagram-header.scss";
</style>