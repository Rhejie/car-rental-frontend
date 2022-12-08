import { http } from "@/global-composables/http_service"
import { ref } from "vue"

export const verifiedUser = (user) => {
    const data = ref(null)

    const post = async () => {
        await http().post('/user/verified/'+user.id)
            .then(res => {
                data.value = res.data
            })
    }

    return {
        data, post
    }
}

export const updateAdmin = (admin) => {
    const data = ref(null)
    const errorData = ref(null)
    const update = async () => {
        await http().post('/admin/update', admin)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                errorData.value = error.response.data.errors
                console.log("error in updating ", error)
            })
    }

    return {
        data, 
        update,
        errorData
    }
}