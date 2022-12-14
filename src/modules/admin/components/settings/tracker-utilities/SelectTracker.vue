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
import { selectTrackers } from '../../composables/trackers-device-composables';

const props = defineProps({
    modelValue: {
        default: []
    },
    onHandleChange: {
        type: Function
    }
})

const emit = defineEmits(['update:modelValue'])

const query = ref('')

const selectedTracker = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

const trackers = ref([])

const selectTracker = async (searchVal = null) => {
    const { search, data } = selectTrackers(searchVal);
    await search();
    trackers.value = data.value
}

watch(query, (val) => {
    if (val) {
        selectTracker(val)
        return
    }
    selectTracker()
})

watch(selectedTracker, (val) => {
    props.onHandleChange(val)
})

onMounted(async () => {
    await selectTracker();
})
</script>

<template>
    <Combobox as="div" v-model="selectedTracker">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Tracked ID</ComboboxLabel>
        <div class="relative mt-1">
            <ComboboxInput
                class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                @change="query = $event.target.value" :display-value="(tracker) => tracker?.name" placeholder="Select Tracker ID"/>
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="trackers.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="tracker in trackers" :key="tracker.id" :value="tracker" as="template"
                    v-slot="{ active, selected }">
                    <li
                        :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">
                            {{ tracker.name }}
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