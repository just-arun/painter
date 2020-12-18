<template>
  <div
    class="diagram-detail"
    :style="`
  width: ${width}px;
  `"
  >
  <button style="transform: scale(0)" id="focusOut"></button>
    <h1 class="diagram-detail__name" contenteditable="true">{{ data.name }}</h1>

    <div class="input-field shape-position">
      <div style="margin-bottom: 4px">
        <b>Position</b>
      </div>
      <div class="input-field__position">
        <b>X: </b>
        <input v-model="data[data.type].x" type="number" />
        <b>Y: </b>
        <input v-model="data[data.type].y" type="number" />
      </div>
    </div>

    <div class="input-field">
      <b>Type:</b>
      <span style="text-transform: capitalize">{{ data.type }}</span>
    </div>
    <div class="input-field font-size">
      <b>Font Size:</b>
      <input v-model="data[data.type].fontSize" type="number" />
    </div>
    <div class="input-field full-width">
      <textarea v-model="data[data.type].text"></textarea>
    </div>
    <div class="input-field diagram-detail__color-input">
      <b>background: </b>
      <input type="color" v-model="data[data.type].fill" />
    </div>
    <div class="input-field">
      <!-- <select v-model="data[data.type].type">
        <option value="0">Wireframe</option>
        <option value="1">Sticky Note</option>
      </select> -->
      <v-select
      :value="selectList[data[data.type].type]"
      :items="selectList"
      @change="data[data.type].type=$event.value"
      />
    </div>

    <div
      draggable="false"
      class="diagram-detail__resize"
      @mousedown="mouseDown($event)"
      @mouseup="mouseUp($event)"
      @mouseout="mouseUp($event)"
      @mousemove="mouseMove($event)"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
@import "./diagram-detail.scss";
</style>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import selectVue from "~/components/ui/select/select.vue";
import { Shape, ShapeFillType } from "../shape-types";

@Component({
  components: {
    "v-select": selectVue,
  },
})
export default class DiagramDetail extends Vue {
  @Prop({ required: true, default: Object, type: Shape }) data!: Shape;
  width = 220;
  resize = false;
  lastPosition = 0;

  selectList = [
    { label: "Wireframe", value: ShapeFillType.stroke },
    { label: "Sticky Note", value: ShapeFillType.fill },
  ];

  mouseDown(e: MouseEvent) {
    this.lastPosition = e.pageX;
    this.resize = true;
    console.log("start", this.resize);
  }
  mouseUp(e: MouseEvent) {
    this.resize = false;
    console.log("up", this.resize);
  }
  mouseMove(e: MouseEvent) {
    console.log("moving", this.resize);
    if (this.resize) {
      let sw = window.innerWidth;
      let wid = sw - e.pageX;
      if (wid > 200) {
        this.width = wid;
      } else {
        this.width = 200;
      }
    }
  }
}
</script>
