<template>
    <div class="flex h-screen overflow-hidden ">
        <div class="flex flex-1 flex-col overflow-y-auto  justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img class="h-12 w-auto" src="../assets/APCLogo.jpg"
                        alt="Your Company" />
                    <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">Register Account</h2>
                </div>

                <div class="mt-2">

                    <div class="mt-6 h-full">
                        <form class="space-y-6">
                            <div>
                                <div class="mt-1">
                                    <UserProfileUploader @newImage="handleUploadedProfile"/>
                                    <span class="text-sm text-red-400"
                                        v-if="(errorValue && !loading && errorValue.user_identification)">
                                        {{ errorValue.user_identification[0] }}
                                    </span>
                                </div>
                            </div>
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
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                        Contact Number
                                        </label>
                                    <div class="mt-1">
                                        <input id="email" type="text" v-model="registerData.contact_number"
                                            placeholder="Contact Number"
                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        <span class="text-sm text-red-400"
                                            v-if="(errorValue && !loading && errorValue.contact_number)">
                                            {{ errorValue.contact_number[0] }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <div class="mt-1">
                                            <select id="location" name="location"
                                                v-model="registerData.gender"
                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option selected value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <span class="text-sm text-red-400"
                                        v-if="errorValue && !loading && errorValue.gender">
                                        {{ errorValue.gender[0] }}
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Address</label>
                                <div class="mt-1">
                                    <textarea v-model="registerData.address" 
                                        placeholder="Address"
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loading && errorValue.address">
                                        {{ errorValue.address[0] }}
                                    </span>
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
                                        {{ errorValue.password_confirmation[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="mt-10 border-t border-gray-200 pt-10">
                                <button type="button" @click="handleRegister"
                                    class="inline-flex 
                                        float-right bg-cyan-500 text-white text-white items-center 
                                        rounded-md border border-cyan-300 px-3 py-2 text-sm font-medium 
                                        leading-4 shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 
                                        focus:ring-indigo-500 focus:ring-offset-2">
                                    Register
                                </button>
                                <button type="button"
                                    @click="handleClickLogin"
                                    class="mr-2 inline-flex float-right items-center rounded-md border border-cyan-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
</template>
<script setup>
import { registerUser } from '@/global-composables/authentication';
import UserProfileUploader from '@/modules/user/user-components/UserProfileUploader.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const agreed = ref(false)

const registerData = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_identification: ''
})

const errorValue = ref(null)
const loading = ref(false)

const handleRegister = async () => {
    const imageUrl = localStorage.getItem('profile_url')
    if(imageUrl)  {
        registerData.value.user_identification = imageUrl
    }
    loading.value = true
    const { register, errorData } = registerUser(registerData.value);
    await register();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        router.push({name: 'Login'})
    }
}

const handleClickLogin = () => {
    router.push({name: 'Login'})
}

const handleUploadedProfile = (imageUrl) => {
    registerData.value.user_identification = imageUrl
}
</script>