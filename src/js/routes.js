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
    }
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});


export default router;