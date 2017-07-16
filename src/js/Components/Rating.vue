<template>
    <div class="hf-rating clearfix">
        <!--<svg class="empty-star" width="38" height="38" viewBox="0 0 38 38" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><path d="M19.022 29.348L7.577 35.394l2.186-12.806-9.26-9.069L13.3 11.651 19.022 0l5.723 11.65 12.796 1.87-9.26 9.068 2.186 12.806z" fill="#fff" stroke="#c2c2c2" stroke-width="1" fill-rule="evenodd"></path></svg>-->
        <!--<svg class="full-star" width="38" height="38" viewBox="0 0 38 38" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><path d="M19.022 29.348L7.577 35.394l2.186-12.806-9.26-9.069L13.3 11.651 19.022 0l5.723 11.65 12.796 1.87-9.26 9.068 2.186 12.806z" fill="#91c11e" stroke="#91c11e" stroke-width="1" fill-rule="evenodd"></path></svg>-->
        <div class="hf-star-holder" v-for="n in 4">
            <svg class="star empty-star" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"></path><path fill="#eceae6" d="M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z"></path></g></svg>
            <svg :style="{'clip-path': getClipPath(n) }" class="star filled-star" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h16v16H0z"></path><path fill="#91c11e" d="M8 11.646L11.708 14l-.981-4.44L14 6.576l-4.315-.39L8 2 6.315 6.185 2 6.575l3.273 2.986L4.292 14z"></path></g></svg>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'rating' ],

        computed: {
            roundOffRating() {
                return Math.round(this.rating)
            }
        },

        methods: {
            getClipPath(index) {

                if(index <= this.roundOffRating) {

                    if(index == this.roundOffRating) { // check for last
                        let diff = this.roundOffRating - this.rating;

                        if(diff == 0) { // if 0 then there is no decimal
                            return `inset(0px 0px 0px 0px)`
                        } else {
                            /*
                             * clip path starts from 2px to 14px(14 - 2 = 12) - base 12
                             * Simple percentage calculation math, for 1 we have 'diff' then for 12
                             * +2 to sync with the clip path start value
                             */
                            let i = (((diff / 1) * 12) + 2);
                            return `inset(0px ${i}px 0px 0px)`
                        }

                    } else {
                        return `inset(0px 0px 0px 0px)`
                    }
                }
                else // no rating
                    return `inset(0px 14px 0px 0px`
            }
        }
    }
</script>