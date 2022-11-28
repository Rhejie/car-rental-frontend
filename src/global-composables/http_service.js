import axios from 'axios'
import { accessToken } from './local-storage'

export function http() {
    return axios.create({
        baseURL: '/api',
        headers: {
            Authorization: 'Bearer ' + accessToken()
        }
    })
}

export function httpServer() {
    return axios.create({
        baseURL: '/api',
        headers: {
            'Authorization': 'Bearer '+ accessToken(),
            'Content-Type': 'multipart/form-data'
        }
    });
}


export const storageUrl = () => {
    return process.env.VUE_APP_API_URL + '/storage/'
}