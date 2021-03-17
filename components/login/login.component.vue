<template src="./login.component.html"></template>
<style scoped lang="scss">
@import "login.component.scss";
</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AuthService } from '~/service/auth';


@Component({
    apollo: {
        
    }
})
export default class LoginComponent extends Vue {
    @Prop() type!: "login" | "register" | "forgot" | "reset";
    email: string = "arun@mail.com";
    userName: string = "";
    password: string = "pwd123";

    async submit() {
        switch (this.type) {
            case "login":
                return this.login();
            case "register":
                return this.register();
            case "forgot":
                return this.forgotPassword();
            case "reset":
                return this.resetPassword();
        }
    }

    async login() {
        try {
            await this.$store.dispatch("auth/login", 
            { email: this.email, password: this.password });
        } catch (err) {
            console.log(err);
            let error = JSON.parse(JSON.stringify(err));
            this.$store.dispatch("toster/error", error.message);
        }
    }

    async register() {
        try {
            const { data } = await AuthService.register({
                email: this.email,
                userName: this.userName,
                password: this.password
            });
            console.log(data);
            this.$router.push("/login");
        } catch (err) {
            console.log(err);
            let error = JSON.parse(JSON.stringify(err));
            this.$store.dispatch("toster/error", error.message);
        }
    }

    async forgotPassword() {

    }

    async resetPassword(){

    }
}
</script>