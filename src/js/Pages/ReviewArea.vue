<template>
    <div>
        <hf-header is-logged-in="true"></hf-header>
        <section class="container">
            <div class="grid">
                <div class="col-12">
                    <div class="grid" v-show="!onLoad">
                        <div class="col-12">
                            <p class="lead">{{recipe.total}} recipes found</p>
                        </div>
                        <div class="col-4" v-for="r in recipe.items">
                            <recipe-card :recipe="r"></recipe-card>
                        </div>
                        <div class="col-12 text-center load-more-btn-holder" v-if="isLoadMore && !isLoading">
                            <button class="btn btn--primary" @click="loadMore">LOAD MORE</button>
                        </div>
                    </div>
                    <div class="grid" v-show="isLoading">
                        <div class="col-4" v-for="n in limit">
                            <recipe-card-empty></recipe-card-empty>
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
    import RecipeCardEmpty from "./ReviewArea/RecipeCardEmpty.vue";
    export default {
        mixins: [ auth ],
        components: {
                "recipe-card": RecipeCard,
            "recipe-card-empty": RecipeCardEmpty
            },
        data() {
          return {
              hfToken: '',
              recipe: {},
              isLoading: true,
              isLoadMore: false,
              limit: 9,
              pageIndex: -1,
              onLoad: true
          }
        },
        computed: {
            offset() {
                return this.pageIndex * this.limit;
            },
          searchAPIObj() {
              let obj = {
                  method: 'get',
                  url: '',
                  headers: {
                      'Authorization' : `Bearer ${this.hfToken}`
                  }
              };

              let url = `https://gw.hellofresh.com/api/recipes/search?country=us&locale=en-US&offset=${this.offset}&limit=${this.limit}&cuisine=italian&order=-rating`;
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
                // Check if the request is first time
                if(this.onLoad === true) {
                    // turn off the flag
                    this.onLoad = false;

                    // Update the recipe list
                    Object.assign(this.recipe, res.data);
                } else { // we have recipe
                    this.recipe.items.push.apply(this.recipe.items, res.data.items);
                }

                // turn off loading flag
                this.isLoading = false;

                // Check for Load More
                var totalResultsLoaded = this.limit * this.pageIndex;
                if((this.recipe.total - totalResultsLoaded) < parseInt(this.limit))
                    this.isLoadMore = false;
                else
                    this.isLoadMore = true;
            },

            // Get the Recipe from the API
            fetchRecipe() {
                // Increment page index by 1 for the next request
                this.pageIndex++;

                axios(this.searchAPIObj)
                    .then(this.updateRecipe)
                    .catch(this.handleError);
            },

            // On Click Load more button
            loadMore() {
                this.isLoading = true;
                this.fetchRecipe();
            }

        }
    }
</script>
<style lang="scss">
    .load-more-btn-holder {
        margin-bottom: 15px;
    }
</style>