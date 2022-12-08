import { httpFile } from "@/global-composables/http_service"

export const downloadTransactionForm = (id) => {
    return httpFile().get(`/booking/transaction-form/${id}`)
}

export const downloadAgreement = (id) => {
    return httpFile().get(`/booking/agreement/${id}`);
}

export const downloadVehicleBookingHistory = (id) => {
    return httpFile().get(`/vehicle/downlond-history/${id}`);
}

export const donwloadVehicleMaintenance = (id) => {
    return httpFile().get(`/vehicle/download-maintenance/${id}`)
}

export const downloadDailyReport = (date) => {
    return httpFile().get(`/reports/download-dialy-report?date=${date}`)
}

export const downloadMonthReport = (year, month, monthInNumber) => {
    return httpFile().get(`/reports/download-dialy-report?year=${year}&month=${month}&month_in_number=${monthInNumber}`)
}