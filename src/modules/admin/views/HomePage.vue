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
    ClockIcon,
    TruckIcon,
    RocketLaunchIcon,
    BackspaceIcon
} from '@heroicons/vue/24/outline'
import { getDashboardData } from '../composables/dashboard-composables';
import { onMounted, ref } from 'vue'
import DashboardMap from '../components/dashboard/DashboardMap.vue';
const users = ref(0)
const usersVerified = ref(0)
const usersUnVerified = ref(0)
const totalBookings = ref(0)
const totalDashboardData = ref(null)

const fetchDashboardData = async () => {
    const { data, load } = getDashboardData();
    await load();
    totalDashboardData.value = data.value
}



onMounted(async () => {
    await fetchDashboardData();
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
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" v-if="totalDashboardData">
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.users_count }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.usersVerified }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.count_unverified_account }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_bookings }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_pending_bookings }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_accept_bookings }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_cancel_bookings }}</div>
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
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_decline_bookings }}</div>
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
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-cyan-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <RocketLaunchIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Deployed Booking</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_deployed_bookings }}</div>
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
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-amber-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <BackspaceIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Returned Booking</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_returned_bookings }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-amber-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/users" href="#"
                                    class="font-medium text-amber-700 hover:text-amber-900">View all</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-stone-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <TruckIcon class="h-6 w-6 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-sm font-medium">Total Vehicles</dt>
                                        <dd>
                                            <div class="text-lg font-medium">{{ totalDashboardData.total_vehicles }}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-stone-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link to="/admin/vehicles" href="#"
                                    class="font-medium text-stone-700 hover:text-stone-900">View all</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <h2 class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                Tracker
                </h2>
                <DashboardMap/> -->
        </div>
    </main>
</template>
<style>

</style>