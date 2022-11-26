<template>
    <div class="p-2 ">
        <el-pagination v-model:currentPage="currentPage1" :page-size="page_size" :page-sizes="page_sizes"
            layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
    current_size: {
        type: Number,
        required: true,
    },
    current_page: {
        type: Number,
        required: true,
    },
    page_size: {
        type: Number,
    }
});

const emit = defineEmits(['change_size', 'change_page'])


const currentPage1 = computed(() => props.current_page)

const page_sizes = ref([10, 25, 50, 100, 200])

const total = computed(() => props.current_size)

const handleSizeChange = (val) => {
    emit('change_size', val)
}
const handleCurrentChange = (val) => {
    emit('change_page', val)
}

</script>