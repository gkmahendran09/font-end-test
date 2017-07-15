<template>
    <div class="recipe recipe--empty">
        <div class="recipe__img-holder">
            <div class="recipe__img-bg"></div>
        </div>
        <div class="recipe__footer">
            <p class="recipe__name"></p>
            <p class="recipe__headline"></p>
            <p class="recipe__glance"></p>
        </div>

    </div>
</template>
<style lang="scss">
    .recipe--empty {
        .recipe__footer {
            // common
            p {
                height: 15px !important;
                margin: 0 0 15px 0;
                background: #f5f5f5;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            .recipe__name {
                width: 80%;
            }

            .recipe__glance {
                width: 40%;
            }
        }
    }
</style>