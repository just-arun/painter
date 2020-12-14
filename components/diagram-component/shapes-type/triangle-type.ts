import { ShapeFillType } from "../shape-types";

export interface TriangleType {
    x: number;
    y: number;
    h: number;
    w: number;
    type: ShapeFillType;
    fill: string;
    text?: string;
}

export class Triangle {
    x: number = 0;
    y: number = 0;
    h: number = 0;
    w: number = 0;
    type: ShapeFillType;
    fill: string;
    text: string;

    constructor({ x, y, h, w, type, fill, text }: TriangleType) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.type = type;
        this.fill = fill;
        this.text = !!text ? text : '';
    }

    get points() {
        const { h, y, w, x } = this;
        let point = `${x},${y+h} ${x+(w/2)},${y} ${x+w},${y+h}`;
        return point;
    }

}