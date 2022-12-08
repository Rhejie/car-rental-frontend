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
                        <SelectMonths v-model="selectedMonth" :setMonthToNumber="setMonthToNumber"/>
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
                                                {{ formatType(capitalize(report.type), report.type) }}</td>
                                            <td class="whitespace-nowrap p-4 text-sm text-gray-500">{{
                                                    capitalize(report.process)
                                            }}
                                            </td>
                                            <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                                                <BookingValue v-if="report.type == 'booking'" :booking="report.transactionable"/>
                                                <PaymentValue v-if="report.type == 'payment'" :payment="report.transactionable"/>
                                                <OverchargeValue v-if="report.type == 'overcharge'" :overcharge="report.transactionable"/>
                                                <MaintenanceValue v-if="report.type == 'vehicle_maintenance'" :maintenance="report.transactionable"/>
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
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { getAllMonths, getMonthlyReport } from '../composables/admin-report-composables'
import BookingValue from './components/BookingValue.vue';
import PaymentValue from './components/PaymentValue.vue';
import OverchargeValue from './components/OverchargeValue.vue';
import MaintenanceValue from './components/MaintenanceValue.vue';
import SelectMonths from './components/SelectMonths.vue';

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
const getMonthNumber = ref(0)

const setMonthToNumber = (monthInNumber) => {
    getMonthNumber.value = monthInNumber
}

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
    // total.value = totalReport.value
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const formatType = (data, type) => {
    if(type.toLowerCase() != 'vehicle_maintenance') {
        return data
    }
    return data.split('_').join(' ')
}

watch(yearData, (val) => {
    if (val) {
        // getMonthlyTransaction(val);
    }
})

onMounted(async () => {
    
})
</script>