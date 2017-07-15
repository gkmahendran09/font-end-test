<template>
    <div class="recipe">
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
                    rating
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    // Import moment
    import moment from 'moment';

    export default {
        props: ['recipe'],

        data() {
          return {
              isImgLoaded: false
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

        }
    }
</script>