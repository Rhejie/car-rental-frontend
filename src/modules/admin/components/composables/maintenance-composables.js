import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const loadMaintenances = (params, vehicle_id = null) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/maintenance/list/${vehicle_id}?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting Maintenances: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeMaintenance = (maintenance) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/maintenance/store', maintenance).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing maintenance ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateMaintenance = (maintenance) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/maintenance/update`, maintenance).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing maintenance ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}