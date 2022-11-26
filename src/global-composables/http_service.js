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