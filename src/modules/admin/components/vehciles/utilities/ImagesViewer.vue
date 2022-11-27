<script setup>
import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/vue'
import { computed, defineProps } from 'vue';

const props = defineProps({
    imagesData: {
        type: Array,
        default: []
    }
})

const images = computed(() => props.imagesData)
</script>
<template>
    <div class="lg:grid grid-cols-1 lg:items-start lg:gap-x-8 p-2">
        <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <div class="mx-auto mt-2 hidden w-full max-w-full sm:block lg:max-w-none">
                <TabList class="grid grid-cols-4 gap-6">
                    <Tab v-for="image in images" :key="image.id"
                        class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        v-slot="{ selected }">
                        <span class="sr-only"> {{ image.name }} </span>
                        <span class="absolute inset-0 overflow-hidden rounded-md">
                            <img :src="image.imageSrc" alt="" class="h-full w-full object-cover object-center" />
                        </span>
                        <span
                            :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
                            aria-hidden="true" />
                    </Tab>
                </TabList>
            </div>

            <TabPanels class="aspect-w-1 aspect-h-1 w-full">
                <TabPanel v-for="image in images" :key="image.id">
                    <img :src="image.imageSrc" :alt="image.alt"
                        class="h-96 w-full object-cover object-center sm:rounded-lg" />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>