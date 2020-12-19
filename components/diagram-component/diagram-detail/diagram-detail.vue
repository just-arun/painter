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
      <div class="single-field" style="padding: 10px; 5px;">
        <v-select
          :value="selectList[data[data.type].type]"
          :items="selectList"
          @change="data[data.type].type = $event.value"
        />
      </div>
      <hr class="divider" />
      <div class="input-field shape-position">
        <!-- <div style="margin-bottom: 4px">
          <b>Position</b>
        </div> -->
        <div class="input-field__position">
          <v-input
            label="x:"
            :value.sync="data[data.type].x"
            inputType="number"
            name="xPosition"
          />
          <v-input
            label="y:"
            :value.sync="data[data.type].y"
            inputType="number"
            name="yPosition"
          />
        </div>
        <div class="input-field__position">
          <v-input
            label="h:"
            :value.sync="data[data.type].h"
            inputType="number"
            name="hPosition"
          />
          <v-input
            label="w:"
            :value.sync="data[data.type].w"
            inputType="number"
            name="wPosition"
          />
        </div>
      </div>
      <hr class="divider" />
      <v-acordian label="Border">
          <v-input
          style="padding: 8px 5px;margin: 0px 5px; box-sizing: border-box;"
            label="Width"
            :value.sync="data[data.type].border"
            inputType="number"
            name="border-width"
          />
        <v-color-input
          :value="data[data.type].borderColor"
          @change="data[data.type].borderColor = $event"
          label="Border Color"
        />
      </v-acordian>
      <v-acordian label="Text">
        <div
          @keyup="monitorText($event)"
          @blur="blurTextEvent($event)"
          class="text-content"
          contenteditable="true"
        >
          {{ text }}
        </div>
        <div style="height: 5px"></div>
        <div class="input-field-single">
          <v-input
            style="padding: 6px 5px"
            label="Size:"
            :value.sync="data[data.type].fontSize"
            inputType="number"
            name="fontSize"
          />
          <!-- <div>Size</div>
          <input v-model="data[data.type].fontSize" type="number" /> -->
        </div>
        <v-color-input
          :value="data[data.type].textColor"
          @change="data[data.type].textColor = $event"
          label="Color"
        />
      </v-acordian>
      <v-color-input
        :value="data[data.type].fill"
        @change="data[data.type].fill = $event"
        label="Background"
      />
      <div class="input-field"></div>
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
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import acordianVue from "~/components/ui/acordian/acordian.vue";
import colorInputVue from "~/components/ui/color-input/color-input.vue";
import labelInputVue from "~/components/ui/label-input/label-input.vue";
import selectVue from "~/components/ui/select/select.vue";
import { Shape, ShapeFillType } from "../shape-types";

@Component({
  components: {
    "v-select": selectVue,
    "v-acordian": acordianVue,
    "v-color-input": colorInputVue,
    "v-input": labelInputVue,
  },
})
export default class DiagramDetail extends Vue {
  @Prop({ required: true, default: Object, type: Shape }) data!: Shape;
  width = 220;
  resize = false;
  lastPosition = 0;
  text: string = "";

  constructor() {
    super();
    let text: any = this.data[this.data.type];
    this.text = text.text;
  }

  selectList = [
    { label: "Wireframe", value: ShapeFillType.stroke },
    { label: "Sticky Note", value: ShapeFillType.fill },
  ];

  @Watch("data.rect.text")
  rectText() {
    this.updateRectText();
  }

  @Watch("data.text.text")
  textText() {
    this.updateRectText();
  }

  @Watch("data.triangle.text")
  watchText() {
    this.updateRectText();
  }

  updateRectText() {
    if (this.data[this.data.type]) {
      let ele: any = this.data[this.data.type];
    if (!ele.editText) {
      this.text = ele.text;
    }
    }
  }

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
      if (wid > 220) {
        if (wid < 300) {
          this.width = wid;
        }
      } else {
        this.width = 220;
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

  blurTextEvent() {
    let ele: any = this.data[this.data.type];
    ele.editText = false;
  }
}
</script>
