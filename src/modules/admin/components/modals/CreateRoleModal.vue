<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { storeRole } from '../composables/role-composables'

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['closeModal', 'saveRole'])

const open = computed(() => props.openModal)

const role = ref({
    name: null
})

const errorValue = ref(null)

const loading = ref(false)

const handleCloseModal = () => {
    emit('closeModal', false)
}

const handleStoreRole = async () => {
    loading.value = true
    const {data, post, errorData} = storeRole(role.value);
    await post();
    errorValue.value = errorData.value
    loading.value = false
    if(!loading.value && !errorValue.value, !errorData.value) {
        emit('saveRole', data.value)
    }

}
</script>
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCloseModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center sm:items-center p-4 sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-full sm:max-w-sm">
                            <div class="mt-5 md:col-span-2 md:mt-0">
                                <form>
                                    <div class="overflow-hidden shadow sm:rounded-md">
                                        <div class="bg-white px-4 py-5 sm:p-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-12">
                                                    <label for="first-name"
                                                        class="block text-sm font-medium text-gray-700">
                                                        Name    
                                                    </label>
                                                    <input type="text" name="first-name" v-model="role.name"
                                                        class="mt-1 block w-full rounded-md border h-8 border-gray-100 focus:border-indigo-100 focus:ring-indigo-100 pl-2 sm:text-sm" placeholder="Role Name" />
                                                    <span 
                                                        class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.name">
                                                            {{errorValue.name[0]}}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button @click.prevent="handleStoreRole" :disabled="loading"
                                                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                {{ loading ? 'Saving....' : 'Save'}}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>