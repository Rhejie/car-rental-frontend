<template>
    <div id="map" class="h-96 w-full"></div>
</template>
<script setup>
import {onMounted, computed, ref,  defineEmits, defineProps} from 'vue'
import mapboxgl from "mapbox-gl";


const props = defineProps({
    modelValue: null,
})

const emit = defineEmits(['update:modelValue'])

const areaData = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
const getCenter = computed({
    get() {
        if(areaData.value) {
            let lon = areaData.value.features[0].geometry.coordinates[0][0]
            return [lon[0], lon[1]]
        }
        return [125.6678903, 7.3003923]
    },
    set(newValue) {
        newValue
    }
})
const mapData = ref({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true', // style URL
    center: [125.6678903, 7.3003923], // starting position [lng, lat]
    zoom: 10 // starting zoom
})

onMounted(() => {
    mapData.value.center = getCenter.value
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ';
    const map = new mapboxgl.Map(mapData.value);
    
    const draw = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
            polygon: true,
            trash: true
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: 'draw_polygon'
    });

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
    map.addControl(geocoder);
    map.addControl(draw);

    setTimeout(() => {
        if(areaData.value) {
            map.addSource('maine',{
                type : 'geojson',
                data : areaData.value
            });
            
            map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': 'maine', // reference the data source
                'layout': {},
                'paint': {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.5
                }
            });

            map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'maine',
                'layout': {},
                'paint': {
                'line-color': '#fff',
                'line-width': 2
                }
            });
        }
    },2000)


    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    function updateArea(e) {
        const data = draw.getAll();
        // const answer = document.getElementById('calculated-area');
        if (data.features.length > 0) {
            const area = turf.area(data);
            console.log('data', data)
            console.log('area', area)
            areaData.value = data
            // Restrict the area to 2 decimal points.
            const rounded_area = Math.round(area * 100) / 100;
            // answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
        } else {
            // answer.innerHTML = '';
            if (e.type !== 'draw.delete')
                alert('Click the map to draw a polygon.');
        }
    }
})
</script>