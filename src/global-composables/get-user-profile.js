import { http } from "@/global-composables/http_service"
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const loadUser = () => {
    
    const data = ref(null)
    const hasError = ref(false)
    const router = useRouter();

    const load = async () => {
        await http().get('/user').then(res => {
            data.value = res.data
        }).catch(error => {
            router.push('/login')
            console.log('Error in getting user profile -->', error)
            localStorage.removeItem('car_rental_access_token')
            hasError = true
            
        })
    }

    return {
        load,
        data,
        hasError
    }
}

export const loadUserProfile = (id) => {
    const data = ref(null)
    const hasError = ref(false)
    const router = useRouter();

    const load = async () => {
        await http().get('/user-profile/'+id).then(res => {
            data.value = res.data
        }).catch(error => {
            router.push('/login')
            console.log('Error in getting user profile -->', error)
            localStorage.removeItem('car_rental_access_token')
            hasError = true
            
        })
    }

    return {
        load,
        data,
        hasError
    }
}

export const logoutUser = () => {
    const islogout = ref(false)
    const logout = async () => {
        await http().post('/user/logout').then(res => {
            console.log(res)
            islogout.value = true
        }).catch(error => {
            console.log('Error in logout', error)
        })
    }

    return {
        logout,
        islogout
    }
}
