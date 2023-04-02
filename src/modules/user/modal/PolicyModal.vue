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
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 lg:w-2/5 xs:w-full sm:p-6">
                            <div>
                                <div class="mx-auto flex text-center h-12 w-12 items-center rounded-full bg-green-100">
                                    <CheckIcon class="h-6 w-6 mx-auto text-green-600" aria-hidden="true" />
                                </div>
                                <div class=" sm:mt-5">
                                    <DialogTitle as="h3"
                                        class="text-lg mt-3 text-center font-medium leading-6 text-gray-900">Privacy Policy
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">
                                            We are APC Car Rental, APC Car Rental is Panabo City most distinguished rental
                                            Car Company.
                                            We provide customers with approximately 50 locations and 100 vehicles throughout
                                            Mindanao.
                                            As we are not affiliated with any specific automaker, we are able to provide a
                                            variety of vehicle makes and models for customers to rent.
                                        </p>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button type="button"
                                    class="inline-flex w-full mb-2 justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:text-sm"
                                    @click="handleAgree">Agree</button>
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:text-sm"
                                    @click="handleCloseModal">Close</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(['closeModal', 'agree'])
const open = computed(() => props.openModal)

const handleCloseModal = () => {
    emit('closeModal')
}

const handleAgree = () => {
    emit('agree')
}
</script>