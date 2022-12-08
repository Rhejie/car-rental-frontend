<template>
    <div class="text-gray-500">
        <div class="px-2 py-2 sm:px-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Booking Start</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{formatDateTime(booking.booking_start)}}</dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Booking End</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{formatDateTime(booking.booking_end)}}</dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Destination</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{booking.destination}}</dd>
                </div>
                <div class="sm:col-span-1">
                    <dt class="text-sm font-medium text-gray-500">Vehicle</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{booking.vehicle.model}} | {{booking.vehicle.make}} | {{booking.vehicle.plate_number}}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>
<script setup>
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import { defineProps, computed } from 'vue'
import moment from 'moment'

const props = defineProps({
    booking: {
        type: Object,
        default: () => { }
    }
})

const booking = computed(() => props.booking)

const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MMM D YYYY h:mm a')
}
</script>