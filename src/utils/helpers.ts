
import axiosInstance from "../config/axios"

export const getData =async (url:string) => {
    const {data} =await axiosInstance.get(url)
    return data
}
export const postData =async (url:string, data:unknown) => {
    const res =await axiosInstance.post(url, data)
    return res.data
}