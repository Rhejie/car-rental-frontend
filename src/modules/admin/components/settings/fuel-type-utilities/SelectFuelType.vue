<script setup>
import { computed, onMounted, ref, watch, defineProps, defineEmits } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'
import { selectFueltypes } from '../../composables/fuel-type-composables';

const props = defineProps({
    modelValue: {
        default: []
    },
    onHandleChangeFuelType: {
        type: Function
    }
})

const emit = defineEmits(['update:modelValue'])

const query = ref('')

const selectedFuelType = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

const fuelTypes = ref([])

const selectFuelType = async (searchVal = null) => {
    const { search, data } = selectFueltypes(searchVal);
    await search();
    fuelTypes.value = data.value
}

watch(query, (val) => {
    if (val) {
        selectFuelType(val)
        return
    }
    selectFuelType()
})

watch(selectedFuelType, (val) => {
    props.onHandleChangeFuelType(val)
})

onMounted(async () => {
    await selectFuelType();
})
</script>

<template>
    <Combobox as="div" v-model="selectedFuelType">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Fuel Type</ComboboxLabel>
        <div class="relative mt-1">
            <ComboboxInput
                class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                @change="query = $event.target.value" :display-value="(fuelType) => fuelType?.name" placeholder="Select Fuel Type"/>
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="fuelTypes.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="fuelType in fuelTypes" :key="fuelType.id" :value="fuelType" as="template"
                    v-slot="{ active, selected }">
                    <li
                        :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">
                            {{ fuelType.name }}
                        </span>

                        <span v-if="selected"
                            :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox>
</template>