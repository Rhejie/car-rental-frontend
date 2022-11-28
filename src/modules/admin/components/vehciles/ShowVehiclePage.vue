<script setup>
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
} from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { getVehicleById } from './composables/vehcile-composables';
import ImagesViewer from './utilities/ImagesViewer.vue';
import SelectStatus from './utilities/SelectStatus.vue';
const router = useRouter();
const props = defineProps({
    id: null
})
const loading = ref(true)
const vehicle = ref(null)
const url = storageUrl();
const getVehicleInfo = async () => {
    loading.value = true
    const { data, load } = getVehicleById(props.id)
    await load()
    vehicle.value = data.value
    loading.value = false
}

const getFirstImage = () => {
    if(!loading.value && vehicle.value && vehicle.value.id && vehicle.value.vehicle_images.length > 0) {
        return vehicle.value.vehicle_images[0].image_url
    }


}

const handleClickEdit = () => {
    router.push({name: 'Edit Vehicle', params: {id: vehicle.value.id} })
}

onMounted(async () => {
    await getVehicleInfo();
})


const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-gray-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: 'Applied to',
        target: 'Front End Developer',
        date: 'Sep 20',
        datetime: '2020-09-20',
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        date: 'Sep 22',
        datetime: '2020-09-22',
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        date: 'Sep 28',
        datetime: '2020-09-28',
    },
    {
        id: 4,
        type: eventTypes.advanced,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        date: 'Oct 4',
        datetime: '2020-10-04',
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        date: 'Oct 4',
        datetime: '2020-10-04',
    },
]

</script>
<template>
    <div class="py-2" v-if="!loading">

        <div
            
            class="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div class="flex items-center space-x-5">
                <div class="flex-shrink-0">
                    <div class="relative">
                        <img class="h-16 w-16 rounded-full"
                            :src="`${url}`+getFirstImage()"
                            alt="" />
                        <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                    </div>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">{{vehicle.model}}</h1>
                    <p class="text-sm font-bold text-gray-500">{{vehicle.vehicle_brand.name}}</p>
                </div>
            </div>
            <div
                class="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                <div>
                    <SelectStatus v-model="vehicle.publish" :read-only="true"/>
                </div>
                <button type="button"
                    class="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    View Trip History
                </button>
                <button type="button"
                    @click="handleClickEdit"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Edit
                </button>
            </div>
        </div>

        <div
            class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                <!-- Description list-->
                <section aria-labelledby="applicant-information-title">
                    <div class="bg-white shadow sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h2 id="applicant-information-title" class="text-lg font-bold leading-6 text-gray-900">
                                Vehicle Information</h2>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">Model details and application.</p>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Model</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.model}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Brand</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.vehicle_brand.name}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Color</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.color.name}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Tracker ID</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.tracker.name}} - {{vehicle.tracker.company.name}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Seating Capacity</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.capacity}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Fuel Type</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.fuel_type.name}} </dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Fuel Comsumption</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.fuel_consumption}} letters per km</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Plate Number</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.plate_number}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Odometer</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.odometer}} km</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
                
                <section aria-labelledby="applicant-information-title">
                    <div class="bg-white shadow sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h2 id="applicant-information-title" class="text-lg font-bold leading-6 text-gray-900">
                                Legal Information</h2>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">Model details and application.</p>
                        </div>
                        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">CR No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.cr_no}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Engine No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.engine_no}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">Chassis No</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.chassis_no}}</dd>
                                </div>
                                <div class="sm:col-span-1">
                                    <dt class="text-md font-bold text-gray-500">CR Expiration Date</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{vehicle.cr_expiration_date}}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="applicant-information-title">
                    <div class="bg-white shadow sm:rounded-lg">
                        <ImagesViewer :imagesData="vehicle.vehicle_images" />
                    </div>
                </section>
                <!-- Comments-->
            </div>

            <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
                <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2 id="timeline-title" class="text-lg font-bold text-gray-900">Maintenance History</h2>

                    <!-- Activity Feed -->
                    
                    <div class="justify-stretch mt-6 flex flex-col">
                        <button type="button"
                            class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            Add Maintenance
                        </button>
                    </div>
                    <div class="mt-6 flow-root">
                        <ul role="list" class="-mb-8">
                            <li v-for="(item, itemIdx) in timeline" :key="item.id">
                                <div class="relative pb-8">
                                    <span v-if="itemIdx !== timeline.length - 1"
                                        class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true" />
                                    <div class="relative flex space-x-3">
                                        <div>
                                            <span
                                                :class="[item.type.bgColorClass, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                                                <component :is="item.type.icon" class="h-5 w-5 text-white"
                                                    aria-hidden="true" />
                                            </span>
                                        </div>
                                        <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                            <div>
                                                <p class="text-sm text-gray-500">
                                                    {{ item.content }} <a href="#" class="font-bold text-gray-900">{{
                                                            item.target
                                                    }}</a>
                                                </p>
                                            </div>
                                            <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                                <time :datetime="item.datetime">{{ item.date }}</time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>