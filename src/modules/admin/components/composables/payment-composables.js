import { http } from "@/global-composables/http_service";
import { ref } from "vue"

export const getPaymentHistory = (booking) => {
    const data = ref(null);

    const load = async () => {
        await http().get('/payment/history/'+booking.id).then(res => {
            data.value = res.data
        })
    }

    return {
        data, load
    }
}