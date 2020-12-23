import { RelativePositionType, ShapeFillType } from "../shape-types";

export interface LineType {
    x: number;
    y: number;
    x1: number;
    y1: number;
    fill: string;
    h?: number;
    w?: number;
    type?: ShapeFillType;
    border?: number;
}

export class Line {
    x: number;
    y: number;
    x1: number;
    y1: number;
    h: number;
    w: number;
    fill: string;
    canMove = false;
    resize = false;
    editing: boolean = true;
    type: ShapeFillType;
    border: number = 2;
    constructor({
        x,
        y,
        x1,
        y1,
        fill,
        h,
        w,
        type,
        border
    }: LineType) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.fill = fill;
        this.h = !!h ? h : 0;
        this.w = !!w ? w : 0;
        this.type = !!type ? type : ShapeFillType.stroke;
        this.border = !!border ? border : 1;
    }

    updateEnd(e: RelativePositionType) {
        this.x1 = e.clientX;
        this.y1 = e.clientY;
        if (e.event?.ctrlKey || e.event?.metaKey) {
            this.y1 = this.y;
        }
        if (e.event?.shiftKey) {
            this.x1 = this.x;
        }
        let angle = this.angle(this.x, this.y, this.x1, this.y1);
        
        this.updateSize();
    }

    angle(cx: number, cy: number, ex: number, ey: number) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        return theta;
    }

    updateStart(e: RelativePositionType) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.updateSize();
    }

    updateSize() {
        let h = Math.abs(this.y1 - this.y);
        let w = Math.abs(this.x1 - this.x);
        this.h = h;
        this.w = w;
    }

    get getJson() {
        return this;
    }
    startResize() {
        this.resize = true;
    }
    stopResize() {
        this.resize = false;
    }

    makeResize(e: RelativePositionType, type: string) {
        if (this.resize) {
            if (type == "br")
                this.resizeBr(e);
            if (type == "tl")
                this.resizeTl(e);
        }
    }

    resizeTl(e: RelativePositionType) {
        this.updateStart(e);
    }

    resizeBr(e: RelativePositionType) {
        this.updateEnd(e);
    }
}