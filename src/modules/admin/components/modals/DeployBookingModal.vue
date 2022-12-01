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
                                            <div class="bg-white shadow sm:rounded-lg">
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
                                                        class="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg">
                                                        Total Price {{ totalPrice }} Php
                                                    </span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
                                        <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                            <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Payment
                                                Details
                                            </h2>

                                            <!-- Activity Feed -->
                                            <div class="mt-6 flow-root">
                                                <form class="">
                                                    <div
                                                        class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                        <div>
                                                            <SelectPayment v-model="payment.type"/>
                                                        </div>
                                                        <div>
                                                            <!-- <label for="email"
                                                                class="block text-sm font-medium text-gray-700">Last
                                                                Name</label>
                                                            <div class="mt-1">
                                                                <input id="email" type="text"
                                                                    v-model="registerData.last_name"
                                                                    placeholder="First Name"
                                                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                                                <span class="text-sm text-red-400"
                                                                    v-if="errorValue && !loading && errorValue.last_name">
                                                                    {{ errorValue.last_name[0] }}
                                                                </span>
                                                            </div> -->
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
                                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    @click="handleCloseModal()">
                                    Deploy
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
</template>
  
<script setup>
import { ref, defineEmits, defineProps, computed, } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { RocketLaunchIcon } from '@heroicons/vue/24/outline'
import SelectPayment from '../settings/payment-utilities/SelectPayment.vue';
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    },
    selectedBooking: {
        type: Object,
    }
})

const emit = defineEmits(['closeModal'])

const payment = ref({
    type: null
})
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

const handleCloseModal = () => {
    emit('closeModal')
}

const handleUserName = (user) => {

    return user.last_name + ', ' + user.first_name
}

</script>