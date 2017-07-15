<template>
    <div>
        <hf-header is-logged-in="true"></hf-header>
        <section class="container">
            <div class="grid">
                <div class="col-12">
                    <div v-show="isLoading">Loading....</div>
                    <div class="grid" v-show="!isLoading">
                        <div class="col-12">
                            <p class="lead">{{recipe.total}} recipes found</p>
                        </div>
                        <div class="col-4" v-for="r in recipe.items">
                            <recipe-card :recipe="r"></recipe-card>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <hf-footer></hf-footer>
    </div>
</template>
<script>
    import auth from "../auth.js";
    import RecipeCard from "./ReviewArea/RecipeCard.vue";
    export default {
        mixins: [ auth ],
        components: {
                "recipe-card": RecipeCard
            },
        data() {
          return {
              hfToken: '',
              recipe: '',
              isLoading: true
          }
        },
        computed: {
          searchAPIObj() {
              let obj = {
                  method: 'get',
                  url: '',
                  headers: {
                      'Authorization' : `Bearer ${this.hfToken}`
                  }
              };

              let url = 'https://gw.hellofresh.com/api/recipes/search?country=us&locale=en-US&limit=9&cuisine=italian&order=rating';
                obj.url = url;

              return obj;
          }
        },
        created() {
            this.checkLoggedIn();

            axios.post('/getAPIToken')
                .then(this.updateAPIToken)
                .catch(this.handleError);
        },
        methods: {
            // Update the API Token once we get
            updateAPIToken(res) {
                this.hfToken = res.data.access_token;
                this.fetchRecipe();
            },

            // Handle any error
            handleError(err) {
                console.log(err)
            },

            // Update recipe data
            updateRecipe(res) {
                this.isLoading = false;
                this.recipe = res.data;
            },

            // Get the Recipe from the API
            fetchRecipe() {
                axios(this.searchAPIObj)
                    .then(this.updateRecipe)
                    .catch(this.handleError);
            }


        }
    }
</script>
