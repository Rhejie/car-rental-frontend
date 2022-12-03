import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const getAlltrackers = () => {
    const data = ref([])
    const load = async () => {
        await http().get('/trackers/deployed-trackers').then(res => {
            data.value = res.data
        })
    }

    return {
        load, data
    }
}