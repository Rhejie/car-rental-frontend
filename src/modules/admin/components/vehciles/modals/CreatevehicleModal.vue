<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import SelectTracker from '../../settings/tracker-utilities/SelectTracker.vue'
import SelectColor from '../../settings/color-utilities/SelectColor.vue'
import { createVehicle } from '../composables/vehcile-composables';
import { useRouter } from 'vue-router'
import SelectFuelType from '../../settings/fuel-type-utilities/SelectFuelType.vue'

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false,
    }
})

const router = useRouter()

const emit = defineEmits(['closeModal', 'saveVehicle'])

const open = computed(() => props.openModal)

const vehicle = ref({
    model: null,
    tracker: null,
    color: null
})
const searchVal = ref(null)

const errorValue = ref(null)

const loading = ref(false)

const handleCloseModal = () => {
    emit('closeModal', false)
}

const onHandleChange = (item) => {
    console.log('change item ->', item)
}

const onHandleChangeColor = (item) => {
    console.log('change color item ->', item)
}

const onHandleChangeFuelType = (item) => {
    console.log('change color item ->', item)
}

const handleCreateVehicle = async () => {
    loading.value = true
    const {data, post, errorData} = createVehicle(vehicle.value);
    await post();
    errorValue.value = errorData.value
    loading.value = false
    if(!loading.value && !errorValue.value, !errorData.value) {
        emit('saveVehicle', data.value)
        router.push({name: 'Edit Vehicle', params: {id: data.value.id} })
    }

}
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
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-700 p-2">{{ vehicle && vehicle.id ? 'Update' : 'Create'}} Vehicle</DialogTitle>
                            <div class="mt-5 md:col-span-2 md:mt-0">
                                <form>
                                    <div class="overflow-hidden shadow sm:rounded-md">
                                        <div class="bg-white px-4 py-5 sm:p-6">
                                            <div class="grid grid-cols-6 gap-6">
                                                <div class="col-span-12">
                                                    <label for="first-name"
                                                        class="block text-sm font-medium text-gray-700">
                                                        Model   
                                                    </label>
                                                    <input type="text" name="first-name" v-model="vehicle.model"
                                                        class="mt-1 block w-full rounded-md border h-8 border-gray-100 focus:border-indigo-100 focus:ring-indigo-100 pl-2 sm:text-sm" placeholder="Vehicle Model" />
                                                    <span 
                                                        class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.model">
                                                            {{errorValue.model[0]}}
                                                    </span>
                                                </div>
                                                <div class="col-span-12">
                                                    <SelectTracker v-model="vehicle.tracker" :onHandleChange="onHandleChange"/>
                                                    <span 
                                                        class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.tracker">
                                                            {{errorValue.tracker[0]}}
                                                    </span>
                                                </div>
                                                <div class="col-span-12">
                                                    <SelectColor v-model="vehicle.color" :onHandleChangeColor="onHandleChangeColor"/>
                                                    <span 
                                                        class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.color">
                                                            {{errorValue.color[0]}}
                                                    </span>
                                                </div>
                                                <div class="col-span-12">
                                                    <SelectFuelType v-model="vehicle.fuel_type" :onHandleChangeFuelType="onHandleChangeFuelType"/>
                                                    <span 
                                                        class="text-sm text-red-400"
                                                        v-if="errorValue && !loading && errorValue.fuel_type">
                                                            {{errorValue.fuel_type[0]}}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                            <button @click.prevent="handleCreateVehicle" :disabled="loading"
                                                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                {{ loading ? 'Saving....' : 'Save'}}
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