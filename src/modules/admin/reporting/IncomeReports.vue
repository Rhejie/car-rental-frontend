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
                                        Manage Income Reports</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <h2 class="text-lg font-medium leading-6 text-gray-900">Reports</h2>
                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-1">
                    <!-- Card -->
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { DocumentCheckIcon, CurrencyDollarIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const router = useRouter();
</script>