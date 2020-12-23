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
        ref="nameRef"
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
          style="padding: 8px 5px; margin: 0px 5px; box-sizing: border-box"
          label="Width"
          :value.sync="data[data.type].border"
          inputType="number"
          name="border-width"
        />
        <v-input
          style="padding: 8px 5px; margin: 0px 5px; box-sizing: border-box"
          label="Smooth"
          :value.sync="data[data.type].rx"
          inputType="number"
          name="border-width"
        />
        <v-color-input
          v-if="data[data.type].borderColor"
          :value="data[data.type].borderColor"
          @change="data[data.type].borderColor = $event"
          label="Border Color"
        />
      </v-acordian>
      <v-acordian label="Text">
        <div
          ref="textRef"
          @keyup="monitorText($event)"
          @blur="blurTextEvent($event)"
          :class="`text-content ${!text.length ? 'empty' : ''}`"
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
        </div>
        <div class="input-field-single" style="padding: 10px; 5px;">
          <v-select
            style="width: 100%; z-index: 2"
            :value="data[data.type].fontWeight"
            :items="fontWeight"
            @change="updateFontWeight($event)"
          />
        </div>
        <v-color-input
          v-if="data[data.type].textColor"
          :value="data[data.type].textColor"
          @change="data[data.type].textColor = $event"
          label="Color"
        />
        <div class="flexd" style="display: flex;">
          <v-toggle-button
          :value.sync="data[data.type].alignItem"
          @change="vAlign=$event"
          name="vAlign"
          :items="vitems"
          />
          <v-toggle-button
          :value.sync="data[data.type].justifyContent"
          @change="hAlign=$event"
          name="hAlign"
          :items="hitems"
          />
        </div>
      </v-acordian>
      <v-color-input
        v-if="data[data.type].fill"
        :value="data[data.type].fill"
        @change="data[data.type].fill = $event"
        label="Background"
      />
      <div class="input-field"></div>
    </div>

    <!-- <div
      draggable="false"
      class="diagram-detail__resize"
      @mousedown="mouseDown($event)"
      @mouseup="mouseUp($event)"
      @mouseout="mouseUp($event)"
      @mousemove="mouseMove($event)"
    ></div> -->
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
import ToggleButton from "~/components/ui/toggle-button/toggle-button.vue";
import { Shape, ShapeFillType } from "../shape-types";
import { FontWeight } from "../shapes-text-util";

@Component({
  components: {
    "v-select": selectVue,
    "v-acordian": acordianVue,
    "v-color-input": colorInputVue,
    "v-input": labelInputVue,
    "v-toggle-button": ToggleButton,
  },
})
export default class DiagramDetail extends Vue {
  @Prop({ required: true, default: Object, type: Shape }) data!: Shape;
  width = 240;
  resize = false;
  lastPosition = 0;
  text: string = "";
  fontWeight = FontWeight;

  vAlign = "center";
  hAlign = "center";
  hitems = [
    { name: "vertical", value: "flex-start", img: "h_align_left" },
    { name: "vertical", value: "center", img: "h_align_center" },
    { name: "vertical", value: "flex-end", img: "h_align_right" },
  ];
  vitems = [
    { name: "horizontal", value: "flex-start", img: "v_align_top" },
    { name: "horizontal", value: "center", img: "v_align_center" },
    { name: "horizontal", value: "flex-end", img: "v_align_bottom" },
  ];

  constructor() {
    super();
    let text: any = this.data[this.data.type];
    this.text = text.text;
  }

  selectList = [
    { label: "Wireframe", value: ShapeFillType.stroke },
    { label: "Sticky Note", value: ShapeFillType.fill },
  ];

  @Watch("data._id")
  updateNewShape() {
    let data: any = this.data;
    let ele: any = this.$refs.textRef;
    ele.textContent = data[data.type]?.text;
    this.text = data[data.type]?.text;

    let nameEle: any = this.$refs.nameRef;
    nameEle.textContent = data.name;
  }

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
  }
  mouseUp(e: MouseEvent) {
    this.resize = false;
  }
  mouseMove(e: MouseEvent) {
    if (this.resize) {
      let sw = window.innerWidth;
      let wid = sw - e.pageX;
      if (wid > 240) {
        if (wid < 340) {
          this.width = wid;
        }
      } else {
        this.width = 240;
      }
    }
  }

  updateName(e: any) {
    this.data.name = e.target.textContent;
  }

  monitorText(e: any) {
    if (this.data[this.data.type]) {
      let ele: any = this.data[this.data.type];
      ele.editText = true;
      ele.text = e.target.textContent;
    }
  }

  blurTextEvent() {
    let ele: any = this.data[this.data.type];
    ele.editText = false;
  }

  updateFontWeight(val: any) {
    let data: any = this.data;
    data[data.type].fontWeight = val;
  }
}
</script>
