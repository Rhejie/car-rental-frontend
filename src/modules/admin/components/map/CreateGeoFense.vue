<template>
    <main class=" h-screen">
        <v-map class="w-full h-full" :options="state.map" @loaded="onMapLoaded">
            <template v-if="loaded">
                <VControlNavigation />
                <VControlFullscreen/>
                <v-marker v-for="(marker, idx) in markers" :key="idx" :coordinates="marker.coordinates"
                    :options="marker.options" :popup-options="marker.popup">
                    <template>
                        <div class="p-2 text-black">
                            Popup Content: {{ marker.popup.content }}
                            <img class="rounded shadow-sm" src="https://picsum.photos/200" />
                        </div>
                    </template>
                </v-marker>

                <template v-if="loaded">
                    <v-layer-deck-geojson :data="deck.geojson.source" :layer-id="'deck.gl-geojson-layer'"
                        :options="deck.geojson.options" />
                </template>
            </template>
        </v-map>
    </main>
</template>
  
<script>
import { VMap, VMarker, VControlAttribution, VLayerDeckGeojson, VControlNavigation, VLayerMapboxCanvas, VLayerMapboxVector, VControlFullscreen } from "v-mapbox";
import { reactive, computed, ref } from "vue";

export default {
    name: "App",
    components: {
        VMap,
        VMarker,
        VLayerDeckGeojson,
        VControlNavigation,
        VLayerMapboxCanvas,
        VControlFullscreen
    },
    setup(props) {

        const trackers = computed(() => props.trackers)
        const state = reactive({
            ui: {
                loaded: false,
                styleChanged: false,
                tilesLoaded: false,
            },
            map: {
                accessToken:
                    "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ",
                style: "mapbox://styles/mapbox/streets-v11?optimize=true",
                // style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
                center: [73.8567, 18.5204],
                zoom: 11,
                maxZoom: 22,
                crossSourceCollisions: false,
                failIfMajorPerformanceCaveat: false,
                attributionControl: false,
                preserveDrawingBuffer: true,
                hash: false,
                minPitch: 0,
                maxPitch: 60,
            },
        });

        const loaded = computed(() => state.ui.loaded);

        const markers = [
            {
                options: { color: "red", draggable: true },
                coordinates: [125.6678903, 7.3003923],
                popup: {
                    options: {
                        closeButton: false,
                        closeOnClick: true,
                        closeOnMove: true,
                    },
                    content: "ABC",
                },
            },
            {
                options: { color: "indigo", draggable: false },
                coordinates: [73.8567, 18.5514],
                popup: {
                    options: {
                        closeButton: true,
                        closeOnClick: false,
                        closeOnMove: false,
                    },
                    content: "XYZ",
                },
            },
        ];

        const deck = ref({
            geojson: {
                source: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "Polygon",
                                coordinates: [
                                    [
                                        [74.50927734375, 31.89621446335144],
                                        [73.71826171874999, 30.012030680358613],
                                        [71.89453125, 28.033197847676377],
                                        [70.24658203125, 28.013801376380712],
                                        [69.43359375, 26.980828590472107],
                                        [70.224609375, 26.352497858154024],
                                        [70.09277343749999, 25.93828707492375],
                                        [70.3125, 25.60190226111573],
                                        [70.9716796875, 25.443274612305746],
                                        [70.7958984375, 25.105497373014686],
                                        [70.99365234375, 24.686952411999155],
                                        [69.71923828125, 24.387127324604496],
                                        [68.53271484375, 23.68477416688374],
                                        [71.60888671875, 19.704657579362323],
                                        [77.45361328125, 21.453068633086783],
                                        [76.7724609375, 29.7453016622136],
                                        [74.50927734375, 31.89621446335144],
                                    ],
                                ],
                            },
                        },
                    ],
                },
                options: {
                    pickable: true,
                    stroked: false,
                    filled: true,
                    extruded: true,
                    pointType: "circle",
                    lineWidthScale: 20,
                    lineWidthMinPixels: 2,
                    getFillColor: [33, 160, 180, 200],
                    getPointRadius: 100,
                    getLineWidth: 1,
                    getElevation: 200,
                },
            },
        });

        function onMapLoaded(map) {
            [
                "idle",
                "moveend",
                "touchend",
                "style.load",
                "sourcedata",
                "sourcedataloading",
            ].forEach((event) => {
                map.on(event, () => {
                    if (event === "style.load") {
                        const waiting = () => {
                            if (!map.isStyleLoaded()) {
                                state.ui.styleChanged = false;
                                setTimeout(waiting, 200);
                            } else {
                                state.ui.styleChanged = true;
                            }
                        };
                        waiting();
                    }
                });
            });
            state.ui.styleChanged = true;
            state.ui.loaded = true;
        }

        return {
            state,
            loaded,
            markers,
            // methods
            onMapLoaded,
            deck
        };
    },
};
</script>
  
<style >
@import "~mapbox-gl/dist/mapbox-gl.css";
@import "~v-mapbox/dist/v-mapbox.css";
</style>