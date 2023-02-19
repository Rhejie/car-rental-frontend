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
                                    class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-4">
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
                                                                {{ selected.price ? selected.price : selected.vehicle.price }} Php
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

                                        <section aria-labelledby="applicant-information-title" v-if="selected.driver">
                                            <div class="bg-white shadow sm:rounded-lg border-t border-cyan-300">
                                                <div class="px-4 py-5 sm:px-6">
                                                    <h2 id="applicant-information-title"
                                                        class="text-lg font-medium leading-6 text-gray-900">Driver
                                                        Information</h2>
                                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Driver details</p>
                                                </div>
                                                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                                                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">
                                                                Name
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ selected.driver.name }} 
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">License Expiration Date
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                {{ selected.driver.license_expiration_date }} days
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </section>

                                        <section aria-labelledby="applicant-information-title">
                                            <div class="bg-white shadow sm:rounded-lg border-t border-cyan-300">
                                                <div class="px-4 py-5 sm:px-6">
                                                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Payment History</p>
                                                </div>
                                                <div class="border-t border-gray-200 py-1 px-2">
                                                    <table
                                                        class="min-w-full divide-y border border-gray-300 divide-gray-300">
                                                        <thead class="bg-gray-50">
                                                            <tr class="divide-x divide-gray-200">
                                                                <th scope="col"
                                                                    class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                                    Payment Mode</th>
                                                                <th scope="col"
                                                                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Payment Type</th>
                                                                <th scope="col"
                                                                    class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                    Price</th>
                                                                <th scope="col"
                                                                    class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                                    Reference Number</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="divide-y divide-gray-200 bg-white">
                                                            <tr v-for="person in histories" :key="person.email"
                                                                class="divide-x divide-gray-200">
                                                                <td
                                                                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {{ person.payment_mode.name }}</td>
                                                                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                                                                    {{ person.type }}</td>
                                                                <td class="whitespace-nowrap p-4 text-sm text-gray-500">
                                                                    {{ person.price }}</td>
                                                                <td
                                                                    class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                                                                    {{ person.reference_number }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <section aria-labelledby="timeline-title" class="lg:col-span-2 lg:col-start-3">
                                        <div
                                            class="bg-white px-4 py-5 mb-2 shadow sm:rounded-lg sm:px-6  border-t border-cyan-300">
                                            <h2 id="timeline-title"
                                                class="text-lg font-medium text-gray-900 border-b border-gray-300">
                                                Overcharges
                                            </h2>

                                            <!-- Activity Feed -->
                                            <div class=" flow-root">
                                                <div class="py-3">
                                                    <input type="checkbox" @click="handeClickPenalty"
                                                        v-model="payment.has_penalty"> <span
                                                        class="text-sm text-gray-500">User has penalty?</span>
                                                </div>
                                                <div class="flex" v-for="(t, index) in payment.overcharges"
                                                    :key="index">
                                                    <div class="w-full mx-auto mr-1">
                                                        <SelectOvercharge v-model="t.overcharge_type_id" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="errorValue && !loading && errorValue[`overcharges.${index}.overcharge_type_id`]">
                                                            The overcharge type field is required
                                                        </span>
                                                    </div>

                                                    <div class="mx-auto w-full">
                                                        <label for="location"
                                                            class="block text-sm font-medium text-gray-700">Charge</label>
                                                        <input id="password" v-model="t.charge" name="password"
                                                            type="number" min="0" placeholder="Enter your reference number"
                                                            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                                        <span class="text-sm text-red-400"
                                                            v-if="errorValue && !loading && errorValue[`overcharges.${index}.charge`]">
                                                            The charge field is required
                                                        </span>
                                                    </div>
                                                    <div class="my-auto">
                                                        <button v-if="payment.has_penalty" type="button"
                                                            @click="handleRemoveOvercharge(index)"
                                                            class="inline-flex ml-2 items-center my-auto justify-center text-white float-right bg-red-500 rounded-md border border-gray-200 px-4 h-6 text-sm font-medium shadow-xl ">
                                                            <XCircleIcon class="mx-auto h-4 w-4" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button v-if="payment.has_penalty" type="button"
                                                        @click="handleAddOvercharge()"
                                                        class="inline-flex items-center mt-1 bg-cyan-600 text-white justify-center float-right mb-2 rounded-md border border-gray-200 px-4 h-6 text-sm font-medium shadow-xl ">
                                                        Add Overcharge
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <section aria-labelledby="applicant-information-title">
                                            <div class="bg-white shadow sm:rounded-lg border-t mb-2 border-cyan-300">
                                                <div class="px-4 py-5 sm:px-6">
                                                    <h2 id="applicant-information-title"
                                                        class="text-lg font-medium leading-6 text-gray-900">Payment Summary</h2>
                                                </div>
                                                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                                                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">
                                                                Previous Payment
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                Php {{ payment.total_paid }} 
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">Total Overcharges
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-gray-900">
                                                                Php {{ geTotalOvercharge }}
                                                            </dd>
                                                        </div>
                                                        <div class="sm:col-span-1">
                                                            <dt class="text-sm font-medium text-gray-500">Total payment
                                                            </dt>
                                                            <dd class="mt-1 text-sm text-white bg-emerald-600 px-2">
                                                                Php {{ (totalPriceData - payment.total_paid) + geTotalOvercharge }}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </section>
                                        <div
                                            class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6  border-t border-cyan-300">
                                            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Payment
                                                Details
                                            </h2>

                                            <!-- Activity Feed -->
                                            <div class="mt-6 flow-root">
                                                <form class="space-y-6">
                                                    <div>
                                                        <SelectPayment v-model="payment.type" :read-only="true"/>
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
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
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
                                                                min="0"
                                                                type="number" placeholder="Enter your reference number"
                                                                class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                                            <span class="text-sm text-red-400"
                                                                v-if="errorValue && !loading && errorValue.price">
                                                                {{ errorValue.price[0] }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </form>
                                                <!-- <div class="w-full" v-else>
                                                    <GFullyPaid/>
                                                </div> -->
                                            </div>
                                        </div>

                                        
                                    </section>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    @click="handleClickReturned()">
                                    Returned
                                </button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    @click="handleCloseModal()" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <ReturnedConfirmation :open-modal="showConfirmationModal" @closeModal="handleCloseModalConfirmation" @acceptBook="handleAcceptConfirmation"/>
</template>
  
<script setup>
import { ref, defineEmits, defineProps, computed, onMounted, watch, onUpdated, onBeforeMount, } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { RocketLaunchIcon } from '@heroicons/vue/24/outline'
import SelectPayment from '../settings/payment-utilities/SelectPayment.vue';
import SelectPaymentMethod from '../settings/payment-utilities/SelectPaymentMethod.vue'
import SelectOvercharge from '../settings/overcharge-utilities/SelectOvercharge.vue'
import GFullyPaid from '@/components/GFullyPaid.vue'
import ReturnedConfirmation from './ReturnedConfirmation.vue'
import { returnedBooking } from '../composables/booking-composables';
import { getPaymentHistory } from '../composables/payment-composables';
import {
    XCircleIcon,
} from '@heroicons/vue/24/solid'

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    },
    selectedBooking: {
        type: Object,
    },
    totalPaidByUser: null
})

const emit = defineEmits(['closeModal', 'returnedBooking'])
const showConfirmationModal = ref(false)
const open = computed(() => props.openModal)
const selected = computed(() => props.selectedBooking)
const histories = ref([])
const loadingHistories = ref(true)
const totalPaidByUser = computed(() => props.totalPaidByUser)

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
        if (selected.value.price && countDays.value) {

            return (selected.value.price * countDays.value).toFixed(2)
        }

        return 0
    },
    set(newValue) {
        newValue;
    }
})

const totalPaid = ref(0)
const totalPriceData = computed({
    get() {
        if(selected.value.driver) {
            return parseFloat(totalPrice.value) 
        }
        return parseFloat(totalPrice.value)
    }
})

const totalGross = computed(() => (totalPriceData.value - payment.value.total_paid) + geTotalOvercharge.value)
const isFullyPaid = ref(false)
const payment = ref({
    is_fully_paid: false,
    type: 'full',
    payment_method: null,
    payment_method_id: null,
    reference_number: null,
    booking: selected.value,
    total_price: 0,
    has_penalty: false,
    price: 0,
    total_paid: 0,
    overcharges: [
        { overcharge_type_id: null, charge: null }
    ]
})
const loading = ref(false)

const errorValue = ref(null)
const handleCloseModal = () => {
    emit('closeModal')
}

const handleClickReturned = async () => {
    showConfirmationModal.value = true
}

const handleCloseModalConfirmation = () => {
    showConfirmationModal.value = false
}

const geTotalOvercharge = computed({
    get() {
        if(payment.value.overcharges.length > 0) {
            let total = 0
            payment.value.overcharges.forEach(over => {
                if(over.charge) {
                    total = parseFloat(total) + parseFloat(over.charge)
                }
            })

            return total
        }

        return 0
    },
    set(newValue) {
        newValue
    }
})

const handleAcceptConfirmation =  async () => {
    showConfirmationModal.value = false
    loading.value = true;
    payment.value.total_price = totalGross.value
    payment.value.is_fully_paid = isFullyPaid.value
    const { data, errorData, post } = returnedBooking(selected.value, payment.value);
    await post();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        emit('returnedBooking', data.value)
    }
}

const fetchPaymentHistory = async () => {
    if (!selected.value && !selected.value.id) {
        return
    }

    const { data, load } = getPaymentHistory(selected.value);
    await load();
    histories.value = data.value
    histories.value.forEach(his => {
        payment.value.total_paid = parseFloat(parseFloat(totalPaid.value) + (parseFloat(his.price)))
    })
    loadingHistories.value = false
}

const handeClickPenalty = () => {
    payment.value.overcharges.push({ overcharge_type_id: null, charge: null })
}

const handleAddOvercharge = () => {
    if(payment.value.has_penalty) {
        payment.value.overcharges.push({ overcharge_type_id: null, charge: null })
    }
}

const handleRemoveOvercharge = (index) => {
    payment.value.overcharges.splice(index, 1)
}

const handleUserName = (user) => {

    return user.last_name + ', ' + user.first_name
}

const onHandleChangePaymentMethod = () => {

}


const handleGetPaymentMethods = (method) => {
    payment.value.payment_method = method
}

const checkIfPaid = () => {
    const tp = new Number(totalPaidByUser.value)
    const totalp = new Number(totalPrice.value)
    if(tp >= totalp) {
        isFullyPaid.value = true
        console.log(totalPaidByUser.value, totalPrice.value)
    }
    else {
        isFullyPaid.value = false
    }
    console.log(tp, totalp)
}


watch(payment.value, (val) => {
    if (!val.has_penalty) {
        val.overcharges = []
    }
})

onMounted(async () => {
    await fetchPaymentHistory();
    checkIfPaid()
})



</script>