
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
                                                                            {{ book.destination }}
                                                                        </span>
                                                                    </p>
                                                                    <p
                                                                        class="mt-2 flex items-center text-sm text-gray-500">
                                                                        <ClockIcon
                                                                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                            aria-hidden="true" />
                                                                        <span class="truncate">
                                                                            Start: {{ book.booking_start }}
                                                                        </span>
                                                                    </p>
                                                                    <p
                                                                        class="mt-2 flex items-center text-sm text-gray-500">
                                                                        <ClockIcon
                                                                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                            aria-hidden="true" />
                                                                        <span class="truncate">
                                                                            End: {{
                                                                                    book.booking_end
                                                                            }}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div class="hidden md:block">
                                                                    <div>
                                                                        <p
                                                                            class="mt-2 flex items-center text-sm text-gray-500">
                                                                            <TruckIcon
                                                                                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                                aria-hidden="true" />
                                                                            <span class="truncate">
                                                                                Model: {{book.vehicle.model}} | {{book.vehicle.vehicle_brand.name}} | {{book.vehicle.make}}
                                                                            </span>
                                                                        </p>
                                                                        <p
                                                                            class="mt-2 flex items-center text-sm text-gray-500">
                                                                            <CalendarIcon
                                                                                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                                                aria-hidden="true" />
                                                                            <span class="truncate">
                                                                                Applied on: {{book.created_at}}
                                                                            </span>
                                                                        </p>
                                                                        <p
                                                                            :class="['mt-2 flex items-center text-sm', handleStatus(book).color]">
                                                                            <component :is="handleStatus(book).icon"
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
                                                        <div class="flex flex-wrap">
                                                            <button type="button" v-if="handleBookingEdit(book)"
                                                                @click="handeClickEdit(book)"
                                                                class="inline-flex h-6 items-center mr-1 mr-2 my-1 rounded border border-transparent bg-green-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                                                <PencilSquareIcon class="h-5 w-5 text-white"
                                                                    aria-hidden="true" />
                                                                Edit
                                                            </button>
                                                            <button type="button" v-if="handleBookingCancel(book)"
                                                                @click="handleClickCancel(book)"
                                                                class="inline-flex h-6 items-center mr-1 mr-2 my-1 rounded border border-transparent bg-red-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                                <XCircleIcon class="h-5 w-5 text-white"
                                                                    aria-hidden="true" />
                                                                Cancel
                                                            </button>
                                                            <button type="button" v-if="handleBookingCancelButton(book)" @click="handlePrintInvoice(book)"
                                                                class="inline-flex h-6 mr-1 items-center mr-2 my-1 rounded border border-transparent bg-cyan-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2">
                                                                <DocumentCheckIcon class="h-5 w-5 text-white"
                                                                    aria-hidden="true" />
                                                                Print Invoice
                                                            </button>
                                                            <button type="button" v-if="handleBookingCancelButton(book)" @click="hnadlePrintForm(book)"
                                                                class="inline-flex h-6 items-center mr-2 my-1 rounded border border-transparent bg-emerald-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                                                <DocumentTextIcon class="h-5 w-5 text-white"
                                                                    aria-hidden="true" />
                                                                Form
                                                            </button>
                                                            <button type="button" v-if="handleBookingCancelButton(book)" @click="handleClickAgreement(book, index)"
                                                            
                                                            class="inline-flex h-6 items-center mr-2 my-1 rounded border border-transparent bg-stone-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2">
                                                            <DocumentTextIcon class="h-5 w-5 text-white" aria-hidden="true" />
                                                            Agreement Form
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
                                    <div class="overflow-hidden bg-white shadow sm:rounded-lg"
                                        v-if="(!loadingCurrentBook && currentBook && currentBook.id)">
                                        <div class="px-4 py-5 sm:px-6">
                                            <h3 class="text-lg font-medium leading-6 text-gray-900">Booking Information
                                            </h3>
                                        </div>
                                        <div class="border-t border-gray-200">
                                            <dl>
                                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                                                    <dd
                                                        :class="[handleStatus(currentBook).color, 'mt-1 text-sm sm:col-span-2 sm:mt-0']">
                                                        {{ handleStatus(currentBook).status
                                                        }}</dd>
                                                </div>
                                                <div
                                                    class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt class="text-sm font-medium text-gray-500">Destination</dt>
                                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{
                                                            currentBook.destination
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
        <CancelBookingModal :openModal="showCancelModal" :selected-book="selectedBook" @closeModal="handleCloseModal"
            @cancelBook="handleCancelBooking" />

        <BookingModal v-if="(openModalBook && selecteVehicle)" :open-modal="openModalBook" :handleClickCloseModal="handleClickCloseModal"
        :vehicle="selecteVehicle" :booking-info="bookingInfo" :mode="true" @updateBook="handleUpdateBook"/>
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
    DocumentCheckIcon,
    DocumentTextIcon,
    ChevronRightIcon,
    ClockIcon,
    TruckIcon,
    CalendarIcon,
    MapPinIcon,
    XMarkIcon,
    RocketLaunchIcon,
    PencilSquareIcon
} from '@heroicons/vue/24/outline'
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import GPagination from "@/components/GPagination.vue";
import { storageUrl } from '@/global-composables/http_service';
import { downloadInvoice, getCurrentBook } from '../composables/booking-composables';
import GFullyPaid from '@/components/GFullyPaid.vue';
import CancelBookingModal from '@/modules/admin/components/modals/CancelBookingModal.vue';
import GNotification from '@/components/GNotification.vue';
import { showFormSelect } from '@/modules/admin/components/composables/form-composables';
import { downloadAgreement, downloadTransactionForm } from '@/modules/admin/composables/admin-download-composables';
import BookingModal from '../modal/BookingModal.vue';

const url = storageUrl();
const loading = ref(true)
const bookings = ref([])
const total = ref(0)
const params = ref({
    page_size: 10,
    page: 1,
    search: null,
})
const openModalBook = ref(false)
const showNotif = ref(false)
const message = ref(null)
const loadingCurrentBook = ref(true)
const currentBook = ref(null)
const showCancelModal = ref(false)
const selectedBook = ref(null)
const forms = ref([])
const selecteVehicle = ref(null)
const bookingInfo = ref(null)

const handleChangeSize = (size) => {
    params.value.page_size = size
}

const handleCloseModal = () => {
    showCancelModal.value = false
}

const handleClickCloseModal = () => {
    openModalBook.value = false
}

const handleUpdateBook = (book) => {
    bookings.value.map(b => {
        if(b.id == book.id){
            for(let key in book) {
                b[key] = book[key]
            }
        }

        return b;
    })
    
    openModalBook.value = false
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

const fetchDownloadableForms = async () => {
    const { data, loadSelectCompanies } = showFormSelect();
    await loadSelectCompanies();
    forms.value = data.value
}

const fetch = async () => {
    loading.value = true
    const { load, data, totalBookings } = loadBookings(params.value);
    await load();
    bookings.value = data.value
    total.value = totalBookings.value
    loading.value = false
}

const handlePrintInvoice = async (book) => {
    await downloadInvoice(book.id).then(res => {
        console.log(res, 'asda');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${book.user.first_name} - ${book.user.last_name}.pdf`);
        document.body.appendChild(link);
        link.click();
    })
}

const hnadlePrintForm = async (book) => {
    await downloadTransactionForm(book.id).then(res => {
        console.log(res, 'asda');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${book.user.first_name} - ${book.user.last_name}. - transacton-form.pdf`);
        document.body.appendChild(link);
        link.click();
    })
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

    if (book.deployed) {
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
    if (book.booking_status == 'cancel' || book.booking_status == 'decline' || book.booking_status == 'pending') {
        return false
    }
    
    return true
}

const handleBookingCancel = (book) => {
    if (book.booking_status == 'cancel' || book.booking_status == 'decline' ) {
        return false
    }

    if(book.deployed || book.returned) {
        return false
    }
    
    return true
}

const handleBookingEdit = (book) => {
    if (!book.booking_status == 'pending' ) {
        return false
    }

    if(book.deployed || book.returned) {
        return false
    }
    
    return true
}

const handeClickEdit = (book)  => {
    console.log(book.vehicle)
    openModalBook.value = true
    selecteVehicle.value = book.vehicle
    bookingInfo.value = book
}

const getCurrentBookData = async () => {
    const { load, data } = getCurrentBook();
    await load()
    currentBook.value = data.value
    loadingCurrentBook.value = false
}

const handleClickAgreement = async (book, index) => {
  await downloadAgreement(book.id).then(res => {
        console.log(res, 'asda');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${book.user.first_name} - ${book.user.last_name} - agreement.pdf`);
        document.body.appendChild(link);
        link.click();
      })
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
    fetchDownloadableForms();
    
})

watch(params.value, async () => {
    await fetch();
})
</script>