import axios from "axios";
import {toast} from "react-toastify";

const baseURL = import.meta.env.VITE_APP_BASE_API_URL

const instance = axios.create({
    baseURL,
})

instance.interceptors.response.use((data) => {
    if (data.config.method === 'delete') {
        toast.error(data.data.message)
    }
    if (data.config.method === 'post') {
        toast.success(data.data.message)
    }

    return data.data.data
}, (err) => {
    if (err.response.status === 401) {
        localStorage.removeItem('token')
        location.href = '/login'
    }
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


export default instance