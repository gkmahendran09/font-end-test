let auth = {
    methods: {
        isLoggedIn(cb) {
            axios.post('/auth')
                .then((res) => {
                    cb(res.data)
                })
                .catch((err) => {

                });
        },

        redirect() {
            this.$router.push({ path: '/', query: { redirect: this.$route.path }})
        },

        checkLoggedIn() {
            axios.post('/auth')
                .then((res) => {
                    if(!res.data.state)
                        this.redirect()
                    else
                        events.fire('user-obj-created', res.data.user);
                })
                .catch((err) => {

                });
        }

    }
};


export default auth;
