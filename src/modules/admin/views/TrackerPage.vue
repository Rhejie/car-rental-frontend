
<template>
    <div class="w-full bg-gray-500">
        <div class="mx-auto max-w-2xl  py-4 px-4 lg:max-w-7xl lg:px-0">
            <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Trackers</h1>
        </div>
    </div>
    <div class="px-4 bg-gray-200 h-screen sm:px-6 sm:py-4 lg:px-8">
        <div class="h-screen">
            <div id="map" class="h-full"></div>
            <!-- <div class="calculation-box">
                <p>Click the map to draw a polygon.</p>
                <div id="calculated-area"></div>
            </div> -->
        </div>
    </div>

</template>
<script setup>
import mapboxgl from "mapbox-gl";

import { onMounted, ref, computed } from "vue";
import { selectPlaces } from "../components/composables/place-composables";
import { getAlltrackers } from "../composables/tracker-composables";
const areas = ref(null)
const loadingAreas = ref(true)
const trackers = ref(null)
const loadingTracker = ref(true)

const fetchAreas = async (searchVal = null) => {

    const { data, search } = selectPlaces(searchVal);
    await search()
    loadingAreas.value = false
    areas.value = data.value
}

const fetchDeployedTracker = async () => {
    const { data, load } = getAlltrackers();
    await load();
    trackers.value = data.value
    loadingTracker.value = false
}

const findCenter = (markers) => {
    let lat = 0;
    let lng = 0;

    markers.forEach((marker, index) => {
        lat += parseFloat(markers[index][0][0]);
        lng += parseFloat(markers[index][0][1]);
    })
    lat /= markers.length;
    lng /= markers.length;
    
    return [lat, lng]
}

const routes = computed({
    get() {
        if (trackers.value.length > 0) {
            return trackers.value.map(tracker => {
                return tracker.tracker_coordinates.map(coor => {
                    return [coor.lon, coor.lat]
                })
            })
        }
        return []
    },
    set(newVal) {
        newVal
    }
})

const handleGetBookingInfo = (index) => {
    let track = null;
    trackers.value.forEach(tracker => {
        track = tracker.tracker_coordinates[index]
    })

    let template = `<div class="shadowa">
            <h1 class="text-sm text-gray-600">Tracker ID: <span class="text-sm font-bold">${track.booking.vehicle.tracker.name}</span> </h1>
            <h1 class="text-sm text-gray-600">Model: <span class="text-sm font-bold">${track.booking.vehicle.model}</span> </h1>
            <h1 class="text-sm text-gray-600">Brand: <span class="text-sm font-bold">${track.booking.vehicle.vehicle_brand.name}</span> </h1>
            <h1 class="text-sm text-gray-600">User: <span class="text-sm font-bold">${track.booking.user.last_name}, ${track.booking.user.first_name}</span> </h1>

        </div>`

    return template;
}

onMounted(async () => {
    await fetchAreas();
    await fetchDeployedTracker();
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
        center: [125.6678903, 7.3003923], // starting position [lng, lat]
        zoom: 11 // starting zoom
    });

    map.on('load', () => {
        setTimeout(() => {

            routes.value.forEach((route, index) => {
                const colors = ['gray', 'red', 'skyblue', 'yellowgreen', 'lightgreen', 'white']
                const color = colors[Math.floor(Math.random() * colors.length)]

                map.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': route
                        }
                    }
                })
                
                const startingPointMarker = new mapboxgl.Marker()
                    .setLngLat(route[0])
                    .addTo(map);

                

                const currentPointMarker = new mapboxgl.Marker({ color: 'black', rotation: 45 })
                    .setLngLat(route[route.length - 1])
                    .addTo(map);
                
                const startingPopup = new mapboxgl.Popup({ closeOnClick: false })
                    .setLngLat(route[route.length - 1])
                    .setHTML(handleGetBookingInfo(route.length - 1))
                    .addTo(map);

                map.addLayer({
                    'id': 'route_' + index,
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': color,
                        'line-width': 8
                    }
                });
            })

        }, 2000)
    })

    if (areas.value.length > 0) {
        setTimeout(() => {
            areas.value.forEach(area => {
                const colors = ['gray', 'red', 'blue', 'yellow', 'green', 'white']
                const color = colors[Math.floor(Math.random() * colors.length)]
                const outlineColor = colors[Math.floor(Math.random() * colors.length)]
                map.addSource(area.name, {
                    type: 'geojson',
                    data: JSON.parse(area.area)
                });

                map.addLayer({
                    'id': area.name,
                    'type': 'fill',
                    'source': area.name, // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': color, // blue color fill
                        'fill-opacity': 0.5
                    }
                });
                map.addLayer({
                    'id': 'outline' + area.id,
                    'type': 'line',
                    'source': area.name,
                    'layout': {},
                    'paint': {
                        'line-color': outlineColor,
                        'line-width': 2
                    }
                });
                findCenter((JSON.parse(area.area)).features[0].geometry.coordinates)
                const areaPopup = new mapboxgl.Popup({ closeOnClick: false })
                    .setLngLat(findCenter((JSON.parse(area.area)).features[0].geometry.coordinates))
                    .setHTML('<h1 class="text-gray-600 text-md ">'+ area.name +' Area </h1>')
                    .addTo(map);

            })

        }, 2000)
    }

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })

    map.addControl(geocoder);

})
</script>
<style scoped>
p {
    font-family: 'Open Sans';
    margin: 0;
    font-size: 13px;
}
</style>