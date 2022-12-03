import { http, httpServer } from "@/global-composables/http_service"
import { ref } from 'vue'

export const fetchVehicles = (params) => {
    const data = ref([])
    const totalVehicle = ref(0)

    const load = async () => {
        await http().get(`/vehicle/list?search=${params.search}&page=${params.page}&size=${params.size}&brands=${params.brands}&fuelTypes=${params.fuelTypes}&colors=${params.colors}&place=${params.place_id}`)
            .then(res => {
                data.value = res.data.data
                totalVehicle.value = res.data.total
            }).catch(error => {
                console.log('Error in fetching vehicles', error)
            })
    }

    return {
        load,
        data,
        totalVehicle
    }
}

export const createVehicle = (vehicle) => {
    const data = ref(null)
    const errorData = ref(null)
    const post = async () => {
        await http().post('/vehicle/create', vehicle)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                console.log('Error in storing vehicle -->', error)
                errorData.value = error.response.data.errors
            })
    }

    return {
        post,
        errorData,
        data
    }
}

export const getVehicleById = (id) => {
    const data = ref(null);
    const load = async () => {
        await http().get(`vehicle/show/${id}`).then(res => {
            data.value = res.data
        }).catch(error => {
            console.log('Error in getting vehicle', error)
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
    await httpServer().post('vehicle/upload', file, {
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

export const updateVehicle = (vehicle) => {
    const data = ref(vehicle)
    const errorData = ref(null)
    const update = async () => {
        await http().post(`/vehicle/update/${vehicle.id}`, vehicle)
            .then(res => {
                data.value = res.data
                errorData.value = null
            }).catch(error => {
                errorData.value = error.response.data.errors
                console.log('Error in updating vehicle: ' + error)
            })
    }

    return {
        data,
        update,
        errorData
    }
}

export const selectVehicle = (searchVal) => {
    
    const data = ref([]);

    const load = async () => {
        await http().get(`/vehicle/select-vehicle?search=${searchVal}`)
            .then(res => {
                data.value = res.data
            }).catch(error => {
                console.log('Error in getting vehicles', error)
            })
    }

    return {
        data, load
    }
}