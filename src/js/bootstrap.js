// Importing Vue
import Vue from 'vue';

// Assign it to Global Variable
window.Vue = Vue;

// Import Vue Router
import VueRouter from 'vue-router';

// Assign it to Global Variable
window.VueRouter = VueRouter;

// Tell Vue to use Vue router
Vue.use(VueRouter);

// Import axios
import axios from 'axios';
window.axios = axios;

// Global event object
window.events = new Vue();
events.fire = events.$emit;
events.listen = events.$on;

// Register Global Components

// Header Component
import Header from './Components/Header.vue';
Vue.component('hf-header', Header);

// Footer Component
import Footer from './Components/Footer.vue';
Vue.component('hf-footer', Footer);