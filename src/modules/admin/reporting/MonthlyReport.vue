<template>
    <main class="flex-1 pb-8">
        <!-- Page header -->
        <div class="bg-white shadow">
            <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                    <div class="min-w-0 flex-1">
                        <!-- Profile -->
                        <div class="flex items-center">
                            <UserCircleIcon class="hidden h-16 w-16 text-gray-600 rounded-full sm:block" />
                            <div>
                                <div class="flex items-center">
                                    <UserCircleIcon class="h-16 w-16 text-gray-600 rounded-full sm:hidden" />
                                    <h1
                                        class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                        Manage Montly Reports</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-1">
                    <!-- Card -->
                    <div class="w-96">
                        <Listbox v-model="selectedMonth">
                            <div class="relative mt-1">
                                <ListboxButton
                                    class="relative w-full h-10 border-gray-500 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span class="block truncate">{{ selectedMonth ? selectedMonth : 'Select Month...' }}</span>
                                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>

                                <transition leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="opacity-100" leave-to-class="opacity-0">
                                    <ListboxOptions
                                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        <ListboxOption v-slot="{ active, selected }" v-for="month in months"
                                            :key="month" :value="month" as="template">
                                            <li :class="[
                                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-10 pr-4',
                                            ]">
                                                <span :class="[
                                                    selected ? 'font-medium' : 'font-normal',
                                                    'block truncate',
                                                ]">{{ month }}</span>
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
                        <input type="number" min="1" v-model="yearData" placeholder="Year"
                        class="w-96 rounded-md border mt-1 border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                        <button type="button" @click="getMonthlyTransaction" class="inline-flex mt-1 items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Generate</button>
                    </div>
                </div>
                <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-gray-50">
                                        <tr class="divide-x divide-gray-200">
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                TRANSACTION DATE</th>
                                            <th scope="col"
                                                class="py-3.5 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                TYPE</th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                PROCESS
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">VALUE
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                                        <tr v-for="report in reports" :key="report.id" class="divide-x divide-gray-200">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                                                {{ report.created_at }}</td>
                                            <td
                                                class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                {{ capitalize(report.type) }}</td>
                                            <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{
                                                    capitalize(report.process)
                                            }}
                                            </td>
                                            <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                                                <BookingValue v-if="report.type == 'booking'" :booking="report.transactionable"/>
                                                <PaymentValue v-if="report.type == 'payment'" :payment="report.transactionable"/>
                                                <OverchargeValue v-if="report.type == 'overcharge'" :overcharge="report.transactionable"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>
<script setup>
import { DocumentCheckIcon, CurrencyDollarIcon } from '@heroicons/vue/24/solid';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { getAllMonths, getMonthlyReport } from '../composables/admin-report-composables'
import BookingValue from './components/BookingValue.vue';
import PaymentValue from './components/PaymentValue.vue';
import OverchargeValue from './components/OverchargeValue.vue';

const route = useRoute();
const store = useStore();
const router = useRouter();

const yearData = ref(null);

const selectedMonth = ref(null)

const reports = ref([])
const months = ref([]);
const loading = ref(false)
const loadiangMonths = ref(true)
const total = ref(0)
const getMonthNumber = computed({
    get() { 
        if(selectedMonth.value) {
            let index = months.value.findIndex(mon => mon == selectedMonth.value);
            return index + 1
        }

        return null
    },
    set(newValue) { 
        newValue
    }
})

const getMonthlyTransaction = async (year) => {
    loading.value = true
    const params = {
        month: getMonthNumber.value,
        year: yearData.value
    }
    const { data, load, totalReport } = getMonthlyReport(params);
    await load();
    reports.value = data.value
    loading.value = false
    total.value = totalReport.value
}

const handleGetAllMonths = async () => {
    
    const { data, load } = getAllMonths();
    await load();
    months.value = data.value
    loadiangMonths.value = false
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

watch(yearData, (val) => {
    if (val) {
        // getMonthlyTransaction(val);
    }
})

onMounted(async () => {
    await handleGetAllMonths();
})
</script>