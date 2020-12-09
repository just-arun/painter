import { ShapeFillType } from "../shape-types";

export interface RectType {
    x: number;
    y: number;
    h: number;
    w: number;
    type: ShapeFillType;
    fill: string;
}

export class Rect {
    x: number;
    y: number;
    h: number;
    w: number;
    type: ShapeFillType;
    fill: string;
    
    constructor({
        x,
        y,
        h,
        w,
        type,
        fill
    }: RectType) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.type = type;
        this.fill = fill;
    }
}