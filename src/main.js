import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'

import { registerModules } from './registerModules'
import adminModule from './modules/admin'
import loginModule from './modules/login'
import userModule from './modules/user'
registerModules({
    admin: adminModule,
    user: userModule,
    login: loginModule,
});

createApp(App).use(store).use(router).mount('#app')
