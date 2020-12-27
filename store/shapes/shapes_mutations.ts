
export enum ShapeMutations {
    INIT_SOCKET = "INIT_SOCKET"
}

export const ShapesMutations = {
    INIT_SOCKET(store: any, payload: any) {
        store.socket = payload;
        // store.name = payload;
    }
}