<template>
    <label for="location" class="block text-sm font-medium text-gray-700">Select Payment</label>
    <select id="location" name="location"
        v-model="selected"
        class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <option selected value="downpayment">Downpayment</option>
        <option value="full">Fully paid</option>
    </select>
</template>
<script setup>
import {defineEmits, defineProps, computed} from 'vue'
const props = defineProps({
    modelValue: {
        type: "string",
    }
})

const  emit = defineEmits(['update:modelValue'])

const selected = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
</script>