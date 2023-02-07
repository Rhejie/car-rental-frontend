import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { registerModules } from './registerModules'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

import adminModule from './modules/admin'
import loginModule from './modules/login'
import userModule from './modules/user'
registerModules({
    admin: adminModule,
    user: userModule,
    login: loginModule,
});


import { createAuth } from '@websanova/vue-auth';
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js';
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';
const pinia = createPinia()

const instance = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
});

import mitt from 'mitt';

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

var auth = createAuth({
    plugins: {
        http: axios,
        router: router
    },
    drivers: {
        http: driverHttpAxios,
        auth: driverAuthBearer,
        router: driverRouterVueRouter,
    },
    tokenStore: ['localStorage'],
    options: {
        fetchData: { enabled: false },
        rolesKey: 'type',
        notFoundRedirect: { name: 'user-account' },
    }
});

const emitter = mitt();

import Echo from "laravel-echo"
import { accessToken } from './global-composables/local-storage'


const Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '8cd75a6ea9ab65d8b608',
    cluster: 'ap1',
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    disableStats: true,
    encrypted: true,
    auth: {
      headers: {
        ContentType: 'application/json',
        Authorization: 'Bearer ' + accessToken()
      },
    }
});
const app = createApp(App)

app.config.globalProperties.emitter = emitter;

app.use(VueAxios, instance)
app.use(auth)
app.use(pinia)
app.use(ElementPlus)
app.provide('auth', auth)
app.use(store).use(router).mount('#app')
