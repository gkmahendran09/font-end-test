<template>
    <div>
        <hf-header></hf-header>

        <section class="container">
            <div class="grid">
                <div class="col-12">
                    <p class="lead">Register with us today to receive regular updates from the HelloFresh farm. Inspiring recipe ideas, the newest food trends and unique HelloFresh promotions are awaiting you. And, don't worry, we promise not to spam you with daily emails</p>
                </div>
                <div class="col-6 col-offset-3">
                    <div class="message message--success" v-if="successMessage.is">{{successMessage.message}}</div>
                    <div class="message message--error" v-if="errorMessage.is">{{errorMessage.message}}</div>
                </div>
                <div class="col-6 col-offset-3">
                    <form method="post" class="form form--vertical" action="login" @submit="onSubmit" :onsubmit="`return ${isValidForm}`">
                        <div class="form__element">
                            <input type="text" placeholder="Email" v-model="email" name="username">
                            <span class="error" v-show="!isValidEmail && touched">Please enter a valid email</span>
                        </div>
                        <div class="form__element">
                            <input type="password" placeholder="Password" v-model="password" name="password">
                            <span class="error" v-show="!isValidPassword && touched">Please enter a valid password</span>
                        </div>
                        <div class="form__element">
                            <input type="submit" class="btn btn--primary" value="Login" :disabled="!isValidForm && touched">
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <hf-footer></hf-footer>

    </div>
</template>
<script>
    export default {
        data() {
            return  {
                email: '',
                password: '',
                touched: false,
                successMessage: {
                    is: false,
                    message: ''
                },
                errorMessage: {
                    is: false,
                    message: ''
                }
            }
        },
        computed: {
          isValidEmail() {
              return this.email !== '' && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
          },

          isValidPassword() {
            return this.password !== '' && this.password.length > 3
          },

          isValidForm() {
              return this.isValidEmail && this.isValidPassword
            }
        },
        methods: {
            onSubmit() {
                if(!this.touched)
                    this.touched = true;
            }
        },

        created() {
            // Check for login error
            if(this.$route.query.error == 1) {
                this.errorMessage.is = true;
                this.errorMessage.message = "Invalid username/password.";
            }

            // Check for logout success
            if(this.$route.query.success == 1) {
                this.successMessage.is = true;
                this.successMessage.message = "Logout Successful!";
            }
        }
    }
</script>

<style lang="scss">
    $success: green;
    $error: red;

    .message {
        width: 100%;
        padding: 10px;
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 15px;

        &.message--success {
            border: 1px solid $success;
            color: $success;
        }

        &.message--error {
            border: 1px solid $error;
            color: $error;
        }
    }
</style>