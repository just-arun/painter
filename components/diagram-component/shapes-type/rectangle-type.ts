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
    text: string = "";
    resize = false;
    canMove = false;
    color = "#000";
    fontSize: number = 18;
    borderColor: string = "#000";
    textColor: string = "#000";

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
        this.color = !!color ? color : '#000';
        this.fontSize = !!fontSize ? fontSize : 16;
        this.borderColor = !!borderColor ? borderColor : '#000';
        this.textColor = !!textColor ? textColor : "#000";
    }

    get getJson() {
        return this;
    }

    startResize() {
        this.resize = true;
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

    move(e: RelativePositionType) {
        if (this.canMove) {
            this.x = e.clientX - (this.w / 2);
            this.y = e.clientY - (this.h / 2);
        }
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
            let hd = (h - this.h);
            let wd = (w - this.w) * ration;
            this.h = this.h + hd;
            this.w = this.w + wd;
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
}