import '@/assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createPersistedState} from "pinia-plugin-persistedstate";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import App from './App.vue'
import router from '@/router/router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState({
    key: (storeKey) => `command-art-${storeKey}`,
    storage: window.sessionStorage,
}));

app.use(pinia)
app.use(router)

app.mount('#app')
