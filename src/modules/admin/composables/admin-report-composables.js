import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const getDailyReportsData = (date) => {
    const data = ref([])

    const load = async ()=> {
        await http().get(`/reports/daily?date=${date}`).then(res => {
            data.value = res.data
        }).catch(err => {
            console.log('daily report',err)
        })
    }

    return {
        load, data
    }
}