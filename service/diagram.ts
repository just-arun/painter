import { AppHttp } from './http.service';

export class DiagramService {
    public static async createDiagram(data: { name: string, users: any, shapes: any[] }) {
        return AppHttp.post('/diagram', data)
    }
    public static async getDiagram() {
        return AppHttp.get('/diagram')
    }
    public static async getOneDiagram(id: string) {
        return AppHttp.get(`/diagram/${id}`)
    }
    public static async updateDiagram(id: string, data: { name: string, users: any, shapes: any[] }) {
        return AppHttp.put(`/diagram/${id}`, data)
    }
    public static async Delete(id: string) {
        return AppHttp.delete(`/diagram/${id}`)
    }
}
