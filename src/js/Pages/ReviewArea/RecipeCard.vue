<template>
    <div class="recipe">
        <div class="recipe__fav-holder">
            <div class="recipe__fav-icon" :class="{favourite: isFavourite}" @click="markAsFavourite">
                <svg class="fav-icon" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill-opacity=".1" fill="#111" cx="18" cy="18" r="18"></circle><g transform="translate(6 7)"><path d="M0 0h24v24H0z"></path><path d="M12 21C31.007 8.704 18.198-1.608 12 5.134 5.802-1.608-7.007 8.704 12 21z" stroke="#fff" stroke-width="2"></path></g></g></svg>
                <svg class="unfav-icon" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill-opacity=".1" fill="#111" cx="18" cy="18" r="18"></circle><path d="M6 7h24v24H6z"></path><path d="M18 28c19.007-12.296 6.198-22.608 0-15.866C11.802 5.392-1.007 15.704 18 28z" fill="#fff"></path></g></svg>
            </div>
        </div>
        <div class="recipe__rating-holder" @click="showRatingModal" :class="{'active': isRated}">
            <svg width="24" height="24" viewBox="0 0 38 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" ><path d="M19.022 29.348L7.577 35.394l2.186-12.806-9.26-9.069L13.3 11.651 19.022 0l5.723 11.65 12.796 1.87-9.26 9.068 2.186 12.806z" fill="transparent" stroke="#fff" stroke-width="3" fill-rule="evenodd" class="svg-path"></path></svg>
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

        <hf-modal :show.sync="isRatingModalVisible">
            <div class="modal modal--auto-width modal--user-rating">
                <div class="modal-header">
                    <span>Rate recipe</span>
                    <svg @click="isRatingModalVisible = false" class="close-icon" width="14" height="14" viewBox="0 0 19 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 9.255l7.364-7.363A1 1 0 1 0 17.364.478L10 7.84 2.637.477a1 1 0 1 0-1.414 1.414l7.363 7.364-7.364 7.363a1 1 0 1 0 1.414 1.414L10 10.67l7.363 7.364a1 1 0 1 0 1.414-1.414l-7.363-7.364z" fill="#343434" fill-rule="evenodd"></path></svg>
                </div>
                <div class="modal-body">
                    <div class="help-text">Help us improve our product</div>
                    <div class="user-rating-holder">
                        <user-rating :current-rating.sync="userRating"></user-rating>
                    </div>
                    <textarea placeholder="Write a comment… (optional)" class="user-comment-field"></textarea>
                </div>
                <div class="modal-footer">
                    <button class="btn" @click="isRatingModalVisible = false">Cancel</button>
                    <button class="btn btn--primary" @click="saveUserRating" :disabled="userRating==0">Save</button>
                </div>
            </div>
        </hf-modal>
    </div>
</template>
<script>
    // Import moment
    import moment from 'moment';

    // Import Rating Component
    import Rating from '../../Components/Rating.vue';

    // Import User Rating Component
    import UserRating from '../../Components/UserRating.vue';

    export default {
        props: ['recipe'],

        components: {
          'rating': Rating,
          'user-rating': UserRating
        },

        data() {
          return {
              isImgLoaded: false,
              isFavourite: false, // Todo::Get it from API,
              isRated: false, // Todo::Get it from API
              isRatingModalVisible: false, // Rating modal visibility controller,
              userRating: 0 // Current user rating will be updated once the user rated
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
                alert('fav test')
                // TODO::Make an ajax requst to the server
                this.isFavourite = !this.isFavourite;

            },

            saveUserRating() {
                // TODO::Make an ajax requst to the server
                // this.userRating holds the current user rating

                this.isRatingModalVisible = false;

                this.isRated = true;
            },

            showRatingModal() {
                this.isRatingModalVisible = true;
            }
        }
    }
</script>

<style lang="scss">
    .modal--user-rating {
        width: 320px;

        // modal body style overrides
        .modal-body {
            padding: 20px;
            font-size: 16px;
            font-weight: 300;
            line-height: 1.5em;
            color: #343434;
            text-align: center;

            .help-text,
            .user-rating-holder {
                padding-bottom: 20px;
            }

            .user-comment-field {
                border: solid 1px #ebebeb;
                outline: none;
                overflow: auto;
                box-sizing: border-box;
                padding: 10px;
                font-size: 16px;
                font-weight: 400;
                line-height: 1.5em;
                color: #343434;
                opacity: 1;
                resize: none;
                min-width: 100%;
                display: block;
            }

            .user-comment-field::-webkit-input-placeholder {
                color: #999;
            }
        }

        // modal footer style overrides
        .modal-footer {
            .btn {
                padding: 10px 50px;
            }
        }
    }
</style>