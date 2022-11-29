import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadPlaces = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/place/places?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting Places: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storePlace = (place) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/place/store', place).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing place ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updatePlace = (place) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/place/update/${place.id}`, place).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing place ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}

export const selectPlaces = (searchVal) => {
    
    const data = ref([])
    
    const search = async () => {
        await http().get(`place/select-place?search=${searchVal}`)
            .then(res => {
                data.value = res.data
            }).catch(error => {
                console.log('Error in fetch or searching place', error)
            })
    }

    return {
        search,
        data
    }

}