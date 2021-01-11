import { ArrayFunction } from './array-functions';
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import { RelativePositionType, DeviceType, DiagramMode, ShapeType, Shape, ShapeFillType } from './shape-types';

@Component({})
export default class CanvasMixin extends Mixins(ArrayFunction) {
    mouseOverCanvas = false;
    deviceType: DeviceType;
    canvas = {
        height: 0,
        width: 0,
    };
    viewBox = {
        x: 0,
        y: 0,
        h: 0,
        w: 0
    };
    matrix = {
        s: 2,
        b: 0,
        c: 0,
        tx: 0,
        ty: 0
    }
    oldMousePosition = {
        x: 0,
        y: 0,
        x1: 0,
        y1: 0,
        draw: false
    }
    oldScalePos = {
        x: 0,
        y: 0
    }

    get getOldMousePosition() {
        const { x, x1, y, y1, draw } = this.oldMousePosition;
        let w = x1 - x;
        let h = y1 - y;
        if (draw) {
            return `M${x},${y} h${w} v${h} h${-w} v${-h}`;
        } return false;
    }
    targetElement = {
        clientX: 0,
        clientY: 0,
    }
    originChanged = false;
    origin = {
        x: 0,
        y: 0
    }
    get transformOrigin() {
        return `${this.origin.x} ${this.origin.y}`;
    }

    lastMousePosition: RelativePositionType | null = null;

    scale = 200;

    @Watch("scale")
    updateMatrix() {
        this.matrix.s = this.scale / 100;
    }

    updateScale(e: number) {
        this.scale = e;
    }

    get matrixValue() {
        const {
            s, b,
            c, tx, ty
        } = this.matrix;
        return `matrix(${s} ${b} ${c} ${s} ${tx} ${ty})`;
    }

    get viewBoxValue() {
        const {
            x, y, h, w
        } = this.viewBox;
        return `${x} ${y} ${w} ${h}`;
    }

    constructor() {
        super();
        this.deviceType = this.getDevice();

    }
    mounted() {
        this.initCanvas();
        this.monitorResize(() => {
            this.initCanvas();
        });

    }

    monitorResize(cb: Function) {
        window.addEventListener("resize", () => {
            cb();
        })
        this.updateOrigin();
    }

    initCanvas() {
        this.canvas = {
            height: innerHeight,
            width: innerWidth
        }
        this.viewBox.h = innerHeight;
        this.viewBox.w = innerWidth;
    }

    zoomIn(e?: WheelEvent) {
        if (!!e) {
            this.scale += e.deltaY;
        } else {
            this.scale += 2;
        }
    }

    zoomOut(e?: WheelEvent) {
        if (!!e) {
            this.scale += e.deltaY;
        } else {
            this.scale -= 2;
        }
    }

    zoomInOut(e: WheelEvent) {
        let calVal = e.deltaY > 0 ? 8 : -8;
        let size = this.scale - calVal;
        if (size > 10) {
            if (size < 1000) {
                this.beforeResize(e);
                this.scale = size;
                this.afterResize(e);
            }
        }
    }

    updateOrigin() {
        let main: SVGElement | any = document.querySelector("#mainSvg");
        let x = (!!this.lastMousePosition?.event ? this.lastMousePosition.event.offsetX : 0);
        let y = (!!this.lastMousePosition?.event ? this.lastMousePosition.event.offsetY : 0);
        this.origin = { x, y };
        this.originChanged = true;
        // main.style.transformOrigin = `${x}px ${y}px`;
    }

    resetOrigin() {
        let main: SVGElement | any = document.querySelector("#mainGroup");
        main.style.transformOrigin = `0px 0px`;
    }

    updateLastPosition(e: MouseEvent) {
        const position = this.relativePosition(e);
        this.lastMousePosition = position;
    }

    beforeResize(e: WheelEvent) {
        let rel = this.relativePosition(e);
        this.oldScalePos = {
            x: rel.clientX,
            y: rel.clientY,
        }
    }

    afterResize(e: WheelEvent) {
        let cal = this.relativePosition(e);
        let x1 = this.oldScalePos.x;
        let y1 = this.oldScalePos.y;
        let x2 = cal.clientX;
        let y2 = cal.clientY;
        let calcX = (x2 - x1) * this.matrix.s;
        let calcY = (y2 - y1) * this.matrix.s;
        this.matrix.tx += calcX;
        this.matrix.ty += calcY;
    }

    relativePosition(e?: MouseEvent): RelativePositionType {
        let main: SVGElement | any = document.querySelector("#mainGroup");
        // main.style.transformOrigin = `0px 0px`;
        let boundry = main.getBoundingClientRect();
        var x = !!e ? e.clientX : 0 - boundry.left;
        var y = !!e ? e.clientY : 0 - boundry.top;
        let cx = ((x - this.matrix.tx) / this.scale) * 100;
        let cy = ((y - this.matrix.ty) / this.scale) * 100;


        var ox = !!e ? e.offsetX : 0 - boundry.left;
        var oy = !!e ? e.offsetY : 0 - boundry.top;
        let offsetX = ((ox - this.matrix.tx) / this.scale) * 100;
        let offsetY = ((oy - this.matrix.ty) / this.scale) * 100;
        return {
            clientX: cx,
            clientY: cy,
            offsetX,
            offsetY,
            bl: boundry.left,
            bt: boundry.top,
            event: e
        }
    }



    drawPath(s: any, e: any) {
        let startX: number = s.x;
        let startY: number = s.y;
        let endX: number = e.x;
        let endY: number = e.y;
        const signum = (x: number) => {
            return (x < 0) ? -1 : 1;
        }
        const absolute = (x: number) => {
            return (x < 0) ? -x : x;
        }
        // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
        var stroke = 2;

        let startXR = startX;
        let startYR = startY;
        let sw = s.w;
        let sh = s.h;
        let endXR = endX;
        let endYR = endY;
        let ew = e.w;
        let eh = e.h;

        let isCircle1 = false;
        let isCircle2 = false;

        if (startY > endY) {
            startX = endXR;
            startY = endYR;
            sw = e.w;
            sh = e.h;
            ew = s.w;
            eh = s.h;
            endX = startXR;
            endY = startYR;
            if (s.type == ShapeType.Circle) { isCircle2 = true; }
            if (e.type == ShapeType.Circle) { isCircle1 = true; }
        } else {
            if (s.type == ShapeType.Circle) { isCircle1 = true; }
            if (e.type == ShapeType.Circle) { isCircle2 = true; }
        }

        if (!isCircle1) {
            startX += (sw / 2);
            startY += (sh / 2);
        }
        if (!isCircle2) {
            endX += (ew / 2);
            endY += (eh / 2);
        }

        var deltaX = (endX - startX) * 0.15;
        var deltaY = (endY - startY) * 0.15;
        var delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);
        var arc1 = 0;
        var arc2 = 1;
        if (startX > endX) {
            arc1 = 1;
            arc2 = 0;
        }
        // draw tha pipe-like path
        // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
        let path = "M" + startX + " " + startY +
            " V" + (startY + delta) +
            " A" + delta + " " + delta + " 0 0 " + arc1 + " " + (startX + delta * signum(deltaX)) + " " + (startY + 2 * delta) +
            " H" + (endX - delta * signum(deltaX)) +
            " A" + delta + " " + delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3 * delta) +
            " V" + endY;
        return path;
    }

    getDevice(): DeviceType {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return DeviceType.Tablet;
        }
        if (
            /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return DeviceType.Mobile;
        }
        return DeviceType.Desktop;
    }

}