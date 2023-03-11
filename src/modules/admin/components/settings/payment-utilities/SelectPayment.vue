<template>
    <label for="location" class="block text-sm font-medium text-gray-700">Select Payment</label>
    <select id="location" name="location" :disabled="readOnly"
        v-model="selectedValue"
        :placeholder="'asdasd'"
        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <option selected value="downpayment">Downpayment</option>
        <option value="full">Fully paid</option>
    </select>
</template>
<script setup>
import {defineEmits, defineProps, computed} from 'vue'
const props = defineProps({
    modelValue: {
        type: String,
    },
    readOnly: {
        type: Boolean,
        default: false
    }
})

const  emit = defineEmits(['update:modelValue'])

const readOnly = computed(() => props.readOnly)

const selectedValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
</script>