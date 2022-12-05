<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { computed, defineProps, defineEmits, ref, inject, onMounted, onUpdated } from 'vue'

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
import { storageUrl } from '@/global-composables/http_service';
import { removeImage } from '@/global-composables/image-composables';

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
    },
    message: {
        type: String,
        default: 'Image of any valid Id...'
    }
})

const message = computed(() => props.message)

const url = storageUrl();

const emit = defineEmits(['newImage']);

const auth = inject('auth');

const open = computed(() => props.openModal)

const vehicleInfo = computed(() => props.vehicle)


const option = ref({
    url: '/api',
    process: {
        url: '/user/profile/upload',
        method: 'POST',
        onload: (response) => {
            localStorage.setItem('profile_url', JSON.parse(response))
            emit('newImage', JSON.parse(response))
            return response
        },
        ondata: (formData) => {
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
    },
    fetch: {
        url: '/user/profile/restore?url=',
        method: 'GET',
        onLoad: (response) => {
            console.log('res', response)
        },
        onError: (response) => {
            console.log(res)
        }
    }
})

const myFiles = computed({
    get() {
        if (localStorage.getItem('profile_url')) {
            const imageUrl = url + localStorage.getItem('profile_url');
            return [imageUrl]
        }

        return []
    },
    set(newValue) {
        newValue
    }
})

const showUploader = computed({
    get() {
        if (localStorage.getItem('profile_url')) {
            return true
        }

        return false
    },
    set(newValue) {
        newValue
    }
})

const imageUrl = ref(null)
const handleFilePondInit = () => {
    console.log("FilePond has initialized");
}

const handleClearImage = async () => {
    const image = localStorage.getItem('profile_url')
    localStorage.removeItem('profile_url');

    const remove = await removeImage({data: image});
}


onMounted(() => {
    // if (localStorage.getItem('profile_url')) {
    //     console.log(localStorage.getItem('profile_url'))
    //     let regex = /\//g;
    //     let result = (localStorage.getItem('profile_url')).replace(regex, " ");
    //     imageUrl.value = result;
    // }
})


onMounted(() => {
    // if (localStorage.getItem('profile_url')) {
    //     console.log(localStorage.getItem('profile_url'))
    //     imageUrl.value = localStorage.getItem('profile_url');
    // }
})

</script>
<template>
    <file-pond v-if="!showUploader" name="file" ref="pond" :label-idle="message" v-bind:allow-multiple="false"
        accepted-file-types="image/jpeg, image/png" :server="option" v-bind:files="myFiles"
        v-on:init="handleFilePondInit" />

    <!-- <div v-else class="w-full">
        <img class="w-40 mx-auto p-2 shadow" :src="url + imageUrl" :alt="`${url} ${imageUrl}`">
        <button type="button" @click="handleClearImage"
            class="
                mx-auto bg-red-500 text-white text-white items-center 
                rounded-md border border-red-300 px-3 py-2 text-sm font-medium 
                leading-4 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 
                focus:ring-red-500 focus:ring-offset-2">
            Remove Image
        </button>
    </div> -->
</template>