<script setup>

import { LockClosedIcon } from '@heroicons/vue/20/solid'
import {loginUser} from '@/modules/login/composables/login-composable'
import { inject, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const auth = inject('auth')
const store = useStore();
const router = useRouter();
const errorMessage = ref(null)
const error = ref({
        email: [],
        password: []
});
const login = ref({
    email: '',
    password: null
});

const handleClickRegister = () => {
    router.push('/register')
}

const handleClickLogIn = async () => {
    const {loggedIn , data, errorValue, errorStatus, messageData} = loginUser(login.value);
    await loggedIn();
    if(errorValue.value && errorStatus.value == 422) {
        error.value = errorValue.value.errors
        errorMessage.value = messageData.value
        return ;
    }
    else if (errorValue.value && errorStatus.value == 401) 
    {
        error.value.email = []
        error.value.password = []
        errorMessage.value = messageData.value
        return;
    }
    else if(errorStatus.value == 500){
        error.value.email = []
        error.value.password = []
        errorMessage.value = 'Some Error Occured, Please contact the administrator.'
        return
    }
    auth.user(data.value.user)
    auth.token(null, data.value.token)
    localStorage.setItem('car_rental_access_token', data.value.token)
    auth.remember(JSON.stringify(auth.user()));
    store.commit('login/USER_LOGGEDIN', data.value.user);
    if(data.value.user.role.name.toLowerCase() == 'admin') {
        router.push('/admin')
        return
    }
    router.push('/user')
}
</script>
<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto w-80" src="../../../assets/APCLogo.jpg"
                    alt="Your Company" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <form class="mt-8 space-y-6">
                <span class="text-red-400 text-sm" v-if="errorMessage"> {{errorMessage}}</span>
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" type="email" v-model="login.email" 
                            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" type="password" v-model="login.password"
                            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password" />
                    </div>
                </div>
    
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>
    
                    <div class="text-sm">
                        <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">back to home</router-link>
                    </div>
                </div>
    
                <div>
                    <button type="submit"
                        @click.prevent="handleClickLogIn"
                        class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true" />
                        </span>
                        Sign in
                    </button>

                    <button type="button"
                        @click="handleClickRegister"
                        class="group relative mt-2 flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5 text-green-500 group-hover:text-green-400" aria-hidden="true" />
                        </span>
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>