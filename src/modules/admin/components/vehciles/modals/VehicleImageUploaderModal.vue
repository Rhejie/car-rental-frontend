<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { computed, defineProps, defineEmits, ref, inject } from 'vue'

import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    },
    vehicle: {
        type: Object,
    }
})

const emit = defineEmits(['closeModal', 'newImage']);

const auth = inject('auth');

const open = computed(() => props.openModal)

const vehicleInfo = computed(() => props.vehicle)

const option = ref({
    url: '/api',
    process: {
        url: '/vehicle/image/upload',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + auth.token()
        },
        onload: (response) => {
            // emitter.emit('NEW_FILE', JSON.parse(response))
            emit('newImage', JSON.parse(response))
            return response
        },
        ondata: (formData) => {
            formData.append('vehicle_id', vehicleInfo.value.id);
            return formData;
        }
    },
    revert: {
        url: '/vehicle/image/undo',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + auth.token(),
            'content-type': 'application/json'
        },
        ondata: (formData) => {
            return formData;
        },
        onload: (response) => {
            // emitter.emit('UNDO_FILE', JSON.parse(response))
        }
    }
})

const myFiles = ref([])

const handleFilePondInit = () => {
    console.log("FilePond has initialized");
}

const handleCloseModal = () => {
    emit('closeModal')
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
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-700 p-2">Upload Images
                            </DialogTitle>
                            <div class="mt-5 md:col-span-2 md:mt-0 p-2">
                                <file-pond name="file" ref="pond" label-idle="Drop files here..."
                                    v-bind:allow-multiple="true" accepted-file-types="image/jpeg, image/png"
                                    :server="option" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>