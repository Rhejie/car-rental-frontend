<template>
    <form class="space-y-10 divide-y divide-gray-200">
        <div class="pt-10">
            <GloadingList v-if="loading"/>
            <fieldset v-if="!loading">
                <legend class="block text-sm font-medium text-gray-900">Fuel Types</legend>
                <div class="space-y-3 pt-6" v-loading="loading">
                    <div v-for="(type, index) in fuelTypes" :key="type.id" class="flex items-center">
                        <input :id="`${type.id}-${index}`" :value="type.id" v-model="selectedFuelTypes" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`${type.id}-${index}`" class="ml-3 text-sm text-gray-600">
                            {{ type.name }}
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>
    </form>
</template>
<script setup>
import GloadingList from '@/components/GloadingList.vue';
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { selectFueltypes } from '../../composables/fuel-type-composables';


const props = defineProps({
    modelValue: {
        default: []
    },
    handleToogleFuelType: {
        type: Function
    }
})

const emit = defineEmits(['update:modelValue'])

const fuelTypes = ref([])

const loading = ref(true)

const selectedFuelTypes = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        props.handleToogleFuelType(newValue)
        emit('update:modelValue', newValue)
    }
})


const selectFuelType = async (searchVal = null) => {
    const { search, data } = selectFueltypes(searchVal);
    await search();
    fuelTypes.value = data.value
    loading.value = false
}

onMounted(async () => {
    await selectFuelType();
})  
</script>