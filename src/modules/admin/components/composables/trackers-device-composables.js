import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadTrackers = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/tracker/trackers?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting tracker: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeTracker = (tracker) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/tracker/store', tracker).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing payment-method ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateTracker = (tracker) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/tracker/update/${tracker.id}`, tracker).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing payment-method ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}
