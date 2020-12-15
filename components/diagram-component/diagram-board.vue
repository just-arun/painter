<template src="./diagram-board.html"></template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineComponent } from "@nuxtjs/composition-api";
import diagramToolVue from "./diagram-tool/diagram-tool.vue";
import diagramFooterVue from "./diagram-footer/footer-component.vue";
import { mixins } from "vue-class-component";
import CanvasMixin from "./canvas-mixin";
import {
  DiagramMode,
  RelativePositionType,
  Shape,
  ShapeFillType,
  ShapeType,
} from "./shape-types";
import { Rect } from "./shapes-type/rectangle-type";
import ShapeComponent from "./shapes-component/shapes-component.vue";
import DiagramHeader from "./diagram-header-component/diagram-header-component.vue";
import { Circle } from "./shapes-type/circle-type";
import { Triangle } from "./shapes-type/triangle-type";
import { Pencil } from "./shapes-type/pencil-type";
import { Line } from "./shapes-type/line-type";
import io from "socket.io-client";

@Component({
  components: {
    "d-header": DiagramHeader,
    "d-tool": diagramToolVue,
    "d-footer": diagramFooterVue,
    "shapes-component": ShapeComponent,
  },
})
export default class DiagramBoard extends mixins(CanvasMixin) {
  name = "undefined";
  editing = false;
  diagramMode: DiagramMode = DiagramMode.Edit;
  selectedTool: ShapeType | null = null;
  shapes: Shape[] = [];
  selectedElements: Shape[] = [];
  stagingShape: Shape | null = null;
  fillMode: ShapeFillType = ShapeFillType.stroke;
  openMenu = false;
  menuPosition = {
    x: 0,
    y: 0,
  };
  socket: any;
  mouseOverShape = false;

  menuPF() {
    const { x, y } = this.menuPosition;
    return `left: ${x};top: ${y};`;
  }

  mounted() {
    document.addEventListener("loadeddata", () => {});
    this.mouseScroll();
    document.addEventListener("keydown", (e) => {
      // zoomin
      if ((e.ctrlKey && e.keyCode == 187) || (e.metaKey && e.keyCode == 187)) {
        e.preventDefault();
        this.zoomIn();
      }
      // zoomout
      if ((e.ctrlKey && e.keyCode == 189) || (e.metaKey && e.keyCode == 189)) {
        e.preventDefault();
        this.zoomOut();
      }
      this.onKeyCode(e);
    });
  }

  deleteElement() {
    let id = this.selectedElements[0]._id;
    let ind = this.shapes.map((res) => res._id).indexOf(id);
    this.shapes.splice(ind, 1);
    this.selectedElements = [];
  }

  updateName(e: string) {
    this.name = String(e).trim();
  }

  updateSelectedTool(val: ShapeType) {
    this.selectedTool = val;
  }

  switchMode(val: DiagramMode) {
    this.diagramMode = val;
  }

  changeFillMode(val: ShapeFillType) {
    this.fillMode = val;
  }

  selectElement(shape: Shape) {
    if (this.diagramMode == DiagramMode.View) {
      return;
    }
    this.selectedElements = [shape];
  }

  mouseOverShapeFun() {
    this.mouseOverShape = true;
  }
  mouseOutShapeFun() {
    this.mouseOverShape = false;
  }

  get selectElementDimension() {
    if (this.selectedElements.length == 1) {
      if (this.selectedElements[0].type == ShapeType.Rect || this.selectedElements[0].type == ShapeType.Circle) {
        let elem = !!this.selectedElements[0].rect ? this.selectedElements[0].rect : this.selectedElements[0].circle;
        if (!!elem) {
          let x = elem.x - 2 * 1;
          let y = elem.y - 2 * 1;
          let h = elem.h + 4 * 1;
          let w = elem.w + 4 * 1;
          let dragPart = [];
          if (!!this.selectedElements[0].rect) {
            dragPart.push({
              type: "tl",
              x: x - 2,
              y: y - 2,
            });
            dragPart.push({
              type: "tc",
              x: x + w / 2 - 3,
              y: y - 2,
            });

            dragPart.push({
              type: "cl",
              x: x - 2,
              y: y + h / 2 - 3,
            });
            dragPart.push({
              type: "cr",
              x: x + w - 3,
              y: y + h / 2 - 3,
            });

            dragPart.push({
              type: "bl",
              x: x - 2,
              y: y + h - 3,
            });
            dragPart.push({
              type: "bc",
              x: x + w / 2 - 3,
              y: y + h - 3,
            });
          }
          if (!!this.selectedElements[0].circle) {
            x = this.selectedElements[0].circle.x - this.selectedElements[0].circle.r - 2;
            y = this.selectedElements[0].circle.y - this.selectedElements[0].circle.r - 2;
          }
          dragPart.push({
            type: "br",
            x: x + w - 3,
            y: y + h - 3,
          });
          return { x, y, h, w, dragPart };
        }
        return false;
      }
      return false;
    }
    return false;
  }

  mouseScroll() {
    document.addEventListener("wheel", (e) => {
      if (e.ctrlKey || e.metaKey) {
        this.zoomInOut(e);
      } else {
        this.matrix.tx -= e.deltaX;
        this.matrix.ty -= e.deltaY;
      }
    });
  }

  onKeyCode(e: KeyboardEvent) {
    if (e.keyCode == 46) {
      this.deleteElement();
    }
  }

  onClick(event: MouseEvent) {}

  onMouseDown(event: MouseEvent) {
    this.editing = true;
    // edit mode
    if (this.diagramMode == DiagramMode.Edit) {
      let e = this.relativePosition(event);
      if (this.editing) {
        if (this.selectedTool == ShapeType.Rect) {
          let id = Date.now().toString();
          let shape = new Shape({
            _id: id,
            type: ShapeType.Rect,
            data: new Rect({
              x: e.clientX - 50,
              y: e.clientY - 50,
              h: 100,
              w: 100,
              type: this.fillMode,
              fill: "#000",
            }),
          });
          this.shapes.push(shape);
          this.focusOut();
          this.selectedElements.push(shape);
        }
        if (this.selectedTool == ShapeType.Triangle) {
          let id = Date.now().toString();
          let shape = new Shape({
            _id: id,
            type: ShapeType.Triangle,
            data: new Triangle({
              x: e.clientX - 50,
              y: e.clientY - 50,
              h: 100,
              w: 100,
              type: this.fillMode,
              fill: "#000",
            }),
          });
          this.shapes.push(shape);
          this.focusOut();
        }
        if (this.selectedTool == ShapeType.Circle) {
          let id = Date.now().toString();
          let shape = new Shape({
            _id: id,
            type: ShapeType.Circle,
            data: new Circle({
              x: e.clientX,
              y: e.clientY,
              r: 50,
              type: this.fillMode,
              fill: "#000",
            }),
          });
          this.shapes.push(shape);
          this.focusOut();
        }
        if (this.selectedTool == ShapeType.Pencil) {
          let id = Date.now().toString();
          let shape = new Shape({
            _id: id,
            type: ShapeType.Pencil,
            data: new Pencil({
              path: "",
              fill: "#000",
            }),
          });
          shape.pencil?.draw(e);
          this.stagingShape = shape;
          this.shapes.push(this.stagingShape);
        }
        if (this.selectedTool == ShapeType.Line) {
          let id = Date.now().toString();
          let shape = new Shape({
            _id: id,
            type: ShapeType.Line,
            data: new Line({
              x: e.clientX,
              y: e.clientY,
              x1: e.clientX,
              y1: e.clientY,
              fill: "#000",
            }),
          });
          shape.pencil?.draw(e);
          this.stagingShape = shape;
          this.shapes.push(this.stagingShape);
        }

        if (!!this.selectedElements.length) {
          if (!!this.selectedElements[0].rect) {
            this.selectedElements[0].rect.canMove = true;
          }
        }
        if (this.mouseOverShape) {
          if (this.selectedElements.length == 1) {
            if (!!this.selectedElements[0].rect) {
              this.selectedElements[0].rect.canMove = true;
            }
            if (!!this.selectedElements[0].circle) {
              this.selectedElements[0].circle.canMove = true;
            }
          }
        }
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    this.updateLastPosition(event);
    const e = this.relativePosition(event);
    if (this.diagramMode == DiagramMode.Edit) {
      if (this.editing) {
        if (this.selectedTool == ShapeType.Pencil) {
          this.stagingShape?.pencil?.extend(e);
        }
        if (this.selectedTool == ShapeType.Line) {
          this.stagingShape?.line?.updateEnd(e);
        }
      }
    }
    if (this.mouseOverShape) {
      if (this.selectedElements.length == 1) {
        if (!!this.selectedElements[0].rect) {
          if (this.selectedElements[0].rect.canMove) {
            this.selectedElements[0].rect.move(e);
          }
        }
        if (!!this.selectedElements[0].circle) {
          if (this.selectedElements[0].circle.canMove) {
            this.selectedElements[0].circle.move(e);
          }
        }
      }
    }
  }

  onMouseUp(e: MouseEvent) {
    this.editing = false;
    this.selectedTool = null;
    if (this.mouseOverShape) {
      this.stagingShape = null;
    }
    if (this.selectedElements.length == 1) {
      if (!!this.selectedElements[0].rect) {
        this.selectedElements[0].rect.canMove = false;
      }
      if (!!this.selectedElements[0].circle) {
        this.selectedElements[0].circle.canMove = false;
      }
    }
  }

  onMouseOut(e: MouseEvent) {
    if (this.selectedElements.length == 1) {
      if (!!this.selectedElements[0].rect) {
        this.selectedElements[0].rect.canMove = false;
      }
      if (!!this.selectedElements[0].circle) {
        this.selectedElements[0].circle.canMove = false;
      }
    }
  }

  contextMenu(e: MouseEvent) {
    e.preventDefault();
    this.menuPosition.x = e.clientX;
    this.menuPosition.y = e.clientY;
    this.openMenu = true;
  }

  startResize(event: MouseEvent, type: string) {
    if (this.diagramMode == DiagramMode.View) {
      return;
    }
    let e = this.relativePosition(event);
    if (!!this.selectedElements.length) {
      if (!!this.selectedElements[0].rect) {
        this.selectedElements[0].rect?.makeResize(e, type);
      }
      if (!!this.selectedElements[0].circle) {
        this.selectedElements[0].circle?.makeResize(e, type);
      }
    }
  }

  startResizeFun() {
    if (!!this.selectedElements.length) {
      if (!!this.selectedElements[0].rect) {
        this.selectedElements[0].rect.startResize();
      }
      if (!!this.selectedElements[0].circle) {
        this.selectedElements[0].circle.startResize();
      }
    }
  }
  
  stopResizeFun() {
    if (!!this.selectedElements.length) {
      if (!!this.selectedElements[0].rect) {
        this.selectedElements[0].rect.stopResize();
      }
      if (!!this.selectedElements[0].circle) {
        this.selectedElements[0].circle.stopResize();
      }
    }
  }

  focusOut() {
    if (this.diagramMode == DiagramMode.View) {
      return;
    }
    if (!!this.selectedElements.length) {
      if (!!this.selectedElements[0].rect) {
        this.selectedElements[0].rect.resize = false;
        this.selectedElements[0].rect.canMove = false;
      }
      if (!!this.selectedElements[0].circle) {
        this.selectedElements[0].circle.resize = false;
        this.selectedElements[0].circle.canMove = false;
      }
    }
    this.selectedElements = [];
  }
}
</script>

<style lang="scss" scoped>
@import "./diagram-board.scss";
</style>