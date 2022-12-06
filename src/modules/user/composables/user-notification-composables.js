import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const getMyNotifications = () => {
    const data = ref([])

    const load = async () => {
        await http().get('/notification/user').then(res => {
            data.value = res.data
        })
    }

    return {
        data, load
    }
}