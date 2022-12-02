import { http } from "./http_service"

export const removeImage = async (data) => {
    return await http().post('/remove/profile_url', data).then(res => {
        return res
    }).catch(error => {
        console.log('Error ing remove file', error)
    })
}