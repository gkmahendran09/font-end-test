<template>
    <div class="recipe">
        <div class="recipe__fav-holder">
            <div class="recipe__fav-icon" :class="{favourite: isFavourite}" @click="markAsFavourite">
                <svg class="fav-icon" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill-opacity=".1" fill="#111" cx="18" cy="18" r="18"></circle><g transform="translate(6 7)"><path d="M0 0h24v24H0z"></path><path d="M12 21C31.007 8.704 18.198-1.608 12 5.134 5.802-1.608-7.007 8.704 12 21z" stroke="#fff" stroke-width="2"></path></g></g></svg>
                <svg class="unfav-icon" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill-opacity=".1" fill="#111" cx="18" cy="18" r="18"></circle><path d="M6 7h24v24H6z"></path><path d="M18 28c19.007-12.296 6.198-22.608 0-15.866C11.802 5.392-1.007 15.704 18 28z" fill="#fff"></path></g></svg>
            </div>
        </div>
        <div class="recipe__img-holder">
            <div class="recipe__img-bg" :class="{active: !isImgLoaded}"></div>
            <img :src="recipe.imageLink" :alt="recipe.name" :class="{active: isImgLoaded}">
        </div>
        <div class="recipe__footer">
            <p class="recipe__name">{{recipe.name}}</p>
            <p class="recipe__headline">{{recipe.headline}}</p>
            <div class="recipe__glance">
                <div class="recipe__glance__details recipe__glance__details--left">
                    <p>
                        <span class="calories" v-if="calories != ''">{{calories}}</span>
                        <span v-if="prepTime != ''">{{prepTime}}</span>
                    </p>
                </div>
                <div class="recipe__glance__details recipe__glance__details--right">
                    <rating :rating="recipe.averageRating"></rating>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    // Import moment
    import moment from 'moment';

    // Import Rating Component
    import Rating from '../../Components/Rating.vue';

    export default {
        props: ['recipe'],

        components: {
          'rating': Rating
        },

        data() {
          return {
              isImgLoaded: false,
              isFavourite: false // Todo::Get it from API
          }
        },

        computed: {
            calories() {
                let c = this.recipe.nutrition.filter((n) => {
                    return n.name == 'Calories'
                })

                if(c.length)
                    return `${c[0].amount} kcal`;
                else
                    return '';
            },

            prepTime() {
                let pt = this.recipe.prepTime;
                if(pt !== null) {
                    return 	`${moment.duration(pt).minutes()} minutes`;
                } else
                    return '';
            }
        },

        created() {
          let img = new Image();
          img.addEventListener('load', () => {
            this.isImgLoaded = true;
          }, false);
          img.src = this.recipe.imageLink;

        },

        methods: {
            markAsFavourite() {
                // TODO::Make an ajax requst to the server
                this.isFavourite = !this.isFavourite;

            }
        }
    }
</script>