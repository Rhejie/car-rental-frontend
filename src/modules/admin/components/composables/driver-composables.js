import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadDrivers = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/driver/drivers?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting driver: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeDriver = (driver) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/driver/store', driver).then(res => {
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

export const updateDriver = (driver) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/driver/update/${driver.id}`, driver).then(res => {
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

export const showDriverSelect = () => {
    
    const data = ref([])

    const loadSelectCompanies = async () => {
        await http().get(`/driver/select-driver`).then(res => {
            data.value = res.data
        })
    }

    return {
        loadSelectCompanies,
        data
    }
}

export const getAvailableDrivers = (day) => {
    const data = ref([])
    const load = async () => {
        await http().get(`/driver/select-driver?day=${day}`).then(res => {
            data.value = res.data
        })
    }

    return {
        load,
        data
    }
}