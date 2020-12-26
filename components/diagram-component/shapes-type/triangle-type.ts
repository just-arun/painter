import { RelativePositionType } from './../shape-types';
import { Rect, RectType } from './rectangle-type';
import { ShapeFillType } from "../shape-types";

export interface TriangleType extends RectType  {
    bottomPeak?: number;
}

export class Triangle extends Rect {
    bottomPeak: number = 0;
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
            bottomPeak
        }: TriangleType) {
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
        this.bottomPeak = !!bottomPeak ? bottomPeak : 0;
    }

    get points() {
        const { h, y, w, x } = this;
        let point = `${x},${y+h} ${x+(w/2)},${y} ${x+w},${y+h} ${x+(w/2)},${y + this.h + this.bottomPeak}`;
        return point;
    }

    get getJson() {
        return this;
    }

    resizeBc(e: RelativePositionType) {
        let dif = e.clientY - (this.y + this.h);
        this.bottomPeak = dif;
    }

}