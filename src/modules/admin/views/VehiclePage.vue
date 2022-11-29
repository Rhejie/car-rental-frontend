<script setup>
import { storageUrl } from '@/global-composables/http_service';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchVehicles } from '../components/vehciles/composables/vehcile-composables';
import CreatevehicleModal from '../components/vehciles/modals/CreatevehicleModal.vue'
import SelectStatusFilter from '@/components/SelectStatusFilter.vue'
import GSkeletonLoading from '@/components/GSkeletonLoading.vue'

import GPagination from "@/components/GPagination.vue";
import { PencilSquareIcon, EyeIcon, TrashIcon, PlusCircleIcon } from '@heroicons/vue/20/solid'

const router = useRouter()

const openModal = ref(false)

const vehicles = ref([])
const loading = ref(true)
const total = ref(0)
const params = ref({
  size: 10,
  page: 1,
  search: null,
  status: 'all',
  brands: null,
  colors: null,
  fuelTypes: null
})


const url = storageUrl();

const handleClickAddVehicle = () => {
  openModal.value = true
}

const handleCloseAddVehicleModal = () => {
  openModal.value = false
}

const fetch = async () => {
  loading.value = true
  const { data, load, totalVehicle } = fetchVehicles(params.value);
  await load();
  vehicles.value = data.value
  total.value = totalVehicle.value
  loading.value = false
}

const getFirstImage = (vehicle) => {
  if (!loading.value && vehicle && vehicle.id && vehicle.vehicle_images.length > 0) {
    return vehicle.vehicle_images[0].image_url
  }

  return null;
}

const handleClickEdit = (vehicle) => {
  router.push({ name: 'Edit Vehicle', params: { id: vehicle.id } })
}

const handleClickDetails = (vehicle) => {
  router.push({ name: 'Show Vehicle', params: { id: vehicle.id } })
}

const handleSetStatusPublish = (vehicleStatus) => {
  return vehicleStatus ? 'Publish' : 'Draft'
}

const handleSetStatus = (vehicleStatus) => {
  return vehicleStatus ? 'Unused' : 'Used'
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
  <CreatevehicleModal :openModal="openModal" @closeModal="handleCloseAddVehicleModal" />
  <div class="w-full bg-gray-500">
    <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Manage Vehicles</h1>
    </div>
  </div>
  <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Vehicles</h1>
        <p class="mt-2 text-sm text-gray-700">Publis and drafts vehicles.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button"
        @click="handleClickAddVehicle"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          <PlusCircleIcon  class="-ml-0.5 mr-2 h-4 w-4"/>
          Add vehicle
        </button>
      </div>
    </div>
    <div class=" flex flex-col">
      <div class=" max-w-2xl flex  py-4 px-4 lg:max-w-7xl lg:px-0">
        <div class="px-2">
          <input type="text" min="1" v-model="params.search" placeholder="Search Here.."
            class="w-40 rounded-md border border-gray-300 bg-white py-1 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
        </div>
        <div class="flex">
          <span class="mr-2 text-md text-gray-500 mt-2">Status: </span>
          <SelectStatusFilter v-model="params.status" />
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
                    Tracker ID</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Model</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Plate No.</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    CR Expiration Date</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    CR No.</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Fuel Capacity</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Seating Capacity</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Publish</th>
                  <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status</th>
                  <th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white" v-loading="loading">
                <tr v-for="vehicle in vehicles" :key="vehicle.id">
                  <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{{ vehicle.tracker.name
                  }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{ vehicle.model }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ vehicle.plate_number }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ vehicle.cr_expiration_date }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ vehicle.cr_no }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ vehicle.fuel_capacity }} Letters
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ vehicle.capacity }} Person</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ handleSetStatusPublish(vehicle.publish) }}</td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ handleSetStatus(vehicle.status) }}</td>
                  <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button type="button"
                      @click="handleClickEdit(vehicle)"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-green-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      <PencilSquareIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Edit
                    </button>

                    <button type="button"
                      @click="handleClickDetails(vehicle)"
                      class="inline-flex items-center rounded-md mr-2 border border-transparent bg-cyan-400 px-2 py-1 text-sm font-sm leading-4 text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                      <EyeIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      View
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
            <g-pagination :page_size="params.page_size" :current_size="total" :current_page="params.page"
              @change_size="handleChangeSize" @change_page="handleChangePage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>