import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const editProfile = (profile) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/profile/update/${profile.id}`, profile).then(res => {
            data.value = res.data
            errorData.value = null
        }).catch(error => {
            errorData.value = error.response.data.errors
            console.log('Error in storing profile ->>', error)
        })
    }

    return {
        data,
        update,
        errorData
    }
}

export const logoutUser = () => {
    const isLogout = ref(false)
    const logout = async () => {
        await http().post('/profile/logout').then(() => {
            isLogout.value = true
        }).catch(error => {
            console.log('Error in logout')
        })
    }

    return {
        logout,
        isLogs
    }
}