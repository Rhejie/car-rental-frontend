<template>
    <div class="flex h-screen overflow-hidden ">
        <div class="flex flex-1 flex-col overflow-y-auto  justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">


                <div class="mt-2">

                    <div class="mt-6 h-auto">
                        <div>
                            <img class="h-12 w-auto" src="../assets/APCLogo.jpg" alt="Your Company" />
                            <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900">Register Account</h2>
                        </div>
                        <form class="">
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
                                    <label for="email" class="block text-sm font-medium text-gray-700">Middle
                                        Name</label>
                                    <div class="mt-1">
                                        <input id="email" type="text" v-model="registerData.middle_name"
                                            placeholder="First Name"
                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        <span class="text-sm text-red-400"
                                            v-if="(errorValue && !loading && errorValue.middle_name)">
                                            {{ errorValue.middle_name[0] }}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>
                                    <div class="mt-1">
                                        <input type="text" v-model="registerData.contact_number"
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
                                        <select id="location" name="location" v-model="registerData.gender"
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
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>
                                    <div class="mt-1">
                                        <input id="email" type="date" v-model="registerData.birthday"
                                            placeholder="Contact Number"
                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                        <span class="text-sm text-red-400"
                                            v-if="(errorValue && !loading && errorValue.birthday)">
                                            {{ errorValue.birthday[0] }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Address</label>
                                <div class="mt-1">
                                    <textarea v-model="registerData.address" placeholder="Address"
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                    <span class="text-sm text-red-400" v-if="errorValue && !loading && errorValue.address">
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
                                    <span class="text-sm text-red-400" v-if="errorValue && !loading && errorValue.email">
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
                                    <span class="text-sm text-red-400" v-if="errorValue && !loading && errorValue.password">
                                        {{ errorValue.password[0] }}
                                    </span>
                                </div>
                            </div>
                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700">Confirm
                                    Password</label>
                                <div class="mt-1">
                                    <input id="password" v-model="registerData.password_confirmation" name="password"
                                        type="password" placeholder="Enter your password"
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loading && errorValue.password_confirmation">
                                        {{ errorValue.password_confirmation[0] }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <div class="mt-1">
                                    <UserProfileUploader @newImage="handleUploadedSelfi" :storage-name="'selfi'"
                                        :message="'Image of person holding the valid id'" />
                                    <span class="text-sm text-red-400"
                                        v-if="(errorValue && !loading && errorValue.user_selfi)">
                                        {{ errorValue.user_selfi[0] }}
                                    </span>
                                </div>
                                <div class="mt-1">
                                    <UserProfileUploader @newImage="handleUploadedProfile" :storage-name="'id'" />
                                    <span class="text-sm text-red-400"
                                        v-if="(errorValue && !loading && errorValue.user_identification)">
                                        {{ errorValue.user_identification[0] }}
                                    </span>
                                </div>
                            </div>

                            <span class="text-sm text-gray-600">By signing up, you are agreeing to the APC Car Rental</span>
                            <!-- <span
                                    class="text-cyan-500 cursor-pointer" @click="handleClickPolicy"> terms and
                                    condition</span>, View our <span @click="handleClickPrivacy"
                                    class="text-cyan-500 cursor-pointer">privacy policy</span></span> -->
                            <fieldset>
                                <legend class="sr-only">Notifications</legend>
                                <div class="space-y-1">
                                    <div class="relative flex items-start">
                                        <div class="flex h-6 items-center">
                                            <input id="comments" v-model="checkTermsAndConditions" aria-describedby="comments-description" name="comments"
                                                type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-cyan-500 focus:ring-indigo-600" />
                                        </div>
                                        <div class="ml-3 text-sm leading-6">
                                            <label for="comments" @click="handleClickPrivacy" class="font-medium text-cyan-500 cursor-pointer">terms and
                                                condition</label>
                                        </div>
                                    </div>
                                    <div class="relative flex items-start">
                                        <div class="flex h-6 items-center">
                                            <input id="candidates" v-model="checkPrivacyAndPolicy" aria-describedby="candidates-description"
                                                name="candidates" type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>
                                        <div class="ml-3 text-sm leading-6">
                                            <label for="candidates" @click="handleClickPolicy" class="font-medium text-cyan-500 cursor-pointer">privacy policy</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <div class="mt-10 border-t border-gray-200 pt-10">
                                <button :disabled="!checkPrivacyAndPolicy || !checkTermsAndConditions"
                                    :class="[!checkPrivacyAndPolicy || !checkTermsAndConditions ? 'cursor-not-allowed' : '']"
                                    type="button" @click="handleRegister" class="inline-flex 
                                                        float-right bg-cyan-500 text-white text-white items-center 
                                                        rounded-md border border-cyan-300 px-3 py-2 text-sm font-medium 
                                                        leading-4 shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 
                                                        focus:ring-indigo-500 focus:ring-offset-2">
                                    Register
                                </button>
                                <button type="button" @click="handleClickLogin"
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
    <PolicyModal :open-modal="showModal" @close-modal="handleCloseModal" />
    <PrivacyModal :open-modal="showModalPrivacy" @close-modal="handleCloseModal" />
    <IndentificationReminder :open-modal="openIdentification" @close-modal="handleCloseModal" />
</template>
<script setup>
import { registerUser } from '@/global-composables/authentication';
import PolicyModal from '@/modules/user/modal/PolicyModal.vue';
import PrivacyModal from '@/modules/user/modal/PrivacyModal.vue';
import UserProfileUploader from '@/modules/user/user-components/UserProfileUploader.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IndentificationReminder from '@/components/IndentificationReminder.vue';
const router = useRouter();
const agreed = ref(false)

const registerData = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user_identification: '',
    user_selfi: '',
    middle_name: ''
})

const showModalPrivacy = ref(false)
const checkPrivacyAndPolicy = ref(false)
const checkTermsAndConditions = ref(false)

const errorValue = ref(null)
const loading = ref(false)
const openIdentification = ref(true)

const handleRegister = async () => {
    const imageUrl = localStorage.getItem('id')
    const selfi = localStorage.getItem('selfi')
    if (imageUrl && selfi) {
        registerData.value.user_identification = imageUrl
        registerData.value.user_selfi = selfi
    }

    loading.value = true
    const { register, errorData } = registerUser(registerData.value);
    await register();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        router.push({ name: 'Login' })
    }
}

const handleClickLogin = () => {
    router.push({ name: 'Login' })
}

const handleUploadedProfile = (imageUrl) => {
    registerData.value.user_identification = imageUrl
}

const handleUploadedSelfi = (imageUrl) => {
    registerData.value.user_selfi = imageUrl
}
const showModal = ref(false)
const handleClickPolicy = () => {
    showModal.value = true
}

const handleClickPrivacy = () => {
    showModalPrivacy.value = true
}

const handleCloseModal = () => {
    showModal.value = false
    showModalPrivacy.value = false
    openIdentification.value = false
}
</script>