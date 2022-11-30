
<script setup>
import { EyeIcon, PencilSquareIcon, MapPinIcon, TrashIcon } from '@heroicons/vue/24/outline';
import GPagination from "@/components/GPagination.vue";
import { ref, defineProps, onMounted, watch } from 'vue';
import CreateVehiclePlaceModal from '../modals/CreateVehiclePlaceModal.vue';
import GNotification from '@/components/GNotification.vue';
import { loadBookingHistory } from '../../composables/booking-composables';

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

const bookings = ref([])

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

const handleNewVehiclePlace = (book) => {
    bookings.value.unshift(book)
    openModal.value = false
}

const handleUpdateVehiclePlace = (book) => {
    
    bookings.value.map(id => {
        if(id.id == book.id){
            for(let key in book) {
                id[key] = book[key]
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
    const {load, data, totalBookings} = loadBookingHistory(params.value, props.vehicle_id)
    await load();
    bookings.value = data.value
    total.value = totalBookings.value
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


const handleBookingStatusColor = (status) => {
  if(status == 'pending') {
    return 'bg-yellow-600 px-2 rounded-md py-1 shadow'
  }
  if(status == 'accept') {
    return 'bg-green-600 px-2 rounded-md py-1 shadow'
  }
  
  if(status == 'decline') {
    return 'bg-red-600 px-2 rounded-md py-1 shadow'
  }
  
  if(status == 'accept') {
    return 'bg-orange-600 px-2 rounded-md py-1 shadow'
  }
}

watch(params.value, () => {
    fetch();
})

onMounted(async () => {
    await fetch();
})
</script>
<template>
    <div class="w-full mt-2">
        <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">Booking History</h1>
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
                                            Booking Start</th>
                                        <th scope="col"
                                            class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Booking End</th>
                                        <th scope="col"
                                            class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            User</th>
                                        <th scope="col"
                                            class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Destination</th>
                                        <th scope="col"
                                            class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                                    <tr v-for="book in bookings" :key="book.id">
                                        <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{{
                                            book.booking_start
                                            }}</td>
                                        <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{
                                            book.booking_start }}
                                        </td>
                                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            {{ book.user.last_name }}, {{ book.user.first_name }}
                                        </td>
                                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            {{ book.vehicle_place.place.name }}
                                        </td>
                                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            <span :class="['text-white text-sm', handleBookingStatusColor(book.booking_status)]">{{ book.booking_status }}</span>
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