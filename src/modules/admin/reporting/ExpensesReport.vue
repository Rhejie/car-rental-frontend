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
                                        Expense Reports</h1>
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
                    <div class="overflow-hidden w-96  rounded-lg bg-white shadow" v-loading="loading">
                        <div class="p-5 w-96  bg-red-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CurrencyDollarIcon class="w-10 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-lg font-medium">Total Expense</dt>
                                        <dd>
                                            <div class="text-sm font-medium">{{ total }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="text" v-model="params.search"
                        class="block w-full rounded-md border h-8 border-gray-200 p-2 focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm"
                        placeholder="Search here...." />
                    <div class="flex w-2/3 ">
                        <SelectMonths class="mr-2" v-model="selectedMonth" :setMonthToNumber="setMonthToNumber" />
                        <input type="number" min="1" v-model="yearData" placeholder="Year"
                            class=" rounded-md border mt-1 border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                    </div>
                    <div class="flex">
                        <button type="button" @click="getMonthlyTransaction" class="inline-flex mt-1 w-20 items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2 focus:ring-offset-2">Generate</button>
                        <button type="button" @click="handleReset" class="inline-flex mt-1 mr-2 w-15 items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Reset</button>
                        <button type="button" @click="handleDownload" class="inline-flex mt-1 w-15 items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Download</button>
                    </div>
                    <div class="">
                        <g-pagination class="mx-2" :page_size="params.page_size" :current_size="totalPayments"
                            :current_page="params.page" @change_size="handleChangeSize"
                            @change_page="handleChangePage" />
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                                        Date</th>
                                    <th scope="col"
                                        class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                                        Price</th>
                                    <th scope="col"
                                        class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                                        Type</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white" v-loading="loadingPayments">
                                <tr v-for="driver in expenses" :key="driver.id">
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ driver.created_at }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ driver.price }}
                                    </td>
                                    <td
                                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{ capitalize(driver.type_of_maintenance) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { DocumentCheckIcon, CurrencyDollarIcon } from '@heroicons/vue/24/solid';
import { onMounted, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { loadExpenses, totalExpense } from '../composables/admin-report-composables';
import GPagination from '@/components/GPagination.vue';
import SelectMonths from './components/SelectMonths.vue';
import { downloadExpenseReport } from '../composables/admin-download-composables';

const route = useRoute();
const store = useStore();
const router = useRouter();
const total = ref(0)
const loading = ref(true)
const params = ref({
    size: 10,
    page: 1,
    search: null
})
const totalPayments = ref(0)
const expenses = ref([])
const loadingPayments = ref(true)
const loadiangMonths = ref(true)
const months = ref([])
const selectedMonth = ref(null)
const yearData = ref(null)

const getMonthNumber = ref(0)

const setMonthToNumber = (monthInNumber) => {
    getMonthNumber.value = monthInNumber
}

const loadTotalIncome = async () => {
    const { data, load } = totalExpense();
    await load()
    total.value = data.value;
    loading.value = false
}

const getMonthlyTransaction = () => {
    params.value.year = yearData.value
    params.value.month = getMonthNumber.value
    getPayments()
}

const handleReset = () => {

    params.value.year = null
    params.value.month = null
    selectedMonth.value = null
    getPayments()
}

const handleDownload = async () => {
    let yearValue = yearData.value
    let monthInNumber = getMonthNumber.value
    let month = selectedMonth.value
    await downloadExpenseReport(yearValue, month, monthInNumber).then(res => {
        console.log(res, 'asda');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `income-report.pdf`);
        document.body.appendChild(link);
        link.click();
    })
}

const getPayments = async () => {
    loadingPayments.value = true
    
    const { data, load, total } = loadExpenses(params.value)
    await load();
    expenses.value = data.value
    totalPayments.value = total.value
    loadingPayments.value = false
    console.log('data', data.value)
}

const handleChangeSize = (size) => {
    params.value.page_size = size
}

const handleChangePage = (page) => {
    params.value.page = page
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const handleGetAllMonths = async () => {

    const { data, load } = getAllMonths();
    await load();
    months.value = data.value
    loadiangMonths.value = false
}

onMounted(async () => {
    await getPayments()
    await loadTotalIncome();
})

watch(params.value, () => {
    getPayments()
})
</script>