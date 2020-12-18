import { RelativePositionType } from "../shape-types";

export interface LineType {
    x: number;
    y: number;
    x1: number;
    y1: number;
    fill: string;
}

export class Line {
    x: number;
    y: number;
    x1: number;
    y1: number;
    fill: string;
    constructor({
        x,
        y,
        x1,
        y1,
        fill
    }: LineType) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.fill = fill;
    }

    updateEnd(e: RelativePositionType) {
        this.x1 = e.clientX;
        this.y1 = e.clientY;
        if (e.event?.ctrlKey || e.event?.metaKey) {
            this.y1 = this.y;
        }
        if (e.event?.shiftKey) {
            this.x1 = this.x;
        }
        let angle = this.angle(this.x, this.y, this.x1, this.y1);
        console.log(angle * -1);
        
    }

    angle(cx: number, cy: number, ex: number, ey: number) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        return theta;
    }

    updateStart(e: RelativePositionType) {
        this.x = e.clientX;
        this.y = e.clientY;
    }
    get getJson() {
        return this;
    }
}