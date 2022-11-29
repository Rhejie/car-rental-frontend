
<script setup>
import { EyeIcon, PencilSquareIcon, MapPinIcon, TrashIcon } from '@heroicons/vue/24/outline';
import GPagination from "@/components/GPagination.vue";
import { ref, defineProps, onMounted, watch } from 'vue';
import { fetchVehiclePlaces } from '../composables/vehicle-places-composables';
import CreateVehiclePlaceModal from '../modals/CreateVehiclePlaceModal.vue';
import GNotification from '@/components/GNotification.vue';

const props = defineProps({
    vehicle_id: {
        default: null
    }
})

const params = ref({
  size: 10,
  page: 1,
  search: null,
})

const total = ref(0)

const showNotif = ref(false)

const places = ref([])

const openModal = ref(false)

const message = ref(null)

const loading = ref(true)

const selectedItem = ref(null)
const handleClickAddVehicle = () => {
    openModal.value = true
}

const handleCloseAddVehiclePlaceModal = () => {
    openModal.value = false
    selectedItem.value = null
}

const handleNewVehiclePlace = (place) => {
    places.value.unshift(place)
    openModal.value = false
}

const handleUpdateVehiclePlace = (place) => {
    
    places.value.map(id => {
        if(id.id == place.id){
            for(let key in place) {
                id[key] = place[key]
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

const handleClickEdit = (item) => {
    openModal.value = true,
    selectedItem.value = item
}

const fetch = async () => {
    const {load, data, totalVehiclePlace} = fetchVehiclePlaces(params.value, props.vehicle_id)
    await load();
    places.value = data.value
    total.value = totalVehiclePlace.value
    loading.value = false
}

const handleChangeSize = (size) => {
    loading.value = true
    params.value.size = size
}

const handleChangePage = (page) => {
    loading.value = true
    params.value.page = page
}

watch(params.value, () => {
    fetch();
})

onMounted(async () => {
    await fetch();
})
</script>
<template>
    
    <CreateVehiclePlaceModal 
        :openModal="openModal" 
        :selectedItem="selectedItem" 
        :vehicle_id="props.vehicle_id"
        @closeModal="handleCloseAddVehiclePlaceModal" 
        @updateVehiclePlace="handleUpdateVehiclePlace"
        @saveVehiclePlace="handleNewVehiclePlace"/>
    <GNotification :show-notif="showNotif"/>
    <div class="w-full mt-2">
        <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">Available Places</h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button type="button" @click="handleClickAddVehicle"
                        class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
                        <MapPinIcon class="-ml-0.5 mr-2 h-4 w-4" />
                        Add Place
                    </button>
                </div>
            </div>
            <div class=" flex flex-col">
                <div class=" max-w-2xl flex  py-4 lg:max-w-7xl lg:px-0">
                    <div class="">
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
                                            class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            From</th>
                                        <th scope="col"
                                            class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            To</th>
                                        <th scope="col"
                                            class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Price per day.</th>
                                        <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                                    <tr v-for="place in places" :key="place.id">
                                        <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{{
                                            place.from
                                            }}</td>
                                        <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{
                                            place.place.name }}
                                        </td>
                                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ place.price
                                            }}</td>
                                        <td
                                            class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button type="button" @click="handleClickEdit(place)"
                                                class="inline-flex items-center rounded-md mr-2 border border-transparent bg-green-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                                <PencilSquareIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                                Edit
                                            </button>

                                            <button type="button"
                                                class="inline-flex items-center rounded-md mr-2 border border-transparent bg-red-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                <TrashIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <g-pagination :page_size="params.page_size" :current_size="total"
                                :current_page="params.page" @change_size="handleChangeSize"
                                @change_page="handleChangePage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>