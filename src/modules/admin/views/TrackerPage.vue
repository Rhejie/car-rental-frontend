<template>
    <div class="w-full bg-gray-500">
        <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
            <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Trackers</h1>
        </div>
    </div>
    <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
        <div>
            <l-map 
                :zoom="zoom"
                :waypoints="'snap'"
                :center="[7.3003923, 125.6678903]"
                :options="mapOptions" style="height:60vh">
                    <l-tile-layer
                        :url="url"
                        :attribution="attribution"/>

                    <template v-for="(tracker, index) in trackers">
                        <l-marker :key="index" v-if="(tracker.tracker_coordinates.length > 0)"  :lat-lng="[tracker.tracker_coordinates[0].lat, tracker.tracker_coordinates[0].lon]" >
                            <l-tooltip>
                                <div>
                                    Starting point
                                </div>
                            </l-tooltip>
                        </l-marker>

                        <l-marker :key="index" v-if="(tracker.tracker_coordinates.length > 1)"  :lat-lng="[tracker.tracker_coordinates[tracker.tracker_coordinates.length -1].lat, tracker.tracker_coordinates[tracker.tracker_coordinates.length -1].lon]" >
                            <l-tooltip>
                                <div>
                                    Current Position
                                </div>
                            </l-tooltip>
                        </l-marker>
                    </template>
                    
                    <l-polyline 
                            v-if="!loading"
                            :lat-lngs="line"
                            color="green"
                        ></l-polyline>
            </l-map>
        </div>
    </div>
</template>
<script setup>
import { getAlltrackers } from '../composables/tracker-composables';
import { computed, onMounted, ref } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LTooltip, LPolyline } from "@vue-leaflet/vue-leaflet";

const trackers = ref([null])
const loading = ref(true)



const url = ref('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=cac1c63e746741a79462820881e7f2c6')
const attribution = ref('APC Car Rental')
const zoom = ref(21)
const mapOptions = ref({

})

const line = computed({
    get() {
        if(loading.value && trackers.value.length == 0) {
            return [];
        }

        let newArray = [];

        trackers.value.forEach(tracker => {
            tracker.tracker_coordinates.forEach(coor => {
                newArray.push([coor.lat, coor.lon])
            })
        })

        return newArray
    }, 
    set(newValue) {
        newValue
    }
})

const fetchDeployedTracker = async () => {
    const { data, load } = getAlltrackers();
    await load();
    trackers.value = data.value
    loading.value = false
}


onMounted(async () => {
    await fetchDeployedTracker();
})
</script>