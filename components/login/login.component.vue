<template src="./login.component.html"></template>
<style scoped lang="scss">
@import "login.component.scss";
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthService } from '~/service/auth';

@Component({})
export default class LoginComponent extends Vue {
    email: string = "";
    password: string = "";

    async login() {
        try {
            const data = await AuthService.login({
                email: this.email,
                password: this.password
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
}
</script>