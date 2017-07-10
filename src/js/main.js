// Bootstrap the app
import './bootstrap.js';

// Import routes
import router from './routes.js';

// The Vue instance
var vm = new Vue({
    el: "#app",
    router
});