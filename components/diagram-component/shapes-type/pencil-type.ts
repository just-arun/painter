import { RelativePositionType } from "../shape-types";


export interface PencilType {
    path: string;
    fill: string;
    border: number;
    x?: number;
    y?: number;
    h?: number;
    w?: number;
    editing?: boolean;
    canMove?: boolean;
}

export class Pencil {
    path: string;
    fill: string;
    x = 0;
    y = 0;
    h = 0;
    w = 0;
    editing: boolean = true;
    canMove: boolean = false;
    border: number = 1;
    constructor({
       path,
       fill,
       x,
       y,
       h,
       w,
       border,
       editing,
       canMove
    }: PencilType) {
        this.path = path;
        this.fill = fill;
        this.x = !!x ? x : 0;
        this.y = !!y ? y : 0;
        this.h = !!h ? h : 0;
        this.w = !!w ? w : 0;
        this.border = !!border ? border : 1;
        if(editing != undefined) {
            this.editing = editing;
        }
        if (canMove != undefined) {
            this.canMove = canMove;
        }
    }

    draw(e: RelativePositionType) {
        this.path = `M${e.clientX} ${e.clientY}`;
        this.drawDimension();
    }

    extend(e: RelativePositionType) {
        this.path += ` L${e.clientX} ${e.clientY}`
        this.drawDimension();
    }

    get getJson() {
        return this;
    }

    move(e: RelativePositionType) {
        if (this.canMove) {
            this.x = e.clientX - (this.w / 2);
            this.y = e.clientY - (this.h / 2);
        }
    }

    drawDimension() {
        let newPa = this.path.split(" ").filter((res) => {
            if (/[a-z]/i.test(res)) {
                return res;
            }
        }).map((res) => {
            return Number(res.replace(/[a-z]/i, ''))
        }).sort((x, y) => (x > y) ? 1 : -1);
        let newPaY = this.path.split(" ").filter((res) => {
            if (!/[a-z]/i.test(res)) {
                return res;
            }
        }).map((res) => {
            return Number(res.replace(/[a-z]/i, ''))
        }).sort((x, y) => (x > y) ? 1 : -1);
        this.x = newPa[0];
        this.w = Math.abs(newPa[newPa.length - 1] - newPa[0]);
        this.y = newPaY[0];
        this.h = Math.abs(newPaY[newPaY.length - 1] - newPaY[0]);
    }
}