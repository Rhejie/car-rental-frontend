<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { getVehicleById, updateVehicle } from './composables/vehcile-composables';
import SelectColor from '../settings/color-utilities/SelectColor.vue';
import SelectTracker from '../settings/tracker-utilities/SelectTracker.vue';
import SelectFuelType from '../settings/fuel-type-utilities/SelectFuelType.vue';
import ImagesViewer from './utilities/ImagesViewer.vue';
import VehicleImageUploaderModal from './modals/VehicleImageUploaderModal.vue';
import SelectStatus from './utilities/SelectStatus.vue';
import SelectVehicleBrand from '../settings/vehicle-brand-utilities/SelectVehicleBrand.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
    id: null
})
const vehicle = ref(null)
const loading = ref(true)
const loadingUpdate = ref(false)
const openUploadModal = ref(false)
const errorValue = ref(null)

const getVehicleInfo = async () => {
    loading.value = true
    const { data, load } = getVehicleById(props.id)
    await load()
    vehicle.value = data.value
    loading.value = false
}

const onHandleChangeColor = (item) => {
    console.log('Selected item', item)
}

const onHandleChange = (item) => {
    console.log('Selected item', item)
}

const onHandleChangeFuelType = (item) => {
    console.log('Selected item', item)
}

const onHandleChangeVehicleBrand = (item) => {
    console.log('Selected item', item)
}

const handleClickUpload = () => {
    openUploadModal.value = true
}

const handleCloseModal = () => {
    openUploadModal.value = false
}

const handleNewImage = (image) => {
    console.log('image', image)
    vehicle.value.vehicle_images.push(image)
}

const updateVehicleInfo = async () => {
    loadingUpdate.value = true
    const { data, update, errorData } = updateVehicle(vehicle.value)
    await update();
    errorValue.value = errorData.value
    loadingUpdate.value = false
    if (!loadingUpdate.value && !errorValue.value, !errorData.value) {
        router.push({ name: 'Show Vehicle', params: { id: data.value.id } })
    }
}

const handleClickCancel = () => {
    router.back();
}

onMounted(async () => {
    await getVehicleInfo();
})

</script>
<template>
    <VehicleImageUploaderModal v-if="!loading" :open-modal="openUploadModal" @closeModal="handleCloseModal"
        @newImage="handleNewImage" :vehicle="vehicle" />
    <div class="bg-gray-50">
        <div v-if="!loading" class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Vehicle Information</h2>

            <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                    <div>
                        <h2 class="text-lg font-medium text-gray-900">Vehicle information</h2>

                        <div class="mt-4">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">
                                Model:
                            </label>
                            <div class="mt-1">
                                <input type="text" v-model="vehicle.model"
                                    class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                <span class="text-sm text-red-400"
                                    v-if="errorValue && !loadingUpdate && errorValue.model">
                                    {{ errorValue.model[0] }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h2 class="text-lg font-medium text-gray-900">Model information</h2>

                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <div class="mt-1">
                                    <SelectColor v-model="vehicle.color" :onHandleChangeColor="onHandleChangeColor" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.color">
                                        {{ errorValue.color[0] }}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div class="mt-1">
                                    <SelectTracker v-model="vehicle.tracker" :onHandleChange="onHandleChange" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.tracker">
                                        {{ errorValue.tracker[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div class="mt-1">
                                    <SelectFuelType v-model="vehicle.fuel_type"
                                        :onHandleChangeFuelType="onHandleChangeFuelType" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.fuel_type">
                                        {{ errorValue.fuel_type[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div class="mt-1">
                                    <SelectVehicleBrand v-model="vehicle.vehicle_brand"
                                        :onHandleChangeVehicleBrand="onHandleChangeVehicleBrand" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.vehicle_brand">
                                        {{ errorValue.vehicle_brand[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Seating Capacity</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.capacity"
                                        placeholder="Fuel Capacity"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.capacity">
                                        {{ errorValue.capacity[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Fuel Capacity
                                    (L)</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.fuel_capacity"
                                        placeholder="Fuel Capacity"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.fuel_capacity">
                                        {{ errorValue.fuel_capacity[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Fuel Consumptions
                                    (per km)</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.fuel_consumption"
                                        placeholder="Fuel Consumptions"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.fuel_consumption">
                                        {{ errorValue.fuel_consumption[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Odemeter</label>
                                <div class="mt-2">
                                    <input type="number" min="1" v-model="vehicle.odometer" placeholder="Odemeter"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.odemeter">
                                        {{ errorValue.odemeter[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="company" class="block text-sm font-medium text-gray-700">Plate
                                    Number</label>
                                <div class="mt-1">
                                    <input type="text" v-model="vehicle.plate_number" placeholder="Plate Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.plate_number">
                                        {{ errorValue.plate_number[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h2 class="text-lg font-medium text-gray-900">Legal information</h2>

                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">CR No.</label>
                                <div class="mt-2">
                                    <input type="text" min="1" v-model="vehicle.cr_no" placeholder="CR Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.cr_no">
                                        {{ errorValue.cr_no[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Engine No.</label>
                                <div class="mt-2">
                                    <input type="text" min="1" v-model="vehicle.engine_no" placeholder="Engine Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.engine_no">
                                        {{ errorValue.engine_no[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Chassis No.</label>
                                <div class="mt-2">
                                    <input type="text" min="1" v-model="vehicle.chassis_no" placeholder="Chassis Number"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.chassis_no">
                                        {{ errorValue.chassis_no[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">CR Expiration
                                    Date</label>
                                <div class="mt-2">
                                    <input type="date" min="1" v-model="vehicle.cr_expiration_date"
                                        placeholder="Expiration Date"
                                        class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm" />
                                    <span class="text-sm text-red-400"
                                        v-if="errorValue && !loadingUpdate && errorValue.cr_expiration_date">
                                        {{ errorValue.cr_expiration_date[0] }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="company" class="block text-sm font-medium text-gray-700">Status</label>
                                <div class="mt-2">
                                    <SelectStatus v-model="vehicle.publish" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order summary -->
                <div class="mt-10 lg:mt-0">
                    <h2 class="text-lg font-medium text-gray-900">Images</h2>

                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <h3 class="sr-only">Items in your cart</h3>
                        <ImagesViewer :imagesData="vehicle.vehicle_images" />

                        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <button @click="handleClickUpload"
                                class="w-full rounded-md border border-transparent bg-gray-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                Upload Image
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-10 border-t border-gray-200 pt-10">
                    <button type="button" @click="updateVehicleInfo"
                        class="inline-flex float-right bg-gray-700 hover:text-gray-700 items-center rounded-md border border-gray-300 bg-cyan-400 px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Save
                    </button>
                    <button type="button"
                        @click="handleClickCancel"
                        class="mr-2 inline-flex float-right items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>