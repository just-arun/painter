import { RelativePositionType } from "../shape-types";

export interface TextType {
    x: number;
    y: number;
    h: number;
    w: number;
    text: string;
    fill: string;
}


export class TextClass {
    x: number;
    y: number;
    h: number;
    w: number;
    fill: string;
    text: string;
    constructor({
        fill,
        h,
        w,
        x,
        y,
        text
    }: TextType) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.fill = fill;
        this.text = text;
    }

    move(e: RelativePositionType) {
        this.x = e.clientX;
        this.y = e.clientY;
    }
}