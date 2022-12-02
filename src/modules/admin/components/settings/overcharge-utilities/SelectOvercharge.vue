<template>
    <div>
        <label for="location" class="block text-sm font-medium text-gray-700">Select Type</label>
        <select id="location" name="location" v-loading="loading" v-model="selectedValue" :placeholder="'asdasd'"
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            <option v-for="(type, index) in types" :key="index" :value="type.id">{{ type.name }}</option>
        </select>
    </div>
</template>
<script setup>
import { defineEmits, defineProps, computed, ref, onMounted } from 'vue'
import { selectOvercharges } from '../../composables/overcharge-types-composables'
const props = defineProps({
    modelValue: {
        type: String,
    }
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

const loading = ref(true)
const types = ref([])

const fetchOvercharges = async () => {

    const { load, data } = selectOvercharges();
    await load();
    types.value = data.value
    loading.value = false
}

onMounted(async () => {
    await fetchOvercharges();
})
</script>