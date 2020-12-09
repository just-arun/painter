export interface LineType {
    id: string;
    path: string;
}

export class Line {
    id: string;
    path: string;
    constructor({
        id,
        path
    }: LineType) {
        this.id = id;
        this.path = path;
    }
}