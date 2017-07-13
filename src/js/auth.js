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
                    if(!res.data)
                        this.redirect()
                })
                .catch((err) => {

                });
        }

    }
};


export default auth;
