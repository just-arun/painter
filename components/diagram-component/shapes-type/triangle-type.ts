import { Rect, RectType } from './rectangle-type';
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

export class Triangle extends Rect {
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
            textColor
        }: RectType) {
        super({
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
            textColor
        });
    }

    get points() {
        const { h, y, w, x } = this;
        let point = `${x},${y+h} ${x+(w/2)},${y} ${x+w},${y+h}`;
        return point;
    }

    get getJson() {
        return this;
    }
}