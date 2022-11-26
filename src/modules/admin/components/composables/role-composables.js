import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadRoles = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/role/roles?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting roles: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}

export const storeRole = (role) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/role/role', role).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing role ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}