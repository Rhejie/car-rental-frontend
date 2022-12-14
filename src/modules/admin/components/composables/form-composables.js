import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadForms = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/form/forms?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting form: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeForm = (form) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/form/store', form).then(res => {
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

export const updateForm = (form) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/form/update/${form.id}`, form).then(res => {
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

export const showFormSelect = () => {
    
    const data = ref([])

    const loadSelectCompanies = async () => {
        await http().get(`/form/select-form`).then(res => {
            data.value = res.data
        })
    }

    return {
        loadSelectCompanies,
        data
    }
}