<script setup>
import { onMounted, ref, watch } from 'vue';

import {
    MagnifyingGlassIcon,
} from '@heroicons/vue/24/solid'
import GPagination from "@/components/GPagination.vue";
import CreateFuelTypeModal from '../modals/CreateFuelTypeModal.vue'
import GNotification from '@/components/GNotification.vue';
import { loadFuelTypes } from '../composables/fuel-type-composables';
const fuelTypes = ref([])

const params = ref({
    page_size: 10,
    page: 1,
    search: null
})

const totalList = ref(0)
const loading = ref(false)
const openModal = ref(false)
const showNotif = ref(false)
const message = ref(null)
const type = ref(null)
const selectedItem = ref(null)

const fetchFuelTypes = async () => {
    loading.value = true
    const { load, data, total } = loadFuelTypes(params.value)
    await load();

    fuelTypes.value = data.value
    totalList.value = total.value
    loading.value = false
}

const handleChangeSize = (size) => {
    params.value.page_size = size
}

const handleChangePage = (page) => {
    params.value.page = page
}

const handleClickAddFuelType = () => {
    openModal.value = true
    selectedItem.value = null
}

const handleCloseAddFuelTypeModal = (status) => {
    openModal.value = false
}

const handleNewFuelType = (fuelType) => {
    fuelTypes.value.unshift(fuelType)
    openModal.value = false
    showNotif.value = true

    setTimeout(() => {
        showNotif.value = false
    }, 2000)
}

const handleUpdateFuelType = (fuelType) => {

    fuelTypes.value.map(id => {
        if(id.id == fuelType.id){
            for(let key in fuelType) {
                id[key] = fuelType[key]
            }
        }

        return id;
    })
    openModal.value = false
    showNotif.value = true

    setTimeout(() => {
        showNotif.value = false
        message.value = 'Successfully updated!'
    }, 2000)
}

const handleClickEdit = (fuelType) => {
    openModal.value = true
    selectedItem.value = fuelType
}

onMounted(async () => {
    await fetchFuelTypes()
})

watch(params.value, async () => {
    await fetchFuelTypes();
})

</script>
<template>
    <CreateFuelTypeModal 
        :openModal="openModal" 
        :selectedItem="selectedItem" 
        @closeModal="handleCloseAddFuelTypeModal" 
        @updateFuelType="handleUpdateFuelType"
        @saveFuelType="handleNewFuelType"/>
    <GNotification :show-notif="showNotif"/>
    <div class="mx-auto max-w-4xl py-10">
        <div class="bg-white p-2 shadow-md rounded-lg">
            <h1 class="text-3xl font-bold tracking-tight text-gray-700">Fuel Types</h1>
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <label for="email" class="block text-sm font-semibold text-gray-700">Search:</label>
                        <div class="relative mt-1 rounded-md shadow-sm w-56">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input type="email" v-model="params.search"
                                class="block w-full rounded-md border h-8 border-gray-200 pl-10 focus:border-indigo-200 focus:ring-indigo-200 sm:text-sm"
                                placeholder="Search here...." />
                        </div>
                    </div>
                    <div class=" sm:flex-none">
                        <button type="button"
                            @click="handleClickAddFuelType"
                            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                            Add Fuel Type
                        </button>
                    </div>
                </div>
                <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle">
                            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6">
                                                Name</th>
                                            <th scope="col" class="relative py-3 pl-3 pr-4 sm:pr-6">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                                        <tr v-for="fuelType in fuelTypes" :key="fuelType.email">
                                            <td
                                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {{ fuelType.name }}
                                            </td>
                                            <td
                                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button class="text-indigo-600 hover:text-indigo-900 mr-2" @click="handleClickEdit(fuelType)">Edit</button>
                                                <button class="text-red-600 hover:text-indigo-900">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <g-pagination class="mx-2" 
                                    :page_size="params.page_size" 
                                    :current_size="totalList" 
                                    :current_page="params.page" 
                                    @change_size="handleChangeSize" 
                                    @change_page="handleChangePage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>