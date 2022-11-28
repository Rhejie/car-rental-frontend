import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadVehicleBrands = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/vehicle-brand/brands?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting brands: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeVehicleBrand = (vehicleBrand) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/vehicle-brand/store', vehicleBrand).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing vehicleBrand ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateVehicleBrand = (vehicleBrand) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/vehicle-brand/update/${vehicleBrand.id}`, vehicleBrand).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing vehicleBrand ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}

export const selectVehicleBrands = (searchVal) => {
    
    const data = ref([])
    
    const search = async () => {
        await http().get(`vehicle-brand/select-vehicle-brand?search=${searchVal}`)
            .then(res => {
                data.value = res.data
            }).catch(error => {
                console.log('Error in fetch or searching vehicleBrand', error)
            })
    }

    return {
        search,
        data
    }

}