import { Component, Vue, Watch } from 'vue-property-decorator';
import { RelativePositionType, DeviceType } from './shape-types';

@Component({})
export default class CanvasMixin extends Vue {
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
        s: 1,
        b: 0,
        c: 0,
        tx: 0,
        ty: 0
    }
    origin = {
        x: 0,
        y: 0
    }

    lastMousePosition: RelativePositionType | null = null;

    scale = 100;

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
        console.log(this.deviceType);
        
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
        // this.updateOrigin();
        let calVal = (e.deltaY / 15);
        let size = this.scale - calVal;
        if (size > 2 && size < 1000) {
            this.scale = Math.floor(size);
        }
        // this.resetOrigin();
    }

    updateOrigin() {
        // let main: SVGElement | any = document.querySelector("#mainGroup");
        // let x = this.matrix.tx + (!!this.lastMousePosition?.event ? this.lastMousePosition.event.offsetX : 0);
        // let y = this.matrix.ty + (!!this.lastMousePosition?.event ? this.lastMousePosition.event.offsetY : 0);
        // this.origin = { x, y };
        // main.style.transformOrigin = `${x}px ${y}px`;
    }

    resetOrigin() {
        // let main: SVGElement | any = document.querySelector("#mainGroup");
        // main.style.transformOrigin = `0px 0px`;
    }

    updateLastPosition(e: MouseEvent) {
        const position = this.relativePosition(e);
        this.lastMousePosition = position;
    }

    relativePosition(e?: MouseEvent): RelativePositionType {
        let main: SVGElement | any = document.querySelector("#mainGroup");
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