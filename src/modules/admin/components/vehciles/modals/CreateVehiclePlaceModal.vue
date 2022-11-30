<script setup>
import { ref, defineProps, computed, defineEmits, onMounted, onUpdated, onUnmounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { storeVehiclePlace, updateVehiclePlace } from '../composables/vehicle-places-composables'
import SelectPlace from '../../settings/place-utilities/SelectPlace.vue';
const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    },
    selectedItem: {
        type: Object,
    },
    vehicle_id: {
        default: null
    }
})

const emit = defineEmits(['closeModal', 'saveVehiclePlace', 'updateVehiclePlace'])

const selected = computed(() => props.selectedItem)
const open = computed(() => props.openModal)
const vehicleId = computed(() => props.vehicle_id)

const place = ref({
    from: 'Panabo City',
    place: null,
    price: null,
    vehicle_id: props.vehicle_id
})

const loadingCompanies = ref(false)
const companies = ref([])

const errorValue = ref(null)

const loading = ref(false)

const handleCloseModal = () => {
    emit('closeModal', false)
}

const initializeForm = () => {
    place.value = {
        from: 'Panabo City',
        place: null,
        price: null,
        vehicle_id: vehicleId.value
    }
}


const handleUpdateVehiclePlace = async () => {
    loading.value = true
    const { data, update, errorData } = updateVehiclePlace(place.value);
    await update();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        emit('updateVehiclePlace', data.value)
    }
}

const handleStoreVehiclePlace = async () => {

    if (place.value && place.value.id) {
        handleUpdateVehiclePlace()
        return;
    }

    loading.value = true
    const { data, post, errorData } = storeVehiclePlace(place.value);
    await post();
    errorValue.value = errorData.value
    loading.value = false
    if (!loading.value && !errorValue.value, !errorData.value) {
        emit('saveVehiclePlace', data.value)
    }

}

const onHandleChangePlace = (item) => {
    console.log(item)
}


onMounted(async () => {

})

onUpdated(() => {
    if (selected.value && selected.value.id) {
        errorValue.value = null
        place.value = { ...selected.value }
    }
    else {
        initializeForm()
    }
})

    (() => {
        place.value.name = null
    })

</script>
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="handleCloseModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center sm:items-center p-4 sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-full sm:max-w-sm">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-700 p-2">{{ place &&
                                    place.id ? 'Update' : 'Create'
                            }} Vehicle Place</DialogTitle>
                            <div class="mt-5 md:col-span-2 md:mt-0">
                                <form>
                                    <div class="overflow-hidden shadow sm:rounded-md">
                                        <div class="bg-white px-4 py-5 sm:p-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-12">
                                                    <label for="first-name"
                                                        class="block text-sm font-medium text-gray-700">
                                                        From
                                                    </label>
                                                    <input type="text" name="first-name" v-model="place.from"
                                                        class="mt-1 block w-full rounded-md border h-8 border-gray-100 focus:border-indigo-100 focus:ring-indigo-100 pl-2 sm:text-sm"
                                                        placeholder="From" />
                                                    <span class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.from">
                                                        {{ errorValue.from[0] }}
                                                    </span>
                                                </div>
                                                <div class="col-span-12">
                                                    <label for="first-name"
                                                        class="block text-sm font-medium text-gray-700">
                                                        Price
                                                    </label>
                                                    <input type="number" name="first-name" v-model="place.price"
                                                        class="mt-1 block w-full rounded-md border h-8 border-gray-100 focus:border-indigo-100 focus:ring-indigo-100 pl-2 sm:text-sm"
                                                        placeholder="Price" />
                                                    <span class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.price">
                                                        {{ errorValue.price[0] }}
                                                    </span>
                                                </div>
                                                <div class="col-span-12">
                                                    <SelectPlace v-model="place.place"
                                                        :onHandleChangePlace="onHandleChangePlace" />
                                                    <span class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.place">
                                                        {{ errorValue.place[0] }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button @click.prevent="handleStoreVehiclePlace" :disabled="loading"
                                                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                {{ loading ? 'Saving....' : 'Save' }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>