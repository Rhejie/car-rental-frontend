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