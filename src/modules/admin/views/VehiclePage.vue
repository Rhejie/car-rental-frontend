<script setup>
import { storageUrl } from '@/global-composables/http_service';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchVehicles } from '../components/vehciles/composables/vehcile-composables';
import CreatevehicleModal from '../components/vehciles/modals/CreatevehicleModal.vue'
import SelectStatusFilter from '@/components/SelectStatusFilter.vue'
import GSkeletonLoading from '@/components/GSkeletonLoading.vue'

const router = useRouter()

const openModal = ref(false)

const vehicles = ref([])
const loading = ref(true)
const total = ref(0)
const params = ref({
  page_size: 10,
  page: 1,
  search: null,
  status: 'all'
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

const handleSetStatus = (vehicleStatus) => {
  return vehicleStatus ? 'Publish' : 'Draft'
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
  <div class="w-full bg-gray-200">
    <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Vehicle List</h1>
      <p class="mt-2 text-sm text-gray-500">All publish and draft vehciles.</p>
    </div>
  </div>
  <div class="w-full relative shadow-md">
    <div class="mx-auto max-w-2xl flex  py-4 px-4 lg:max-w-7xl lg:px-0">
      <button type="button" @click="handleClickAddVehicle" :disabled="false"
        class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Add Vehicle
      </button>
      <div class="px-2">
        <input type="text" min="1" v-model="params.search" placeholder="Search Here.."
          class="w-40 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
      </div>
      <div class="flex">
        <span class="mr-2 text-md text-gray-500 mt-2">Status: </span>
        <SelectStatusFilter v-model="params.status"/>
      </div>
    </div>
  </div>

  <div class=" ">
    <div class="mx-auto max-w-2xl py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <GSkeletonLoading v-if="loading"/>
      <div v-if="!loading" class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="vehicle in vehicles" :key="vehicle.id" class="shadow-xl p-2 border border-gray-300">
          <div class="relative">
            <div class="relative h-72 w-full overflow-hidden rounded-lg">
              <img :src="`${url}` + getFirstImage(vehicle)" :alt="vehicle.model"
                class="h-full w-full object-cover object-center" />
            </div>
            <div class="relative mt-4">
              <p class="mt-1 text-md text-gray-500"><span class="text-gray-700 font-bold">Tracker ID: </span>{{ vehicle.tracker.name }}</p>
              <p class="mt-1 text-md text-gray-500"><span class="text-gray-700 font-bold">Color: </span>{{ vehicle.color.name }}</p>
              <p class="mt-1 text-md text-gray-500"><span class="text-gray-700 font-bold">Company: </span>{{ vehicle.vehicle_brand.name }}</p>
              <p class="mt-1 text-md text-gray-500"><span class="text-gray-700 font-bold">Seating: </span>{{ vehicle.capacity }}</p>
              <p class="mt-1 text-md text-gray-500"><span class="text-gray-700 font-bold">Status: </span>{{ handleSetStatus(vehicle.publish) }}</p>
            </div>
            <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
              <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
              <p class="relative text-lg font-semibold text-white">{{ vehicle.model }}</p>
            </div>
          </div>
          <div class="mt-6">
            <div
              class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
              <button type="button" @click="handleClickDetails(vehicle)"
                class="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium shadow-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Details
              </button>
              <button type="button" @click="handleClickEdit(vehicle)"
                class="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>