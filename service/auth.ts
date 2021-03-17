import login from '~/apollo/mutations/login.gql';
import register from '~/apollo/mutations/register.gql';


export class AuthService {
    /**-
     * for registering user
     * @param param userName, email and password
     */
    public static async register(param: {email: string, password: string, userName: string}) {
        return window.$nuxt.$apollo.mutate({
            mutation: register,
            variables: { data: param }
        }).then(res => {
            window.$nuxt.$router.push("/login");
            return res;
        }).catch(err => Promise.reject(err));
    }
    public static async login(param: { email: string, password: string }) {
        return window.$nuxt.$apollo.mutate({
            mutation: login,
            variables: { data: param }
        }).then(res => {
            let redirect: any = window.$nuxt.$route.query["redirect"];
            let link = !!redirect ? redirect : '/login'
            window.$nuxt.$router.push(link);
            return res;
        }).catch(err => Promise.reject(err))
    }
}