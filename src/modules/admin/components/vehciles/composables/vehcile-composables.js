import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const createVehicle = (vehicle) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/vehicle/create', vehicle)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                console.log('Error in storing vehicle -->', error)
                errorData.value = error.response.data.errors
            })
    }

    return {
        post,
        errorData,
        data
    }
}

export const getVehicleById = (id) => {
    const data = ref(null);
    const load = async () => {
        await http().get(`vehicle/show/${id}`).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in getting vehicle', error)
        })
    }

    return {
        data,
        load
    }
}