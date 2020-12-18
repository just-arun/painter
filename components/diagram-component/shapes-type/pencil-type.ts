import { RelativePositionType } from "../shape-types";


export interface PencilType {
    path: string;
    fill: string;
}

export class Pencil {
    path: string;
    fill: string;
    constructor({
        path,
        fill
    }: PencilType) {
        this.path = path;
        this.fill = fill;
    }

    draw(e: RelativePositionType) {
        this.path = `M${e.clientX} ${e.clientY}`;
    }

    extend(e: RelativePositionType) {
        this.path += ` L${e.clientX} ${e.clientY}`
    }
    get getJson() {
        return this;
    }
}