<template>
  <div
    class="diagram-detail"
    :style="`
  width: ${width}px;
  `"
  >
    <div class="diagram-detail__wrapper">
      <button style="transform: scale(0)" id="focusOut"></button>
      <h1
        class="diagram-detail__name"
        contenteditable="true"
        @keyup="updateName($event)"
      >
        {{ data.name }}
      </h1>
      <hr class="divider" />
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
      <hr class="divider" />
      <div class="input-field shape-position">
        <div style="margin-bottom: 4px">
          <b>Dimentions</b>
        </div>
        <div class="input-field__position">
          <b>w: </b>
          <input v-model="data[data.type].w" type="number" />
          <b>h: </b>
          <input v-model="data[data.type].h" type="number" />
        </div>
      </div>
      <hr class="divider" />
      <v-acordian label="Typography">
        <div @keyup="monitorText($event)" class="text-content" contenteditable="true">
          {{ data[data.type].text }}
        </div>
        <div class="input-field font-size">
          <b>Font Size:</b>
          <input v-model="data[data.type].fontSize" type="number" />
        </div>
        <v-color-input
          :value="data[data.type].textColor"
          @change="data[data.type].textColor = $event"
          label="Color:"
        />
      </v-acordian>
      <v-color-input
        :value="data[data.type].fill"
        @change="data[data.type].fill = $event"
        label="Background"
      />
      <div class="input-field">
        <!-- <select v-model="data[data.type].type">
          <option value="0">Wireframe</option>
          <option value="1">Sticky Note</option>
        </select> -->
        <v-select
          :value="selectList[data[data.type].type]"
          :items="selectList"
          @change="data[data.type].type = $event.value"
        />
      </div>
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
import acordianVue from "~/components/ui/acordian/acordian.vue";
import colorInputVue from "~/components/ui/color-input/color-input.vue";
import selectVue from "~/components/ui/select/select.vue";
import { Shape, ShapeFillType } from "../shape-types";

@Component({
  components: {
    "v-select": selectVue,
    "v-acordian": acordianVue,
    "v-color-input": colorInputVue,
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
  updateName(e: any) {
    this.data.name = e.target.textContent;
  }
  monitorText(e: any) {
    if (this.data[this.data.type]) {
      let ele: any = this.data[this.data.type];
      ele.text = e.target.textContent;
    }
  }
}
</script>
