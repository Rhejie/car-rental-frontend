<script setup>
import { ref, defineProps, computed } from 'vue'
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    XMarkIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
    navigation: {
        type: Array,
        default: null
    },
    sidebarOpen: {
        type: Boolean,
        default: false
    }
})

const navigation = computed(() => props.navigation)
const sidebarOpen = ref(false)

</script>

<template>
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-teal-600 bg-opacity-75" />
            </TransitionChild>
    
            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-teal-700 pt-5 pb-4">
                        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                            enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <div class="absolute top-0 right-0 -mr-12 pt-2">
                                <button type="button"
                                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    @click="sidebarOpen = false">
                                    <span class="sr-only">Close sidebar</span>
                                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex flex-shrink-0 items-center px-4">
                            Car
                        </div>
                        <div class="mt-5 h-0 flex-1 overflow-y-auto">
                            <nav class="space-y-1 px-2">
                                <router-link v-for="item in navigation" :key="item.name" :to="{name: item.routeName}"
                                    :class="[item.current ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                                    <component :is="item.icon" class="mr-4 h-6 w-6 flex-shrink-0 text-teal-300"
                                        aria-hidden="true" />
                                    {{ item.name }}
                                </router-link>
                            </nav>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                <div class="w-14 flex-shrink-0" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    
    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-grow flex-col overflow-y-auto bg-teal-700 pt-5">
            <div class="flex flex-shrink-0 items-center px-4">
                <span class="text-white">Car Rental Admin</span>
            </div>
            <div class="mt-5 flex flex-1 flex-col">
                <nav class="flex-1 space-y-1 px-2 pb-4">
                    <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.routeName}"
                        :class="[item.current ? 'bg-teal-800 text-white' : 'text-teal-100 hover:bg-teal-600', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                        <component :is="item.icon" class="mr-3 h-6 w-6 flex-shrink-0 text-teal-300" aria-hidden="true" />
                        {{ item.name }}
                    </router-link>
                </nav>
            </div>
        </div>
    </div>
</template>