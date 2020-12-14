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
    type: ShapeFillType;
    fill: string;
    text: string;
    constructor({
        r,
        x,
        y,
        type,
        fill,
        text
    }: CircleType) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.rx = x;
        this.ry = y;
        this.type = type;
        this.fill = fill;
        this.text = !!text ? text : "";
    }
}

