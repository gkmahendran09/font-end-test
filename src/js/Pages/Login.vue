<template>
    <div>
        <hf-header></hf-header>

        <section class="container">
            <div class="grid">
                <div class="col-12">
                    <p class="lead">Register with us today to receive regular updates from the HelloFresh farm. Inspiring recipe ideas, the newest food trends and unique HelloFresh promotions are awaiting you. And, don't worry, we promise not to spam you with daily emails</p>
                </div>
                <div class="col-6 col-offset-3">
                    <form method="post" class="form form--vertical" @submit.prevent="onSubmit">
                        <div class="form__element">
                            <input type="text" placeholder="Email" v-model="email">
                            <span class="error" v-show="!isValidEmail && touched">Please enter a valid email</span>
                        </div>
                        <div class="form__element">
                            <input type="password" placeholder="Password" v-model="password">
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
                touched: false
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

                if(this.isValidForm)
                    alert("valid form")
            }
        }
    }
</script>