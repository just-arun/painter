import { Rect, RectType } from './rectangle-type';

export class ImageClass extends Rect {
    constructor({ x, y, h, w, type, fill, text, color, fontSize }: RectType) {
        super({ x, y, h, w, type, fill, text, color, fontSize });
    }

    get getJson() {
        return this;
    }
}

