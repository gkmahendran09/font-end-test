<template>
    <header class="header">
        <a href="/" class="header__logo"><img src="https://www.hellofresh.com/images/hellofresh-logo.svg?v=3" alt="HelloFresh"></a>
        <form method="post" action="/logout" v-if="isLoggedIn">
            <span class="header__user" v-show="userObj">Hi {{userObj.name}},</span>
            <button class="btn btn--primary header__login-btn" type="submit">
                Logout
            </button>
        </form>
        <button class="btn btn--primary header__login-btn" v-else>
            Login
        </button>
    </header>
</template>
<script>
    export default {
        props: ["isLoggedIn"],
        data() {
            return {
                userObj: ''
            }
        },

        created() {
            events.listen('user-obj-created', (user) => {
                this.userObj = user;
            });
        }
    }
</script>