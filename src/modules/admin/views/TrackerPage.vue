<template>
    <div></div>
</template>
<script setup>
import { getAlltrackers } from '../composables/tracker-composables';
import { onMounted, ref } from 'vue'

const trackers = ref([null])
const loading = ref(true)
const fetchDeployedTracker = async () => {
    const {data, load} = getAlltrackers();
    await load();
    trackers.value = data.value
    loading.value = false
}

onMounted(async() => {
    await fetchDeployedTracker();
})
</script>