

export const state = () => ({
    data: []
});

export const mutations = {
    ADD_DATA(
        state: { data: any[] }, 
        data: { message: string, type: "error" | "success" }
    ) {
        state.data = [...state.data, data];
    },

    REMOVE_DATA(state: { data: any[] }, id: string) {
        state.data = state.data.filter(res => res.id !== id);
    }
}

export const actions = {
    error({ commit }: any, message: string) {
        let id = Date.now().toString() + 
        Math.floor(Math.random() * 999999).toString();
        commit("ADD_DATA", { message, type: "error", id });
        setTimeout(() => commit("REMOVE_DATA", id), 3000);
    },

    success({ commit }: any, message: string) {
        let id = Date.now().toString() + 
        Math.floor(Math.random() * 999999).toString();
        commit("ADD_DATA", { message, type: "success", id });
        setTimeout(() => commit("REMOVE_DATA", id), 3000);
    }
}