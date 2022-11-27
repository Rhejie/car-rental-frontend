import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const loadColors = (params) => {

    const data = ref([])
    const total = ref(0)
    const load = async () => {
        await http().get(`/color/colors?search=${params.search}&page=${params.page}&size=${params.page_size}`).then(res => {
            data.value = res.data.data
            total.value = res.data.total
        }).catch(error => {
            console.log('Error in getting colors: ', error)
        })
    }

    return {
        load,
        data,
        total
    }
}


export const storeColor = (color) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/color/store', color).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing color ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}

export const updateColor = (color) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/color/update/${color.id}`, color).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing color ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}

export const selectColors = (searchVal) => {
    
    const data = ref([])
    
    const search = async () => {
        await http().get(`color/select-color?search=${searchVal}`)
            .then(res => {
                data.value = res.data
            }).catch(error => {
                console.log('Error in fetch or searching color', error)
            })
    }

    return {
        search,
        data
    }

}