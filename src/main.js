import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
//app.config.globalProperties.axios = axios;

import store from './store.js'

app.use(store).mount('#app')
