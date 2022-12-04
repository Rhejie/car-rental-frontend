
<template>
    <main class="flex-1 pb-8">
        <!-- Page header -->
        <div class="bg-white shadow">
            <div class="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div class="py-6 md:flex md:items-center md:justify-between">
                    <div class="min-w-0 flex-1">
                        <!-- Profile -->
                        <div class="flex items-center">
                            <div v-loading="loading">
                                <div class="flex items-center">
                                    <h1 class=" text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                        Your Bookings
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                        <InformationCircleIcon
                            class="inline-flex w-10 items-center rounded-md border border-transparent  text-sm font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2" />


                    </div>
                </div>
            </div>
        </div>
        <main class="mx-auto px-4 lg:max-w-8xl lg:px-8">

            <GLoadingDiv v-if="loading" />

            <div class=" pb-24 " v-if="!loading">
                <main class="">
                    <div class="mx-auto mt-8 grid  grid-cols-1 gap-6 sm:px-6  lg:grid-flow-col-dense lg:grid-cols-3">
                        <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                            <section aria-labelledby="applicant-information-title">
                                <div class="bg-white shadow sm:rounded-lg  border-t border-cyan-600">
                                    <div class="px-4 py-5 sm:px-6">
                                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                                            History</h3>
                                    </div>
                                    <div class="border-t border-gray-200">

                                        <ul role="list" class="divide-y divide-gray-200">
                                            <li v-for="book in bookings" :key="book.applicant">
                                                <a :href="book.href" class="block hover:bg-gray-50">
                                                    <div class="flex items-center px-4 py-4 sm:px-6">
                                                        <div class="flex min-w-0 flex-1 items-center">
                                                            <div class="flex-shrink-0">
                                                                <img class="h-12 w-12 rounded-full"
                                                                    :src="`${url}` + handleGetImage(book.vehicle.vehicle_images)"
                                                                    alt="" />
                                                            </div>
                                                            <div
                                                                class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                                <div>
                                                                    <p
                                                                        class="truncate text-sm font-medium text-cyan-600">
                                                                        {{ book.vehicle.model }} - {{
                                                                                book.vehicle.vehicle_brand.name
                                                                        }}</p>
                                                                    <p
                                                                        class="mt-2 flex items-center text-sm text-gray-500">
                                                                        <MapPinIcon
                                                                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                            aria-hidden="true" />
                                                                        <span class="truncate">
                                                                            {{ book.vehicle_place.place.name }}
                                                                        </span>
                                                                    </p>
                                                                    <p
                                                                        class="mt-2 flex items-center text-sm text-gray-500">
                                                                        <ClockIcon
                                                                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                            aria-hidden="true" />
                                                                        <span class="truncate">
                                                                            Start: {{ book.booking_start }} End: {{
                                                                                    book.booking_end
                                                                            }}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div class="hidden md:block">
                                                                    <div>
                                                                        <p class="text-sm text-gray-900">
                                                                            Applied on
                                                                            {{ ' ' }}
                                                                            <time :datetime="book.created_at">{{
                                                                                    book.created_at
                                                                            }}</time>
                                                                        </p>
                                                                        <p
                                                                            :class="['mt-2 flex items-center text-sm', handleStatus(book).color]">
                                                                            <component
                                                                                :is="handleStatus(book).icon"
                                                                                :class="['mr-1.5 h-5 w-5 flex-shrink-0', handleStatus(book).color]"
                                                                                aria-hidden="true" />
                                                                            {{ handleStatus(book).status
                                                                            }}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- <div>
                                                            <InformationCircleIcon class="h-5 w-5 text-gray-400"
                                                                aria-hidden="true" />
                                                        </div> -->
                                                        <div>
                                                            <button type="button"
                                                                v-if="handleBookingCancelButton(book)"
                                                                @click="handleClickCancel(book)"
                                                                class="inline-flex h-6 items-center rounded border border-transparent bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                                <XCircleIcon class="h-5 w-5 text-white"
                                                                    aria-hidden="true" />
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                        <g-pagination :page_size="params.page_size" :current_size="total"
                                            :current_page="params.page" @change_size="handleChangeSize"
                                            @change_page="handleChangePage" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
                            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 border-t border-cyan-600">
                                <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Your Current Book
                                </h2>

                                <div class="justify-stretch mt-6 flex flex-col">

                                </div>
                                <!-- Activity Feed -->
                                <div class="mt-6 flow-root">
                                    <div class="overflow-hidden bg-white shadow sm:rounded-lg" v-if="(!loadingCurrentBook && currentBook && currentBook.id)">
                                        <div class="px-4 py-5 sm:px-6">
                                            <h3 class="text-lg font-medium leading-6 text-gray-900">Booking Information</h3>
                                        </div>
                                        <div class="border-t border-gray-200">
                                            <dl>
                                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                                                    <dd :class="[handleStatus(currentBook).color, 'mt-1 text-sm sm:col-span-2 sm:mt-0']">{{ handleStatus(currentBook).status
                                                    }}</dd>
                                                </div>
                                                <div
                                                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Destination</dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                            currentBook.vehicle_place.place.name
                                                    }}</dd>
                                                </div>
                                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Booking Start</dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                            currentBook.booking_start
                                                    }}</dd>
                                                </div>
                                                <div
                                                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Booking End</dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                            currentBook.booking_end
                                                    }}</dd>
                                                </div>
                                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Model</dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                            currentBook.vehicle.model
                                                    }}</dd>
                                                </div>
                                                <div
                                                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Brand</dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                            currentBook.vehicle.vehicle_brand.name
                                                    }}</dd>
                                                </div>
                                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Downloadable Forms
                                                    </dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                        <ul role="list"
                                                            class="divide-y divide-gray-200 rounded-md border border-gray-200">
                                                            <li
                                                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                                                <div class="flex w-0 flex-1 items-center">
                                                                    <PaperClipIcon
                                                                        class="h-5 w-5 flex-shrink-0 text-gray-400"
                                                                        aria-hidden="true" />
                                                                    <span
                                                                        class="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                                                </div>
                                                                <div class="ml-4 flex-shrink-0">
                                                                    <a href="#"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                                                                </div>
                                                            </li>
                                                            <li
                                                                class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                                                <div class="flex w-0 flex-1 items-center">
                                                                    <PaperClipIcon
                                                                        class="h-5 w-5 flex-shrink-0 text-gray-400"
                                                                        aria-hidden="true" />
                                                                    <span
                                                                        class="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                                                </div>
                                                                <div class="ml-4 flex-shrink-0">
                                                                    <a href="#"
                                                                        class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    <GFullyPaid :message="'No available book'" v-else-if="!loadingCurrentBook" />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </main>
        <GNotification :show-notif="showNotif" :message="message" />
        <CancelBookingModal :openModal="showCancelModal" :selected-book="selectedBook" @closeModal="handleCloseModal" @cancelBook="handleCancelBooking"/>
    </main>
</template>
<script setup>


import GLoadingDiv from '@/components/GLoadingDiv.vue';
import GloadingList from '@/components/GloadingList.vue';
import { loadUser } from '@/global-composables/get-user-profile';
import { loadBookings } from '@/modules/admin/components/composables/booking-composables';
import {
    ScaleIcon,
    BanknotesIcon,
    BuildingOfficeIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    ChevronRightIcon,
    ClockIcon,
    MapPinIcon,
    XMarkIcon,
    RocketLaunchIcon
} from '@heroicons/vue/24/outline'
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import GPagination from "@/components/GPagination.vue";
import { storageUrl } from '@/global-composables/http_service';
import { getCurrentBook } from '../composables/booking-composables';
import GFullyPaid from '@/components/GFullyPaid.vue';
import CancelBookingModal from '@/modules/admin/components/modals/CancelBookingModal.vue';
import GNotification from '@/components/GNotification.vue';

const url = storageUrl();
const loading = ref(true)
const bookings = ref([])
const total = ref(0)
const params = ref({
    page_size: 10,
    page: 1,
    search: null,
})
const showNotif = ref(false)
const message = ref(null)
const loadingCurrentBook = ref(true)
const currentBook = ref(null)
const showCancelModal = ref(false)
const selectedBook = ref(null)

const handleChangeSize = (size) => {
    params.value.page_size = size
}

const handleCloseModal = () => {
    showCancelModal.value = false
}

const handleCancelBooking = (selected) => {
    console.log('ad')
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

    showCancelModal.value = false
    setTimeout(() => {
        showNotif.value = false
    }, 2000)
    getCurrentBookData()

}

const handleChangePage = (page) => {
    params.value.page = page
}

const fetch = async () => {
    const { load, data, totalBookings } = loadBookings(params.value);
    await load();
    bookings.value = data.value
    total.value = totalBookings.value
    loading.value = false
}

const handleStatus = (book) => {
    let icon = ClockIcon
    let color = 'text-yellow-400'
    let status = 'pending'
    if (book.booking_status == 'accept') {
        icon = CheckCircleIcon
        color = 'text-green-400'
        status = 'accept'
    }
    if (book.booking_status == 'cancel') {
        icon = XCircleIcon
        color = 'text-orange-400'
        status = 'cancel'
    }
    if (book.booking_status == 'decline') {
        icon = XMarkIcon
        color = 'text-red-400'
        status = 'decline'
    }

    if(book.deployed) {
        color = 'text-cyan-400'
        icon = RocketLaunchIcon
        status = 'deployed'
    }

    return {
        status: status.toUpperCase(),
        icon,
        color
    }
}

const handleClickCancel = (book) => {
    showCancelModal.value = true
    selectedBook.value = book
}

const handleBookingCancelButton = (book) => {
    if (book.booking_status == 'cancel' || book.booking_status == 'decline') {
        return false
    }
    if(book.deployed || book.returned) {
        return false
    }
    return true
}

const getCurrentBookData = async () => {
    const { load, data } = getCurrentBook();
    await load()
    currentBook.value = data.value
    loadingCurrentBook.value = false
}

const handleGetImage = (images) => {

    if (!loading.value && images.length > 0) {
        return images[0].image_url
    }

    return null;
}

onMounted(async () => {
    await fetch();
    getCurrentBookData();
})

watch(params.value, async () => {
    await fetch();
})
</script>