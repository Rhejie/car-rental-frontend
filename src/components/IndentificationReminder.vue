<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10">
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
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm lg:w-8/12 sm:p-6">
                            <div>
                                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Reminder
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">We would like to inform you that in order to
                                            register and validate your user account, we now require government
                                            identification and a selfie holding the ID. This is to ensure the security and
                                            accuracy of our online platform and to verify the identity of our users.</p>
                                        <br />
                                        <p class="text-sm text-gray-500">We understand that this may be an inconvenience for
                                            some users, but we believe that this step is necessary to maintain the integrity
                                            of our platform and protect the privacy of our users. The specific type of
                                            government identification required may vary depending on the jurisdiction and
                                            the platform.</p>
                                        <br />
                                        <p class="text-sm text-gray-500">Rest assured that we will handle your personal
                                            information with the utmost care and ensure that it is used only for the
                                            intended purposes. We are committed to protecting your privacy and ensuring the
                                            security of our platform.</p>
                                        <br />
                                        <p class="text-sm text-gray-500">Thank you for your cooperation and understanding.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['closeModal'])
const open = computed(() => props.openModal)

const handleCloseModal = () => {
    emit('closeModal')
}
</script>