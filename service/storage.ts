export class AppStorage {
    public static async get(key: string): Promise<any> {
        let data: any = localStorage.getItem(key);
        return JSON.parse(data);
    }

    public static async set(key: string, payload: {}): Promise<void> {
        localStorage.setItem(key, JSON.stringify(payload));
        return;
    }

    public static clear() {
        return localStorage.clear();
    }
}