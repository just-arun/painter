import { AppHttp } from './http.service';


export class AuthService {
    public static async login({ email, password }: any) {
        return AppHttp.post('/auth/login', {
            email: email,
            password: password
        })
    }
}