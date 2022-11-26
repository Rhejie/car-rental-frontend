import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadCompanies = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/company/companies?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting company: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeCompany = (company) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/company/store', company).then(res => {
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

export const updateCompany = (company) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/company/update/${company.id}`, company).then(res => {
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

export const showCompaniesInSelect = () => {
    
    const data = ref([])

    const loadSelectCompanies = async () => {
        await http().get(`/company/select-company`).then(res => {
            data.value = res.data
        })
    }

    return {
        loadSelectCompanies,
        data
    }
}