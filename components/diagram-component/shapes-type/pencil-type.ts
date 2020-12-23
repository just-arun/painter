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
    x1 = 0;
    y1 = 0;
    h1 = 0;
    w1 = 0;
    editing: boolean = true;
    canMove: boolean = false;
    resize = false;
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

    startResize() {
        this.resize = true;
    }

    stopResize() {
        this.resize = false;
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

    move(e: RelativePositionType, target?: { clientX: number, clientY: number }) {
        if (this.canMove) {
            if (!!target) {
                this.x = e.clientX - target.clientX;
                this.y = e.clientY - target.clientY;
                return;
            }
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



    makeResize(e: RelativePositionType, type: string) {
        if (this.resize) {
            if (type == "br")
                this.resizeBr(e);
            if (type == "bl")
                this.resizeBl(e);
            if (type == "bc")
                this.resizeBc(e);
            if (type == "cl")
                this.resizeCl(e);
            if (type == "cr")
                this.resizeCr(e);
            if (type == "tl")
                this.resizeTl(e);
            if (type == "tc")
                this.resizeTc(e);
        }
        this.x1 = this.w + this.x;
        this.y1 = this.h + this.y;
        this.h1 = this.h;
        this.w1 = this.w;
    }

    resizeTl(e: RelativePositionType) {
        this.x = e.clientX;
        this.y = e.clientY;
        let w = this.x1 - e.clientX;
        let h = this.y1 - e.clientY;
        this.w = w > 10 ? w : 10;
        this.h = h > 10 ? h : 10;
    }

    resizeTc(e: RelativePositionType) {
        this.y = e.clientY;
        let h = this.y1 - e.clientY;
        this.h = h > 10 ? h : 10;
    }

    resizeCl(e: RelativePositionType) {
        this.x = e.clientX;
        let w = this.x1 - e.clientX;
        this.w = w > 10 ? w : 10;
    }

    resizeCr(e: RelativePositionType) {
        this.w = e.clientX - this.x;
    }

    resizeBl(e: RelativePositionType) {
        this.x = e.clientX;
        let w = this.x1 - e.clientX;
        let h = e.clientY - this.y;
        this.w = w > 10 ? w : 10;
        this.h = h > 10 ? h : 10;
    }

    resizeBr(e: RelativePositionType) {
        let h = e.clientY - this.y;
        let w = e.clientX - this.x;
        if (e.event?.ctrlKey || e.event?.metaKey) {
            let ration = this.w / this.h;
            let mx = e.event.movementX / 2;
            let my = e.event.movementY / 2;
            let ma = (mx + my) / 2;
            let w = ma * ration;
            this.h = this.h + ma;
            this.w = this.w + w;
            return;
        } else {
            this.w = w > 10 ? w : 10;
            this.h = h > 10 ? h : 10;
        }
    }

    resizeBc(e: RelativePositionType) {
        let h = e.clientY - this.y;
        this.h = h > 10 ? h : 10;
    }
}