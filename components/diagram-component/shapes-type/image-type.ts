import { Rect, RectType } from './rectangle-type';

export interface ImageType extends RectType {
    imageUrl?: string;
}


export class ImageClass extends Rect {
    imageUrl?: string;

    constructor(par: ImageType) {
        super(par);
        this.imageUrl = !!par.imageUrl ? par.imageUrl : '';
    }

    get getJson() {
        return this;
    }
}

