import { http, httpServer } from "@/global-composables/http_service"
import { ref } from 'vue'

export const fetchVehiclePlaces = (params, vehicle_id) => {
    const data = ref([])
    const totalVehiclePlace = ref(0)

    const load = async () => {
        await http().get(`/vehicle-place/list/${vehicle_id}?search=${params.search}&page=${params.page}&size=${params.size}`)
            .then(res => {
                data.value = res.data.data
                totalVehiclePlace.value = res.data.total
            }).catch(error => {
                console.log('Error in fetching vehiclePlaces', error)
            })
    }

    return {
        load,
        data,
        totalVehiclePlace
    }
}

export const storeVehiclePlace = (vehiclePlacePlace) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/vehicle-place/create', vehiclePlacePlace)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                console.log('Error in storing vehiclePlacePlace -->', error)
                errorData.value = error.response.data.errors
            })
    }

    return {
        post,
        errorData,
        data
    }
}

export const getVehiclePlaceById = (id) => {
    const data = ref(null);
    const load = async () => {
        await http().get(`vehicle-place/show/${id}`).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in getting vehiclePlace-place', error)
        })
    }

    return {
        data,
        load
    }
}

export const fileUpload = async (file) => {
    const uploadProgress = ref(0);
    const files = ref()
    await httpServer().post('vehicle-place/upload', file, {
        onUploadProgress: function ( progressEvent ) {
            uploadProgress.value = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )
            console.log(uploadProgress.value, 'progress');
        }
    }).then((res) => {
        files.value = res.data
        ElNotification({
            title: 'Success',
            message: 'Successfully Uploaded!',
            type: 'success',
          })
    })

    return {
        uploadProgress,
        files
    }
}

export const updateVehiclePlace = (vehiclePlacePlace) => {
    const data = ref(vehiclePlacePlace)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/vehicle-place/update/${vehiclePlacePlace.id}`, vehiclePlacePlace)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                errorData.value = error.response.data.errors
                console.log('Error in updating vehiclePlacePlace: ' + error)
            })
    }

    return {
        data,
        update,
        errorData
    }
}