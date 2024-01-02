
import axiosInstance from "../config/axios"
import SaberCookies from 'saber-cookies'
export const getData =async (url:string) => {
    const {data} =await axiosInstance.get(url)
    return data
}
export const postData =async (url:string, data:unknown, config?:object) => {
    const res =await axiosInstance.post(url, data, config)
    return res.data
}
export const putData =async (url:string, data:unknown, config:object) => {
    const res =await axiosInstance.put(url, data, config)
    return res.data
}
export const getTokenFromCookie = ()=>{
    return SaberCookies.get('token')
}
export const deleteData = async (url:string, config?:object) => {
    const res =await axiosInstance.delete(url, config)
    return res.data
}