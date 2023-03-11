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
import { selectPaymentMethods } from '../../composables/payment-method-composables';

const props = defineProps({
    modelValue: {
        default: []
    },
    onHandleChangePaymentMethod: {
        type: Function
    }
})

const emit = defineEmits(['update:modelValue', 'emitPaymentMethods'])

const query = ref('')
const loading = ref(true)

const selectedPaymentMethod = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

const paymentMethods = ref([])

const selectPaymentMethod = async (searchVal = null) => {
    const { search, data } = selectPaymentMethods(searchVal);
    await search();
    paymentMethods.value = data.value
    loading.value = false
}

watch(query, (val) => {
    if (val) {
        selectPaymentMethod(val)
        return
    }
    selectPaymentMethod()
})

watch(selectedPaymentMethod, (val) => {
    let paymentMethod = paymentMethods.value.find(p => p.id == val)
    emit('emitPaymentMethods', paymentMethod)
})

onMounted(async () => {
    await selectPaymentMethod();
})
</script>

<template>
    <label for="location" class="block text-sm font-medium text-gray-700">Select Mode</label>
    <select id="location" name="location" :disabled="readOnly"
        v-model="selectedPaymentMethod"
        :placeholder="'asdasd'"
        v-loading="loading"
        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
        <option v-for="p in paymentMethods" :key="p.id" :value="p.id">{{p.name}}</option>
    </select>
    <!-- <Combobox as="div" v-model="selectedPaymentMethod">
        <ComboboxLabel class="block text-sm font-medium text-gray-700">Payment Method</ComboboxLabel>
        <div class="relative mt-1">
            <ComboboxInput
                class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                @change="query = $event.target.value" :display-value="(paymentMethod) => paymentMethod?.name" placeholder="Select Fuel Type"/>
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>

            <ComboboxOptions v-if="paymentMethods.length > 0"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ComboboxOption v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod" as="template"
                    v-slot="{ active, selected }">
                    <li
                        :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                        <span :class="['block truncate', selected && 'font-semibold']">
                            {{ paymentMethod.name }}
                        </span>

                        <span v-if="selected"
                            :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </li>
                </ComboboxOption>
            </ComboboxOptions>
        </div>
    </Combobox> -->
</template>