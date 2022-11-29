import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const storeBook = (book) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/booking/store', book).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing book ->>', error)
        })
    }

    return {
        data,
        post,
        errorData
    }
}