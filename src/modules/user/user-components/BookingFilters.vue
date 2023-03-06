<template>
    <div class="w-72">
        <Listbox v-model="selectedStatus">
            <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span class="block truncate">{{
                        selectedStatus.name
                    }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="person in status" :key="person.name"
                            :value="person" as="template">
                            <li :class="[
                                active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                            ]">
                                <span :class="[
                                    selected
                                        ? 'font-medium'
                                        : 'font-normal',
                                    'block truncate',
                                ]">{{ person.name }}</span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
    modelValue: {
        type: Object
    },
    notifications: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const status = ref([
    {
        name: "All",
        value: "ALL",
    },
    {
        name: "Accept/Deployed",
        value: "ACCEPTDEPLOYED",
    },
    {
        name: "Pending",
        value: "PENDING",
    },
    {
        name: "Cancel",
        value: "CANCEL",
    },
    {
        name: "Rejected",
        value: "REJECTED",
    },
]);

const notifications = computed(() => props.notifications)
const selectedStatus = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    }
});

onMounted(() => {
    if(notifications.value) {
        let index = status.value.findIndex(stat => stat.value == 'ACCEPTDEPLOYED')
        status.value.splice(index, 1);

        status.value.push({ name: 'Rental Overdue', value: 'RENTAL_OVERDUE'})
        status.value.push({ name: 'Returned', value: 'RENTURNED'})
        status.value.push({ name: 'Accept', value: 'ACCEPT'})
        status.value.push({ name: 'Deployed', value: 'Deployed'})
    }
})

watch(notifications, (val) => {
    
})
</script>
