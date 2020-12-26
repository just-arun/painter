import { fObject } from './shape-util-functions';
import { FontWeight, AlignItem, JustifyContent } from './../shapes-text-util';
import { ShapeFillType, RelativePositionType } from "../shape-types";

export interface RectType {
    x: number;
    y: number;
    h: number;
    w: number;
    type: ShapeFillType;
    fill: string;
    text?: string;
    color?: string;
    borderColor?: string;
    fontSize?: number;
    textColor?: string;
    border?: number;
    alignItem?: string;
    justifyContent?: string;
    fontWeight?: "thin" | "light" | "regular" | "medium" | "bold" | "bolder";
}

export class Rect {
    x: number;
    y: number;
    h: number;
    w: number;
    x1: number;
    y1: number;
    h1: number;
    w1: number;
    type: ShapeFillType;
    fill: string;
    rx: number = 0;
    text: string = "";
    resize = false;
    canMove = false;
    editText = false;
    color = "#000";
    fontSize: number = 18;
    fontWeight: any = FontWeight[3];
    border: number = 2;
    borderColor: string = "#000000";
    textColor: string = "#000000";
    alignItem: string;
    justifyContent: string;

    get path() {
        const {
            x,
            y,
            h,
            w
        } = this;
        return `M${x} ${y} h${w} v${h} h${-w} v${-h}`;
    }

    constructor({
        x,
        y,
        h,
        w,
        type,
        fill,
        text,
        color,
        fontSize,
        borderColor,
        textColor,
        border,
        fontWeight,
        alignItem,
        justifyContent
    }: RectType) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.h1 = h;
        this.w1 = w;
        this.x1 = x + w;
        this.y1 = y + h;

        this.type = type;
        this.fill = fill;
        this.text = !!text ? text : '';
        this.color = !!color ? color : '#000000';
        this.fontSize = !!fontSize ? fontSize : 16;
        this.borderColor = !!borderColor ? borderColor : '#000000';
        this.textColor = !!textColor ? textColor : "#000000";
        this.border = !!border ? border : 1;
        this.fontWeight = !!fontWeight ? fontWeight : FontWeight[3];
        this.alignItem = !!alignItem ? alignItem : AlignItem[1];
        this.justifyContent = !!justifyContent ? justifyContent : JustifyContent[1];
    }

    get getJson() {
        return this;
    }

    startResize() {
        this.resize = true;
    }

    move(e: RelativePositionType, target?: { clientX: number, clientY: number }) {
        if (this.canMove) {
            if (!!target) {
                this.x = e.clientX - target.clientX;
                this.y = e.clientY - target.clientY;
                return;
            }
            this.x = e.clientX - (this.w / 2);
            this.y = e.clientY - (this.h / 2);
        }
    }

    makeResize(e: RelativePositionType, type: string) {
        if (this.resize) {
            if (type == "br")
                this.resizeBr(e);
            if (type == "bl")
                this.resizeBl(e);
            if (type == "bc")
                this.resizeBc(e);
            if (type == "cl")
                this.resizeCl(e);
            if (type == "cr")
                this.resizeCr(e);
            if (type == "tl")
                this.resizeTl(e);
            if (type == "tc")
                this.resizeTc(e);
        }
        this.x1 = this.w + this.x;
        this.y1 = this.h + this.y;
        this.h1 = this.h;
        this.w1 = this.w;
    }

    resizeTl(e: RelativePositionType) {
        this.x = e.clientX;
        this.y = e.clientY;
        let w = this.x1 - e.clientX;
        let h = this.y1 - e.clientY;
        this.w = w > 10 ? w : 10;
        this.h = h > 10 ? h : 10;
    }

    resizeTc(e: RelativePositionType) {
        this.y = e.clientY;
        let h = this.y1 - e.clientY;
        this.h = h > 10 ? h : 10;
    }

    resizeCl(e: RelativePositionType) {
        this.x = e.clientX;
        let w = this.x1 - e.clientX;
        this.w = w > 10 ? w : 10;
    }

    resizeCr(e: RelativePositionType) {
        this.w = e.clientX - this.x;
    }

    resizeBl(e: RelativePositionType) {
        this.x = e.clientX;
        let w = this.x1 - e.clientX;
        let h = e.clientY - this.y;
        this.w = w > 10 ? w : 10;
        this.h = h > 10 ? h : 10;
    }

    resizeBr(e: RelativePositionType) {
        let h = e.clientY - this.y;
        let w = e.clientX - this.x;
        if (e.event?.ctrlKey || e.event?.metaKey) {
            let ration = this.w / this.h;
            let mx = e.event.movementX / 2;
            let my = e.event.movementY / 2;
            let ma = (mx + my) / 2;
            let w = ma * ration;
            this.h = this.h + ma;
            this.w = this.w + w;
            return;
        } else {
            this.w = w > 10 ? w : 10;
            this.h = h > 10 ? h : 10;
        }
    }

    resizeBc(e: RelativePositionType) {
        let h = e.clientY - this.y;
        this.h = h > 10 ? h : 10;
    }

    stopResize() {
        this.resize = false;
    }

    exportSvg() {
        return `
        <rect 
            x="${this.x}" y="${this.y}"
            height="${this.h}"
            width="${this.w}" 
            fill="${this.fill}"
            stroke="${this.borderColor}"
        ></rect>
        ${fObject({
            x: this.x,
            y: this.y,
            h: this.h,
            w: this.w,
            style: `
display: flex;
justify-content: ${this.justifyContent};
align-items: ${this.alignItem};
color: ${this.textColor};
font-size: ${this.fontSize};
font-weight: ${this.fontWeight};`,
            text: this.text
        })}
        `
    }
}