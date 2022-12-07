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
                                        Manage Reporting</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <!-- Card -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-emerald-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DocumentCheckIcon class="w-10 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-lg font-medium">Daily Report</dt>
                                        <dd>
                                            <div class="text-sm font-medium">list of daily transactions</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-emerald-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link :to="{ name: 'Daily Reports'}" href="#"
                                    class="font-medium text-emerald-700 hover:text-emerald-900">Generate</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-cyan-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DocumentCheckIcon class="w-10 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-lg font-medium">Monthly Report</dt>
                                        <dd>
                                            <div class="text-sm font-medium">list of monthly transactions</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-cyan-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link :to="{name: 'Monthly Reports'}" href="#" class="font-medium text-cyan-700 hover:text-cyan-900">Generate</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-cyan-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CurrencyDollarIcon class="w-10 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-lg font-medium">Income Report</dt>
                                        <dd>
                                            <div class="text-sm font-medium">list of daily transactions</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-cyan-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link :to="{name: 'Income Reports'}" href="#" class="font-medium text-cyan-700 hover:text-cyan-900">Generate</router-link>
                            </div>
                        </div>
                    </div>


                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-red-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CurrencyDollarIcon class="w-10 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-lg font-medium">Expenses Report</dt>
                                        <dd>
                                            <div class="text-sm font-medium">list of daily transactions</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-red-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link :to="{name: 'Expenses Reports'}" href="#" class="font-medium text-red-700 hover:text-red-900">Generate</router-link>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5 bg-gray-500 text-white">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <UserGroupIcon class="w-10 " aria-hidden="true" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="truncate text-lg font-medium">Driver Report</dt>
                                        <dd>
                                            <div class="text-sm font-medium">list of daily transactions</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <router-link :to="{name: 'Expenses Reports'}" href="#" class="font-medium text-gray-700 hover:text-gray-900">Generate</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { DocumentCheckIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const router = useRouter();
</script>