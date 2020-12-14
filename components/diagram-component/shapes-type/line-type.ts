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
    }

    updateStart(e: RelativePositionType) {
        this.x = e.clientX;
        this.y = e.clientY;
    }
}