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
                            class="relative transform overflow-hidden w-2/3 rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:p-6">
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
                                                                <div class="mt-1 flex rounded-md shadow-sm">
                                                                    <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">Php</span>
                                                                    <input type="text" v-model="selected.vehicle.price" @change="handleChangeNamePrice" min="0" name="company-website" id="company-website" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2  sm:text-sm" placeholder="www.example.com" />
                                                                </div>
                                                                <span class="text-sm text-red-400"
                                                                    v-if="errorValue && !loading && errorValue.price">
                                                                    {{ errorValue.price[0] }}
                                                                </span>
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

                                        <section aria-labelledby="applicant-information-title"
                                            v-if="payment.add_driver">

                                            <div class="bg-white shadow sm:rounded-lg border-t border-cyan-300">
                                                <div class="px-4 py-5 sm:px-6">
                                                    <h2 id="applicant-information-title"
                                                        class="text-lg font-medium leading-6 text-gray-900">Drivers</h2>
                                                </div>
                                                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                                                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3"
                                                        v-loading="loadingDriver">
                                                        <div class="sm:col-span-1 bg-white p-2 rounded-lg text-gray-600 border border-gray-300 shadow"
                                                            v-for="driver in drivers" :key="driver.id"
                                                            :class="[payment.driver && payment.driver.id == driver.id ? 'border-cyan-600 border-2' : '']">
                                                            <dt class="text-sm font-bold ">
                                                                {{ driver.name }}
                                                            </dt>
                                                            <dd class="mt-1 text-sm ">
                                                                License Expiration Date:
                                                                {{ driver.license_expiration_date }}
                                                            </dd>
                                                            <dd class="mt-1 text-sm ">
                                                                Contact Number:
                                                                {{ driver.contact_number }}
                                                            </dd>
                                                            <dd class="mt-1 text-sm " v-if="!payment.driver">
                                                                <button type="button"
                                                                    class="mt-3 inline-flex w-full justify-center text-white rounded-md border border-gray-300 bg-cyan-600  text-base font-medium hover:text-gray-700  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                                    @click="handleClickAddDriver(driver)"
                                                                    ref="cancelButtonRef">Add</button>
                                                            </dd>
                                                            <dd class="mt-1 text-sm "
                                                                v-if="(payment.driver && payment.driver.id == driver.id)">
                                                                <button type="button"
                                                                    class="mt-3 inline-flex w-full justify-center text-white rounded-md border border-gray-300 bg-red-600  text-base font-medium hover:text-gray-700  shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                                                    @click="handleRemoveDriver(driver)"
                                                                    ref="cancelButtonRef">Remove</button>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </section>
                                        <section aria-labelledby="applicant-information-title"
                                            v-if="!payment.add_driver">
                                            <h2 id="applicant-information-title"
                                                        class="text-lg font-medium leading-6 text-gray-900">Renter Drivers
                                                        Information</h2>
                                            <div
                                                class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                <div>
                                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                                        Primary Operator Name 
                                                    </label>
                                                    <div class="mt-1">
                                                        <input id="email" type="text"
                                                            placeholder="Primary Operator name"
                                                            v-model="payment.primary_operator_name"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="errorValue && !loading && errorValue.primary_operator_name">
                                                            {{ errorValue.primary_operator_name[0] }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label for="email"
                                                        class="block text-sm font-medium text-gray-700">Primary Operator
                                                        License Number 
                                                    </label>
                                                    <div class="mt-1">
                                                        <input id="email" type="text"
                                                            v-model="payment.primary_operator_license_no"
                                                            placeholder="Primary Operator License Number"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="errorValue && !loading && errorValue.primary_operator_license_no">
                                                            {{ errorValue.primary_operator_license_no[0] }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                <div>
                                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                                        Secondary Operator Name (Optional)
                                                    </label>
                                                    <div class="mt-1">
                                                        <input id="email" type="text"
                                                            placeholder="Secondary Operator name"
                                                            v-model="payment.secondary_operator_name"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="errorValue && !loading && errorValue.secondary_operator_name">
                                                            {{ errorValue.secondary_operator_name[0] }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label for="email"
                                                        class="block text-sm font-medium text-gray-700">Secondary
                                                        Operator License Number (Optional)
                                                    </label>
                                                    <div class="mt-1">
                                                        <input id="email" type="text"
                                                            v-model="payment.secondary_operator_license_no"
                                                            placeholder="Secondary Operator License Number"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-untitled-gray-500 focus:outline-none focus:ring-untitled-gray-500 sm:text-sm" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="errorValue && !loading && errorValue.secondary_operator_license_no">
                                                            {{ errorValue.secondary_operator_license_no[0] }}
                                                        </span>
                                                    </div>
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
                                                        <SelectPaymentMethod v-model="payment.payment_method_id"
                                                            @emitPaymentMethods="handleGetPaymentMethods"
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
                                                            <input id="password" v-model="payment.add_driver"
                                                                name="password" type="checkbox"
                                                                placeholder="Enter your reference number" /> <span
                                                                class="text-sm text-gray-600">Add Driver
                                                                (optional)</span> <br />
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
import { useRouter } from 'vue-router';
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    },
    selectedBooking: {
        type: Object,
    }
})

const emit = defineEmits(['closeModal', 'deployedBooking', 'changePrice'])

const router = useRouter();

const open = computed(() => props.openModal)
const selected = computed({
    get() {
        return props.selectedBooking
    },
    set(newValue) {
        newValue
    }
})

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
        if (selected.value.vehicle.price && countDays.value) {

            return (selected.value.vehicle.price * countDays.value).toFixed(2)
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
    payment_method_id: null,
    reference_number: null,
    booking: selected.value,
    total_price: 0,
    driver: null,
    add_driver: selected.value.add_driver ? true : false,
    primary_operator_name: selected.value.primary_operator_name,
    primary_operator_license_no: selected.value.primary_operator_license_no,
    secondary_operator_name: selected.value.secondary_operator_name,
    secondary_operator_license_no: selected.value.secondary_operator_license_no,
    has_secondary: false,
    price: 0
})

const loading = ref(false)
const drivers = ref([])
const loadingDriver = ref(false)
const errorValue = ref(null)

const totalPriceData = computed(() => totalPrice.value)
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
        router.push({ name: 'Trackers'})
        emit('deployedBooking', data.value)
    }
}

const handleUserName = (user) => {

    return user.last_name + ', ' + user.first_name
}

const handleClickAddDriver = (driver) => {
    payment.value.driver = driver
    if (countDays.value > 0) {
        totalPriceData.value = parseFloat(totalPrice.value) + (countDays.value * driver.price)
    }
}

const handleRemoveDriver = () => {
    payment.value.driver = null
}

const onHandleChangePaymentMethod = () => {

}

const handleChangeNamePrice = (event) => {
    emit('changePrice', event.target.value)
}

const handleGetPaymentMethods = (method) => {
    payment.value.payment_method = method
}

const handleGetAllAvailableDirver = async () => {
    loadingDriver.value = true
    const { data, load } = getAvailableDrivers();
    await load();
    drivers.value = data.value
    loadingDriver.value = false
}


watch(payment.value, (val) => {
    if (val.add_driver) {
        // handleGetAllAvailableDirver()
    }
    else {
        val.driver = null
    }

    if(val.secondary_operator_name) {
        val.has_secondary = true
    }
    else {
        val.has_secondary = false
        val.secondary_operator_license_no = null
    }
    
    if(val.type === 'full') {
        val.price = totalPriceData.value
    }
    if(val.type == 'downpayment') {
        val.price = parseFloat(totalPriceData.value) / 2
    }
    
})

// watch(selected.value, (val) => {
//     if(val && val.add_driver == 1) {
//         payment.value.add_driver = true
//     }
// })

onMounted(async () => {
    await handleGetAllAvailableDirver();
})

onUpdated(async () => {
    if (selected.value.add_driver) {
        payment.value.add_driver = true
    }

    if (payment.value.add_driver) {
        await handleGetAllAvailableDirver();
    }

})
</script>