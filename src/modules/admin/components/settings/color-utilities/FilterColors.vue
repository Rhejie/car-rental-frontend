<template>
    <form class="space-y-10 divide-y divide-gray-200">
        <div class="pt-10">
            <GloadingList v-if="loading"/>
            <fieldset v-if="!loading">
                <legend class="block text-sm font-medium text-gray-900">Colors</legend>
                <div class="space-y-3 pt-6" v-loading="loading">
                    <div v-for="(color, index) in colors" :key="color.id" class="flex items-center">
                        <input :id="`${color.id}-${index}`" :value="color.id" v-model="selectedColors" type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label :for="`${color.id}-${index}`" class="ml-3 text-sm text-gray-600">
                            {{ color.name }}
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>
    </form>
</template>
<script setup>
import GloadingList from '@/components/GloadingList.vue';
import { computed, defineEmits, defineProps, onMounted, ref } from 'vue';
import { selectColors } from '../../composables/color-composables';


const props = defineProps({
    modelValue: {
        default: []
    },
    handleToogleColor: {
        type: Function,
    }
})

const emit = defineEmits(['update:modelValue'])

const colors = ref([])

const loading = ref(true)

const selectedColors = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        props.handleToogleColor(newValue)
        emit('update:modelValue', newValue)
    }
})


const selectColor = async (searchVal = null) => {
    const { search, data } = selectColors(searchVal);
    await search();
    colors.value = data.value
    loading.value = false
}

onMounted(async () => {
    await selectColor();
})  
</script>