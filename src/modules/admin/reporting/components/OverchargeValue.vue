<template>
    <div class="text-gray-500">
        <div class="px-2 py-2 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Type</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{overcharge.overcharge_type.name}}</dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Price</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{overcharge.charge}}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>
<script setup>
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import { defineProps, computed } from 'vue'

const props = defineProps({
    overcharge: {
        type: Object,
        default: () => { }
    }
})

const overcharge = computed(() => props.overcharge)
</script>