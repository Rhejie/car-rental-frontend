<script setup>
import { computed, onUpdated, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { storeBook } from '../composables/booking-composables'
import { BookmarkIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router';

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    },
    handleClickCloseModal: {
        type: Function,
    },
    vehicle: {
        type: Object,
        default: null
    }
})

const router = useRouter()
const open = computed(() => props.openModal)

const vehicle = computed(() => props.vehicle)

const book = ref({
    booking_start: null,
    booking_end: null,
    vehicle_place_id: null,
    vehicle_id: vehicle.value.id
})

const price = computed({
    get() {
        if(book.value.vehicle_place_id != null && book.value.vehicle_place_id != '') {
            const place = vehicle.value.vehicle_place.find(place => book.value.vehicle_place_id == place.id)
            return place
        }

        return 0
    },
    set(newValue) {
        newValue
    }
})

const errorValue = ref(null)

const countDays = computed({
    get() {
        if(price.value && book.value.booking_start && book.value.booking_end) {
            const newDate = (new Date(book.value.booking_end).getTime()) - (new Date(book.value.booking_start).getTime())
            const totalData =  newDate / (1000 * 60 * 60 * 24)
            return totalData.toFixed(0)
        }

        return 0
    },
    set(newValue) {
     newValue;
    }
})


const totalPrice = computed({
    get() {
        if(price.value && countDays.value) {
            
            return price.value.price * countDays.value
        }

        return 0
    },
    set(newValue) {
     newValue;
    }
})

const loading = ref(false)
const handleCLose = () => {
    props.handleClickCloseModal()
}

const initialize = () => {
     book.value = {
        booking_start: null,
        booking_end: null,
        vehicle_place_id: null,
        vehicle_id: props.vehicle.id
    }

}

const storeData = async () => {
    loading.value = true
    const {post, data, errorData} = storeBook(book.value);
    await post();
    errorValue.value = errorData.value
    loading.value = false

    if(!loading.value && !errorValue.value, !errorData.value) {
        // emit('saveColor', data.value)
        router.push({name: 'User Bookings'})
    }
}

onUpdated(() => {
    initialize()
})

// watch(book.value, (val) => {
//     if(val.vehicle_place_id) {
//         let place = vehicle.value.vehicle_place.find(place => val.vehicle_place_id == place.id)
//         price.value = place
//     }
// })


</script>
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCLose">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end mx-auto justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform w-8/12  overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                            <div class="">
                                <!-- <div
                                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <BookmarkIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div> -->
                                <div class="mt-3 sm:mt-5">
                                    <DialogTitle as="h3"
                                        class="text-lg mx-auto px-2 font-medium leading-6 text-gray-900">
                                        Book a vehicle
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <main class="" v-if="vehicle && vehicle.id">
                                            <div
                                                class="mx-auto mt-2 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3">
                                                <div class="space-y-6 lg:col-span-1 lg:col-start-1">
                                                    <!-- Description list-->
                                                    <section aria-labelledby="applicant-information-title">
                                                        <div
                                                            class="bg-white shadow sm:rounded-lg  border-t border-cyan-600">
                                                            <div class="px-4 py-5 sm:px-6">
                                                                <h3 class="text-lg font-medium leading-6 text-gray-900">
                                                                    Model Information</h3>
                                                                <p class="mt-1 max-w-2xl text-sm text-gray-500">Vehicle
                                                                    details and application.</p>
                                                            </div>
                                                            <div class="border-t border-gray-200">
                                                                <dl>
                                                                    <div
                                                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Model</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.model
                                                                            }}</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Tracker</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.tracker.name
                                                                            }}</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Brand</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.vehicle_brand.name
                                                                            }}</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Seating Capacity</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.capacity
                                                                            }}</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Fuel Capacity</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.fuel_capacity
                                                                            }}
                                                                            letters</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Fuel Type</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.fuel_type.name
                                                                            }}
                                                                        </dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Fuel Consumption</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.fuel_consumption
                                                                            }} letter(s) per km</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Color</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.color.name
                                                                            }}
                                                                        </dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Odometer</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.odometer
                                                                            }}</dd>
                                                                    </div>
                                                                    <div
                                                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                        <dt class="text-sm font-medium text-gray-500">
                                                                            Plate Number</dt>
                                                                        <dd
                                                                            class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                                            {{
                                                                                    vehicle.plate_number
                                                                            }}
                                                                        </dd>
                                                                    </div>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>

                                                <section aria-labelledby="timeline-title"
                                                    class="lg:col-span-2 lg:col-start-2">
                                                    <div
                                                        class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 border-t border-cyan-600">
                                                        <h2 id="timeline-title"
                                                            class="text-lg font-medium text-gray-900">Book information
                                                        </h2>

                                                        <div class="mt-6 flow-root">
                                                            <form class="space-y-6">
                                                                <div
                                                                    class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                                    <div>
                                                                        <label for="email"
                                                                            class="block text-sm font-medium text-gray-700">
                                                                            Booking Start
                                                                        </label>
                                                                        <div class="mt-1">
                                                                            <input id="email" type="datetime-local"
                                                                                placeholder="Book Start"
                                                                                v-model="book.booking_start"
                                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                                                            <span class="text-sm text-red-400"
                                                                                v-if="errorValue && !loading && errorValue.booking_start">
                                                                                {{ errorValue.booking_start[0] }}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <label for="email"
                                                                            class="block text-sm font-medium text-gray-700">Booking End
                                                                            </label>
                                                                        <div class="mt-1">
                                                                            <input id="email" type="datetime-local"
                                                                                v-model="book.booking_end"
                                                                                placeholder="First Name"
                                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                                                            <span class="text-sm text-red-400"
                                                                                v-if="errorValue && !loading && errorValue.booking_end">
                                                                                {{ errorValue.booking_end[0] }}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div class="space-y-1">
                                                                    <label for="password"
                                                                        class="block text-sm font-medium text-gray-700">Destination</label>
                                                                    <div class="mt-1">
                                                                        <select id="location" v-model="book.vehicle_place_id" name="location" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                                            <option v-for="place in vehicle.vehicle_place" :key="place.id" :value="place.id">{{place.place.name}}</option>
                                                                        </select>
                                                                        <span class="text-sm text-red-400"
                                                                                v-if="errorValue && !loading && errorValue.vehicle_place_id">
                                                                                {{ errorValue.vehicle_place_id[0] ? 'Destination is required' : '' }}
                                                                            </span>
                                                                    </div>
                                                                </div>
                                                                <div class="space-y-1 flex flex-col">
                                                                    <span class="text-gray-600 text-sm" v-if="price != null && price != ''">Price per day: {{price.price}}</span>
                                                                    <span class="text-gray-600 text-sm" v-if="countDays != null && countDays != ''">Total Days: {{countDays}}</span>
                                                                    <span class="text-gray-600 text-sm" v-if="totalPrice != null && totalPrice != ''">Total Price: {{totalPrice}}</span>
                                                                </div>
                                                            </form>
                                                            <div
                                                                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                                <button type="button"
                                                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                                                    @click="storeData">Book Now</button>
                                                                <button type="button"
                                                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                                    @click="handleCLose"
                                                                    ref="cancelButtonRef">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </main>
                                    </div>
                                </div>
                            </div>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>