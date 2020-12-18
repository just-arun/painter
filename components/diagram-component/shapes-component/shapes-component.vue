<template>
  <g class="shape">
    <text
    :class="`name ${stagingShape == shape._id ? 'focused' : ''}`"
    :x="shape[shape.type].x"
    :y="shape[shape.type].y - 4"
    >{{ shape.name }}</text>
    <path 
    v-if="stagingShape == shape._id"
    :d="getPath" 
    fill="transparent" 
    stroke="rgb(0, 119, 255)" />
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
      />
    </g>
    <g>
      <switch 
          :x="shape[shape.type].x + shape[shape.type].w - 10"
          :y="shape[shape.type].y - 10">
        <foreignObject
          :x="shape[shape.type].x + shape[shape.type].w - 10"
          :y="shape[shape.type].y - 10"
          width="24"
          height="24"
          requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
          :class="`close-btn ${stagingShape == shape._id ? 'focused' : ''}`"
        >
          <button @click="deleteShape()">
            <img 
            width="24px"
            height="24px"
            src="./../../../assets/icons/close.svg" alt="">
          </button>
        </foreignObject>
      </switch>
    </g>
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
    // border: none;
    cursor: pointer;
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
  .name {
    opacity: 0;
    font-size: 8px;
    transform: translateY(10px);
    transition: .3s cubic-bezier(1,-0.05, 0.71, 1);
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
  menuOptions = [
    { label: '' }
  ]

  @Emit("select-element")
  selectElement() {
    return this.shape;
  }
  
  @Emit("delete-element")
  deleteShape() {
    return this.shape;
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
    return `M ${x} ${y} h ${w} v ${h} h ${-w} v ${-h}`;
  }
}
</script>
