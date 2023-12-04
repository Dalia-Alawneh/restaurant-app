
import axiosInstance from "../config/axios"

export const getData =async (url:string) => {
    const {data} =await axiosInstance.get(url)
    return data.data
}