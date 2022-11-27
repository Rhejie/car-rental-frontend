import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadFuelTypes = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/fuel-type/fuel-types?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting fuel types: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeFuelType = (fuelType) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/fuel-type/store', fuelType).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing fuelType ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateFuelType = (fuelType) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/fuel-type/update/${fuelType.id}`, fuelType).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing fuelType ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}

export const selectFueltypes = (searchVal) => {
    
    const data = ref([])
    
    const search = async () => {
        await http().get(`fuel-type/select-fuel-type?search=${searchVal}`)
            .then(res => {
                data.value = res.data
            }).catch(error => {
                console.log('Error in fetch or searching fuelType', error)
            })
    }

    return {
        search,
        data
    }

}