import router from "@/modules/user/router"
import { ref } from "vue"
import { useRouter } from "vue-router";
import { http } from "./http_service"

export const registerUser = (user) => {
    const router = useRouter();
    const errorData = ref(null)
    const register = async () => {
        await http().post('/user/register', user).then(res => {
            errorData = null
            router.push('/login')
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