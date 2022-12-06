<template>
    <div class="text-gray-500">
        
    </div>
</template>
<script setup>

import {defineProps, computed} from 'vue'

const props = defineProps({
    booking: {
        type: Object,
        default: () => {}
    }
})

const booking = computed(() => props.booking)
</script>