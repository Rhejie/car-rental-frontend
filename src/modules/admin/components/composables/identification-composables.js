import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadIdentifications = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/identification/identifications?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting identifications: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeIdentification = (identification) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/identification/store', identification).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing identification ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateIdentification = (identification) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/identification/update/${identification.id}`, identification).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing identification ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}