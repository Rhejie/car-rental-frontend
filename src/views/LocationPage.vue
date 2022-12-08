<script setup>
import mapboxgl from "mapbox-gl";

import { onMounted, ref, computed } from "vue";


// const handleGetBookingInfo = (index) => {
//     let track = null;
//     trackers.value.forEach(tracker => {
//         track = tracker.tracker_coordinates[index]
//     })

//     if (track) {
//         let template = `<div class="shadowa">
//             <h1 class="text-sm text-gray-600">Tracker ID: <span class="text-sm font-bold">${track.booking.vehicle.tracker.name}</span> </h1>
//             <h1 class="text-sm text-gray-600">Model: <span class="text-sm font-bold">${track.booking.vehicle.model}</span> </h1>
//             <h1 class="text-sm text-gray-600">Brand: <span class="text-sm font-bold">${track.booking.vehicle.vehicle_brand.name}</span> </h1>
//             <h1 class="text-sm text-gray-600">User: <span class="text-sm font-bold">${track.booking.user.last_name}, ${track.booking.user.first_name}</span> </h1>

//         </div>`

//         return template;
//     }

//     return

// }

onMounted(async () => {
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
        center: [125.6739896672411, 7.319240543229999], // starting position [lng, lat]
        zoom: 11, // starting zoom
        pitch: 60, // pitch in degrees
        bearing: -60,
    });

    map.on('load', () => {
        setTimeout(() => {
            map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 16
            });
            map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

            const startingPointMarker = new mapboxgl.Marker()
                .setLngLat([125.6739896672411, 7.319240543229999])
                .addTo(map);



            // const currentPointMarker = new mapboxgl.Marker({ color: 'black', rotation: 45 })
            //     .setLngLat([125.6739896672411, 7.391240543129999])
            //     .addTo(map);

            const startingPopup = new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat([125.6739896672411, 7.319240543229999])
                .setHTML(`<h1>I'm Here!</h1>`)
                .addTo(map);

        }, 2000)
    })

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

    map.addControl(geocoder);

})
</script>
<template>
    <div class="w-full h-96">
        <div id="map" style="width: 100%; height: 100%;"></div>
    </div>
</template>

<style scoped>
</style>