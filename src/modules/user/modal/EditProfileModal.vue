<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCloseModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div>
                                <div
                                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <UserCircleIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div class="mt-3 sm:mt-5">
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Profile
                                        Information</DialogTitle>
                                    <div class="mt-2">
                                        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                                            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                                                <dl class="sm:divide-y sm:divide-gray-200">
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">First Name</dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" type="text" v-model="profile.first_name"
                                                                placeholder="First Name"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.first_name)">
                                                                        {{errorValue.first_name[0]}}
                                                                </span>
                                                            </dd>
                                                    </div>
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">Last Name</dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" type="text" v-model="profile.last_name"
                                                                placeholder="Last Name"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.last_name)">
                                                                        {{errorValue.last_name[0]}}
                                                                </span>
                                                            </dd>
                                                    </div>
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">Middle Name</dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" type="text" v-model="profile.middle_name"
                                                                placeholder="Middle Name"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.middle_name)">
                                                                        {{errorValue.middle_name[0]}}
                                                                </span>
                                                            </dd>
                                                    </div>
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" type="email" v-model="profile.email"
                                                                placeholder="First Name"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.email)">
                                                                        {{errorValue.email[0]}}
                                                                </span>
                                                            </dd>
                                                    </div>
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" type="date" v-model="profile.birthday"
                                                                placeholder="First Name"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.birthday)">
                                                                        {{errorValue.birthday[0]}}
                                                                </span>
                                                            </dd>
                                                    </div>
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">Contact Number
                                                        </dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" type="text"
                                                                v-model="profile.contact_number"
                                                                placeholder="Middle Name"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.contact_number)">
                                                                        {{errorValue.contact_number[0]}}
                                                                </span>
                                                            </dd>
                                                    </div>
                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">Address</dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <textarea name="" v-model="profile.address" id="" cols="30"
                                                                rows="5"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm">

                                                            </textarea>
                                                            <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.address)">
                                                                        {{errorValue.address[0]}}
                                                                </span>
                                                        </dd>
                                                    </div>

                                                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                                        <dt class="text-sm font-medium text-gray-500">
                                                            <input type="checkbox" name="" v-model="profile.change_password" id=""> <span
                                                                class="text-sm font-medium text-gray-500">Change
                                                                password?</span>
                                                        </dt>
                                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <input id="email" v-if="profile.change_password" v-model="profile.old_password" type="password" placeholder="Old Password"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.old_password)">
                                                                        {{errorValue.old_password[0]}}
                                                                </span>
                                                            <input id="email" v-if="profile.change_password" v-model="profile.new_password" type="password" placeholder="New Password"
                                                                class="block w-full appearance-none mt-1 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.new_password)">
                                                                        {{errorValue.new_password[0]}}
                                                                </span>
                                                            <input id="email" v-if="profile.change_password" v-model="profile.new_password_confirmation" type="password" placeholder="Password confirmation"
                                                                class="block w-full appearance-none mt-1 rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm" />
                                                                <span 
                                                                    class="text-sm text-red-400"
                                                                    v-if="(errorValue && !loading && errorValue.password_confirmation)">
                                                                        {{errorValue.password_confirmation[0]}}
                                                                </span>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    @click="handleSave">Save</button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    @click="handleCloseModal" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import { ref, computed, defineProps, defineEmits, onUpdated } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { editProfile } from '../composables/profile-composables'
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    },
    userProfile: {
        type: Object,
        default: () => { }
    }
})

const emit = defineEmits(['closeModal', 'updateProfile'])
const open = computed(() => props.openModal)
const userProfile = computed(() => props.userProfile)

const profile = ref(null)
const loading = ref(false)
const errorValue = ref(null)

onUpdated(() => {
    if (userProfile.value) {
        profile.value = { ...userProfile.value }
    }
})

const handleCloseModal = () => {
    emit('closeModal')
}

const handleSave = async () => {
    loading.value = true
    const { data, update, errorData} = editProfile(profile.value)
    await update()
    errorValue.value = errorData.value
    loading.value = false
    if(!loading.value && !errorValue.value, !errorData.value) {
        emit('updateProfile', data.value)
    }
}
</script>