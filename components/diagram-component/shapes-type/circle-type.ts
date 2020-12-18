import { RelativePositionType } from './../shape-types';
import { ShapeFillType } from "../shape-types";

export interface CircleType {
    r: number;
    x: number;
    y: number;
    type: ShapeFillType;
    fill: string;
    text?: string;
}

export class Circle {
    r: number;
    x: number;
    y: number;
    rx: number;
    ry: number;
    h: number;
    w: number;
    type: ShapeFillType;
    fill: string;
    text: string;
    canMove = false;
    resize = false;

    constructor({
        r,
        x,
        y,
        type,
        fill,
        text,
    }: CircleType) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.rx = x;
        this.ry = y;
        this.h = r + r;
        this.w = r + r;
        this.type = type;
        this.fill = fill;
        this.text = !!text ? text : "";
    }

    move(e: RelativePositionType) {
        if (this.canMove) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.rx = e.clientX;
            this.ry = e.clientY;
        }
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
        if (this.resize && type == "br") {
            let xr = e.clientX - (this.x);
            let yr = e.clientY - (this.y);
            let r = (xr + yr) / 2;
            console.log(r);
            
            this.r = r > 8 ? r : 8;
            this.h = this.r + this.r;
            this.w = this.r + this.r;
        }
    }

}

