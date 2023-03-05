<script setup>
import { storageUrl } from '@/global-composables/http_service';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchVehicles } from '../components/vehciles/composables/vehcile-composables';
import CreatevehicleModal from '../components/vehciles/modals/CreatevehicleModal.vue'
import SelectStatusFilter from '@/components/SelectStatusFilter.vue'
import GSkeletonLoading from '@/components/GSkeletonLoading.vue'

import GPagination from "@/components/GPagination.vue";
import { CheckCircleIcon, EyeIcon, XCircleIcon, XMarkIcon, PlusCircleIcon } from '@heroicons/vue/20/solid'
import { loadBookings } from '../components/composables/booking-composables';
import GNotification from '@/components/GNotification.vue';
import CreateVehicleMaintenanceModal from '../components/modals/CreateVehicleMaintenanceModal.vue';
import { getAllMaintenance } from '../components/composables/maintenance-composables';

const router = useRouter()

const openModal = ref(false)

const maintenances = ref([])
const loading = ref(true)
const totalMaintenance = ref(0)
const params = ref({
    page_size: 10,
    page: 1,
    search: null,
})

const loadingVerified = ref(false)
const showNotif = ref(false)
const selectedItem = ref(null)

const url = storageUrl();

const handleAddMaintenance = () => {
    openModal.value = true
}

const handleCloseAddVehicleModal = () => {
    openModal.value = false
}

const handleNewMaintenance = (maintenance) => {
    maintenances.value.unshift(maintenance)
    openModal.value = false
    showNotif.value = true

    setTimeout(() => {
        showNotif.value = false
    }, 2000)
}

const handleUpdateMaintenance = (maintenance) => {
    maintenances.value.map(id => {
        if(id.id == maintenance.id){
            for(let key in maintenance) {
                id[key] = maintenance[key]
            }
        }

        return id;
    })
    openModal.value = false
    showNotif.value = true

    setTimeout(() => {
        showNotif.value = false
    }, 2000)
}

const fetch = async () => {
    const {load, data, total} = getAllMaintenance(params.value)
    await load();
    maintenances.value = data.value
    totalMaintenance.value = total.value
    loading.value = false
}

const handeClickEdit = (maintenance) => {
    selectedItem.value = maintenance
    openModal.value = true

}


const handleChangeSize = (size) => {
    params.value.page_size = size
}

const handleChangePage = (page) => {
    params.value.page = page
}

onMounted(async () => {
    fetch();
})

watch(params.value, () => {
    fetch();
})

</script>
<template>
    <CreateVehicleMaintenanceModal :selectedItem="selectedItem" 
        :openModal="openModal" 
        @saveMaintenance="handleNewMaintenance"
        @closeModal="handleCloseAddVehicleModal" 
        @updateMaintenance="handleUpdateMaintenance"/>

    <GNotification :show-notif="showNotif" />
    <div class="w-full bg-white">
        <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
            <h1 class="text-2xl font-bold tracking-tight text-gray-600 sm:text-3xl">Manage Maintenance</h1>
        </div>
    </div>
    <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
        <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <p class="mt-2 text-sm text-gray-700">List of maintenance.</p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button" @click="handleAddMaintenance"
                            class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
                            <PlusCircleIcon class="-ml-0.5 mr-2 h-4 w-4" />
                            Add Maintenance
                        </button>
                    </div>
                </div>
        <div class=" flex flex-col">
            <div class=" max-w-2xl flex  py-4 px-4 lg:max-w-7xl lg:px-0">
                <div class="px-2">
                    <input type="text" min="1" v-model="params.search" placeholder="Search Here.."
                        class="w-40 rounded-md border border-gray-300 bg-white py-1 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                </div>
            </div>
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Vehicle</th>
                                    <th scope="col"
                                        class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Date</th>
                                    <th scope="col"
                                        class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Type of Maintenance </th>
                                    <th scope="col"
                                        class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Price</th>
                                    <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                                <tr v-for="maintenance in maintenances" :key="maintenance.id">
                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                                        {{ maintenance.vehicle.model }} - {{ maintenance.vehicle.vehicle_brand.name }}</td>
                                    <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                        {{ maintenance.Date }}
                                    </td>
                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ maintenance.type_of_maintenance }}
                                    </td>
                                    <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ maintenance.price }}</td>
                                    <td
                                        class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">

                                        <button type="button" @click="handeClickEdit(maintenance)"
                                            class="inline-flex items-center rounded-md mr-2 border border-transparent bg-green-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                            <CheckCircleIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                            Edit
                                        </button>

                                        <button type="button" @click="handleClickVerifiedUser(maintenance)"
                                            class="inline-flex items-center rounded-md mr-2 border border-transparent bg-red-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                            <XCircleIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <g-pagination :page_size="params.page_size" :current_size="totalMaintenance" :current_page="params.page"
                            @change_size="handleChangeSize" @change_page="handleChangePage" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>