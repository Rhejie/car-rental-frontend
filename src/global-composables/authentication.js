import router from "@/modules/user/router"
import { ref } from "vue"
import { useRouter } from "vue-router";
import { http } from "./http_service"

export const registerUser = (user) => {
    const errorData = ref(null)
    const register = async () => {
        await http().post('/user/register', user).then(res => {
            errorData.value = null
        }).catch(error => {
            console.log('Error in register user ', error)
            errorData.value = error.response.data.errors
        })
    }

    return {
        register,
        errorData,
    }
}