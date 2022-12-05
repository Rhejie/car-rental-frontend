<script setup>
import { storageUrl } from '@/global-composables/http_service';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchVehicles } from '../components/vehciles/composables/vehcile-composables';
import CreatevehicleModal from '../components/vehciles/modals/CreatevehicleModal.vue'
import SelectStatusFilter from '@/components/SelectStatusFilter.vue'
import GSkeletonLoading from '@/components/GSkeletonLoading.vue'

import GPagination from "@/components/GPagination.vue";
import { CheckCircleIcon, EyeIcon, XCircleIcon, XMarkIcon, PlusCircleIcon, RocketLaunchIcon } from '@heroicons/vue/20/solid'
import { loadBookings } from '../components/composables/booking-composables';
import AcceptBookingModal from '../components/modals/AcceptBookingModal.vue';
import DeclineBookingModal from '../components/modals/DeclineBookingModal.vue'
import GNotification from '@/components/GNotification.vue';
import DeployBookingModal from '../components/modals/DeployBookingModal.vue';
import CancelBookingModal from '../components/modals/CancelBookingModal.vue';

const router = useRouter()

const openModal = ref(false)

const bookings = ref([])
const loading = ref(true)
const total = ref(0)
const params = ref({
  page_size: 10,
  page: 1,
  search: null,
})

const showNotif = ref(false)
const message = ref('')
const selectedBooking = ref(null)
const showDeployModal = ref(false)
const showDeclineModal = ref(false)
const showCancelBookingModal = ref(false)

const url = storageUrl();

const handleClickAddVehicle = () => {
  openModal.value = true
}

const handleAcceptedBook = (selected) => {
  message.value = "Successfully accepted!"
  showNotif.value = true
  bookings.value.map(book => {
    if(selected.id == book.id) {
      for(let key in selected) {
        book[key] = selected[key]
      }
    }
    return book
  })

  openModal.value = false
  setTimeout(() => {
        showNotif.value = false
    }, 2000)
}

const handleDeclinedBook = (selected) => {
  message.value = "Successfully declined!"
  showNotif.value = true
  bookings.value.map(book => {
    if(selected.id == book.id) {
      for(let key in selected) {
        book[key] = selected[key]
      }
    }
    return book
  })

  showDeclineModal.value = false
  setTimeout(() => {
        showNotif.value = false
    }, 2000)
}

const handleCloseModal = () => {
  openModal.value = false
  showDeployModal.value = false
  showDeclineModal.value = false
  showCancelBookingModal.value = false
}

const fetch = async () => {
  loading.value = true
  const { data, load, totalBookings } = loadBookings(params.value);
  await load();
  bookings.value = data.value
  total.value = totalBookings.value
  loading.value = false
}

const handleAcceptBook = (book) => {
  selectedBooking.value = book
  openModal.value = true
}

const handleClickDetails = (book) => {
  router.push({ name: 'Show Vehicle', params: { id: book.id } })
}

const handleUserName = (user) => {

  return user.last_name + ', ' + user.first_name
}

const handleLickUser = (user) => {
  router.push({name: 'Admin User Profile', params: { id: user.id } })
}

const handleVehicleName = (vehicle) => {
    return vehicle.model + ' - ' + vehicle.vehicle_brand.name
}

const handleVehicleTracker = (vehicle) => {
    return vehicle.tracker.name
}

const handleDestination = (destination) => {
    return destination.place.name
}

const handleSetStatus = (vehicleStatus) => {
  return vehicleStatus ? 'Available' : 'Unavailable'
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
  if (status == 'cancel') {
    return 'bg-yellow-600 px-2 rounded-md py-1 shadow'
  }
}

const handleChangeSize = (size) => {
  params.value.page_size = size
}

const handleChangePage = (page) => {
  params.value.page = page
}

const handleDeployeButton = (book, index) => {
  showDeployModal.value = true
  selectedBooking.value = book
}

const handleCancelButton = (book, index) => {
  showCancelBookingModal.value = true
  selectedBooking.value = book
  console.log(selectedBooking.value);
}

const handleCLickDecline = (book, index) => {
  showDeclineModal.value = true
  selectedBooking.value = book
}

const handleDeployedBooking = (book) => {
  let _index = bookings.value.findIndex(b => b.id == book.id);
  bookings.value.splice(_index, 1)
  message.value = "Successfully deployed!"
  showDeployModal.value = false
  showNotif.value = true

  setTimeout(() => {
        showNotif.value = false
    }, 2000)
}

const handleCancelBooking = (selected) => {
  message.value = "Successfully cancelled!"
  showNotif.value = true
  bookings.value.map(book => {
    if (selected.id == book.id) {
      for (let key in selected) {
        book[key] = selected[key]
      }
    }
    return book
  })

  openModal.value = false
  setTimeout(() => {
    showNotif.value = false
  }, 2000)

}

onMounted(async () => {
  fetch();
})

watch(params.value, () => {
  fetch();
})

</script>
<template>
  
  <GNotification :show-notif="showNotif" :message="message"/>
  <AcceptBookingModal :openModal="openModal" :selected-book="selectedBooking" @closeModal="handleCloseModal" @acceptBook="handleAcceptedBook"/>
  <CancelBookingModal :openModal="showCancelBookingModal" :selected-book="selectedBooking" @closeModal="handleCloseModal" @acceptBook="handleCancelBooking"/>
  <DeclineBookingModal :openModal="showDeclineModal" :selected-book="selectedBooking" @closeModal="handleCloseModal" @declineBook="handleDeclinedBook"/>
  <DeployBookingModal v-if="selectedBooking" :openModal="showDeployModal" :selected-booking="selectedBooking" @closeModal="handleCloseModal" @deployedBooking="handleDeployedBooking"/>
  <div class="w-full bg-gray-500">
    <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Manage Bookings</h1>
    </div>
  </div>
  <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
      </div>
      <!-- <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" @click="handleClickAddVehicle"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          <PlusCircleIcon class="-ml-0.5 mr-2 h-4 w-4" />
          Add book
        </button>
      </div> -->
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
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status</th>
                  <th scope="col"
                    class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    User </th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tracker ID</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Unit</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date Start</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date End</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Destination</th>
                  <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                <tr v-for="(book, index) in bookings" :key="book.id">
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    <span :class="['text-white text-sm', handleBookingStatusColor(book.booking_status)]">{{ (book.booking_status).toUpperCase() }}</span>
                  </td>
                  <td @click="handleLickUser(book.user)" class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-cyan-500 sm:pl-6 cursor-pointer" >
                    {{handleUserName(book.user)}}
                </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ handleVehicleTracker(book.vehicle) }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {{handleVehicleName(book.vehicle)}}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ book.booking_start }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ book.booking_end }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ handleDestination(book.vehicle_place) }}
                  </td>
                  <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    

                    <!-- <button type="button" @click="handleClickDetails(book)"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-cyan-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                      <EyeIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      View
                    </button> -->
                    <!-- Pending Booking -->
                    <button type="button" @click="handleAcceptBook(book)"  v-if="book.booking_status != 'accept' && book.booking_status != 'decline' && book.booking_status != 'cancel'"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-green-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      <CheckCircleIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Accept
                    </button>
                    
                    <button type="button"
                      @click="handleCLickDecline(book, index)"
                    v-if="book.booking_status != 'accept' && book.booking_status != 'decline' && book.booking_status != 'cancel'"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-red-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      <XMarkIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Decline
                    </button>

                    <!-- Accepted Booking -->
                    <button type="button" @click="handleDeployeButton(book, index)"  
                    v-if="book.booking_status != 'pending' && book.booking_status != 'decline' && book.booking_status != 'cancel'"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-cyan-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                      <RocketLaunchIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Deploy
                    </button>

                    <button type="button" @click="handleCancelButton(book, index)"  
                    v-if="book.booking_status != 'pending' && book.booking_status != 'decline' && book.booking_status != 'cancel'"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-orange-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                      <XCircleIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <g-pagination :page_size="params.page_size" :current_size="total" :current_page="params.page"
              @change_size="handleChangeSize" @change_page="handleChangePage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>