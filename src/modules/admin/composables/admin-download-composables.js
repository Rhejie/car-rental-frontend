import { httpFile } from "@/global-composables/http_service"

export const downloadTransactionForm = (id) => {
    return httpFile().get(`/booking/transaction-form/${id}`)
}

export const downloadAgreement = (id) => {
    return httpFile().get(`/booking/agreement/${id}`);
}