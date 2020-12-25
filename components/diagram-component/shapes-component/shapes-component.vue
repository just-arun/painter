<template>
  <g
    @dragover="dragOver($event)"
    @dragleave="dragLeave($event)"
    :dropzone="true"
    @drop="onDrop($event)"
    @mousedown="mouseDown($event)"
    class="shape"
    :id="`shapeWrapper${shape._id}`"
  >
    <text
      :class="`name editor ${stagingShape == shape._id ? 'focused' : ''}`"
      :x="getNamePos.x"
      :y="getNamePos.y - 6"
      >{{ shape.name }}</text
    >
    <path
      v-if="stagingShape == shape._id && diagramMode == 1"
      :d="getPath"
      class="editor"
      fill="transparent"
      :stroke="`${dashedOutline ? 'red' : 'rgb(0, 119, 255)'}`"
    />
    <text
      v-if="stagingShape == shape._id"
      :x="sizeVal.x"
      :y="sizeVal.y"
      class="editor"
      :style="`
    font-size: 8px;
    fill: rgb(0, 119, 255);
    `"
    >
      {{ Math.floor(shape[shape.type].h) }} x
      {{ Math.floor(shape[shape.type].w) }}
    </text>
    <g
      @click="selectElement()"
      @mouseover="mouseOver($event)"
      @mouseout="mouseOut($event)"
    >
      <rect-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'rect'"
        :data="shape.rect"
        :id="shape._id"
      />
      <outline-image-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'image'"
        :data="shape.image"
      />
      <triangle-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'triangle'"
        :data="shape.triangle"
      />
      <circle-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'circle'"
        :data="shape.circle"
      />
      <pencil-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'pencil'"
        :data="shape.pencil"
      />
      <line-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'line'"
        :data="shape.line"
      />
      <text-component
        :class="shape.type"
        :diagramMode="diagramMode"
        v-if="shape.type == 'text'"
        :data="shape.text"
        :id="shape._id"
      />
    </g>
    <g class="editor" v-if="diagramMode == 1 && showClose">
      <switch :x="getNamePos.x + getNamePos.w + 5" :y="getNamePos.y - 15">
        <foreignObject
          v-if="showClose"
          :x="getNamePos.x + getNamePos.w - 5"
          :y="getNamePos.y - 18"
          width="24"
          height="24"
          requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
          :class="`close-btn ${stagingShape == shape._id ? 'focused' : ''}`"
        >
          <button @click="deleteShape()">
            <img
              width="24px"
              height="24px"
              src="./../../../assets/icons/close.svg"
              alt=""
            />
          </button>
        </foreignObject>
      </switch>
    </g>
    <switch class="editor" :x="getNamePos.x - 20" :y="getNamePos.y - 20">
      <foreignObject
        v-if="showClose"
        :x="getNamePos.x - 20"
        :y="getNamePos.y - 20"
        width="24"
        height="24"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
        :class="`close-btn ${stagingShape == shape._id ? 'focused' : ''}`"
      >
      <button
      v-if="diagramMode == 1"
        @dragstart="onDragStart($event)"
        draggable="true"
        >
        <img
        :id="`drager-${shape._id}`"
          height="20"
          width="20"
          src="./../../../assets/icons/link.svg"
          alt=""
        />
        </button>
      </foreignObject
    ></switch>
  </g>
</template>

<style lang="scss">
.close-btn {
  text-align: left;
  display: none;
  &.focused {
    display: block;
  }
  button {
    height: 20px;
    width: 20px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    background: white;
    &:focus {
      display: flex;
    }
  }
}

.focused {
  opacity: 1;
  transform: translateY(0px);
}

.shape {
  position: relative;
  cursor: grab;
  .name {
    opacity: 0;
    font-size: 8px;
    transform: translateY(10px);
    transition: 0.3s cubic-bezier(1, -0.05, 0.71, 1);
  }
  &:hover {
    .name {
      @extend .focused;
    }
    .close-btn {
      display: block;
    }
  }
}
</style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { DiagramMode, Shape, ShapeType } from "../shape-types";
import CircleComponent from "./circle.vue";
import LineComponent from "./line.vue";
import OutlineImageComponent from "./outline-image.vue";
import PencilComponent from "./pencil.vue";
import RectangleComponent from "./rectangle.vue";
import TextComponent from "./text.vue";
import TriangleComponent from "./triangle.vue";

@Component({
  components: {
    "rect-component": RectangleComponent,
    "outline-image-component": OutlineImageComponent,
    "triangle-component": TriangleComponent,
    "circle-component": CircleComponent,
    "pencil-component": PencilComponent,
    "line-component": LineComponent,
    "text-component": TextComponent,
  },
})
export default class ShapeComponent extends Vue {
  @Prop({ default: Object, required: true, type: Shape }) shape!: Shape;
  @Prop({ required: true }) diagramMode!: DiagramMode;
  @Prop({ required: true }) stagingShape!: string;
  shapeType = ShapeType;
  menuOptions = [{ label: "" }];
  dashedOutline = false;

  @Emit("select-element")
  selectElement() {
    return this.shape;
  }

  @Emit("delete-element")
  deleteShape() {
    return this.shape;
  }

  @Emit("mouse-down")
  mouseDown(e: MouseEvent) {
    return e;
  }

  @Emit("mouse-over")
  mouseOver(e: MouseEvent) {
    return this.shape;
  }

  @Emit("mouse-out")
  mouseOut(e: MouseEvent) {
    return this.shape;
  }

  get getPath() {
    let s: any = this.shape[this.shape.type];
    let x = Number(s.x) - 4;
    let y = Number(s.y) - 4;
    let w = Number(s.w) + 8;
    let h = Number(s.h) + 8;
    if (this.shape.type == ShapeType.Circle) {
      x = Number(s.x - w / 2);
      y = Number(s.y - h / 2);
    }
    if (this.shape.type == ShapeType.Line) {
      let x1 = s.x1;
      let y1 = s.y1;
      w = x1 - x;
      h = y1 - y;
      x = x + 2;
      y = y + 2;
    }
    return `M ${x} ${y} h ${w} v ${h} h ${-w} v ${-h}`;
  }

  get showClose() {
    if (
      this.shape.type == ShapeType.Line ||
      this.shape.type == ShapeType.Pencil
    ) {
      if (this.stagingShape == this.shape._id) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  get getNamePos() {
    let s: any = this.shape[this.shape.type];
    let x = Number(s.x);
    let y = Number(s.y);
    let w = Number(s.w);
    let h = Number(s.h);
    let r = Number(!!s.r ? s.r : 0);
    let pos = { x, y, w, h };
    if (this.shape.type == ShapeType.Circle) {
      pos.x = x - r;
      pos.y = y - r;
    }
    if (this.shape.type == ShapeType.Line) {
      let x1 = s.x1;
      let y1 = s.y1;
      pos.w = x1 - x;
      pos.h = y1 - y;
    }
    return pos;
  }
  round(val: number) {
    return Math.floor(val);
  }

  get sizeVal() {
    let par = {
      x: 0,
      y: 0,
    };

    let obj: any = this.shape;

    if (this.shape.type == ShapeType.Circle) {
      par.x = obj[obj.type].x - obj[obj.type].r;
      par.y = obj[obj.type].y + obj[obj.type].r + 15;
      return par;
    }

    par.x = obj[obj.type].x;
    par.y = obj[obj.type].y + obj[obj.type].h + 15;
    return par;
  }

  onDragStart(e: any) {
    e.dataTransfer.setData("text", e.target.id);
  }

  dragOver(e: any) {
    e.preventDefault();
    this.dashedOutline = true;
  }

  dragLeave(e: any) {
    this.dashedOutline = false;
    // alert("stuff")
  }

  @Emit("link-shape")
  linkShape(srcId: string) {
    return {
      src: srcId,
      target: this.shape._id
    }
  }

  // @Emit("data-change")
  onDrop(e: any) {
    e.preventDefault();
    this.dashedOutline = false;
    var data = e.dataTransfer.getData("text");
    let id = String(data).split("-")
    if (id.length > 1) {
      this.linkShape(id[1]);
    }
  }
}
</script>
