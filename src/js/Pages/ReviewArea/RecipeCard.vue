<template>
    <div class="recipe">
        <div class="recipe__img-holder">
            <div class="recipe__img-bg"></div>
            <img :src="recipe.imageLink" :alt="recipe.name">
        </div>
        <div class="recipe__footer">
            <p class="recipe__name">{{recipe.name}}</p>
            <p class="recipe__headline">{{recipe.headline}}</p>
            <div class="recipe__glance">
                <div class="recipe__glance__details recipe__glance__details--left">
                    <p>
                        <span>450 kcal</span>
                        <span>30 minutes</span>
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
    export default {
        props: ['recipe']
    }
</script>