<template>
	<TransitionRoot as="template" :show="open">
		<Dialog as="div" class="relative z-10" @close="handleCloseModal">
			<TransitionChild
				as="template"
				enter="ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0">
				<div
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</TransitionChild>

			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div
					class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enter-to="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 sm:scale-100"
						leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
						<DialogPanel
							class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
							<div>
								<div class="mt-3 sm:mt-5">
									<DialogTitle
										as="h3"
										class="text-lg font-medium leading-6 text-gray-900"
										>Booking Information</DialogTitle
									>
									<div class="mt-2" v-if="bookingInfo && bookingInfo.id">
										<div class="grid grid-cols-6 gap-6">
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> User </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.user.first_name }} {{ bookingInfo.user.last_name }}</p>
											</div>
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Vehicle </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.vehicle.model }} | {{ bookingInfo.vehicle.vehicle_brand.name }}</p>
											</div>
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Tracker </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.vehicle.tracker.name }}</p>
											</div>

											<div
												class="col-span-6 sm:col-span-3">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Booking Start </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ formatDateTime(bookingInfo.booking_start) }}</p>
											</div>

											<div
												class="col-span-6 sm:col-span-3">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Booking End </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ formatDateTime(bookingInfo.booking_end) }}</p>
											</div>
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Destination </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.destination }}</p>
											</div>

											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Primary Operator Name </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.primary_operator_name }}</p>
											</div>
											<div
												class="col-span-6 sm:col-span-6">
												<label
													for="first-name"
													class="block text-sm font-medium text-gray-700"> Primary Operator License No. </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.primary_operator_license_no }}</p>
											</div>

                                            <div
                                                class="col-span-6 sm:col-span-6">
                                                <label
                                                    for="first-name"
                                                    class="block text-sm font-medium text-gray-700"> Secondary Operator Name </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.secondary_operator_name ? bookingInfo.secondary_operator_name : '----'}}</p>
                                            </div>
                                            <div
                                                class="col-span-6 sm:col-span-6">
                                                <label
                                                    for="first-name"
                                                    class="block text-sm font-medium text-gray-700"> Secondary Operator License No. </label>
                                                
                                                <p class="text-sm text-untitled-gray-500">{{ bookingInfo.secondary_operator_license_no ? bookingInfo.secondary_operator_license_no : '----' }}</p>
                                            </div>
										</div>
									</div>
								</div>
							</div>
							<div class="mt-5 sm:mt-6">
								<button
									type="button"
									class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
									@click="handleCloseModal">
									Close
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue';
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/24/outline';
import moment from 'moment';

const props = defineProps({
	openModal: {
		type: Boolean,
		default: false,
	},
	bookingInfo: {
		type: Object,
		default: () => {},
	},
});
const emit = defineEmits(['closeModal']);

const open = computed(() => props.openModal);
const bookingInfo = computed(() => props.bookingInfo);

const handleCloseModal = () => {
	emit('closeModal');
};


const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MMM D YYYY h:mm a')
}
</script>
