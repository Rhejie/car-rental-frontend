import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const loginUser = (user) => {
    const data = ref(null)
    const hasError = ref(false)
    const errorStatus = ref(null)
    const errorValue = ref(null)
    const loggedIn = async () => {
        await http().post('/user/login', user).then(res => {
            data.value = res.data
            // auth.user(res.data.user)
            // auth.token(null, res.data.token)
            // auth.remember(JSON.stringify(auth.user()));
            // store.commit('USER_LOGGEDIN', res.data.user);
        }).catch( error => {
            hasError.value = true
            console.log("error in storing data -->", error)
            errorValue.value = error.response.data
            errorStatus.value = error.response.status
        })
    }

    return {
        loggedIn,
        data,
        errorStatus,
        hasError,
        errorValue
    }
}