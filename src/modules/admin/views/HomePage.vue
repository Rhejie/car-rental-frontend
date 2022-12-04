<script setup>

import {
    UsersIcon,
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    UserCircleIcon,
    UserPlusIcon,
    UserMinusIcon,
    BookOpenIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    BookmarkSlashIcon,
    XCircleIcon,
    ClockIcon
} from '@heroicons/vue/24/outline'
import { countTotalBookings, countUnVerifiedAccounts, countUsers, countVerifiedAccounts } from '../composables/dashboard-composables';
import { onMounted, ref } from 'vue'
import DashboardMap from '../components/dashboard/DashboardMap.vue';
const users = ref(0)
const usersVerified = ref(0)
const usersUnVerified = ref(0)
const totalBookings = ref(0)
const totalUser = async () => {
    const { data, load } = countUsers();
    await load();
    users.value = data.value
}

const totalVerified = async () => {
    const { data, load } = countVerifiedAccounts();
    await load()
    usersVerified.value = data.value
}

const totalUnVerified = async () => {
    const { data, load } = countUnVerifiedAccounts();
    await load()
    usersUnVerified.value = data.value
}

const totalBookingData = async () => {
    const { data, load } = countTotalBookings();
    await load()
    totalBookings.value = data.value
}

const totalPendings = ref(0) 

const getTotalPendings = async () => {
    
}

onMounted(async () => {
    await totalUser();
    await totalVerified();
    await totalUnVerified();
    await totalBookingData();
})
const transactions = [
    {
        id: 1,
        name: 'Payment to Molly Sanders',
        href: '#',
        amount: '$20,000',
        currency: 'USD',
        status: 'success',
        date: 'July 11, 2020',
        datetime: '2020-07-11',
    },
    // More transactions...
]


const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800',
}
</script>
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
                                        Welcome Admin!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                        <button type="button"
                            class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Add
                            money</button>
                        <button type="button"
                            class="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">Send
                            money</button>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <!-- Card -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-cyan-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <UsersIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Users</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ users }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-cyan-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/users" href="#"
                                    class="font-medium text-cyan-700 hover:text-cyan-900">View all</router-link>
                            </div>
                        </div>
                    </div>

                    <!-- verified -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-green-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <UserPlusIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Verified Users</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ usersVerified }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-green-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/users" href="#"
                                    class="font-medium text-cyan-700 hover:text-cyan-900">View all</router-link>
                            </div>
                        </div>
                    </div>
                    <!-- unverified -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-yellow-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <UserMinusIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Unverified Users</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ usersUnVerified }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-yellow-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/users" href="#"
                                    class="font-medium text-yellow-700 hover:text-yellow-900">View
                                    all</router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <!-- Card -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-lime-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <BookOpenIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Bookings</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalBookings }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-lime-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/bookings" href="#"
                                    class="font-medium text-lime-700 hover:text-lime-900">View
                                    all</router-link>
                            </div>
                        </div>
                    </div>

                    <!-- verified -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-orange-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <ClockIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Pendings</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalPendings }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-orange-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/bookings" href="#"
                                    class="font-medium text-orange-700 hover:text-orange-900">View
                                    all</router-link>
                            </div>
                        </div>
                    </div>
                    <!-- unverified -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-emerald-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <ClipboardDocumentCheckIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Accepted Bookings</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalPendings }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-emerald-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/bookings" href="#"
                                    class="font-medium text-emerald-700 hover:text-emerald-900">View
                                    all</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-rose-400 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <BookmarkSlashIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Cancelled Bookings</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalPendings }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-rose-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/bookings" href="#"
                                    class="font-medium text-rose-700 hover:text-rose-900">View
                                    all</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-red-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <XCircleIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Declined Bookings</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalPendings }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-red-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/bookings" href="#"
                                    class="font-medium text-red-700 hover:text-red-900">View
                                    all</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                Tracker
                </h2>
                <DashboardMap/>
            <!-- <div class="shadow sm:hidden">
                <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                    <li v-for="transaction in transactions" :key="transaction.id">
                        <a :href="transaction.href" class="block bg-white px-4 py-4 hover:bg-gray-50">
                            <span class="flex items-center space-x-4">
                                <span class="flex flex-1 space-x-2 truncate">
                                    <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <span class="flex flex-col truncate text-sm text-gray-500">
                                        <span class="truncate">{{ transaction.name }}</span>
                                        <span><span class="font-medium text-gray-900">{{ transaction.amount }}</span> {{
                                                transaction.currency
                                        }}</span>
                                        <time :datetime="transaction.datetime">{{ transaction.date }}</time>
                                    </span>
                                </span>
                                <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            </span>
                        </a>
                    </li>
                </ul>

                <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                    aria-label="Pagination">
                    <div class="flex flex-1 justify-between">
                        <a href="#"
                            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Previous</a>
                        <a href="#"
                            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Next</a>
                    </div>
                </nav>
            </div>

            <div class="hidden sm:block">
                <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div class="mt-2 flex flex-col">
                        <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                            scope="col">Transaction</th>
                                        <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                            scope="col">Amount</th>
                                        <th class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                                            scope="col">Status</th>
                                        <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                            scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="transaction in transactions" :key="transaction.id" class="bg-white">
                                        <td class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                            <div class="flex">
                                                <a :href="transaction.href"
                                                    class="group inline-flex space-x-2 truncate text-sm">
                                                    <BanknotesIcon
                                                        class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        aria-hidden="true" />
                                                    <p class="truncate text-gray-500 group-hover:text-gray-900">{{
                                                            transaction.name
                                                    }}</p>
                                                </a>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                            <span class="font-medium text-gray-900">{{ transaction.amount }}</span>
                                            {{ transaction.currency }}
                                        </td>
                                        <td class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                            <span
                                                :class="[statusStyles[transaction.status], 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize']">{{
                                                        transaction.status
                                                }}</span>
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                            <time :datetime="transaction.datetime">{{ transaction.date }}</time>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                                aria-label="Pagination">
                                <div class="hidden sm:block">
                                    <p class="text-sm text-gray-700">
                                        Showing
                                        {{ ' ' }}
                                        <span class="font-medium">1</span>
                                        {{ ' ' }}
                                        to
                                        {{ ' ' }}
                                        <span class="font-medium">10</span>
                                        {{ ' ' }}
                                        of
                                        {{ ' ' }}
                                        <span class="font-medium">20</span>
                                        {{ ' ' }}
                                        results
                                    </p>
                                </div>
                                <div class="flex flex-1 justify-between sm:justify-end">
                                    <a href="#"
                                        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                                    <a href="#"
                                        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </main>
</template>
<style>

</style>