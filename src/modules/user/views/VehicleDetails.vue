<script setup>
import GLoadingDiv from '@/components/GLoadingDiv.vue';
import { getVehicleById } from '@/modules/admin/components/vehciles/composables/vehcile-composables';
import ImagesViewer from '@/modules/admin/components/vehciles/utilities/ImagesViewer.vue';
import { BookmarkIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref, defineProps } from 'vue';

import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid'
import BookingModal from '../modal/BookingModal.vue';

const props = defineProps({
    id: null
})

const loading = ref(true)
const vehicle = ref(null)
const openModal = ref(false)
const getVehicleInfo = async () => {
    loading.value = true
    const { data, load } = getVehicleById(props.id)
    await load()
    vehicle.value = data.value
    loading.value = false
}


const breadcrumbs = [
    { id: 1, name: 'Home', href: '#' },
]

const handleClickBookModal = () => {
    openModal.value = true
}

const handleClickCloseModal = () => {
    openModal.value = false
}


onMounted(async () => {
    await getVehicleInfo();
})
</script>
<template>
    <BookingModal v-if="!loading" :open-modal="openModal" :handleClickCloseModal="handleClickCloseModal" :vehicle="vehicle"/>
    <div class="border-b border-gray-200">
        <nav aria-label="Breadcrumb" class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <ol role="list" class="flex items-center space-x-4 py-4">
                <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.id">
                    <div class="flex items-center">
                        <a :href="breadcrumb.href" class="mr-4 text-sm font-medium text-gray-900">{{ breadcrumb.name
                        }}</a>
                        <svg viewBox="0 0 6 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            class="h-5 w-auto text-gray-300">
                            <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                        </svg>
                    </div>
                </li>
                <li class="text-sm">
                    <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">Details</a>
                </li>
            </ol>
        </nav>
    </div>

    <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">

        <GLoadingDiv v-if="loading" />
        <div class="border-b border-gray-200 pt-12 " v-if="!loading">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{ vehicle.model }}</h1>
            <p class="mt-4 text-base text-gray-500">{{ vehicle.vehicle_brand.name }}</p>
        </div>

        <div class=" pb-24 " v-if="!loading">
            <main class="">
                <div
                    class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                        <section aria-labelledby="applicant-information-title">
                            <div class="bg-white shadow sm:rounded-lg  border-t border-cyan-600">
                                <div class="px-4 py-5 sm:px-6">
                                    <h3 class="text-lg font-medium leading-6 text-gray-900">Model Information</h3>
                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Vehicle details and application.</p>
                                </div>
                                <div class="border-t border-gray-200">
                                    <dl>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Model</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.model
                                            }}</dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Price</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.price
                                            }} per day</dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Tracker</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.tracker.name
                                            }}</dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Brand</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.vehicle_brand.name
                                            }}</dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Seating Capacity</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.capacity
                                            }}</dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Fuel Capacity</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.fuel_capacity
                                            }}
                                                liters</dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Fuel Type</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.fuel_type.name
                                            }}
                                            </dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Fuel Consumption</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.fuel_consumption
                                            }} letter(s) per km</dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Color</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.color.name
                                            }}
                                            </dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Odometer</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.odometer
                                            }}</dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Plate Number</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                    vehicle.plate_number
                                            }}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>

                        

                        
                    </div>

                    <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 border-t border-cyan-600">
                            <div class="justify-stretch mt-6 flex flex-col">
                                <button type="button"
                                    @click="handleClickBookModal"
                                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                                    <BookmarkIcon class="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                    Book Now
                                </button>
                            </div>
                            <div class="mt-6 flow-root">
                                <ul role="list" class="-mb-8">
                                    <li v-for="(event) in vehicle.vehicle_place" :key="event.id">
                                        <div class="relative pb-5">
                                            <div class="relative flex space-x-3">
                                                <div>
                                                    <span
                                                        :class="['bg-gray-500', 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                                                        <component :is="MapPinIcon" class="h-5 w-5 text-white"
                                                            aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p class="text-sm text-gray-500">
                                                            {{ event.place.name }}
                                                        </p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ImagesViewer :imagesData="vehicle.vehicle_images" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    </main>
</template>