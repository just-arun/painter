<template>
  <div
    class="diagram-detail"
    :style="`
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
        name="Shape Type"
          :value="selectList[data[data.type].type]"
          :items="selectList"
          @change="data[data.type].type = $event.value"
        />
      </div>
      <hr class="divider" />
      <div class="input-field shape-position">
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
          v-if="hideTextCondition"
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
      <v-acordian 
        label="Text"
        v-if="hideTextCondition"
      >
        <div style="padding: 0px 5px">
          <div
          ref="textRef"
          @keyup="monitorText($event)"
          @blur="blurTextEvent($event)"
          :class="`text-content ${!text.length ? 'empty' : ''}`"
          contenteditable="true"
        >
          {{ text }}
        </div>
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
          name="Font Weight"
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
      <div  class="single-field" style="padding: 10px; 5px;">
        <v-select
            labelName="name"
            style="width: 100%; z-index: 2"
            name="Link Shape"
            :items="shapesNameList"
            @change="addLink($event)"
          />
      </div>
        <!-- <v-search-option
          :items="shapesNameList"
        /> -->
        <ul class="linked-shapes">
          <li style="display: flex;"
           v-for="(item, i) in data.links" :key="`itm-${i}`">
            <span style="flex: 1;" @click="$emit('new-select', item._id)">{{ getName(item) }}</span>
            <button @click="removeLink(item)">
              &Cross;
            </button>
          </li>
        </ul>
        <!-- <button @click="saveBtn()">save as svg</button> -->
        <div style="height: 300px"></div>
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
import { Vue, Component, Prop, Watch, Emit, Mixins } from "vue-property-decorator";
import acordianVue from "~/components/ui/acordian/acordian.vue";
import colorInputVue from "~/components/ui/color-input/color-input.vue";
import labelInputVue from "~/components/ui/label-input/label-input.vue";
import SearchOption from "~/components/ui/search-with-option/search-with-option.vue";
import selectVue from "~/components/ui/select/select.vue";
import ToggleButton from "~/components/ui/toggle-button/toggle-button.vue";
import { ArrayFunction } from "../array-functions";
import { Shape, ShapeFillType } from "../shape-types";
import { FontWeight } from "../shapes-text-util";

@Component({
  components: {
    "v-select": selectVue,
    "v-acordian": acordianVue,
    "v-color-input": colorInputVue,
    "v-input": labelInputVue,
    "v-toggle-button": ToggleButton,
    "v-search-option": SearchOption
  },
})
export default class DiagramDetail extends Mixins(ArrayFunction) {
  @Prop({ required: true, default: Object, type: Shape }) data!: Shape;
  @Prop({ required: true }) shapesName!: { name: string, _id: string }[];
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

  getName(id: string) {
    let res = this.shapesName.find((res) => {
      if (res._id == id) {
        return res;
      }
    });
    return !!res ? res.name : 'not found'
  }

  get shapesNameList() {
    return this.shapesName.filter((res) => {
      if (res._id !== this.data._id) {
        if (!this.data.links.includes(res._id)) {
          return res;
        }
      }
    })
  }

  @Watch("data._id")
  updateNewShape() {
    let data: any = this.data;
    let ele: any = this.$refs.textRef;
    this.text = "";
    setTimeout(() => {
      if (!!ele) {
        ele.textContent = data[data.type]?.text;
        this.text = data[data.type]?.text;
      }

      let nameEle: any = this.$refs.nameRef;
      if (!!nameEle) {
        nameEle.textContent = data.name;
      }
    }, 500);
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

  get hideTextCondition() {
    return !(this.data.type == "pencil" || this.data.type == 'line')
  }

  @Emit("data-change")
  removeLink(id: string) {
    this.data.removeLink(id);
  }


  @Emit("data-change")
  addLink(data: any) {
    this.data.addLinks(data._id);
  }

  @Emit("update-selected")
  updateSelected(key: any, val: any) {
    const cb = (shape: any) => {
      shape[shape.type][key] = val;
    }
    return cb;
  }

  saveBtn() {
    let elem = document.querySelector(`#shape-${this.data._id}`);
    let payload = elem?.outerHTML.toString();
    let data: any = this.data[this.data.type];
    let svg = `
    <svg
    viewBox="${data.x} ${data.y} ${data.w} ${data.h}"
    height="${data.h}"
    width="${data.w}"
    >
    ${payload}
    </svg>
    `;

    let parser = new DOMParser();
    let doc = parser.parseFromString(svg, "image/svg+xml").querySelector("svg");

    console.log(doc);

    this.saveSvg(doc, `${this.data.name}.svg`);
  }
}
</script>
