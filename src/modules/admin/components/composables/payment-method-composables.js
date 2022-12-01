import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadPaymentMethods = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/payment-method/payment-methods?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting payment-methods: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storePaymentMethod = (paymentMethod) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/payment-method/store', paymentMethod).then(res => {
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

export const updatePaymentMethod = (paymentMethod) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/payment-method/update/${paymentMethod.id}`, paymentMethod).then(res => {
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

export const selectPaymentMethods = (searchVal) => {
    const data = ref(null)

    const search = async () => {
        await http().get(`/payment-method/select-payment-method?search=${searchVal}`).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in getting paymentMethods', error)
        })
    }

    return {
        data, search
    }
}