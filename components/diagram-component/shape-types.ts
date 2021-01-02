import { TextClass } from './shapes-type/text-type';
import { ImageClass } from './shapes-type/image-type';
import { Rect } from "./shapes-type/rectangle-type";
import { Circle, CircleType } from "./shapes-type/circle-type";
import { Triangle } from "./shapes-type/triangle-type";
import { Line, LineType } from "./shapes-type/line-type";
import { Pencil } from "./shapes-type/pencil-type";

export const Colors = ["#FF5959", "#F7FF93", "#FF5D90", "#59CEFF", "#FFF000"];

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
    Pencil = "pencil",
    Text = "text",
    Image = "image"
}

export interface ShapeInterface {
    _id: string;
    name: string;
    type: ShapeType;
    user?: string | null;
    links: string[];
    data: Rect | Circle | Triangle | Line | Pencil | ImageClass | TextClass;
}


export class Shape {
    _id: string;
    user?: string | null = null;
    links: string[] = [];
    name: string;
    type: ShapeType;
    rect: Rect | null = null;
    circle: Circle | null = null;
    triangle: Triangle | null = null;
    line: Line | null = null;
    pencil: Pencil | null = null;
    image: ImageClass | null = null;
    text: TextClass | null = null;
    constructor({
        _id,
        type,
        name,
        data,
        user,
        links
    }: ShapeInterface) {
        this._id = _id;
        this.name = name;
        this.type = type;
        let da: any = data;
        this[type] = da;
        this.user = !!user ? user : null;
        if (!!links) {
            if (!!links.length) {
                this.links = links;
            }
        }
    }

    addLinks(id: string) {
        if (id == this._id) {
            return;
        }
        if (!this.links.includes(id)) {
            this.links.push(id);
        }
    }

    removeLink(id: string) {
        this.links = this.links.filter((res) => {
            if (res != id) return res;
        })
    }
}

export const mapObjToShape = {
    "rect": Rect,
    "circle": Circle,
    "triangle": Triangle,
    "line": Line,
    "pencil": Pencil,
    "image": ImageClass,
    "text": TextClass,
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





export const getDevice = (): DeviceType => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return DeviceType.Tablet;
    }
    if (
        /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return DeviceType.Mobile;
    }
    return DeviceType.Desktop;
}