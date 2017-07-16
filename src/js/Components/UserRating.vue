<template>
    <div class="hf-rating clearfix">
        <div :class="[{'active': checkActive(n)}, {'hover': checkHover(n)}]" class="hf-star-holder hf-star-holder--big hf-star-holder--user-rating" v-for="n in 4" @click="emit(n)" @mouseover="onMouseOver(n)" @mouseout="onMouseOut()">
            <svg class="star empty-star" width="38" height="38" viewBox="0 0 38 38" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><path d="M19.022 29.348L7.577 35.394l2.186-12.806-9.26-9.069L13.3 11.651 19.022 0l5.723 11.65 12.796 1.87-9.26 9.068 2.186 12.806z" fill="#fff" stroke="#c2c2c2" stroke-width="1" fill-rule="evenodd" class="star-path"></path></svg>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                currentRating: 0,
                currentElement: 0
            }
        },


        methods: {
            // Emit the user rating to parent
            emit(r) {
                this.currentRating = r;
                this.$emit('rated', r);
            },

            checkActive(n) {
              return n <= this.currentRating;
            },

            checkHover(n) {
              return n <= this.currentElement;
            },

            onMouseOver(n) {
                this.currentElement = n;
            },

            onMouseOut() {
                this.currentElement = 0;
            }
        }
    }
</script>

<style lang="scss">
    .hf-star-holder--user-rating {
        cursor: pointer;

        &.active,
        &.hover {
            .star .star-path {
                fill: #91c11e;
                stroke: #91c11e;
            }
        }
    }

</style>
