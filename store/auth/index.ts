import { AuthService } from "~/service/auth";
import { AppStorage } from "~/service/storage";
import login from '~/apollo/mutations/login.gql';

export const state = () => ({
    user: null
});

export const mutations = {
    UPDATE_USER(state: { user: any }, data: any) {
        state.user = data;
    }
};

export const actions = {
    async login(ctx: any, param: any) {
        try {
            const { data } = await AuthService.login(param);
            await AppStorage.set("cUser", data.login);
            ctx.commit("UPDATE_USER", param);
            return data;
        } catch (err) {
            console.log(err);
            throw err;
            // return Promise.reject(err);
        }
    }
};

