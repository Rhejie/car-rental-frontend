<template>
    <div class="flex h-screen">
        <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company" />
                    <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Register Account</h2>
                </div>

                <div class="mt-8">

                    <div class="mt-6">
                        <form class="space-y-6">
                            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">First
                                        Name</label>
                                    <div class="mt-1">
                                        <input id="email" type="text" placeholder="First Name"
                                            v-model="registerData.first_name"
                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        <span class="text-sm text-red-400"
                                            v-if="errorValue && !loading && errorValue.first_name">
                                            {{ errorValue.first_name[0] }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">Last
                                        Name</label>
                                    <div class="mt-1">
                                        <input id="email" type="text" v-model="registerData.last_name"
                                            placeholder="First Name"
                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        <span class="text-sm text-red-400"
                                            v-if="errorValue && !loading && errorValue.last_name">
                                            {{ errorValue.last_name[0] }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                                <div class="mt-1">
                                    <input id="email" name="email" v-model="registerData.email" type="email"
                                        placeholder="Email address"
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loading && errorValue.email">
                                        {{ errorValue.email[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1">
                                    <input id="password" v-model="registerData.password" name="password" type="password"
                                        placeholder="Enter your password"
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loading && errorValue.password">
                                        {{ errorValue.password[0] }}
                                    </span>
                                </div>
                            </div>
                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div class="mt-1">
                                    <input id="password" v-model="registerData.password_confirmation" name="password" type="password"
                                        placeholder="Enter your password"
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loading && errorValue.password_confirmation">
                                        {{ errorValue.password[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="mt-10 border-t border-gray-200 pt-10">
                                <button type="button" @click="handleRegister"
                                    class="inline-flex float-right bg-gray-700 hover:text-gray-700 text-white items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Register
                                </button>
                                <button type="button"
                                    class="mr-2 inline-flex float-right items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 h-full w-full object-cover" src=".././assets/suv2.webp" alt="" />
        </div>
    </div>
    <!-- <div>
        
        <div class="mt-12">
                        <form action="#" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                <div class="mt-1">
                                    <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                <div class="mt-1">
                                    <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                                <div class="mt-1">
                                    <input type="text" name="company" id="company" autocomplete="organization"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <div class="mt-1">
                                    <input id="email" name="email" type="email" autocomplete="email"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                <div class="mt-1">
                                    <input type="text" name="phone-number" id="phone-number" autocomplete="tel"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
                                        placeholder="+63 (950) 712-6543" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                                <div class="mt-1">
                                    <textarea id="message" name="message" rows="4"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <Switch v-model="agreed"
                                            :class="[agreed ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                                            <span class="sr-only">Agree to policies</span>
                                            <span aria-hidden="true"
                                                :class="[agreed ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                                        </Switch>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-base text-gray-500">
                                            By selecting this, you agree to the
                                            {{ ' ' }}
                                            <a href="#" class="font-medium text-gray-700 underline">Privacy Policy</a>
                                            {{ ' ' }}
                                            and
                                            {{ ' ' }}
                                            <a href="#" class="font-medium text-gray-700 underline">Cookie Policy</a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <button type="submit"
                                    class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Let's
                                    talk</button>
                            </div>
                        </form>
                    </div>
    </div> -->
</template>
<script setup>
import { registerUser } from '@/global-composables/authentication';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const agreed = ref(false)

const registerData = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
})

const errorValue = ref(null)
const loading = ref(false)

const handleRegister = async () => {
    loading.value = true
    const { register, errorData } = registerUser(registerData.value);
    await register();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        router.push({ name: 'Login' })
    }
}
</script>