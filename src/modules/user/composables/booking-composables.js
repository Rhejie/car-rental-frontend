import { http, httpFile } from "@/global-composables/http_service"
import { ref } from "vue"

export const storeBook = (book) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/booking/store', book).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing book ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateBook = (book) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post(`/booking/update/${book.id}`, book).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing book ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const getCurrentBook = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/booking/get-current-book').then(res => {
            data.value = res.data
        })
    }

    return {
        load,
        data
    }
}

export const downloadInvoice = (id) => {
    return httpFile().get(`/booking/download/${id}`)
}


export const getAllBookedDates = (id) => {
    const data = ref([]);
    const load= async () => {
        await http().get(`/booking/all-booked/${id}`)
            .then(res => {
                data.value = res.data
            })
    }

    return {
        data,
        load
    }
}