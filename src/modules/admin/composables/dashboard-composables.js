import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const getDashboardData = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/dashboard-data').then(res => {
            data.value = res.data
        }).catch(error => {
            console.log(error)
        })
    }

    return {
        data,
        load
    }
}

export const countUsers = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/users-count').then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in getting users count', error)
        })
    }

    return {
        data, 
        load
    }
}

export const countVerifiedAccounts = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-verified-account').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}

export const countUnVerifiedAccounts = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-unverified-account').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-total-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalPendingBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-pending-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalAcceptBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-accept-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalCancelBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-cancel-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalDeclineBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-decline-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalDeployedBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-deployed-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalReturnedBookings = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-returned-bookings').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}
export const countTotalVehicles = () => {
    const data = ref(null)
    const load = async () => {
        await http().get('/admin/count-vehicles').then(res => {
            data.value = res.data
        })
    }

    return {
        data, 
        load
    }
}