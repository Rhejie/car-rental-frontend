import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const loadBookings = (params) => {

    const data = ref([])
    const totalBookings = ref(0)
    const load = async () => {
        await http().get(`/booking/list?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            totalBookings.value = res.data.total
        }).catch(error => {
            console.log('Error in getting Booking list: ', error)
        })
    }

    return {
        load,
        data,
        totalBookings
    }
}

export const loadDeployedBookings = (params) => {

    const data = ref([])
    const totalBookings = ref(0)
    const load = async () => {
        await http().get(`/booking/deployed-list?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            totalBookings.value = res.data.total
        }).catch(error => {
            console.log('Error in getting Booking list: ', error)
        })
    }

    return {
        load,
        data,
        totalBookings
    }
}

export const acceptBooking = (book) => {
    const data = ref(null)

    const post = async () => {
        await http().post('/booking/accept', book).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in accepting Booking: ', error)
        })
    }

    return {
        data,
        post
    }
}

export const declineBooking = (book) => {
    const data = ref(null)

    const post = async () => {
        await http().post('/booking/decline', book).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in accepting Booking: ', error)
        })
    }

    return {
        data,
        post
    }
}

export const deployBooking = (book, payment) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post(`/booking/deploy/${book.id}`, payment).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in deploy Booking: ', error)
            errorData.value = error.response.data.errors
        })
    }

    return {
        data, post, errorData
    }
}

export const returnedBooking = (book, payment) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post(`/booking/returned/${book.id}`, payment).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in deploy Booking: ', error)
            errorData.value = error.response.data.errors
        })
    }

    return {
        data, post, errorData
    }
}

export const loadBookingHistory = (params, vehicle_id) => {

    const data = ref([])
    const totalBookings = ref(0)
    const load = async () => {
        await http().get(`/booking/history/${vehicle_id}?search=${params.search}&page=${params.page}&size=${params.size}`).then(res => {
            data.value = res.data.data
            totalBookings.value = res.data.total
        }).catch(error => {
            console.log('Error in getting Booking list: ', error)
        })
    }

    return {
        load,
        data,
        totalBookings
    }
}