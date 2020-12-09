import { ShapeFillType } from "../shape-types";

export interface CircleType {
    id: string;
    r: number;
    x: number;
    y: number;
    type: ShapeFillType;
    fill: string;
}

export class Circle {
    id: string;
    r: number;
    x: number;
    y: number;
    rx: number;
    ry: number;
    type: ShapeFillType;
    fill: string;
    constructor({
        id,
        r,
        x,
        y,
        type,
        fill
    }: CircleType) {
        this.id = id;
        this.r = r;
        this.x = x;
        this.y = y;
        this.rx = x;
        this.ry = y;
        this.type = type;
        this.fill = fill;
    }
}

