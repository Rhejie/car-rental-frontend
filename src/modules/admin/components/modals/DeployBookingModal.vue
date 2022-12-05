<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCloseModal()">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden w-2/4 rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                            <div>
                                <div
                                    class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                                    <div class="space-y-6 lg:col-span-2 lg:col-start-1">
                                        <!-- Description list-->
                                        <section aria-labelledby="applicant-information-title">

                                            <div class="bg-white shadow sm:rounded-lg border-t border-cyan-300">
                                                <div class="px-4 py-5 sm:px-6">
                                                    <h2 id="applicant-information-title"
                                                        class="text-lg font-medium leading-6 text-gray-900">Application
                                                        Information</h2>
                                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Booking details and
                                                        application.</p>
                                                </div>
                                                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                                                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">
                                                                Model
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ selected.vehicle.model }} |
                                                                {{ selected.vehicle.vehicle_brand.name }}
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">
                                                                User
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ handleUserName(selected.user) }}
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">Booking Start
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ selected.booking_start }}
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">Booking End
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ selected.booking_end }}
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">Price per day
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ selected.vehicle_place.price }} Php
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">Total day(s)
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ countDays }}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                                <div>
                                                    <span
                                                        class="block bg-gray-50 px-4 py-4 font-bold text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg">
                                                        Total Price {{ totalPriceData }} Php
                                                    </span>
                                                </div>
                                            </div>
                                        </section>

                                        <section aria-labelledby="applicant-information-title" v-if="payment.add_driver">
                                            
                                            <div class="bg-white shadow sm:rounded-lg border-t border-cyan-300">
                                                <div class="px-4 py-5 sm:px-6">
                                                    <h2 id="applicant-information-title"
                                                        class="text-lg font-medium leading-6 text-gray-900">Drivers</h2>
                                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Available drivers for {{countDays}} days.</p>
                                                </div>
                                                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                                                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3" v-loading="loadingDriver">
                                                        <div class="sm:col-span-1 bg-white p-2 rounded-lg text-gray-600 border border-gray-300 shadow" v-for="driver in drivers" :key="driver.id">
                                                            <dt class="text-sm font-medium ">
                                                                {{driver.name}}
                                                            </dt>
                                                            <dd class="mt-1 text-sm ">
                                                                Available |
                                                                {{ driver.availability }} days
                                                            </dd>
                                                            <dd class="mt-1 text-sm ">
                                                                Price per day |
                                                                {{ driver.price }}
                                                            </dd>
                                                            <dd class="mt-1 text-sm " v-if="!payment.driver">
                                                                <button type="button"
                                                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                                    @click="handleClickAddDriver(driver)" ref="cancelButtonRef">Add</button>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
                                        <div
                                            class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6  border-t border-cyan-300">
                                            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Payment
                                                Details
                                            </h2>

                                            <!-- Activity Feed -->
                                            <div class="mt-6 flow-root">
                                                <form class="space-y-6">
                                                    <div>
                                                        <SelectPayment v-model="payment.type" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="(errorValue && !loading && errorValue.type)">
                                                            {{ errorValue.type[0] }}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <SelectPaymentMethod v-model="payment.payment_method"
                                                            :onHandleChangePaymentMethod="onHandleChangePaymentMethod" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="(errorValue && !loading && errorValue.payment_method)">
                                                            {{ errorValue.payment_method[0] }}
                                                        </span>
                                                    </div>
                                                    <div class="space-y-1"
                                                        v-if="(payment.payment_method && payment.payment_method.name.toLowerCase() != 'cash')">
                                                        <label for="password"
                                                            class="block text-sm font-medium text-gray-700">Reference
                                                            No.</label>
                                                        <div class="mt-1">
                                                            <input id="password" v-model="payment.reference_number"
                                                                name="password" type="text"
                                                                placeholder="Enter your reference number"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                                                            <span class="text-sm text-red-400"
                                                                v-if="errorValue && !loading && errorValue.reference_number">
                                                                {{ errorValue.reference_number[0] }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-1">
                                                        <label for="password"
                                                            class="block text-sm font-medium text-gray-700">Payment</label>
                                                        <div class="mt-1">
                                                            <input id="password" v-model="payment.price" name="password"
                                                                type="number" placeholder="Enter your reference number"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm" />
                                                            <span class="text-sm text-red-400"
                                                                v-if="errorValue && !loading && errorValue.price">
                                                                {{ errorValue.price[0] }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-1">
                                                        <label for="password"
                                                            class="block text-sm font-medium text-gray-700">Driver</label>
                                                        <div class="mt-1">
                                                            <input id="password" v-model="payment.add_driver" name="password"
                                                                type="checkbox" placeholder="Enter your reference number"
                                                                 /> <span class="text-sm text-gray-600">Add Driver (optional)</span> <br/>
                                                            <span class="text-sm text-red-400"
                                                                v-if="(errorValue && !loading && errorValue.driver)">
                                                                {{ errorValue.driver[0] }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    @click="handleDeployClick()">
                                    Deploy
                                </button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    @click="handleCloseModal()" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref, defineEmits, defineProps, computed, onMounted, onUpdated, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { RocketLaunchIcon } from '@heroicons/vue/24/outline'
import SelectPayment from '../settings/payment-utilities/SelectPayment.vue';
import SelectPaymentMethod from '../settings/payment-utilities/SelectPaymentMethod.vue'
import { deployBooking } from '../composables/booking-composables';
import { getAvailableDrivers } from '../composables/driver-composables';
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    },
    selectedBooking: {
        type: Object,
    }
})

const emit = defineEmits(['closeModal', 'deployedBooking'])

const open = computed(() => props.openModal)
const selected = computed(() => props.selectedBooking)

const countDays = computed({
    get() {
        if (selected.value.booking_start && selected.value.booking_end) {
            const newDate = (new Date(selected.value.booking_end).getTime()) - (new Date(selected.value.booking_start).getTime())
            const totalData = newDate / (1000 * 60 * 60 * 24)
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
        if (selected.value.vehicle_place.price && countDays.value) {

            return (selected.value.vehicle_place.price * countDays.value).toFixed(2)
        }

        return 0
    },
    set(newValue) {
        newValue;
    }
})
const payment = ref({
    type: null,
    payment_method: null,
    reference_number: null,
    booking: selected.value,
    total_price: 0,
    driver: null,
    add_driver: false
})
const loading = ref(false)
const drivers = ref([])
const loadingDriver = ref(false)
const errorValue = ref(null)

const totalPriceData = ref(totalPrice.value)
const handleCloseModal = () => {
    emit('closeModal')
}

const handleDeployClick = async () => {
    loading.value = true;
    payment.value.total_price = totalPriceData.value
    const { data, errorData, post } = deployBooking(selected.value, payment.value);
    await post();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        emit('deployedBooking', data.value)
    }
}

const handleUserName = (user) => {

    return user.last_name + ', ' + user.first_name
}

const handleClickAddDriver = (driver) => {
    payment.value.driver = driver
    if(countDays.value > 0) {
        totalPriceData.value = parseFloat(totalPrice.value) + (countDays.value * driver.price)
    }
}

const onHandleChangePaymentMethod = () => {

}

const handleGetAllAvailableDirver = async () => {
    loadingDriver.value = true
    const {data, load} = getAvailableDrivers(countDays.value);
    await load();
    drivers.value = data.value
    loadingDriver.value = false
}

watch(payment.value, (val) => {
    if(val.add_driver) {
        handleGetAllAvailableDirver()
    }
    else {
        val.driver = null
    }
})

onUpdated(async () => {
    if(countDays.value && selected.value) {
        await handleGetAllAvailableDirver();
    }
})
</script>