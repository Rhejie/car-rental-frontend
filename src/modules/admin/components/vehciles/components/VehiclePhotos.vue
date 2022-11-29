<template>
    <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
        <ul role="list"
            class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <li v-for="file in files" :key="file.name" class="relative bg-white p-2 shadow-lg rounded-lg border border-gray-500">
                <div
                    :class="[file.current ? 'ring-2 ring-offset-2 ring-indigo-500' : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500', 'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden']">
                    <img :src="`${url}`+file.image_url" alt=""
                        :class="[file.current ? '' : 'group-hover:opacity-75', 'object-cover pointer-events-none']" />
                </div>
            </li>
        </ul>
    </section>
</template>
<script setup>
import { storageUrl } from '@/global-composables/http_service';
import { computed, defineProps } from 'vue'
const props = defineProps({
    images: {
        type: Array,
        default: []
    }
})

const url = storageUrl();
const files = computed(() => props.images)
</script>