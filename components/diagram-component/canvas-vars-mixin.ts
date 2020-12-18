import { TextClass } from './shapes-type/text-type';
import { ImageClass } from './shapes-type/image-type';
import {
    Component,
    Vue,
    Mixins
} from 'vue-property-decorator';
import { ShapeType, DiagramMode, Shape, ShapeFillType, RelativePositionType, mapObjToShape } from './shape-types';
import { Rect } from './shapes-type/rectangle-type';
import { Triangle } from './shapes-type/triangle-type';
import { Circle } from './shapes-type/circle-type';
import { Pencil } from './shapes-type/pencil-type';
import { Line } from './shapes-type/line-type';
import CanvasMixin from './canvas-mixin';

@Component({})
export default class CanvasVarsMixin extends Mixins(CanvasMixin) {
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

    get mousePos() {
        let event = this.lastMousePosition?.event;
        let path = 'M0 0';
        if (event) {
            let hcW = this.canvas.width / 2;
            let hcH = this.canvas.height / 2;
            path += ` H ${event.clientX}`;
            path += ` V ${this.canvas.height}`;
            path += ` V ${event.clientY}`;
            path += ` H 0 H${this.canvas.width}`;
            // path += ` v ${event.clientX} ${this.canvas.height}`;
        }
        return path;
    }

    menuPF() {
        const { x, y } = this.menuPosition;
        return `left: ${x};top: ${y};`;
    }

    mounted() {
        document.addEventListener("loadeddata", () => { });
        this.mouseScroll();
        document.addEventListener("keydown", (e) => {
            this.globalKeyCode(e);
            this.onKeyCode(e);
        });
        // editor keys
        let canvasWrapper: any = document.querySelector("#canvasWrapper");
        canvasWrapper.addEventListener("keypress", (e: KeyboardEvent) => {
            console.log(e.keyCode, "canvasWrapper");
            // this.onKeyCode(e);
        })
    }

    deleteElement(ele?: Shape) {
        let shape = !!ele ? ele : this.selectedElements[0]
        let id = shape._id;
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
        this.$router.push(this.$route.path + `?mode=${val}`)
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
            if (
                    this.selectedElements[0].type == ShapeType.Rect || 
                    this.selectedElements[0].type == ShapeType.Image || 
                    this.selectedElements[0].type == ShapeType.Circle ||
                    this.selectedElements[0].type == ShapeType.Triangle || 
                    this.selectedElements[0].type == ShapeType.Text
                ) {
                let elem = this.selectedElements[0][this.selectedElements[0].type];
                if (!!elem) {
                    let x = Number(Number(elem.x) - Number(2 * 1));
                    let y = Number(Number(elem.y) - Number(2 * 1));
                    let h = Number(Number(elem.h) + Number(4 * 1));
                    let w = Number(Number(elem.w) + Number(4 * 1));
                    let dragPart = [];
                    if (
                        !!this.selectedElements[0].rect ||
                        !!this.selectedElements[0].image ||
                        !!this.selectedElements[0].triangle ||
                        !!this.selectedElements[0].text
                        ) {
                        dragPart.push({
                            type: "tl",
                            x: x - 5,
                            y: y - 5,
                        });
                        dragPart.push({
                            type: "tc",
                            x: x + (w / 2) - 3,
                            y: y - 6,
                        });

                        dragPart.push({
                            type: "cl",
                            x: x - 5,
                            y: y + h / 2 - 3,
                        });
                        dragPart.push({
                            type: "cr",
                            x: x + w - 1,
                            y: y + h / 2 - 3,
                        });

                        dragPart.push({
                            type: "bl",
                            x: x - 5,
                            y: y + h - 1,
                        });
                        dragPart.push({
                            type: "bc",
                            x: x + w / 2 - 3,
                            y: y + h - 1,
                        });
                    }
                    if (!!this.selectedElements[0].circle) {
                        x = this.selectedElements[0].circle.x - this.selectedElements[0].circle.r - 2;
                        y = this.selectedElements[0].circle.y - this.selectedElements[0].circle.r - 2;
                    }
                    dragPart.push({
                        type: "br",
                        x: x + w - 1,
                        y: y + h - 1,
                    });
                    let path = `M ${x} ${y} h ${w} v ${h} h ${-w} v ${-h}`;
                    return { x, y, h, w, dragPart, path };
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

    globalKeyCode(e: KeyboardEvent) {
        console.log(e.keyCode);
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
    }

    onKeyCode(e: KeyboardEvent) {
        console.log(e.keyCode, e.keyCode == 46);
        
        if (e.keyCode == 46) {
            this.deleteElement();
        }

        if ((e.ctrlKey || e.metaKey) && e.keyCode == 68) {
            e.preventDefault();
            this.duplicateElement();
        }
        this.changeTool(e);
    }

    duplicateElement() {
        let newEle: any = [];
        this.selectedElements.forEach((res) => {
            let data = res;
            let id = Date.now().toString() + "dup"
            let nD: any = data[data.type];
            let newData = new Shape({
                _id: id,
                name: data.name+"(copy)",
                data: new mapObjToShape[data.type](nD.getJson),
                type: data.type,
            })
            newEle.push(newData)
        });
        this.selectedElements = [...newEle];
        this.shapes = [...this.shapes, ...this.selectedElements];
    }

    changeTool(e: KeyboardEvent) {
        let mapKey = {
            80: ShapeType.Pencil,
            76: ShapeType.Line,
            82: ShapeType.Rect,
            67: ShapeType.Circle,
            84: ShapeType.Text,
        }
        if (
            (e.ctrlKey || e.metaKey) &&
            (
                e.keyCode == 80 ||
                e.keyCode == 76 ||
                e.keyCode == 82
            )
        ) {
            e.preventDefault();
            this.selectedTool = mapKey[e.keyCode];
        }
        if (
            (e.altKey) &&
            (
                e.keyCode == 80 ||
                e.keyCode == 76 ||
                e.keyCode == 82 ||
                e.keyCode == 67 ||
                e.keyCode == 84
            )
        ) {
            e.preventDefault();
            this.selectedTool = mapKey[e.keyCode];
        }
    }


    onClick(event: MouseEvent) {
        if (this.diagramMode == DiagramMode.Edit) {
            let e = this.relativePosition(event);
            this.editing = true;
            if (this.editing) {
                if (this.selectedTool == ShapeType.Rect) {
                    let id = Date.now().toString();
                    let shape = new Shape({
                        _id: id,
                        name: 'Rectangle',
                        type: ShapeType.Rect,
                        data: new Rect({
                            x: e.clientX - 50,
                            y: e.clientY - 50,
                            h: 100,
                            w: 100,
                            type: this.fillMode,
                            fill: "#ff8585",
                        }),
                    });
                    this.shapes.push(shape);
                    this.focusOut();
                    this.selectedElements.push(shape);
                }
                if (this.selectedTool == ShapeType.Image) {
                    let id = Date.now().toString();
                    let shape = new Shape({
                        _id: id,
                        name: 'Image',
                        type: ShapeType.Image,
                        data: new ImageClass({
                            x: e.clientX - 50,
                            y: e.clientY - 75,
                            h: 100,
                            w: 150,
                            type: this.fillMode,
                            fill: "#ff8585",
                        }),
                    });
                    this.shapes.push(shape);
                    this.focusOut();
                    this.selectedElements.push(shape);
                }
                if (this.selectedTool == ShapeType.Text) {
                    let id = Date.now().toString();
                    let shape = new Shape({
                        _id: id,
                        name: 'Text',
                        type: ShapeType.Text,
                        data: new TextClass({
                            x: e.clientX - 50,
                            y: e.clientY,
                            h: 60,
                            w: 100,
                            type: this.fillMode,
                            fill: "#ff8585",
                            text: 'T'
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
                        name: 'Triangle',
                        type: ShapeType.Triangle,
                        data: new Triangle({
                            x: e.clientX - 50,
                            y: e.clientY - 50,
                            h: 100,
                            w: 100,
                            type: this.fillMode,
                            fill: "#ff8585",
                        }),
                    });
                    this.shapes.push(shape);
                    this.focusOut();
                }
                if (this.selectedTool == ShapeType.Circle) {
                    let id = Date.now().toString();
                    let shape = new Shape({
                        _id: id,
                        name: 'Circle',
                        type: ShapeType.Circle,
                        data: new Circle({
                            x: e.clientX,
                            y: e.clientY,
                            r: 50,
                            type: this.fillMode,
                            fill: "#ff8585",
                        }),
                    });
                    this.shapes.push(shape);
                    this.focusOut();
                }
            }
            this.editing = false;
            this.selectedTool = null;
        }
    }

    onMouseDown(event: MouseEvent) {
        this.editing = true;
        // edit mode
        if (this.diagramMode == DiagramMode.Edit) {
            let e = this.relativePosition(event);
            if (this.editing) {
                if (this.selectedTool == ShapeType.Pencil) {
                    let id = Date.now().toString();
                    let shape = new Shape({
                        _id: id,
                        name: 'Pencil',
                        type: ShapeType.Pencil,
                        data: new Pencil({
                            path: "",
                            fill: "#ff8585",
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
                        name: 'Line',
                        type: ShapeType.Line,
                        data: new Line({
                            x: e.clientX,
                            y: e.clientY,
                            x1: e.clientX,
                            y1: e.clientY,
                            fill: "#ff8585",
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
                        if (
                            !!this.selectedElements[0].rect ||
                            !!this.selectedElements[0].circle ||
                            !!this.selectedElements[0].image || 
                            !!this.selectedElements[0].triangle
                        ) {
                            let elem: any = this.selectedElements[0][this.selectedElements[0].type];
                            elem.canMove = true;
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
                if (
                    !!this.selectedElements[0].rect ||
                    !!this.selectedElements[0].circle ||
                    !!this.selectedElements[0].image || 
                    !!this.selectedElements[0].triangle ||
                    !!this.selectedElements[0].text
                ) {
                    let elem: any = this.selectedElements[0];
                    if (elem[this.selectedElements[0].type].canMove) {
                        elem[this.selectedElements[0].type].move(e);
                    }
                }
            }
        }
    }

    onMouseUp(e: MouseEvent) {
        if (
            this.selectedTool == ShapeType.Pencil ||
            this.selectedTool == ShapeType.Line
        ) {
            this.editing = false;
            this.selectedTool = null;
        }
        if (this.mouseOverShape) {
            this.stagingShape = null;
        }
        if (this.selectedElements.length == 1) {
            if (
                !!this.selectedElements[0].rect ||
                !!this.selectedElements[0].circle ||
                !!this.selectedElements[0].image || 
                !!this.selectedElements[0].triangle ||
                !!this.selectedElements[0].text
            ) {
                let elem: any = this.selectedElements[0][this.selectedElements[0].type];
                if (!!elem) {
                    elem.canMove = false;
                }
            }
        }
    }

    onMouseOut(e: MouseEvent) {
        if (this.selectedElements.length == 1) {
            if (
                !!this.selectedElements[0].rect ||
                !!this.selectedElements[0].circle ||
                !!this.selectedElements[0].image || 
                !!this.selectedElements[0].triangle ||
                !!this.selectedElements[0].text
            ) {
                let elem: any = this.selectedElements[0][this.selectedElements[0].type];
                elem.canMove = false;
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
            if (
                !!this.selectedElements[0].rect ||
                !!this.selectedElements[0].circle ||
                !!this.selectedElements[0].image || 
                !!this.selectedElements[0].triangle ||
                !!this.selectedElements[0].text
                ) {
                let anyShape: any = this.selectedElements[0][this.selectedElements[0].type];
                anyShape.makeResize(e, type);
            }
        }
    }

    startResizeFun() {
        if (!!this.selectedElements.length) {
            if (
                !!this.selectedElements[0].rect ||
                !!this.selectedElements[0].circle ||
                !!this.selectedElements[0].image || 
                !!this.selectedElements[0].triangle ||
                !!this.selectedElements[0].text
                ) {
                let elem: any = this.selectedElements[0][this.selectedElements[0].type];
                elem.startResize();
            }
        }
    }

    stopResizeFun() {
        if (!!this.selectedElements.length) {
            if (
                !!this.selectedElements[0].rect ||
                !!this.selectedElements[0].circle ||
                !!this.selectedElements[0].image || 
                !!this.selectedElements[0].triangle ||
                !!this.selectedElements[0].text
                ) {
                let elem: any = this.selectedElements[0][this.selectedElements[0].type];
                elem.stopResize();
            }
        }
    }

    focusOut() {
        if (this.diagramMode == DiagramMode.View) {
            return;
        }
        if (!!this.selectedElements.length) {
            if (
                !!this.selectedElements[0].rect ||
                !!this.selectedElements[0].circle ||
                !!this.selectedElements[0].image || 
                !!this.selectedElements[0].triangle ||
                !!this.selectedElements[0].text
                ) {
                let elem: any = this.selectedElements[0][this.selectedElements[0].type];
                elem.resize = false;
                elem.canMove = false;
            }
        }
        this.selectedElements = [];
    }
}