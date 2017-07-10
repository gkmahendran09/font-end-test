import PageNotFound from './Pages/NotFound.vue';

import Login from './Pages/Login.vue';
import ReviewArea from './Pages/ReviewArea.vue';


const routes = [
    {
        path: "/",
        component: Login
    },
    {
        path: "/review",
        component: ReviewArea
    },

    // when none of the above matches: 404
    {
        path: "*",
        component: PageNotFound
    }
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});


export default router;