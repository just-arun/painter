import { Rect, RectType } from './rectangle-type';
import { RelativePositionType, ShapeFillType } from "../shape-types";

export interface TextType {
    x: number;
    y: number;
    h: number;
    w: number;
    type: ShapeFillType;
    text: string;
    fill: string;
    align?: AlignElement;
}

export interface AlignElement {
    v: AlignV;
    h: AlignH;
}

export enum AlignV {
    Center = "center",
    Top = "flex-start",
    Bottom = "flex-end",
}

export enum AlignH {
    Center = "center",
    Left = "flex-start",
    Right = "flex-end",
}

export class TextClass extends Rect {
    initSize = false;
    align: AlignElement = {
        v: AlignV.Center,
        h: AlignH.Center
    }

    constructor({
            x,
            y,
            h,
            w,
            type = ShapeFillType.stroke,
            fill,
            text = 'text',
            align,
        }: TextType) {
        super({
            x,
            y,
            h,
            w,
            type,
            fill,
            text
        });
        if (!!align) { this.align = align; }
    }

    get getJson() {
        return this;
    }


    exportSvg() {
        return `
        <rect 
            x="${this.x}" y="${this.y}"
            height="${this.h} 
            width="${this.w}" 
            fill="${this.fill}"
            stroke="${this.borderColor}"
        ></rect>
        
        `
    }
}