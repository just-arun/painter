import { RelativePositionType } from './../shape-types';
import { ShapeFillType } from "../shape-types";
import { FontWeight } from '../shapes-text-util';

export interface CircleType {
    r: number;
    x: number;
    y: number;
    type: ShapeFillType;
    fill: string;
    text?: string;
    fontSize?: number;
    fontWeight?: any;
    borderColor?: string;
    textColor?: string;
    border?: number;

    rx?: number;
    ry?: number;
    h?: number;
    w?: number;
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
    border: number = 1;
    fontSize: number = 18;
    borderColor: string = "#000";
    fontWeight: any = FontWeight[1];
    textColor: string = "#000";

    constructor({
        r,
        x,
        y,
        type,
        fill,
        text,
        fontSize,
        fontWeight,
        textColor,
        borderColor,
        border
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
        this.fontSize = !!fontSize ? fontSize : 16;
        this.fontWeight = !!fontWeight ? fontWeight : FontWeight[3];
        this.textColor = !!textColor ? textColor : '#000000'
        this.borderColor = !!borderColor ? borderColor : '#000000';
        this.border = !!border ? border : 1;
    }

    move(e: RelativePositionType, target?: { clientX: number, clientY: number }) {
        if (this.canMove) {
            // if (!!target) {
            //     this.x = e.clientX - target.clientX;
            //     this.y = e.clientY - target.clientY;
            //     return;
            // }
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
            
            
            this.r = r > 8 ? r : 8;
            this.h = this.r + this.r;
            this.w = this.r + this.r;
        }
    }


    exportSvg() {
        return `
        <rect 
            x="${this.x}" y="${this.y}"
            height="${this.h} 
            width="${this.w}" 
            fill="${this.fill}"
            stroke="${this.borderColor}"
        ></rect>
        `
    }

}

