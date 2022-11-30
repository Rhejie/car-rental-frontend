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