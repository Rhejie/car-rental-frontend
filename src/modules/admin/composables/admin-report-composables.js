import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const getAllMonths = () => {
    const data = ref([])

    const load = async () => {
        await http().get('/reports/get-months').then(res => {
            data.value = res.data
        })
    }

    return {
        load, data
    }
}

export const getDailyReportsData = (date) => {
    const data = ref([])

    const load = async ()=> {
        await http().get(`/reports/daily?date=${date}`).then(res => {
            data.value = res.data
        }).catch(err => {
            console.log('daily report',err)
        })
    }

    return {
        load, data
    }
}

export const getMonthlyReport = (params) => {
    const data = ref([])

    const load = async ()=> {
        await http().get(`/reports/monthly`, {params}).then(res => {
            data.value = res.data
        }).catch(err => {
            console.log('daily report',err)
        })
    }

    return {
        load, data
    }
}

export const totalIncome = () => {
    const data = ref(0)

    const load = async () => {
        await http().get('/reports/total-income').then(res => {
            data.value = res.data
        })
    }

    return {
        data, load
    }
}

export const loadPayments = (params) => {
    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/reports/payments`, {params}).then(res => {
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

export const totalExpense = () => {
    const data = ref(0)

    const load = async () => {
        await http().get('/reports/total-expense').then(res => {
            data.value = res.data
        })
    }

    return {
        data, load
    }
}

export const loadExpenses = (params) => {
    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/reports/expenses`, {params}).then(res => {
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

export const loadDrivers = (params) => {
    
    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get('/reports/drivers-report', {params}).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting driver: ', error)
        })
    }

    return {
        data, total, load
    }
}

export const countDrivers = () => {
    const data = ref(0)

    const load = async () => {
        await http().get('/reports/total-drivers').then(res => {
            data.value = res.data
        })
    }

    return {
        data, load
    }
}