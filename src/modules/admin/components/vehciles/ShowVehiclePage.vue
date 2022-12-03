<script setup>
import GLoadingDiv from '@/components/GLoadingDiv.vue';
import { storageUrl } from '@/global-composables/http_service';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverOverlay,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    ArrowLongLeftIcon,
    CheckIcon,
    HandThumbUpIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    UserIcon,
    PencilSquareIcon
} from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { getVehicleById } from './composables/vehcile-composables';
import ImagesViewer from './utilities/ImagesViewer.vue';
import SelectStatus from './utilities/SelectStatus.vue';
import VehiclePlaces from './components/VehiclePlaces.vue'
import VehiclePhotos from './components/VehiclePhotos.vue';
import VehicleBookingHistory from './components/VehicleBookingHistory.vue';
import VehicleMaintenance from './components/VehicleMaintenance.vue';
const router = useRouter();
const props = defineProps({
    id: null
})
const loading = ref(true)
const vehicle = ref(null)
const url = storageUrl();


const tabs = ref([
    { name: 'Booking History', href: '#', current: true },
    { name: 'Places', href: '#', current: false },
    { name: 'Maintenance', href: '#', current: false },
    { name: 'Images', href: '#', current: false },
])

const getVehicleInfo = async () => {
    loading.value = true
    const { data, load } = getVehicleById(props.id)
    await load()
    vehicle.value = data.value
    loading.value = false
}

const handleToogleTab = (tab) => {
    tabs.value.map(t => {
        if(t.name == tab.name) {
            t.current = true
        }
        else {
            t.current = false
        }

        return t
    })
}

const getFirstImage = () => {
    if (!loading.value && vehicle.value && vehicle.value.id && vehicle.value.vehicle_images.length > 0) {
        return vehicle.value.vehicle_images[0].image_url
    }


}

const handleClickEdit = () => {
    router.push({ name: 'Edit Vehicle', params: { id: vehicle.value.id } })
}

const handleSetVehicleStatus = (vehicle) => {
    return vehicle ? 'Available' : 'Unavailable'
}

onMounted(async () => {
    await getVehicleInfo();
})

</script>
<template>
    <GLoadingDiv v-if="loading" />
    <div v-if="!loading">
        <div class="w-full bg-gray-500">
            <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
                <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Manage Vehicle: {{ vehicle.model }}
                </h1>
            </div>
        </div>
    </div>
    <div class="px-4 bg-gray-200 h-full sm:px-6 sm:py-4 lg:px-8">
        <div
            v-if="!loading"
            class="justify-stretch my-2 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            
            <div class="flex">
                <span class="text-sm font-bold text-gray-500">Vehicle Status: </span> 
                <span class="text-sm text-gray-500"> &nbsp; {{handleSetVehicleStatus(vehicle)}}</span>
            </div>
            <div>
                <SelectStatus v-model="vehicle.publish" :read-only="true" />
            </div>
            <button type="button" @click="handleClickEdit"
                class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-100">
                <PencilSquareIcon class="-ml-0.5 mr-2 h-4 w-4"/>
                Edit
            </button>
        </div>
        <div class="flex">
            <div class="w-2/5 mr-2">
                <div class="overflow-hidden w-full bg-white shadow sm:rounded-lg mb-2" v-if="!loading">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">Model Information</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Vehicle details and application.</p>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Model</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.model }}</dd>
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
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.capacity }}</dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Fuel Capacity</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.fuel_capacity }}
                                    letters</dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Fuel Type</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.fuel_type.name
                                }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Fuel Consumption</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.fuel_consumption
                                }} letter(s) per km</dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Color</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.color.name }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Odometer</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.odometer }}</dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Plate Number</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.plate_number }}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="overflow-hidden w-full bg-white shadow sm:rounded-lg" v-if="!loading">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">Legal Information</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Vehicle details and application.</p>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">CR Number</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                        vehicle.cr_no
                                }}</dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Engine Number</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.engine_no }}</dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Chassis Number</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.chassis_no }}</dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">CR Expiration Date</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ vehicle.cr_expiration_date }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <div>
                    <div class="sm:hidden">
                        <label for="tabs" class="sr-only">Select a tab</label>
                        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                        <select id="tabs" name="tabs"
                            class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                            <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
                        </select>
                    </div>
                    <div class="hidden sm:block" v-if="!loading">
                        <nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                            <span v-for="(tab, tabIdx) in tabs" :key="tab.name" 
                                @click="handleToogleTab(tab)"
                                :class="[tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10']"
                                :aria-current="tab.current ? 'page' : undefined">
                                <span>{{ tab.name }}</span>
                                <span aria-hidden="true"
                                    :class="[tab.current ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
                            </span>
                        </nav>
                        <VehiclePlaces :vehicle_id="props.id" v-if="!loading && tabs.find(t => t.name == 'Places' && t.current == true)" />
                        <VehiclePhotos :images="vehicle.vehicle_images" v-if="!loading && tabs.find(t => t.name == 'Images' && t.current == true)"/>
                        <VehicleBookingHistory :vehicle_id="props.id" v-if="!loading && tabs.find(t => t.name == 'Booking History' && t.current == true)" />
                        <VehicleMaintenance  :vehicle="vehicle" v-if="!loading && tabs.find(t => t.name == 'Maintenance' && t.current == true)"  />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>