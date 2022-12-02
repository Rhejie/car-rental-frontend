import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadOverchargeTypes = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/overcharge/type/list?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting overchargeTypes: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}

export const selectOvercharges = () => {
    const data = ref([])
    const load = async () => {
        await http().get('/overcharge/type/select').then(res => {
           data.value = res.data 
        }).catch(error => {
            console.log('Error in getting overcharges')
        });
    }

    return {
        load,
        data
    }
}

export const storeOverchargeType = (overchargeTypes) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/overcharge/type/store', overchargeTypes).then(res => {
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

export const updateOverchargeType = (overchargeTypes) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/overcharge/type/update/${overchargeTypes.id}`, overchargeTypes).then(res => {
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