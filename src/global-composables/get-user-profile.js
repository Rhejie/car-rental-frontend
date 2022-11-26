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