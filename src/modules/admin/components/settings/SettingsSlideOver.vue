<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCloseModal">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                            leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Settings
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    @click="handleCloseModal">
                                                    <span class="sr-only">Close panel</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <nav aria-label="Sections"
                                            class=" w-auto h-full flex-shrink-0 border-r border-blue-gray-200 bg-white xl:flex xl:flex-col">
                                            <div class="min-h-0 flex-1 h-full overflow-y-auto">
                                                <router-link v-for="item in subNavigation" :key="item.name"
                                                    :to="{ name: item.routerName }"
                                                    @click="handleCloseModal"
                                                    :class="[item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50', 'flex p-6 border-b border-blue-gray-200']"
                                                    :aria-current="item.current ? 'page' : undefined">
                                                    <component :is="item.icon"
                                                        class="-mt-0.5 h-6 w-6 flex-shrink-0 text-gray-500"
                                                        aria-hidden="true" />
                                                    <div class="ml-3 text-sm">
                                                        <p class="font-bold text-gray-700">{{ item.name }} 1</p>
                                                        <p class="mt-1 text-gray-500">{{ item.description }}</p>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    },
    subNavigation: {
        type: Array,
        default: () => [],
    }
})

const emit = defineEmits(['closeModal'])

const open = computed(() => props.openModal)

const subNavigation = computed(() => props.subNavigation)

const handleCloseModal = () => {
    emit('closeModal')
}
</script>