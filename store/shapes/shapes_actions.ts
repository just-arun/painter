import { ShapeMutations } from './shapes_mutations';
import { io } from 'socket.io-client';

export enum ShapeActions {
    initSocket = "shapes/initSocket"
}

export const ShapesActions = {
    initSocket({ commit }: any) {
        // let socket = io('http://localhost:8000', {
        //     withCredentials: true,
        // });
        // socket.on("connect", (eve: any) => {
        //     console.log("shit\n\n\n\n\n\n\n\n");
        // })
    }
}