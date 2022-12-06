import { httpFile } from "@/global-composables/http_service"

export const downloadTransactionForm = (id) => {
    return httpFile().get(`/booking/transaction-form/${id}`)
}