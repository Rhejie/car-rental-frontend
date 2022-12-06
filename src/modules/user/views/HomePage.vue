<script setup>
import GLoadingDiv from '@/components/GLoadingDiv.vue';
import GSkeletonLoading from '@/components/GSkeletonLoading.vue';
import { storageUrl } from '@/global-composables/http_service';
import FilterColors from '@/modules/admin/components/settings/color-utilities/FilterColors.vue';
import FilterFuelTypes from '@/modules/admin/components/settings/fuel-type-utilities/FilterFuelTypes.vue';
import FilterVehicleBrand from '@/modules/admin/components/settings/vehicle-brand-utilities/FilterVehicleBrand.vue';
import { fetchVehicles } from '@/modules/admin/components/vehciles/composables/vehcile-composables';
import GPagination from "@/components/GPagination.vue";
import { onMounted, ref, watch } from 'vue';
import SelectPlace from '@/modules/admin/components/settings/place-utilities/SelectPlace.vue';
import GNoVehicles from '@/components/GNoVehicles.vue';
import { useRouter } from 'vue-router';
import BookingModal from '../modal/BookingModal.vue';

const router = useRouter()
const loading = ref(true)
const vehicles = ref([])
const total = ref(0)
const selectedColors = ref([])
const selectedFuelType = ref([])
const selectedBrands = ref([])
const params = ref({
    size: 100,
    page: 1,
    search: null,
    brands: null,
    colors: null,
    fuelTypes: null,
    place_id: null,
    place: null
})

const place = ref(null)



const breadcrumbs = [{ id: 1, name: 'Home', href: '#' }]
const selectedBook = ref({
    id: null
})


const url = storageUrl();
const openModalBook = ref(false)
const fetch = async () => {
    loading.value = true
    const { data, load, totalVehicle } = fetchVehicles(params.value);
    await load();
    vehicles.value = data.value
    total.value = totalVehicle.value
    loading.value = false
}

const handleClearFilter = () => {
    params.value.size = 100;
    params.value.page = 1;
    params.value.search = null
    params.value.brands = null;
    params.value.colors = null;
    params.value.fuelTypes = null;
    params.value.place_id = null;

    selectedColors.value = []
    selectedFuelType.value = []
    selectedBrands.value = []
    // params.value.place = null
}

const onHandleChangePlace = (item) => {
    params.value.place_id = item.id
}

const getFirstImage = (vehicle) => {
    if (!loading.value && vehicle && vehicle.id && vehicle.vehicle_images.length > 0) {
        return vehicle.vehicle_images[0].image_url
    }

    return null;
}

const handleToogleBrand = (item) => {
    if (!item) {
        params.value.brands = null;
        fetch()
        return
    }
    params.value.brands = item
}


const handleToogleColor = (item) => {
    if (!item) {
        params.value.colors = null;
        fetch()
        return
    }
    params.value.colors = item
}


const handleChangeSize = (size) => {
    params.value.page_size = size
}

const handleChangePage = (page) => {
    params.value.page = page
}

const handleToogleFuelType = (item) => {
    if (!item) {
        params.value.fuelTypes = null;
        fetch()
        return
    }
    params.value.fuelTypes = item
}

const handleClickDetails = (vehicle) => {
    router.push({name: 'User Vehicle Details', params: {id: vehicle.id }})
}

const handleClickBook = (vehicle) => {
    selectedBook.value = vehicle
    openModalBook.value = true
}

const handleClickCloseModal = (book) => {
    openModalBook.value = false
}

watch(params.value, async () => {
    await fetch();
})

onMounted(async () => {
    await fetch();
})
</script>
<template>
    
    <BookingModal v-if="openModalBook" :open-modal="openModalBook" :handleClickCloseModal="handleClickCloseModal" :vehicle="selectedBook"/>
    <div class="border-b border-gray-200">
        <nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">List</a>
                </li>
            </ol>
        </nav>
    </div>

    <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-400 pt-12 pb-10">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900">Vehicles</h1>
            <p class="mt-4 text-base text-gray-500">Checkout out the latest and beautifull cars!</p>
        </div>

        <div class="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside class="border-r pr-2 border-gray-400">
                <h2 class="text-sm">Filters</h2>
                <button type="button" @click="handleClearFilter()"
                    class="inline-flex items-center justify-center float-right mb-2 rounded-md border border-gray-200 px-4 h-6 text-sm font-medium shadow-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Clear Filters
                </button>
                <div class="mt-1">
                    <input type="text" min="1" v-model="params.search" placeholder="Search Here.."
                        class="w-full rounded-md h-8 border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                </div>
                <button type="button" class="inline-flex items-center lg:hidden" @click="mobileFiltersOpen = true">
                    <span class="text-sm font-medium text-gray-700">Filters</span>
                    <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                </button>

                <div class="hidden lg:block">
                    <FilterColors v-model="selectedColors" :handleToogleColor="handleToogleColor" />
                    <FilterFuelTypes v-model="selectedFuelType" :handleToogleFuelType="handleToogleFuelType" />
                    <FilterVehicleBrand v-model="selectedBrands" :handleToogleBrand="handleToogleBrand" />
                </div>
            </aside>


            <section aria-labelledby="product-heading" class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <h2 id="product-heading" class="sr-only">Vehciles</h2>
                <GLoadingDiv v-if="loading" />
                <div>
                    <g-pagination :page_size="params.size" :current_size="total" :current_page="params.page"
                        @change_size="handleChangeSize" @change_page="handleChangePage" />
                </div>
                <div v-if="!loading"
                    class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                    <div v-for="vehicle in vehicles" :key="vehicle.id"
                        class="group relative flex flex-col overflow-hidden shadow-md rounded-lg border border-gray-200 bg-white">
                        <div class="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                            <img :src="`${url}` + getFirstImage(vehicle)" :alt="vehicle.imageAlt"
                                class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
                        </div>
                        <div class="flex flex-1 flex-col space-y-2 p-4">
                            <h3 class="text-sm font-medium text-gray-900">
                                <span>
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ vehicle.model }}
                                </span>
                            </h3>
                            <p class="text-sm text-gray-500">{{ vehicle.color.name }}</p>
                            <p class="text-sm text-gray-500">{{ vehicle.vehicle_brand.name }}</p>
                            <div class="flex flex-1 flex-col justify-end">
                                <p class="text-sm italic text-gray-500">{{ vehicle.capacity }} seating capacity</p>
                                <p class="text-base font-medium text-gray-900">{{ vehicle.fuel_type.name }} gas</p>
                            </div>
                        </div>
                        <div
                            class="justify-stretch relative pb-2 flex pr-2 flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                            <button type="button" @click="handleClickDetails(vehicle)"
                                class="inline-flex items-center justify-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium shadow-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                Details
                            </button>
                            <button type="button" @click="handleClickBook(vehicle)"
                                class="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                Book
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="!loading && vehicles.length == 0">
                    <GNoVehicles/>
                </div>
            </section>
        </div>
    </main>

</template>
<style>

</style>