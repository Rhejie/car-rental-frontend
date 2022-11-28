<script setup>
import { computed, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        default: null
    },
    readOnly: {
        type: Boolean,
        default: false
    }
})

const selectStatus = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

const read = computed(() => props.readOnly)
</script>
<template>
    <div>
        <select id="location" :disabled="read" name="location" v-model="selectStatus"
            placeholder="Select Status"
            class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm">
            <option selected value="1">Publish</option>
            <option value="0">Draft</option>
        </select>
    </div>
</template>