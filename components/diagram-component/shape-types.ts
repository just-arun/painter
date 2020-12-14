import { Rect } from "./shapes-type/rectangle-type";
import { Circle, CircleType } from "./shapes-type/circle-type";
import { Triangle } from "./shapes-type/triangle-type";
import { Line, LineType } from "./shapes-type/line-type";
import { Pencil } from "./shapes-type/pencil-type";

export enum ShapeFillType {
    fill = 1,
    stroke = 0
}

export enum DiagramMode {
    View = 0,
    Edit = 1
}

export enum DeviceType {
    Desktop = 2,
    Tablet = 1,
    Mobile = 0
}

export enum ShapeType {
    Rect = "rect",
    Circle = "circle",
    Triangle = "triangle",
    Line = "line",
    Pencil = "pencil"
}

export interface ShapeInterface {
    _id: string;
    type: ShapeType;
    data: Rect | Circle | Triangle | Line | Pencil;
}


export class Shape {
    _id: string;
    type: ShapeType;
    rect: Rect | null = null;
    circle: Circle | null = null;
    triangle: Triangle | null = null;
    line: Line | null = null;
    pencil: Pencil | null = null;
    constructor({
        _id,
        type,
        data
    }: ShapeInterface) {
        this._id = _id;
        this.type = type;
        let da: any = data;
        this[type] = da;
    }
}




export interface RelativePositionType {
    clientX: number;
    clientY: number;
    bl: number;
    bt: number;
    offsetX: number;
    offsetY: number;
    event?: MouseEvent | null;
  }
  