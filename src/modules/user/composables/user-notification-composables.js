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

export const viewNotification = (id) => {
    const view = async () => {
        await http().post('/notification/view/'+id).then(res => {
            console.log(res)
        }).catch(error => {
            console.log('Error in viewing notification', error)
        })
    }

    return {view}
}