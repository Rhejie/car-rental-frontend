import { http, httpServer } from "@/global-composables/http_service"
import { ref } from 'vue'

export const fectUsersData = (params) => {
    const data = ref([])
    const totalUsers = ref(0)

    const load = async () => {
        await http().get(`/user/list?search=${params.search}&page=${params.page}&size=${params.page_size}`)
            .then(res => {
                data.value = res.data.data
                totalUsers.value = res.data.total
            }).catch(error => {
                console.log('Error in fetching vehiclePlaces', error)
            })
    }

    return {
        load,
        data,
        totalUsers
    }
}