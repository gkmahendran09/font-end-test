<template>
    <div>
        <hf-header></hf-header>
        <h1>Review Area</h1>
        <hf-footer></hf-footer>
    </div>
</template>
<script>
    import auth from "../auth.js";
    export default {
        mixins: [ auth ],
        created() {
            this.checkLoggedIn();
        }
    }
</script>
