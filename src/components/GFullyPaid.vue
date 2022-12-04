<template>
    <div
        class="top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden flex flex-col items-center justify-center">
        <img class="mx-auto w-20  animate-bounce" src="../assets/APCLogo.jpg"
            alt="RevDojo" />
        <h2 class="text-center text-gray-500 text-sm font-semibold">{{ message }}</h2>
    </div>
</template>
<script setup>
import {computed, defineProps} from 'vue'

const props = defineProps({
    message: {
        type: String,
        default: 'Fully paid'
    }
})

const message = computed(() => props.message)
</script>