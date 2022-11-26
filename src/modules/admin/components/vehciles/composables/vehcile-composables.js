import { http } from "@/global-composables/http_service"
import { ref } from 'vue'

export const storeVehicle = (vehicle) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/vehicle/store', vehicle)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                consol.log('Error in storing vehicle -->', error)
                errorData.value = error.response.data.errors
            })
    }

    return {
        post,
        errorData,
        data
    }
}